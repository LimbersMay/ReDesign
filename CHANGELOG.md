# Changelog

Versionado semántico. Cada producto fija una versión (`github:LimbersMay/ReDesign#v1.0.0`).

- **MAJOR**: se renombra o elimina una clase `re-*`, un token `--re-*` o una regla de `AGENTS.md`.
- **MINOR**: componente, variante, token o patrón nuevo; regla de lint nueva en modo `warn`.
- **PATCH**: ajuste de valores (un tono, un espaciado) sin cambiar nombres; documentación.

## 2.8.1 — 2026-11-11

Productos afectados: ninguno en pantalla; solo cambia la ficha de ReSession. Ninguna clase ni token cambia.

- Ficha de ReSession: Propuesta con los iconos del árbol sin SVG de su D64 (máscara CSS en lugar de
  `<ng-icon>` en las filas que se repiten por miles), con tres alternativas para adoptarlo.

## 2.8.0 — 2026-11-04

Productos afectados: ReSession (ver su ficha, R14, y D24). Ninguna clase ni token se renombra ni se quita;
quien no declara las variables nuevas se ve igual.

- Calma por marca: nueve variables opcionales para el archivo de marca (`color.md` §5), cada una con el
  valor de hoy como respaldo. `--re-tree-font` (nombres del árbol); `--re-control-border`,
  `--re-control-fill` y `--re-control-fill-hover` (`re-input-group`, `re-segmented`,
  `re-icon-btn--outline`); `--re-soft-border` (`re-pill`, `re-btn--danger-soft`); `--re-success-text` y
  `--re-success-fill` (`re-summary__stat--success`, `re-pill--success`); `--re-danger-soft-fill` y
  `--re-danger-soft-fill-hover`.
- `re-tree__value` declara su mono (antes la heredaba del árbol), y el icono de `re-summary__stat--success`
  y `re-pill--success` declara su verde (antes lo heredaba del texto). Sin cambio en pantalla.
- `re-icon-btn--outline` tiene su propio hover (el mismo `slate-100` de antes).
- ReSession declara la calma: nombres en sans, controles por relleno sin borde, el verde solo en el escudo
  y «Limpiar» como tinte rojo.

## 2.7.2 — 2026-11-03

Productos afectados: ReLink y ReSession (ver sus fichas, R14). Ninguna clase ni token cambia.

- `re-textarea`: el placeholder sale en sans y `text-xs`, como en `re-input-group`; el valor sigue en mono.
  Antes, una frase de ejemplo en un campo vacío salía en monoespaciada y desentonaba con el resto.
- Ficha de ReLink: el claro Latte, adoptado tal cual en ReLink 2.0.0; la cabecera lleva el lema en
  `re-header__subtitle`.

## 2.7.1 — 2026-11-02

Productos afectados: ninguno en pantalla; solo cambia la ficha de ReSession. Ninguna clase ni token cambia.

- Ficha de ReSession: Propuesta con los cuatro ajustes de identidad de su D46 (el `+` de la franja con la
  marca, segmented y búsqueda más ligeros, «Lista blanca» sin borde en el árbol), con su choque con R13 y
  alternativas para cada uno. El estado frente a ReDesign, al día.

## 2.7.0 — 2026-11-02

Productos afectados: todos los que usan el tema claro (ReSession; ReTame al subir de 2.5.0; ReRoute, ReLink,
ReTabs y ReBooks al migrar). Ver sus fichas (R14) y D23. Ninguna clase ni token se renombra ni se quita. El
oscuro no cambia.

- Tema claro: los neutros pasan a Catppuccin Latte (lavanda), lienzo `#e4e7ee` y tarjeta `#f5f6f9`. Texto
  `#4c4f69`, más suave que el negro, como el de Frappé.
- `--re-line` y `--re-line-sunken` en claro: las cabeceras del árbol suben a la tarjeta y las anidadas
  quedan a medio camino, como en oscuro (antes, transparentes).
- Curva de acentos en claro: 400–800 con menos croma a la misma luminosidad. El primario no cambia.
- `re-tree--flat`: el primer nivel sin padre mide 36px con el título en `text-xs`, como
  `re-tree__group--parent`; en claro va sobre la tarjeta con su divisor. Cerradas, entre dos cabeceras de
  primer nivel queda una sola línea.

## 2.6.1 — 2026-11-01

Productos afectados: ReSession (ver su ficha, R14). Ningún otro producto usa `re-tree--flat`. Ninguna clase
ni token se renombra ni se quita.

- `re-tree--flat`: las filas densas entran un paso (`--re-tree-indent`) respecto a su cabecera, y
  `re-tree__group--parent` pone `--re-tree-depth: 1` a sus secciones. El nivel se lee en el borde izquierdo:
  sitio → dominio → filas.
