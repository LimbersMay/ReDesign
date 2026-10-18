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
