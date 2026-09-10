#!/usr/bin/env node
/**
 * convert-images.cjs
 *
 * Script INDIPENDENTE: nessun package.json/node_modules da committare
 * nel repo, nessuna installazione permanente. Converte le immagini
 * .jpg/.jpeg in .webp, generando DUE varianti coerenti con lo standard
 * già usato nel progetto (es. team.webp / team-s.webp,
 * Vulto.webp / Vulto-s.webp):
 *
 *   - foo.webp     -> larghezza max 1920px (versione piena)
 *   - foo-s.webp   -> larghezza max 721px  (versione "small")
 *
 * L'aspect ratio viene sempre preservato e non vengono mai ingrandite
 * immagini più piccole delle dimensioni target.
 *
 * USO IN LOCALE
 * --------------
 * Richiede solo Node.js. La dipendenza "sharp" viene scaricata al
 * volo da npx e NON lascia package.json/node_modules nel repo:
 *
 *   npx --yes -p sharp -- node convert-images.cjs
 *
 * Lo script legge le .jpg/.jpeg da assets/originals/ (le crea se non
 * esiste) e scrive i .webp in assets/.
 *
 * USO SU VERCEL (opzionale, automatico ad ogni deploy)
 * -------------------------------------------------------
 * In vercel.json imposta come "buildCommand":
 *
 *   "npx --yes -p sharp -- node convert-images.cjs"
 *
 * così ogni .jpg presente in assets/originals/ viene ricalcolata in
 * .webp/-s.webp direttamente durante il build, senza doverlo lanciare
 * a mano né committare i .webp generati (se non vuoi tenerli nel repo).
 *
 * CONFIGURAZIONE
 * ---------------
 * Modifica le costanti qui sotto se in futuro lo standard cambia
 * (es. nuove dimensioni o qualità).
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ---- Configurazione (basata sugli asset esistenti in assets/) ----
const SOURCE_DIR = path.resolve(__dirname, "assets/originals"); // dove metti i .jpg nuovi
const OUTPUT_DIR = path.resolve(__dirname, "assets");           // dove escono i .webp

const VARIANTS = [
  { suffix: "", width: 1920, quality: 82 }, // versione piena
  { suffix: "-s", width: 721, quality: 78 }, // versione ridotta ("-s")
];

const EFFORT = 6; // 0-6, più alto = compressione migliore ma più lento
const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

// --------------------------------------------------------------

function ensureDirs() {
  fs.mkdirSync(SOURCE_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function convertOne(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);

  for (const variant of VARIANTS) {
    const outName = `${baseName}${variant.suffix}.webp`;
    const outPath = path.join(OUTPUT_DIR, outName);

    await sharp(filePath)
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality, effort: EFFORT })
      .toFile(outPath);

    console.log(`✓ ${outName}`);
  }
}

async function main() {
  ensureDirs();
  const files = fs.readdirSync(SOURCE_DIR);
  const jpgs = files.filter((f) =>
    SOURCE_EXTENSIONS.includes(path.extname(f).toLowerCase())
  );

  if (jpgs.length === 0) {
    console.log(`Nessuna .jpg trovata in ${SOURCE_DIR}`);
    console.log(`Metti qui i file sorgente e rilancia lo script.`);
    return;
  }

  for (const f of jpgs) {
    await convertOne(path.join(SOURCE_DIR, f));
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