- ReTree: el árbol plano admite un icono de sección (`re-tree__icon`, gris) entre el chevron y el título.

## 2.6.0 — 2026-11-01

Productos afectados: ReSession (navegación nueva; ver su ficha, R14). En los demás, solo el hover de un
`re-segmented__item` desactivado. Ninguna clase ni token se renombra ni se quita.

- `re-summary--compact`: el resumen en una línea de 36px para una lista que empieza arriba; con
  `--selection` mantiene el alto. Por debajo de 400px se estrecha.
- `re-tree__group--parent`: un nivel padre en `re-tree--flat` (un sitio y sus dominios). Cabecera de 36px
  sobre la tarjeta, fija arriba; las de sus secciones se fijan debajo.
- `re-figures` > `re-figure` (`__value`): cifras con su etiqueta, en dos columnas.
- `re-dot` dentro de `re-icon-btn` se coloca en su esquina (6px): el estado vivo de una acción.
- `re-segmented__item:disabled`: atenuado y sin hover. La opción sigue visible y su motivo va al lado.
- `re-btn--ghost[aria-expanded='true']`: se queda como al pasar el ratón mientras su menú está abierto,
  igual que `re-icon-btn`.

## 2.5.4 — 2026-11-01

Productos afectados: ninguno. Solo documentación.

- Ficha de ReLink: el popup declara un alto mínimo de 470px, lo que ocupa su menú de ajustes abierto, para que
  abrirlo no lo haga crecer.

## 2.5.3 — 2026-11-01

Productos afectados: los que usan `**` en `exclude` o `pages` de `.redesignrc.json` (ReLink). Ninguna clase ni
token cambia.

- `re-design-lint`: en los globs, `**` solo alcanzaba un nivel de carpeta y `**/` no coincidía con nada. Cada
  reemplazo releía lo que había escrito el anterior (el `*` de `.*`, el `?` de `(?:`); ahora es una sola pasada.

## 2.5.2 — 2026-11-01

Productos afectados: ninguno. Solo documentación.

- Ficha de ReLink: el ancho declarado pasa de 350px a 400px, y se declara la barra de marca en la tarjeta de
  su guía (un solo acento: la tarjeta solo existe cuando no hay botón primario).

## 2.5.1 — 2026-11-01

Productos afectados: ReLink (cambia de color) y ReTame (muestra su título en ventanas estrechas). Ninguna
clase ni token se renombra (D22).

- ReLink vuelve al azul: `brands/relink.css` pasa de 280 lavanda a 263 azul con saturación ×1,5 y pastel
  oscuro `#8caaee`. Resuelve D9 para ReLink.
- Ventana estrecha: `re-header__title` solo se oculta si el header tiene pestañas (`re-tabs--header`). Sin
  pestañas el título cabe y se queda.

## 2.5.0 — 2026-10-22

Productos afectados: ninguno. Ninguna clase ni token cambia, y lo publicado sigue cumpliendo las reglas.
ReTame aún no tiene interfaz (R14).

- Nuevo: R15, la estructura es del producto. ReDesign decide el aspecto y los componentes; las vistas, el
  sitio de las acciones y la navegación se deciden en el producto, con bocetos neutros, antes de usar
  ReDesign (D21). «Cómo trabajar» añade ese paso 0 y aclara que se copia el componente, no la disposición
  de su ejemplo.
- R7: revelar las acciones de fila con hover o foco es el valor por defecto. Un producto puede dejar fija
  una acción de fila que sea su tarea principal, declarándolo en su ficha.
- R8 y `patterns/guarantee.md`: la garantía se dice en un solo lugar, pero el lugar lo decide el producto.
  La barra de estado y el resumen quedan como ejemplos de ReSession.
- `docs/products/retame.md`: deja de proponer componentes por vista y corrige la ruta del mock.

## 2.4.0 — 2026-10-22

Productos afectados: ninguno. Se añade una marca; ninguna clase ni token existente cambia (R14).

- Nuevo: ReTame entra en la suite. Marca `brands/retame.css` (340 ciruela, provisional: D20) y
  `docs/products/retame.md`. D20 ocupa el hueco de «ReBooks a 330» de D9: si se queda, la salida de D9 es
  ReLink a 260.
- La galería añade ReTame al selector de marca.

## 2.3.0 — 2026-10-21

Productos afectados: **ReSession** (probado en su maqueta: «El sitio primero», D19; ver
`docs/products/resession.md`). Los demás productos solo notan los cambios marcados con **Se nota** (para ReRoute, ver
`docs/products/reroute.md`, «Cambios de la librería que ReRoute verá al migrar»);
todo lo demás es opcional y no cambia nada hasta que se añade la clase.

- Nuevo: `re-tree--sticky` fija la cabecera del grupo abierto al hacer scroll; las anidadas se apilan
  bajo la de su padre (D18).
