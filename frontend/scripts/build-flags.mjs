// scripts/build-flags.mjs
import { transform } from "@svgr/core";
import fs from "fs";
import path from "path";

const SVG_DIR = path.join(process.cwd(), "domain/currency/ui/raw-flags");
const OUTPUT_DIR = path.join(process.cwd(), "domain/currency/ui/flags");

// Forzamos PascalCase para el nombre del archivo físico (Ej: usd.svg -> UsdFlag.tsx)
const toPascalCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

async function generateFlags() {
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌ Error: No existe la carpeta origen en ${SVG_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SVG_DIR).filter((file) => file.endsWith(".svg"));
  let indexExports = [];

  console.log(
    `⏳ Generando ${files.length} archivos .tsx desde SVGs en minúsculas...`,
  );

  for (const file of files) {
    // 💡 CORRECCIÓN: Forzamos que el token de negocio sea SIEMPRE mayúscula (ej: "usd.svg" -> "USD")
    const rawCode = path.basename(file, ".svg").toUpperCase();
    const componentName = `${toPascalCase(rawCode)}Flag`;
    const svgCode = fs.readFileSync(path.join(SVG_DIR, file), "utf-8");

    // Transformamos el SVG en componente React
    const componentCode = await transform(
      svgCode,
      {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        icon: true,
        typescript: true,
        memo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      },
      { componentName },
    );

    const optimizedCode = componentCode.replace(
      "<svg",
      '<svg width="100%" height="100%" {...props}',
    );

    // Escribimos el archivo individual (Ej: src/domain/currency/ui/flags/UsdFlag.tsx)
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${componentName}.tsx`),
      optimizedCode,
      "utf-8",
    );

    // 💡 El export del índice se mantiene en mayúsculas (Ej: export { default as USD } from "./UsdFlag";)
    indexExports.push(
      `export { default as ${rawCode} } from "./${componentName}";`,
    );
  }

  // Creamos el archivo index.ts (Barril unificado)
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "index.ts"),
    indexExports.join("\n"),
    "utf-8",
  );

  console.log(
    `\n🚀 ¡Éxito! Estructura modular corregida y creada en: ${OUTPUT_DIR}/`,
  );
}

generateFlags();
