# Movimiento y accesibilidad

## Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--re-duration-fast` | 100ms | Abrir dropdowns y menús (`re-pop`), feedback al pulsar |
| `--re-duration` | 150ms | Hover, foco, colores |
| `--re-duration-slow` | 200ms | Switch, chevrons, toasts |

- Al pulsar: `scale(0.98)` (ya incluido en `re-btn`).
- Con `prefers-reduced-motion`, las animaciones duran 1ms.
- Nada se mueve solo, salvo el punto en vivo (`re-dot--pulse`) y el temporizador del toast.

## Accesibilidad (mínimos)

- **Foco**: todo lo interactivo muestra un anillo (`--re-ring` al 55 %). No se quita el `outline` sin
  poner otro indicador.
- **Contraste**: AA (4.5:1) para texto. `slate-400` solo para iconos y placeholders, nunca para texto que
  haya que leer.
- **Roles**:
  - Switch: `<input type="checkbox" role="switch">`.
  - Dropdown: el trigger lleva `aria-haspopup="listbox"` y `aria-expanded`; el panel `role="listbox"`;
    las opciones `role="option"` + `aria-selected`.
  - Grupos del árbol: la cabecera es `role="button"` + `aria-expanded` + `tabindex="0"`; los items
    cerrados llevan `hidden`.
  - Diálogo: `role="dialog"`, `aria-modal="true"` y `aria-labelledby` apuntando al título.
  - Segmented: `aria-pressed` (botones) o `role="tablist"`/`tab` + `aria-selected` (vistas).
- **Teclado**: Esc cierra el overlay de más arriba. En un diálogo el foco queda atrapado y vuelve al
  botón que lo abrió. En un dropdown ↑/↓ mueven, Enter elige y Home/End saltan al principio o al final.
- **Solo icono**: `title` y `aria-label`, los dos traducidos.
- **Acciones reveladas** (`re-reveal`): aparecen también con `focus-within`, así que se alcanzan con
  el teclado.
