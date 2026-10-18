# Registro de decisiones

Cada decisión tiene contexto, decisión y consecuencias. Si una deja de servir, se reemplaza con una
nueva entrada que diga a cuál sustituye; no se borra.

## D1 · Un repositorio versionado como única fuente

**Contexto.** La guía vivía en `ReSession/.claude/design-system`, copiada a mano de ReRoute; a las pocas
semanas ya no coincidía con el código (ReDropdown con otra API y otra altura) y ReSession tenía en su
`styles.css` una paleta distinta a la de su propia guía.
**Decisión.** ReDesign es un repo propio. Los productos lo instalan fijando un tag
(`github:LimbersMay/ReDesign#vX.Y.Z`); nunca copian archivos.
**Consecuencias.** Cambiar el sistema exige un PR aquí y subir la versión en cada producto: más lento,
pero un cambio no se pierde ni diverge.

## D2 · Componentes como clases CSS, no como cadenas de utilidades

**Contexto.** La guía anterior daba HTML con 15–20 utilidades por elemento. Cada agente las copiaba con
pequeñas variaciones (`h-7` vs `h-[30px]`, `py-0.2`, `text-[10px]`). ReRoute ya había resuelto los
casos más repetidos con CSS (`app-input-group`, `.ui-checkbox`, `.ui-inline-select`).
**Decisión.** El aspecto de cada componente compartido vive en `components.css` como clases `re-*`, en
`@layer components`. Los frameworks aportan el comportamiento; las utilidades, el layout.
**Consecuencias.** El mismo HTML sirve en Angular, React y wireframes. Una plantilla deja de poder
desviarse en color, alto o radio. A cambio, hay que leer `components.css` para saber qué hace una clase.

## D3 · Tokens propios (`--re-*`) independientes de Tailwind

**Contexto.** ReRoute redefinía `--color-slate-*` de Tailwind; ReTabs usa Tailwind v3 con `tw-colors`;
los wireframes usan el CDN de v3. Un mixin Sass no sirve fuera de ReRoute.
**Decisión.** Los valores son variables CSS `--re-*`. `tailwind/theme.css` (v4) y `preset-v3.cjs` las
mapean a utilidades. La marca se calcula en CSS a partir de un tono (`--re-brand-hue`) y un pastel
(`--re-brand-dark`).
**Consecuencias.** Cambiar de marca es cambiar cuatro variables. Funciona sin build.

## D4 · Oscuro derivado de un solo pastel por acento

**Contexto.** ReRoute escribía cinco hex por acento en oscuro (`dark-accent(base, mid4, mid6, lighter,
lightest)`); el error más común al añadir una marca era olvidar uno.
**Decisión.** Cada acento oscuro se deriva de su base con `color-mix`: 50–200 tiñen la tarjeta (12/20/32 %),
300–800 mezclan blanco. Las bases son Catppuccin Frappé.
**Consecuencias.** Los valores difieren de los de ReRoute v1 en uno o dos puntos de luminosidad;
imperceptible y documentado aquí.

## D5 · Paleta cerrada en Tailwind

**Decisión.** `theme.css` borra los colores por defecto (`--color-*: initial`) y registra solo los del
sistema. `bg-blue-500` no genera nada.
**Consecuencias.** El error se ve en el acto, antes de llegar al lint.

## D6 · Tailwind v4 como base

**Decisión.** v4 es la base de la suite. ReTabs (v3) usa el preset mientras migra; en v3 no funcionan
los modificadores de opacidad sobre colores en variables (`bg-brand-50/40`).

## D7 · Las reglas se comprueban con una herramienta

**Contexto.** Una guía en prosa no basta: los agentes (y las personas) se desvían sin darse cuenta.
**Decisión.** `re-design-lint` comprueba las reglas mecánicas (paleta, escala, iconos, `type`, `dark:`,
espaciados inválidos). Cada producto lo ejecuta en CI y antes de entregar.
**Consecuencias.** Lo que no se puede comprobar con una expresión regular (jerarquía, textos) sigue
dependiendo de la revisión.

## D8 · Componentes firma por producto

**Decisión.** Lo que hace reconocible a un producto además del color (ReTree de cookies en ReSession, la
tarjeta de regla con barra por tipo en ReRoute) se documenta en `docs/products/<x>.md`, no en
`components/`. Un componente firma se construye con piezas compartidas; si otro producto lo necesita,
se generaliza y sube a `components/`.

## D9 · Tonos de marca pendientes (abierta)

- **ReSession = amber (75)** coincide con el rol de aviso. Resuelto en D14: se queda.
- **ReLink (280) y ReBooks (300)** están a 20°; en claro se confunden. Opción: ReLink a 260 (índigo)
  o ReBooks a 330 (magenta).
Se decide antes del rediseño; hasta entonces `brands/resession.css` es provisional.

## D10 · Un acento por pantalla

