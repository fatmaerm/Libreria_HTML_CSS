/**
 * Banco de pruebas para componentes de creaciones-primium.
 *
 *   node Docs/Prompt/prompt-para-nuevas-creaciones/banco-de-pruebas.mjs <carpeta> <slug> [<slug> ...]
 *
 * Por cada slug:
 *   1. Captura dos imagenes SIN parchear rAF (el aspecto real) en 2500 ms y 7000 ms.
 *   2. Vuelve a capturar con rAF parcheado a setTimeout y compara la firma del DOM
 *      entre t=1200 ms y t=4200 ms, para detectar movimiento y errores de JS.
 *
 * Por que hace falta el paso 2: Edge headless con --virtual-time-budget ejecuta solo unos
 * 4 requestAnimationFrame, asi que una captura a pelo SIEMPRE sale congelada en el frame 0.
 * Nunca deduzcas "esta roto" de una sola imagen; usa la sonda de movimiento.
 *
 * Estado esperado: ok   (ERROR-JS / SIN-MOVIMIENTO / SIN-REPORTE son fallos)
 */
import { mkdir, readFile, writeFile, rm, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "..", "..", "..");
const WORK = path.join(process.env.TEMP ?? "C:\\Users\\angel\\AppData\\Local\\Temp", "opencode", "banco");
const SHOTS = path.join(WORK, "shots");

const warp = `<script>
(function(){
  window.requestAnimationFrame=function(cb){return setTimeout(function(){cb(performance.now());},16);};
  window.cancelAnimationFrame=function(id){clearTimeout(id);};
})();
</script>`;

const probe = `<script>
window.__e=[];
window.addEventListener("error",function(e){window.__e.push(e.message+" @"+e.lineno);});
window.addEventListener("load",function(){
  function sig(){
    var all=document.querySelectorAll("body *");
    var h=0,step=Math.max(1,Math.floor(all.length/70));
    for(var k=0;k<all.length;k+=step){
      var e=all[k],r=e.getBoundingClientRect();
      h=(h*31+Math.round(r.x)+Math.round(r.y)*7+Math.round(r.width)*13+Math.round(r.height)*17)&0x7fffffff;
    }
    return h+"/"+all.length;
  }
  function rep(t){var p=document.createElement("pre");p.textContent="RPT "+t+" "+sig()+" anim="+(document.getAnimations?document.getAnimations().length:0)+" err="+window.__e.length;document.body.appendChild(p);}
  setTimeout(function(){rep("A");},1200);
  setTimeout(function(){rep("B");},4200);
});
</script>`;

const [, , folder, ...slugs] = process.argv;
if (!folder || slugs.length === 0) {
  console.error("uso: node banco-de-pruebas.mjs <carpeta> <slug> [<slug> ...]");
  process.exit(1);
}
const root = path.join(REPO, "creaciones-primium", folder);
await mkdir(SHOTS, { recursive: true });

let fallos = 0;
for (const slug of slugs) {
  const src = path.join(root, slug);
  const dir = path.join(WORK, folder, slug);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  await cp(src, dir, { recursive: true });
  const idx = path.join(dir, "index.html");
  const original = await readFile(idx, "utf8");

  for (const t of [2500, 7000]) {
    const udd = path.join(dir, "u" + t);
    await mkdir(udd, { recursive: true });
    execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
      "--user-data-dir=" + udd, "--window-size=1200,780", "--virtual-time-budget=" + t,
      "--screenshot=" + path.join(SHOTS, `${slug}-${t}.png`).replace(/\\/g, "/"),
      "file:///" + dir.replace(/\\/g, "/") + "/index.html"], { stdio: "ignore" });
  }

  await writeFile(idx, original
    .replace(/(<script\b[^>]*>)/i, warp + "$1")
    .replace(/<\/body>/i, probe + "</body>"), "utf8");

  let dom = "";
  try {
    dom = execFileSync(EDGE, ["--headless", "--disable-gpu", "--no-first-run",
      "--user-data-dir=" + path.join(dir, "up"), "--window-size=1200,780",
      "--virtual-time-budget=6000", "--dump-dom",
      "file:///" + dir.replace(/\\/g, "/") + "/index.html"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
  } catch { /* se reporta como SIN-REPORTE */ }

  const rpts = [...dom.matchAll(/<pre>(.*?)<\/pre>/gs)].map((m) => m[1]);
  const a = rpts.find((r) => r.startsWith("RPT A")) ?? "";
  const b = rpts.find((r) => r.startsWith("RPT B")) ?? "";
  const errs = Number((b.match(/err=(\d+)/) ?? [, "0"])[1]);
  const estado = errs > 0 ? "ERROR-JS" : !a ? "SIN-REPORTE" : a !== b ? "ok" : "SIN-MOVIMIENTO";
  if (estado !== "ok") fallos++;
  console.log(slug.padEnd(32), estado.padEnd(14), (b || a).slice(0, 60));
}
console.log(`\ncapturas en ${SHOTS}`);
console.log(fallos === 0 ? "todo correcto" : `${fallos} con problemas`);
process.exitCode = fallos === 0 ? 0 : 1;
