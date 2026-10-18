# Tipografía

- **Sans**: Inter Variable. **Mono**: JetBrains Mono Variable. Las dos van incluidas en el bundle.
- **En el popup hay tres tamaños, ninguno más.**

| Clase | Tamaño | Uso |
|---|---|---|
| `text-sm` | 14px | Títulos de tarjeta, de diálogo y de empty state (`font-bold tracking-tight`) |
| `text-xs` | 12px | Cuerpo, botones, inputs, labels, opciones de menú, nombre de la app |
| `text-2xs` | 11px | Captions, hints, badges, títulos de sección, filas de árbol, **todo lo mono** |

- Lo monoespaciado (URLs, claves, valores, patrones, código) usa `re-mono` o `font-mono`: siempre 11px
  regular, porque JetBrains Mono se ve más grande que Inter al mismo tamaño.
- Pesos: 400 cuerpo · 500 controles · 600 labels y botones · 700 títulos y badges.
- Títulos de sección: `re-section-title` (2xs, 700, mayúsculas, `slate-400`), sin dos puntos al final.
- Las **páginas completas** (ayuda, opciones; se abren en una pestaña) pueden usar `text-base`–`text-2xl`
  en los títulos. Se declaran como `pages` en `.redesignrc.json`.
- Prohibido: `text-[10px]`, `text-[9.5px]`, `text-3xs` y `text-base` o mayores dentro del popup.