**Contexto.** El primer wireframe de ReSession y la primera galería pintaban de marca la pestaña activa,
la opción activa de cada segmented, los iconos de carpeta, el logo, el candado, los badges y los
botones secundarios. La marca dejaba de señalar la acción principal.
**Decisión.** La marca se limita a la lista de `foundations/color.md` §2. El activo de un segmented es
neutro (elevación), como en ReRoute. El primario mantiene L 0.53 en todas las marcas para que el texto
del botón sea blanco en claro (ReSession con L 0.59 daba 4.2:1).
**Consecuencias.** `components.css` cambia `re-segmented`, `re-header__logo` y `re-tree__icon` (1.0.0
aún no publicado, no es un cambio incompatible). El lint no puede medir esto: se revisa con la prueba
de los tres segundos.


## D11 · El valor de una fila puede subir de tono (`re-tree__value--strong`)

**Contexto.** En la fila de storage de ReSession todo era gris: el valor (`slate-400`) quedaba casi
ilegible y la vista no tenía por dónde leerse. Colorear los badges de formato se descartó: R13 reserva la
marca y `color.md` §2 deja los badges de formato neutros; no existe un rol de color para «credencial».
**Decisión.** Variante neutra del valor, `slate-600` (`color.md` §4: cuerpo), por debajo de la clave
(`slate-800`). La jerarquía sale del tono y el peso, no de un color; el color queda para roles reales
(caducidad = aviso, protegido = success).
**Consecuencias.** MINOR (1.2.0). Misma caja que `re-tree__value`, sin cambio incompatible.

## D12 · El icono de rastreadores avisa (`re-tree__icon--warning`)

**Contexto.** El grupo de rastreadores pintaba su icono en `rose`, igual que «Limpiar» y los errores.
Pero el grupo no es un error ni una acción destructiva: es una advertencia.
**Decisión.** El icono pasa a `amber` (`re-tree__icon--warning`). `rose` queda en lo que sí destruye
(«Limpiar») y en el conteo.
**Consecuencias.** MINOR (1.3.0). Ojo con D9: la marca provisional de ReSession también es ámbar (75),
así que este aviso se parece a la marca hasta que D9 se resuelva.

## D13 · Un solo hover, sin excepciones (2.0.0)

**Contexto.** 1.0.1 unificó el hover del árbol en `slate-100`, pero dejó `re-tree__row--danger` (rose) para
las filas de rastreadores como «señal de rol». Con D12 los rastreadores pasaron a ser un aviso (amber), y
una fila tintada de rojo contradecía ese cambio y el hover único.
**Decisión.** Se elimina `re-tree__row--danger`: el hover de cualquier fila o cabecera es `slate-100`. La
señal de los rastreadores vive en su icono, su conteo y su «Limpiar», no en cada fila. Se eliminan también
los alias `re-tree__head--l2` y `re-tree__row--l3`, obsoletos desde 1.1.0, para dejar una sola forma de
declarar el nivel (`--re-tree-depth`).
**Consecuencias.** MAJOR (2.0.0): se eliminan clases `re-*`. Migración en el CHANGELOG.

## D14 · Los rastreadores no se tiñen; ReSession se queda en ámbar (2.0.1)

**Contexto.** D12 pasó el icono y el conteo de rastreadores a amber, pero la marca de ReSession es amber
(75) y un aviso se confundía con la marca (D9). Mover la marca (255, 335/340, 115) no convenció: la
regla de ≥ 30° no tiene base medida, y entre marcas solo protege la identidad, no el significado.
**Decisión.** El icono (`shield-alert`), el conteo y las filas de los rastreadores son neutros. Lo que los
distingue es su «Limpiar», con `flame` en lugar de `eraser`: es destructivo, pero no se parece a «Auto»
(`zap`) ni a las listas (`shield-*`). La marca de ReSession queda en amber 75. El ámbar de aviso se
reserva a lo puntual (caducidad cercana, `re-hint--warning`), donde pide atención sin ser un estado fijo
de la lista.
**Consecuencias.** PATCH (2.0.1): documentación. `re-tree__icon--warning` y `re-badge--warning` siguen
existiendo, aunque ReSession ya no los use para rastreadores. D12 queda sin efecto en ReSession.

## D15 · La fila de cookie dice su caducidad y sus banderas con palabras (2.0.2)

**Contexto.** La fila de cookie mostraba `H` y `S` (`re-badge--micro`): solo las entiende quien ya sabe qué
son, y la caducidad solo se veía abriendo el editor, mientras que storage ya la mostraba de un vistazo.
Un icono no sirve: el candado ya significa «protegida» en ReSession y `HttpOnly` no tiene icono estándar.
**Decisión.** La cookie usa la fila de dos líneas de storage: clave + `re-badge` «HttpOnly» / «Secure» +
caducidad (`re-hint`) arriba, valor debajo. «Sesión» (`re-hint`) si no caduca; `re-hint--warning` si ya pasó
o falta menos de 1 h, el mismo umbral que storage. Se corrige además `re-tree__items .re-tree__items
.re-tree__row`, que forzaba 32 px también a las filas `--2line` anidadas.
La caducidad se muestra corta, con `clock` y solo el tiempo que falta («2 h»; «Caducada» si ya pasó);
la frase completa queda en el tooltip, porque con claves largas la frase empujaba el resto a otra línea
(2.0.3).
**Consecuencias.** PATCH (2.0.2): documentación y un ajuste de altura; ninguna clase nueva ni eliminada.
`re-badge--micro` sigue existiendo. Cuesta densidad: caben menos cookies por pantalla.
