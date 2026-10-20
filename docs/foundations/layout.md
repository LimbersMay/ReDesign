# Espacio y layout

## Ventana

- Popup: `re-app` = 540×580 (el máximo de Chrome es 800×600). Panel lateral: `html.fluid`, 100% × 100vh.
- Estructura fija: `re-header` (48px) · vista (`flex-1 min-h-0`, con su propio scroll) · `re-statusbar` (32px).
- Los diálogos y los toasts viven **dentro** de la ventana.

## Alturas de control

| Alto | Dónde |
|---|---|
| 30px | Botones e inputs de formulario y diálogo (`re-btn`, `re-input-group`, `re-dropdown__trigger`) |
| 28px | Botones del header (`re-btn--sm`), icon buttons (`re-icon-btn`) |
| 24px | Botones de las barras de lote (`re-btn--xs`), icon buttons en filas (`re-icon-btn--sm`) |
| 20px | Botones en las cabeceras de grupo del árbol (`re-btn--2xs`) |
| 16px | Switch (32×16) y checkbox (16×16) |

## Filas

| Fila | Alto |
|---|---|
| Cabecera de grupo, nivel 1 | 32px |
| Cabecera de grupo, nivel 2 | 28px |
| Fila hoja | 36px (1 línea) · 44px (clave + valor) · 32px (nivel 3) |
| Fila de lista (`re-list__row`) | ~40px (padding de 10px) |

Sangría del árbol: 16px (nivel 1) → 28px (nivel 2) → 32px (hojas) → 48px (hojas de nivel 3).

## Radios

`rounded-sm` 4px (badges, kbd) · `rounded-md` 6px (icon buttons, píldoras internas) · `rounded-lg` 8px
(botones, inputs, dropdowns) · `rounded-xl` 12px (tarjetas, listas, menú de ajustes) · `rounded-2xl`
16px (diálogos).

## Espaciado

Escala de Tailwind en múltiplos de 0.25 (4px). Ritmos habituales: `gap-1.5` entre botones, `gap-2` entre
icono y texto, `gap-3` entre bloques de una fila, `space-y-4` entre secciones de un diálogo, `px-3.5` en
las barras de la ventana y `px-5` en los diálogos.

Prohibido: anchos fijos en píxeles para botones y valores fuera de la escala (`py-0.2`).
