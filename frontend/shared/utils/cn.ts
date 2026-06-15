// src/shared/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      // OBLIGATORIO: Mantenemos esto porque tus tokens usan ceros a la izquierda (025, 050)
      // y nombres fuera del estándar numérico de Tailwind (150, 250).
      spacing: [
        "025",
        "050",
        "075",
        "125",
        "150",
        "250",
        "300",
        "400",
        "500",
        "600",
        "800",
        "1000",
        "1200",
        "1400",
        "1600",
        "1800",
      ],
    },
    classGroups: {
      // Mantenemos tus selectores semánticos para evitar colisiones de color
      "bg-color": [
        {
          bg: [
            "surface-main",
            "surface-card",
            "surface-input",
            "surface-hover",
            "brand",
            "brand-muted",
            "success",
            "danger",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "text-primary",
            "text-secondary",
            "text-muted",
            "brand",
            "brand-muted",
            "success",
            "danger",
          ],
        },
      ],
      "border-color": [
        { border: ["border-subtle", "border-focus", "brand", "brand-muted"] },
      ],

      // Mapeo estricto de tus Presets Tipográficos de Figma
      "font-size": [
        {
          text: [
            "preset-1",
            "preset-1-sm",
            "preset-2",
            "preset-2-bold",
            "preset-3",
            "preset-3-medium",
            "preset-3-bold",
            "preset-4",
            "preset-5",
            "preset-5-medium",
            "preset-6",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
