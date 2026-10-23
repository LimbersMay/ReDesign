# ReDesign — reglas para agentes (Claude, Gemini, GPT, Codex, Copilot…)

Este repositorio es el **sistema de diseño de la Suite Re**: ReRoute, ReSession, ReTabs, ReLink, ReBooks y ReTame.
Si vas a crear o modificar interfaz en cualquiera de esos productos, estas reglas mandan.

> **Familia + identidad.** Como Word y Excel: los productos comparten tokens, componentes y forma de
> hablar; cada uno se reconoce por su **color de marca** (en su acción principal, no repartido por la
> pantalla) y por sus **componentes firma**. Nada más
> cambia entre productos.

## Cómo trabajar (en este orden)

0. **Si aún se está decidiendo la estructura del producto** (qué vistas tiene, dónde viven sus acciones,
   cómo se navega), todavía no se usa esta guía: se decide con bocetos neutros y ReDesign entra al darle
   aspecto a la estructura elegida (R15).
1. Lee `docs/products/<producto>.md`: marca, tamaño de ventana, componentes firma y excepciones declaradas.
2. Busca el componente en `docs/components/` y el flujo en `docs/patterns/`. Copia el marcado y las
   clases `re-*` del componente; no lo reinterpretes. Se copia el componente, no la disposición de la
   pantalla de su ejemplo.
3. Si lo que necesitas no existe, constrúyelo con los fundamentos (`docs/foundations/`) y los `re-*`
   existentes, y anótalo como **Propuesta** en `docs/products/<producto>.md`. No crees variantes nuevas
   de un componente que ya existe.
4. Antes de terminar ejecuta `npx re-design-lint <carpeta>` y deja **0 errores**.
5. Si el usuario te pide algo que contradice estas reglas, dilo y pregunta antes de salirte de ellas.

## Precedencia

`AGENTS.md` › `docs/components` › `docs/patterns` › `docs/foundations` › `docs/products/<x>.md` (solo
sus excepciones declaradas) › código existente del producto. **Si el código de un producto contradice
esta guía, el código es deuda, no ejemplo.**

## Reglas

**R1 · Clases `re-*` para componentes.** Botones, campos, switches, badges, segmented, menús,
diálogos, toasts, árboles, tarjetas y listas se dibujan con las clases de `components.css`. Las
utilidades de Tailwind son para **layout** (flex, grid, gap, márgenes, anchos, posición). No cambies
color, tamaño, radio ni tipografía de un `re-*` con utilidades.

**R2 · Paleta cerrada.** Solo existen:
- Superficies: `bg-background`, `bg-card`, `bg-overlay`, `bg-inverse`.
- Neutros: `slate-50…950` (se invierten solos en oscuro).
- Identidad: `brand-50…800` (cada producto define su tono en `tokens/brands/`).
- Roles, iguales en toda la suite: `rose` = peligro / destructivo · `emerald` = éxito / en vivo /
  protegido · `amber` = aviso.
- Categorías (para distinguir tipos dentro de un producto): `orange`, `teal`, `sky`, `violet`,
  `purple`; nunca el tono de la propia marca.
- Prohibido: hex, `rgb()`, `zinc`, `gray`, `blue`, `red`… y colores arbitrarios `bg-[#…]`.

**R3 · Sin `dark:`.** La paleta se redefine en `.dark`: la misma clase sirve en los dos temas. Si
un caso de verdad lo necesita, justifícalo con `re-design-ignore-next-line no-dark-variant: <por qué>`.

**R4 · El color es una señal, no un relleno.** La marca marca identidad, foco y estado activo. Nada
de headers o footers de color sólido, ni badges chillones (fondo `-50`, borde `-200`, texto `-700`).
Texto sobre `bg-primary`: siempre `text-primary-foreground`, nunca `text-white`.

**R5 · Tres tamaños de texto en el popup.** `text-2xs` (12px: captions, badges, todo lo mono),
`text-xs` (13px: cuerpo y controles) y `text-sm` (15px: títulos). Lo monoespaciado usa `re-mono` /
`font-mono` y queda en 12px regular. `text-base` y mayores solo en páginas completas (ayuda, opciones).

**R6 · Iconos Lucide.** `@ng-icons/lucide` (Angular), `lucide-react` (React), `lucide` (wireframes).
Tamaños por contenedor en `docs/foundations/iconography.md`. Ningún otro set (Font Awesome, Phosphor,
Material).

**R7 · Botones.** Siempre con `type`. Los botones de solo icono llevan `title` y `aria-label`. Una
sola acción primaria por vista o diálogo. Por defecto, las acciones de filas y tarjetas se revelan con
hover o foco (`re-reveal`). Un producto puede dejar fija una acción de fila cuando es la tarea principal
de esa fila, declarándolo en `docs/products/<x>.md`. Destructivo = `rose`.

