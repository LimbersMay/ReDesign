# Changelog

Versionado semántico. Cada producto fija una versión (`github:LimbersMay/ReDesign#v1.0.0`).

- **MAJOR**: se renombra o elimina una clase `re-*`, un token `--re-*` o una regla de `AGENTS.md`.
- **MINOR**: componente, variante, token o patrón nuevo; regla de lint nueva en modo `warn`.
- **PATCH**: ajuste de valores (un tono, un espaciado) sin cambiar nombres; documentación.

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
