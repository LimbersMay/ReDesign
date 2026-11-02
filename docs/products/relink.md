# ReLink

| | |
|---|---|
| Marca | `brands/relink.css` · 263 azul, saturación ×1,5 · oscuro `#8caaee` · definitivo (D22) |
| Ventana | **400px de ancho**, mínimo 470px de alto (excepción declarada: popup de acceso rápido) |
| Stack | Angular 21 · Tailwind v4 (`@tailwindcss/postcss`) |
| Estado frente a ReDesign | Adopta ReDesign con las excepciones de abajo (rediseño de noviembre de 2026) |

## Excepciones declaradas

- Ancho de 400px: `html:root { --re-popup-w: 400px; }` en su `styles.css`. Con 350px la
  guía y el campo se partían en dos líneas y el popup se sentía apretado; 400px es además el ancho desde el
  que no se aplican las reglas de ventana estrecha. Comparado con 350px con más aire y 440px en
  `ReLink/docs/design-explorations/2026-11-popup/tanda-4.html`.
- Alto automático con un mínimo de 470px: `.re-app { min-height: 470px; }` en su `styles.css`. Es lo que ocupa
  el menú de ajustes abierto (468px con un atajo de tres teclas), así abrirlo no hace crecer el popup. Un
  resultado largo sí lo alarga.
- Barra de marca en la tarjeta de la guía: con el popup vacío, las tres formas de limpiar van en un
  `re-card` con `re-card__bar` en el color de la marca (`color.md` reserva la barra para la categoría o el
  estado). Sigue habiendo un solo acento: la tarjeta solo existe con el popup vacío, cuando no hay botón
  primario. Con un enlace pegado desaparece y el acento es «Copiar».

## Componentes firma

- **Atajo de teclado** (`re-kbd-combo`) como dato principal de cada función.

## Tema claro Latte (2.7.0)

Al subir a 2.7.0 (D23), el claro cambia: lienzo y tarjeta lavanda (`#e4e7ee`, `#f5f6f9`), texto más suave
(`#4c4f69`, 7,4:1 sobre la tarjeta), cabeceras de árbol sobre la tarjeta y colores de marca y categoría
400–800 con menos croma. El botón primario y el oscuro no cambian. Alternativa: sobrescribir en el
producto `--re-slate-*`, `--re-background`, `--re-card` y `--re-c-400…800` para quedarse con el claro
anterior. Sin probar aún en ReLink.
