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
- **ReTame (340, D20)** ocupa el hueco de «ReBooks a 330». Si se queda, la salida de D9 es ReLink a 260.

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

## D16 · Un solo «Limpiar» fijo por pantalla (2.1.0)

**Contexto.** Al dar forma de botón a los «Limpiar» de cada grupo, la vista llegó a cuatro botones casi
iguales: el de la barra (`eraser`), el de rastreadores (`flame`, siempre visible), el de cada grupo (sin
icono) y la papelera. La acción de la vista dejó de distinguirse. Además, en oscuro los tintes translúcidos
de 50/200 (D4) brillaban sobre el slate opaco, y un botón de 20 px en una cabecera se leía como un badge.
**Decisión.** El peso lo da el alcance. Vista o selección: la barra de lote, siempre visible, con
`re-btn--danger-soft`, el único rose fijo de la pantalla. Grupo, rastreadores incluidos: la cabecera, revelado,
con la variante nueva `re-btn--danger-outline` (neutra hasta el hover) a 24 px. Una cookie: la papelera
revelada. Ningún «Limpiar» lleva icono y todos dicen la cifra de lo que se borrará. «Proteger» es neutro: el
emerald es un estado («Lista blanca»), no una acción. En oscuro, los botones destructivos suaves y los tonos
`--danger`/`--success` de `re-badge` y `re-pill` usan relleno de tarjeta opaco con el color en el texto y el
icono (y en el borde, los botones). `re-pill` pasa a 22 px de alto.
**Consecuencias.** MINOR (2.1.0): una variante nueva, ninguna eliminada. Sustituye a D14 en lo de `flame`:
los rastreadores ya no tienen un «Limpiar» propio. `re-btn--danger-ghost` queda para el pie del editor.
Cuesta descubrimiento: limpiar un grupo pide pasar el ratón o el foco, como las acciones de fila.

## D17 · Un cambio que toca una marca se registra y trae alternativas (2.2.0)

**Contexto.** Subir el texto 1 px, bajar el popup a 580 y aligerar la tarjeta salieron de un producto
(ReSession) pero cambian también lo que ReRoute verá al migrar. Sin un registro, el efecto se descubre
al migrar y sin una salida a mano.
**Decisión.** Todo cambio de la librería que afecte al branding de un producto (color, tipografía,
densidad, ventana, componentes firma) se anota en el `docs/products/<x>.md` de cada producto afectado con
qué se nota y al menos una solución o alternativa, y el `CHANGELOG.md` nombra los productos. Es la regla R14.
**Consecuencias.** MINOR (2.2.0): una regla nueva, ninguna eliminada. Publicar cuesta un párrafo por
producto afectado; a cambio, nadie migra a ciegas.

## D18 · Cabeceras fijas opcionales en el árbol (2.3.0)

**Contexto.** En listas largas, al hacer scroll por las filas de un grupo la cabecera salía de la vista y se
perdía a qué dominio pertenecían. Se probó también dibujar la jerarquía con guías verticales y conectores en
L (`re-tree--guides`); en ReSession se descartó: cansaba la vista y añadía líneas que competían con las filas.
**Decisión.** `re-tree--sticky` es opcional y por árbol: la cabecera del grupo abierto queda fija y las
anidadas se apilan bajo la de su padre. La jerarquía sigue leyéndose por la sangría y el icono, sin guías.
**Consecuencias.** MINOR (2.3.0): una clase nueva, ninguna eliminada; sin la clase nada cambia. Cuesta
espacio vertical mientras hay varias cabeceras apiladas (32px + 28px por nivel anidado).

## D19 · El sitio primero: resumen, árbol plano, fila densa, hoja (2.3.0)

**Contexto.** ReSession rehízo su layout en cuatro tandas de exploración (`ReSession/docs/design-explorations/`).
La garantía en una status bar fija nadie la leía y quitaba 32px a la lista; el árbol sitio → dominio → cookie
obligaba a plegar y desplegar; las filas de dos líneas dejaban ver pocas cookies; el editor centrado no
cabía sin scroll; y «Limpiar» y «Vaciar» hacían lo mismo con dos verbos.
**Decisión.** Piezas nuevas y opcionales: `re-summary` (con su modo selección, que hace de barra de lote),
`re-tabs--header`, `re-tree--flat`, `re-tree__row--dense` con `re-flags` y el tooltip `re-tip`,
`re-nav-list` con `re-meter` y `re-breadcrumb`, y la hoja `re-dialog--sheet` con `re-toggle-pill`,
`re-props`, `re-check-chip` y `re-disclosure`. La garantía puede vivir en el resumen en lugar de en la status
bar (patterns/guarantee.md). El verbo de borrar en lote es solo «Limpiar»; «Vaciar» se retira.
**Consecuencias.** MINOR (2.3.0): ninguna clase se renombra ni se elimina. Dos cambios se notan sin tocar
nada: el toast baja a 14px del borde cuando no hay status bar, y el placeholder de un campo mono sale en
sans. Un producto que diga «Vaciar» lo cambia por «Limpiar» al migrar.


## D20 · Tono de ReTame (abierta)

**Contexto.** ReTame entra en la suite. Con los roles (rose 25, amber 75, emerald 155) y las marcas (ReTabs
190, ReRoute 225, ReLink 280, ReBooks 300) solo quedan dos huecos a ≥ 30° de todo: **105–125** (oliva) y
**330–355** (ciruela / rosa). El mock de partida es monocromo y no sugiere tono.
**Decisión (provisional).** 340 con el pastel Pink de Catppuccin Frappé (`#f4b8e4`), como las demás marcas.
El primario (`oklch(0.53 0.12 340)`, `#984d81`) da 5.6:1 con texto blanco.
**Alternativas.**
- **115 · oliva** (`#6a7300`, 5.2:1): deja libre el hueco de D9, pero no tiene pastel en Frappé (habría que
  definirlo) y en claro tira a caqui.
- **Casi neutra** (`--re-brand-c-scale` bajo, como el mock): fiel al mock, pero el primario se confunde con un
  botón secundario y rompe R13 (la marca señala la acción principal).
**Consecuencias.** Si se queda 340, la opción «ReBooks a 330» de D9 desaparece y D9 se resuelve con ReLink a
260. Se decide en la galería, en claro y en oscuro, antes de publicar la marca.


## D21 · La estructura es del producto (2.5.0)

**Contexto.** En la primera exploración de la interfaz de ReTame, las variantes salieron casi iguales a
ReSession aunque nadie miró ReSession. Entró por esta librería: el patrón de la garantía obligaba a un lugar
fijo y siempre visible, R7 prohibía las acciones de fila fijas, la ficha de ReTame proponía qué componente
usar en cada vista, y los ejemplos de `ReTree` y `ReSummary` son pantallas de ReSession. Copiar «la
estructura» de un componente se leía como copiar la disposición de su ejemplo.
**Decisión.** R15: ReDesign decide el aspecto y los componentes, no la estructura de un producto. La
estructura se explora con bocetos neutros y ReDesign entra cuando está elegida. R7 pasa a ser un valor por
defecto con excepción declarada (una acción de fila fija si es la tarea principal de la fila). La garantía
pide un solo lugar, pero no dicta cuál. La ficha de ReTame deja de proponer componentes por vista.
**Consecuencias.** MINOR (2.5.0): ninguna clase, token ni regla se renombra ni se elimina, y ningún producto
publicado cambia. ReSession sigue cumpliendo R7 tal como está. ReTame declara sus componentes firma después
de elegir su estructura.
