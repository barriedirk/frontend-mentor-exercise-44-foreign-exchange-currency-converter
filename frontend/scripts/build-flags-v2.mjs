import { transform } from "@svgr/core";
import fs from "fs";
import path from "path";

const SVG_DIR = path.join(process.cwd(), "domain/currency/ui/raw-flags");
const OUTPUT_FILE = path.join(
  process.cwd(),
  "domain/currency/ui/CurrencyFlags.tsx",
);

async function generateFlags() {
  if (!fs.existsSync(SVG_DIR)) {
    console.error(`❌ Error: No existe la carpeta origen en ${SVG_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SVG_DIR).filter((file) => file.endsWith(".svg"));
  let objectProperties = [];

  console.log(`⏳ Procesando ${files.length} banderas...`);

  for (const file of files) {
    const currencyCode = path.basename(file, ".svg").toUpperCase();
    const svgCode = fs.readFileSync(path.join(SVG_DIR, file), "utf-8");

    // Transformamos el SVG crudo en un componente funcional de React inline
    const componentCode = await transform(
      svgCode,
      {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        icon: true,
        typescript: true,
        // Limpiamos los IDs y estructuras para evitar colisiones
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      },
      { componentName: `${currencyCode}Flag` },
    );

    // Extraemos solo el bloque del return del componente para meterlo en nuestro objeto indexado
    const svgElement = componentCode.match(/<svg[^]*<\/svg>/m)?.[0];

    if (svgElement) {
      objectProperties.push(
        `  ${currencyCode}: React.memo((props: React.ComponentPropsWithoutRef<"svg">) => (\n    ${svgElement.replace("<svg", '<svg width="100%" height="100%" {...props}')}\n  ))`,
      );
    }
  }

  const finalTemplate = `import * as React from "react";\n\nexport const CurrencyFlags = {\n${objectProperties.join(",\n")}\n} as const;\n\nexport type CurrencyCode = keyof typeof CurrencyFlags;\n`;

  fs.writeFileSync(OUTPUT_FILE, finalTemplate, "utf-8");
  console.log(`\n🚀 ¡Éxito! Archivo consolidado creado en: ${OUTPUT_FILE}`);
}

generateFlags();
