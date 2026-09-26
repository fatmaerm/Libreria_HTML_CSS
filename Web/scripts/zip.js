const textEncoder = new TextEncoder();
const utf8Flag = 0x0800;
const storedMethod = 0;
const deflateMethod = 8;
const dosDate = 0x0021;
const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function calculateCrc32(bytes) {
  let checksum = 0xffffffff;
  for (const byte of bytes) {
    checksum = crcTable[(checksum ^ byte) & 0xff] ^ (checksum >>> 8);
  }
  return (checksum ^ 0xffffffff) >>> 0;
}

function createHeader(size, writeValues) {
  const bytes = new Uint8Array(size);
  writeValues(new DataView(bytes.buffer));
  return bytes;
}

function normalizeArchivePath(value) {
  const archivePath = String(value).replaceAll("\\", "/");
  if (!archivePath || archivePath.startsWith("/") || archivePath.split("/").includes("..")) {
    throw new Error(`Unsafe ZIP entry path: ${archivePath}`);
  }
  return archivePath;
}

async function deflateRaw(bytes) {
  if (typeof CompressionStream !== "function" || typeof Response !== "function") return null;
  if (bytes.byteLength === 0) return null;
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    const compressed = new Uint8Array(await new Response(stream).arrayBuffer());
    if (compressed.byteLength >= bytes.byteLength) return null;
    return compressed;
  } catch {
    return null;
  }
}

async function createZip(files) {
  if (!Array.isArray(files) || files.length === 0 || files.length > 0xffff) {
    throw new Error("The ZIP must contain between 1 and 65535 files.");
  }

  const entries = [];
  for (const file of files) {
    const name = textEncoder.encode(normalizeArchivePath(file.name));
    const source = file.bytes instanceof Uint8Array ? file.bytes : new Uint8Array(file.bytes);
    if (source.byteLength > 0xffffffff) throw new Error("A ZIP entry exceeds the supported size.");
    const compressed = await deflateRaw(source);
    entries.push({
      name,
      source,
      data: compressed ?? source,
      method: compressed ? deflateMethod : storedMethod,
      checksum: calculateCrc32(source),
    });
  }

  const localChunks = [];
  const centralChunks = [];
  let localDirectorySize = 0;
  let centralDirectorySize = 0;

  for (const entry of entries) {
    const localHeader = createHeader(30 + entry.name.length, (view) => {
      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(6, utf8Flag, true);
      view.setUint16(8, entry.method, true);
      view.setUint16(10, 0, true);
      view.setUint16(12, dosDate, true);
      view.setUint32(14, entry.checksum, true);
      view.setUint32(18, entry.data.byteLength, true);
      view.setUint32(22, entry.source.byteLength, true);
      view.setUint16(26, entry.name.length, true);
      view.setUint16(28, 0, true);
    });
    localHeader.set(entry.name, 30);
    localChunks.push(localHeader, entry.data);

    const centralHeader = createHeader(46 + entry.name.length, (view) => {
      view.setUint32(0, 0x02014b50, true);
      view.setUint16(4, 0x0314, true);
      view.setUint16(6, 20, true);
      view.setUint16(8, utf8Flag, true);
      view.setUint16(10, entry.method, true);
      view.setUint16(12, 0, true);
      view.setUint16(14, dosDate, true);
      view.setUint32(16, entry.checksum, true);
      view.setUint32(20, entry.data.byteLength, true);
      view.setUint32(24, entry.source.byteLength, true);
      view.setUint16(28, entry.name.length, true);
      view.setUint16(30, 0, true);
      view.setUint16(32, 0, true);
      view.setUint16(34, 0, true);
      view.setUint16(36, 0, true);
      view.setUint32(38, 0, true);
      view.setUint32(42, localDirectorySize, true);
    });
    centralHeader.set(entry.name, 46);
    centralChunks.push(centralHeader);
    localDirectorySize += localHeader.length + entry.data.byteLength;
    centralDirectorySize += centralHeader.length;
  }

  const endRecord = createHeader(22, (view) => {
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(4, 0, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, entries.length, true);
    view.setUint16(10, entries.length, true);
    view.setUint32(12, centralDirectorySize, true);
    view.setUint32(16, localDirectorySize, true);
    view.setUint16(20, 0, true);
  });

  return new Blob([...localChunks, ...centralChunks, endRecord], { type: "application/zip" });
}

window.createZip = createZip;