**R8 · Texto.** Ningún texto fijo en componentes: todo va por i18n. Verbos cortos en infinitivo
(«Limpiar», «Guardar»). **Una garantía del producto se dice una vez**, en un solo lugar
(`docs/patterns/guarantee.md`), no se repite en cada botón. Qué lugar es lo decide la estructura del
producto (R15).

**R9 · Ventana.** Popup de 540×580 (`re-app`); en el panel lateral, `html.fluid`. Otro tamaño
solo si está declarado en `docs/products/<x>.md`.

**R10 · Capas.** Los menús son `re-dropdown` / `re-menu`. Los diálogos (`re-dialog`) se abren dentro
del popup. Para lo irreversible se pide confirmación (`re-dialog--confirm`); para lo reversible se usa
un toast con «Deshacer» (`re-toast`). Ver `docs/patterns/destructive-actions.md`.

**R11 · Accesibilidad.** Foco visible en todo lo interactivo; `role="switch"`, `listbox`/`option`,
`dialog` + `aria-modal`, `aria-expanded` en lo que se despliega. Esc cierra el overlay de arriba; el
foco queda atrapado en el diálogo y vuelve al botón que lo abrió.

**R12 · La identidad vive en un solo sitio.** Un producto cambia su archivo `tokens/brands/<x>.css` y
declara sus componentes firma en `docs/products/<x>.md`. Nunca edita `tokens.css` ni
`components.css` desde su repo: propone el cambio aquí (PR + `CHANGELOG.md`).

**R13 · Un acento por pantalla.** La marca va solo en la acción principal, en los controles
encendidos, en el foco y en estados transitorios (hover, dropdown abierto). Nunca en la opción activa
de un segmented (se marca por elevación, neutra), ni en iconos de tipo, datos, badges de formato,
botones secundarios o el logo. Los roles (`rose`, `emerald`) solo donde el significado es el mensaje.
Lista completa y prueba de los tres segundos: `docs/foundations/color.md` §2.

**R14 · Un cambio que toca una marca se registra y trae alternativas.** Todo cambio de la librería
(tokens, componentes, tamaños, densidad, ventana, docs) que afecte al branding de algún producto (su
color, su tipografía, su densidad, su ventana o sus componentes firma) no se publica en silencio. En
`docs/products/<x>.md` de **cada** producto afectado se anota: qué se nota en pantalla y **al menos una
solución o alternativa** (adoptarlo tal cual, sobrescribir un token en el producto, o una Propuesta de
variante). El `CHANGELOG.md` nombra los productos afectados. Si no hay forma de cuantificar el efecto,
se prueba con el producto real antes de publicar.

**R15 · La estructura es del producto.** ReDesign decide el aspecto y los componentes. No decide qué
vistas tiene un producto, dónde viven sus acciones ni cómo se navega: eso sale de sus tareas y se decide
en el producto (`docs/ux.md`). Los ejemplos de componentes y patrones vienen de productos concretos, casi
todos de ReSession: son vocabulario, no una disposición que copiar. Por eso:
- Al explorar la estructura de un producto no se lee esta guía ni se usan sus componentes. Se trabaja con
  bocetos neutros, y ReDesign entra cuando la estructura está elegida.
- La ficha de un producto (`docs/products/<x>.md`) declara su marca, su ventana, sus componentes firma y
  sus excepciones, pero no propone su estructura.
- Si un componente o un patrón obliga a una estructura, es una Propuesta para este repo, no una razón
  para cambiar la del producto.

## Archivos

| Archivo | Para qué |
|---|---|
| `tokens/tokens.css` | Variables `--re-*`: neutros, roles, acentos, tipo, radios, sombras, capas. |
| `tokens/brands/<x>.css` | Lo único que cambia por producto: tono de marca y pastel oscuro. |
| `tailwind/theme.css` | Puente a Tailwind v4 (utilidades `bg-card`, `text-slate-700`, `brand-*`) y paleta cerrada. |
| `tailwind/preset-v3.cjs` | Lo mismo para Tailwind v3 (solo ReTabs, mientras migra). |
| `components.css` | El aspecto de todos los componentes compartidos. |
| `docs/` | Fundamentos, componentes, patrones, productos y decisiones. |
| `gallery/index.html` | Todos los componentes en vivo × claro/oscuro × cinco marcas. |
| `scripts/design-lint.mjs` | `re-design-lint`: aplica estas reglas a las plantillas. |