- **Se nota**: tema claro de la familia Latte (`--re-background` `#eceef3`, `--re-card` `#f8f9fb`), con
  los tokens nuevos `--re-chrome-sheen`, `--re-chrome-sheen-up`, `--re-line`, `--re-line-sunken` y
  `--re-line-hover`. El oscuro no cambia.
- Nuevo (ReSummary): `re-summary` con `__main`, `__title`, `__stats`, `__stat--success`, `__actions` y
  `__count`; `re-summary--selection` (el resumen en modo selección, que hace de barra de lote); `re-favicon`
  (`--lg`).
- Nuevo: `re-tabs--header` (las vistas como pestañas subrayadas en el header), `re-tabs__count` y
  `re-segmented__count`.
- Nuevo (ReTree): `re-tree--flat` y `re-tree__title`; `re-tree__row--dense` con `re-tree__lead`,
  `re-tree__trail`, `re-tree__time` (`--warning`), `re-tree__end` y las acciones flotantes; `re-flags` y
  `re-flag`. En menos de 400px la fila densa pierde la celda del valor y el header oculta el nombre y los
  iconos de las pestañas.
- Nuevo: tooltip `re-tip` / `re-tip__bubble` (`re-tip--end`), con hover y foco de teclado.
- Nuevo (ReList): `re-nav-list` (lista cuyas filas abren una página), `re-meter` (`--success`) y
  `re-breadcrumb`.
- Nuevo (ReDialog): la hoja `re-dialog--sheet` / `re-dialog-overlay--sheet` con `re-dialog__heading`;
  `re-toggle-pill`, `re-props`, `re-check-chip` y `re-disclosure`; `re-dropdown__hint`.
- Nuevo: `re-icon-btn--outline` (30px, junto a un campo) y `re-card__subtitle`.
- **Se nota**: el toast baja a 14px del borde inferior cuando la ventana no tiene `re-statusbar`; con ella,
  sigue encima a 44px.
- **Se nota**: el placeholder de un campo `re-mono` sale en sans (es prosa, no un dato).
- **Se nota** (contenido): «Vaciar» se retira; borrar en lote es siempre «Limpiar», también un contenedor sin
  protección. Un producto que diga «Vaciar» lo cambia al migrar.
- Docs: `ReSummary.md` (nuevo), `ReTree.md`, `ReHeader.md`, `ReSegmented.md`, `ReDialog.md`, `ReList.md`,
  `ReBadge.md`, `ReButton.md`, `ReInput.md`, `ReCard.md`, `ReDropdown.md`; patrones `guarantee.md` (la
  garantía junto a la acción), `editor-dialog.md` (variante hoja) y `destructive-actions.md`; `content.md`,
  `iconography.md`, `resession.md`; D18 y D19. Galería: tres paneles nuevos.

## 2.2.0 — 2026-10-19

Productos afectados: **ReSession** (probado en su maqueta) y **ReRoute** (al migrar; ver
`docs/products/reroute.md`, «Cambios de la librería que ReRoute verá al migrar»).

- Nuevo: `re-pill--sm` (18 px) para cabeceras y zonas densas; `re-pill` conserva los 22 px.
- Texto +1 px para leer mejor en pantallas grandes: `--re-text-2xs` 12 px, `--re-text-xs` 13 px
  (lh 18 px), `--re-text-sm` 15 px. Lo mono sigue a `2xs` (12 px) y el check de `re-select-inline` también.
  Un producto que prefiera la escala anterior sobrescribe los tokens en su `styles.css`.
- Alto del popup `--re-popup-h`: 600 → 580 px, por defecto para todos los productos.
- `re-card` más ligera: `padding` `0.75rem 1rem`, `re-card__header` `margin-bottom` `0.5rem`,
  `re-code-box` `padding` `0.25rem 0.5rem`. Con 580 caben dos tarjetas con redirect.
- Líneas más suaves: `re-tree__head` `border-bottom` al 35 %, `re-batchbar` con `slate-50` al 60 %, y se
  elimina el `border-top` entre grupos de `re-tree` (la línea de la cabecera ya los separa).
- Nueva regla R14 en `AGENTS.md`: un cambio que toca una marca se registra y propone alternativas (D17).
- Docs: R5, R9, `typography.md`, `layout.md`, `resession.md`, `ReBadge.md`, `reroute.md`; el mensaje del
  lint de tamaños de texto cita la escala nueva.

## 2.1.1 — 2026-10-18

- Fix: `re-reveal` se revela con `:focus-visible` en lugar de `:focus-within`. Un clic con el ratón dejaba las
  acciones fijas a la vista (p. ej. el «Limpiar» de un grupo tras desplegarlo); el foco de teclado sigue revelándolas.

## 2.1.0 — 2026-10-18

