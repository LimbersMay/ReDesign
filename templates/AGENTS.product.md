# <Producto> — instrucciones para agentes

<!-- Copia este archivo como AGENTS.md en la raíz del producto. Crea CLAUDE.md y GEMINI.md con una
     sola línea: @AGENTS.md -->

## Diseño

Este producto sigue **ReDesign** (`node_modules/re-design`, versión fijada en `package.json`).

1. Antes de tocar interfaz, lee `node_modules/re-design/AGENTS.md` y
   `node_modules/re-design/docs/products/<producto>.md`.
2. Usa las clases `re-*` de `components.css` para los componentes y Tailwind solo para el layout.
3. No edites `node_modules/re-design` ni copies sus archivos aquí. Si falta algo, anótalo como
   Propuesta en el doc del producto y avisa.
4. Antes de terminar: `npm run lint:design` con 0 errores.

- Marca: `re-design/brands/<producto>.css`
- Excepciones de diseño: las de `docs/products/<producto>.md` en ReDesign. Ninguna más.

## Arquitectura

<!-- Enlace a docs/architecture.md del producto y sus reglas propias (capas, smart/dumb, stores…). -->
