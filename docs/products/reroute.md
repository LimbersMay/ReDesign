# ReRoute

| | |
|---|---|
| Qué es | Redirige, modifica y simula peticiones de red (DNR + mocking) |
| Marca | `brands/reroute.css` · 225 zafiro · oscuro `#85c1dc` |
| Ventana | 540×580 + panel lateral (`html.fluid`) |
| Stack | Angular 21 · Tailwind v4 · `@ng-icons/lucide` · Transloco |
| Estado frente a ReDesign | **Origen** del sistema; v1.0 es anterior a ReDesign 1.0 |

## Componentes firma

- **Tarjeta de regla** (`ReCard` con barra por **tipo de acción**): redirect = marca, headers =
  `purple`, params = `orange`, mock = `teal`. *(En v1 mock es `rose`, que es el rol de peligro: cambiar
  en el rediseño.)*
- **Tester de URL** (inspector): panel `re-code-surface`, oscuro en los dos temas.
- **Avisos en la página** (toasts inyectados en la web, D25): fuera del popup, con su propio CSS.

## Deuda frente a ReDesign 1.0 (para el rediseño)

| Dónde | Qué | Hacia |
|---|---|---|
| `styles.scss` | Tokens propios, bloque `@theme` cyan sin uso, `--primary` con el tono fijo | `re-design/*.css` + `brands/reroute.css` |
| `app-header` | `py-3`, logo de 32px, título `text-sm`, botones redondos `size-8` | `re-header` 48px, `re-icon-btn` |
| Menú de ajustes | Selector `bg-slate-200/70` + `dark:bg-slate-300` | `re-segmented--block` |
| `app-custom-dropdown` | `buttonClass`/`menuClass`; sin teclado; «Editar»/«Eliminar» fijos | Contrato de [ReDropdown](../components/ReDropdown.md) |
| `rule-card` línea 88 | `py-0.2` (no genera nada) | `re-badge` |
| Status bar | `bg-slate-100/80 px-5 py-2` | `re-statusbar` |
| Página de ayuda | `text-[9px]`, `bg-[#…]` | escala y tokens; declarar como `pages` |

`npx re-design-lint src/app` hoy: 6 errores, 16 avisos (12 son de la página de ayuda, que se
declara en `pages`).

## Cambios de la librería que ReRoute verá al migrar

ReRoute sigue en su CSS propio (escala 11/12/14, 540×580). La librería ya difiere de ese punto de partida;
esto es lo que cambia en pantalla al adoptarla y cómo resolverlo. Probado en Chromium con la extensión real
(`dist/` v1.0.1, 5 reglas, oscuro y claro): sin desbordes nuevos.

| Cambio | Qué se nota en ReRoute | Solución al migrar |
|---|---|---|
| Escala de texto +1px (`2xs` 12, `xs` 13, `sm` 15) | Casi no cuesta altura: las tarjetas conservan su alto (los interlineados son fijos salvo `xs`, +2px) y la lista pierde ~0,03 de tarjeta. Lo que se nota es el tamaño: el buscador se estrecha un poco junto a «Nueva regla». Si el texto anterior (11/12/14) le queda mejor a ReRoute, es una preferencia, no un problema de espacio. | El header de ReRoute **no se toca** para compensar: hoy respira bien. Si ReRoute prefiere su escala, la sobrescribe en su `styles.css` (`--re-text-2xs`, `--re-text-xs`, `--re-text-sm` y sus `-lh`). Vigilar anchos fijos al migrar. |
| Alto del popup 580 (antes 600) | Ya aplicado en ReRoute (`styles.scss`, 580). Para que quepan dos tarjetas con redirect se aligeraron antes las tarjetas y la lista (ver abajo): 2,52 tarjetas visibles con 5 reglas, frente a 2,17 con 600. | Nada: coincide con el valor por defecto de `--re-popup-h`. |
| Tarjeta de regla más ligera | Ya aplicado en ReRoute: tarjeta con `px-4 py-3`, separaciones `mb-2`, bloque del patrón con `py-1`, botones de acción `size-6`; lista con `space-y-2.5 py-3`. Redirect 167→139px, headers/params 138→114px, mock 169→141px. | Nada: `re-card` de la librería ya lleva esta densidad (`padding` `0.75rem 1rem`, cabecera `mb-2`, `re-code-box` `py-1`). |
| `re-pill` de 18 a 22px (2.1.0) | El badge de versión de la cabecera (`rounded-full`, ~20px) pasa a 22px. | `re-pill--brand`. Si 22px resulta grande en una cabecera densa, ver la propuesta de abajo. |
| Oscuro: `danger-soft`, `badge`/`pill` `--danger` y `--success` con relleno opaco de tarjeta y color en el texto (2.1.0) | Desaparecen los fondos semitransparentes de los botones y badges de peligro/éxito. | Aceptado: ReRoute queda como ReSession (D16). |
| Árbol (`re-tree`): hover único, niveles, líneas suaves | Ninguno: ReRoute no usa `re-tree`. | — |

## Propuestas

- **Tamaños de `re-pill`.** Tenía un solo alto (22px). Decidido: `re-pill--sm` con el alto anterior
  (18px) para cabeceras y zonas densas, y que el 22px actual sea el tamaño por defecto. No hace falta `--lg`:
  ningún producto lo pide. Sería MINOR (variante nueva). Aprobada; implementada en local y pendiente de publicar.