- Nuevo: `re-btn--danger-outline`, la acción destructiva revelada de una cabecera de grupo: neutra hasta el
  hover (D16).
- `re-btn--danger-soft` lleva sombra y queda como el único destructivo siempre visible de una pantalla.
- Oscuro: `re-btn--danger-soft`, el hover de `--danger-outline` y los tonos `--danger`/`--success` de
  `re-badge` y `re-pill` usan relleno opaco de tarjeta con el color en el texto, en lugar de un tinte
  translúcido.
- `re-pill` pasa de 18 a 22 px de alto, con más margen lateral.
- Docs: «Limpiar» sin icono (`eraser` y `flame` fuera de la tabla de iconos); `re-btn--2xs` ya no es para
  cabeceras de grupo.

## 2.0.3 — 2026-10-18

Solo documentación.

- La caducidad de cookie y de storage se muestra corta: `clock` + tiempo restante («2 h»), con la frase
  completa en el tooltip (D15).

## 2.0.2 — 2026-10-18

Sin clases nuevas ni eliminadas.

- La fila de cookie pasa a dos líneas (`re-tree__row--2line`): banderas con la palabra completa y caducidad
  visible, como en storage (D15).
- Corrección: una fila `--2line` dentro de un grupo anidado ya no se aplasta a 32 px.

## 2.0.1 — 2026-10-18

Solo documentación y comentario de la marca; ningún nombre cambia.

- Los rastreadores dejan de teñirse: icono, conteo y filas neutros. Su «Limpiar» usa `flame` (D14).
- La marca de ReSession (ámbar 75) pasa de provisional a definitiva.

## 2.0.0 — 2026-10-18

Cambio incompatible (se eliminan clases `re-*`). Migración: en `re-tree`, sustituye `re-tree__head--l2` y
`re-tree__row--l3` por `--re-tree-depth: 1` en el grupo, y quita `re-tree__row--danger` de las filas.

- Eliminados: `re-tree__head--l2` y `re-tree__row--l3` (obsoletos desde 1.1.0) y `re-tree__row--danger`.
- Las filas de rastreadores ya no tienen hover propio: todas las filas y cabeceras, de cualquier nivel
  y tipo, usan el mismo `slate-100` (D13).
- Docs: los rastreadores avisan (`amber`: icono y conteo); `rose` queda en lo destructivo y en los errores.

## 1.3.0 — 2026-10-18

- `re-tree__icon--warning` (`amber-500`): el icono del grupo de rastreadores avisa, no es un error ni
  una acción destructiva; el rojo se queda en su conteo y su «Limpiar» (D12).

## 1.2.0 — 2026-10-18

- `re-tree__value--strong`: variante del valor de una fila (`slate-600` en lugar de `slate-400`), para
  filas donde el valor es el contenido (fila de storage de ReSession) y no una pista junto a la clave.
  Misma caja y truncado que `re-tree__value`; es un neutro, no una señal de rol (D11).

## 1.1.0 — 2026-10-17

- `re-tree`: niveles ilimitados. La profundidad se declara con `--re-tree-depth` en el grupo; cabeceras
  y filas calculan su sangría con ella (paso `--re-tree-indent`, 16px). Una cabecera anidada sale
  compacta y hundida por estructura, a cualquier profundidad.
- Obsoletos: `re-tree__head--l2` y `re-tree__row--l3`, que siguen funcionando como profundidad 1.
  La cabecera de nivel 2 pasa de 28 a 32px de sangría, para alinearse con las filas de su nivel.

## 1.0.1 — 2026-10-17

- `re-tree`: un solo hover (`slate-100`) para cabeceras y filas de cualquier nivel. Antes el nivel 1
  oscurecía a `slate-50`, el nivel 2 a `slate-100` y las filas se teñían con la marca, y cada nivel
  reaccionaba distinto. `re-tree__row--danger` conserva su hover rose.

## 1.0.0 — 2026-10-17

Primera versión, extraída de ReRoute v1.0 y de la propuesta de ReSession.

- Tokens `--re-*` independientes del framework; marcas en `tokens/brands/` (D1, D3).
- Paleta oscura derivada de un solo pastel por acento (D4).
- `components.css`: header, status bar, botones, campos, booleanos, badges, segmented, tabs, tarjetas,
  listas, árbol, dropdown, menú, diálogo, confirmación, toast, empty state y avisos (D2).
- Puente a Tailwind v4 con paleta cerrada y preset para v3 (D5, D6).
- `re-design-lint` con 12 reglas (D7).
- Galería viva (`gallery/index.html`).
- Política de acento: un acento por pantalla, segmented activo neutro, primario a L 0.53 con texto
  blanco en todas las marcas (R13, D10).
- Alias para ReRoute v1: `app-input-group`, `.ui-checkbox`, `.ui-inline-select`, `.always-dark`.
