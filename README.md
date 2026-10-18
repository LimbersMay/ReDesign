# ReDesign

Sistema de diseño de la **Suite Re** (ReRoute, ReSession, ReTabs, ReLink, ReBooks).

Una familia, cinco identidades: los productos comparten tokens, componentes y forma de hablar, y se
distinguen por su color de marca y sus componentes firma.

- **Para agentes de IA**: empieza por [AGENTS.md](AGENTS.md). `CLAUDE.md` y `GEMINI.md` lo importan.
- **Para personas**: el índice está en [docs/README.md](docs/README.md) y los componentes se ven en vivo
  en [gallery/index.html](gallery/index.html) (ábrelo directamente en el navegador).

## Usarlo en un producto

```bash
npm i -D github:LimbersMay/ReDesign#v1.0.0
```

```css
/* src/styles.css (Tailwind v4) */
@import 'tailwindcss';
@import 're-design/tailwind.css';
@import 're-design/tokens.css';
@import 're-design/brands/resession.css';
@import 're-design/components.css';
```

Tailwind v3 (ReTabs): `presets: [require('re-design/preset-v3')]` y los mismos tres CSS después de las
directivas `@tailwind`.

Fuentes: `@fontsource-variable/inter` y `@fontsource-variable/jetbrains-mono`, incluidas en el bundle
(el popup nunca depende de fuentes instaladas).

En el repo del producto copia [templates/AGENTS.product.md](templates/AGENTS.product.md) como
`AGENTS.md`, crea `CLAUDE.md` y `GEMINI.md` con una sola línea (`@AGENTS.md`) y añade el lint:

```json
"scripts": { "lint:design": "re-design-lint src --max-warnings 0" }
```

## Cambiar el sistema

1. Cambia aquí, nunca en la copia del producto.
2. Mira el cambio en la galería, en claro y oscuro y con las cinco marcas.
3. Anota el cambio en `CHANGELOG.md` y, si es una decisión, en `docs/decisions.md`.
4. Publica un tag (`v2.0.1`) y actualiza la versión en cada producto.
