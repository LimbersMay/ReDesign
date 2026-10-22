# Changelog

Versionado semántico. Cada producto fija una versión (`github:LimbersMay/ReDesign#v1.0.0`).

- **MAJOR**: se renombra o elimina una clase `re-*`, un token `--re-*` o una regla de `AGENTS.md`.
- **MINOR**: componente, variante, token o patrón nuevo; regla de lint nueva en modo `warn`.
- **PATCH**: ajuste de valores (un tono, un espaciado) sin cambiar nombres; documentación.

## Sin publicar

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
