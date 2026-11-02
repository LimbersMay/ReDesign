# ReTabs

| | |
|---|---|
| Qué es | Guarda y restaura grupos de pestañas |
| Marca | `brands/retabs.css` · 190 teal · oscuro `#81c8be` |
| Stack | React 18 · Vite · **Tailwind v3** + `tw-colors` · iconos propios (`components/icons.tsx`) |
| Estado frente a ReDesign | Parcial: el tema oscuro ya es Catppuccin Frappé (mismas superficies que ReRoute) |

## Componentes firma

- **Toast con Deshacer y temporizador**: origen de [ReToast](../components/ReToast.md).
- **Botón de guardar con confirmación animada** (`animate-pop`).

## Deuda frente a ReDesign 1.0

| Qué | Hacia |
|---|---|
| Tokens `appSurface`, `brandSoft`, `danger`… (`tw-colors`) | `preset-v3` y luego Tailwind v4 (D6) |
| Fuente del sistema, body a 14px | Inter + escala de tres tamaños |
| Iconos propios en SVG | `lucide-react` |
| Toast propio | `re-toast` (mismo comportamiento) |

## Tema claro Latte (2.7.0)

Al subir a 2.7.0 (D23), el claro cambia: lienzo y tarjeta lavanda (`#e4e7ee`, `#f5f6f9`), texto más suave
(`#4c4f69`, 7,4:1 sobre la tarjeta), cabeceras de árbol sobre la tarjeta y colores de marca y categoría
400–800 con menos croma. El botón primario y el oscuro no cambian. Al migrar ya lo encuentra así. Alternativa: sobrescribir en el
producto `--re-slate-*`, `--re-background`, `--re-card` y `--re-c-400…800` para quedarse con el claro
anterior. Sin probar aún en ReTabs.
