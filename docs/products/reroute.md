# ReRoute

| | |
|---|---|
| Qué es | Redirige, modifica y simula peticiones de red (DNR + mocking) |
| Marca | `brands/reroute.css` · 225 zafiro · oscuro `#85c1dc` |
| Ventana | 540×600 + panel lateral (`html.fluid`) |
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
