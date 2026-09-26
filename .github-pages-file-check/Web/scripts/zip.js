const textEncoder = new TextEncoder();
const utf8Flag = 0x0800;
const storedMethod = 0;
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

function createStoredZip(files) {
  if (!Array.isArray(files) || files.length === 0 || files.length > 0xffff) {
    throw new Error("The ZIP must contain between 1 and 65535 files.");
  }

  const localChunks = [];
  const centralChunks = [];
  let localDirectorySize = 0;
  let centralDirectorySize = 0;

  for (const file of files) {
    const name = textEncoder.encode(normalizeArchivePath(file.name));
    const bytes = file.bytes instanceof Uint8Array ? file.bytes : new Uint8Array(file.bytes);
    if (bytes.byteLength > 0xffffffff) throw new Error("A ZIP entry exceeds the supported size.");

    const checksum = calculateCrc32(bytes);
    const localHeader = createHeader(30 + name.length, (view) => {
      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(6, utf8Flag, true);
      view.setUint16(8, storedMethod, true);
      view.setUint16(10, 0, true);
      view.setUint16(12, dosDate, true);
      view.setUint32(14, checksum, true);
      view.setUint32(18, bytes.byteLength, true);
      view.setUint32(22, bytes.byteLength, true);
      view.setUint16(26, name.length, true);
      view.setUint16(28, 0, true);
    });
    localHeader.set(name, 30);
    localChunks.push(localHeader, bytes);

    const centralHeader = createHeader(46 + name.length, (view) => {
      view.setUint32(0, 0x02014b50, true);
      view.setUint16(4, 0x0314, true);
      view.setUint16(6, 20, true);
      view.setUint16(8, utf8Flag, true);
      view.setUint16(10, storedMethod, true);
      view.setUint16(12, 0, true);
      view.setUint16(14, dosDate, true);
      view.setUint32(16, checksum, true);
      view.setUint32(20, bytes.byteLength, true);
      view.setUint32(24, bytes.byteLength, true);
      view.setUint16(28, name.length, true);
      view.setUint16(30, 0, true);
      view.setUint16(32, 0, true);
      view.setUint16(34, 0, true);
      view.setUint16(36, 0, true);
      view.setUint32(38, 0, true);
      view.setUint32(42, localDirectorySize, true);
    });
    centralHeader.set(name, 46);
    centralChunks.push(centralHeader);
    localDirectorySize += localHeader.length + bytes.byteLength;
    centralDirectorySize += centralHeader.length;
  }

  const endRecord = createHeader(22, (view) => {
    view.setUint32(0, 0x06054b50, true);
    view.setUint16(4, 0, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, files.length, true);
    view.setUint16(10, files.length, true);
    view.setUint32(12, centralDirectorySize, true);
    view.setUint32(16, localDirectorySize, true);
    view.setUint16(20, 0, true);
  });

  return new Blob([...localChunks, ...centralChunks, endRecord], { type: "application/zip" });
}

window.createStoredZip = createStoredZip;
