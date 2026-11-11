# ReSession

| | |
|---|---|
| Qué es | Inspector y limpiador de cookies y storage con protección por cookie, listas blanca/negra y limpieza automática |
| Marca | `brands/resession.css` · 75 ámbar · oscuro `#e5c890` · definitiva (D14) |
| Ventana | 540×580 + panel lateral |
| Stack | Angular 20 (subir a 21 como ReRoute) · Tailwind v4 · `@ng-icons/lucide` · Transloco (propuesto: ver `ReSession/docs/architecture.md`) |
| Estado frente a ReDesign | En 2.8.0. La interfaz está hecha con datos de prueba (su fase 1); la fase 2 la conecta a Chrome. La navegación la decidió el producto (R15) |
| Layout | Lo decide ReSession (`docs/visual.md`). Piezas que usa: header con Auto y lo limpiado, franja compacta, árbol plano con nivel padre y filas densas, editor en hoja, status bar con el estado de Auto |

## Garantía

> **Lo protegido nunca se limpia**: cookies con candado y sitios en lista blanca.

Vive en el **resumen** de cada vista: «n protegidas» (verde, con escudo) junto a «Limpiar (n)», cuya cifra
ya lo descuenta. La status bar no la repite: solo dice si Auto está activo. Se explica entera en la sección *Qué protege ReSession* de la ayuda
([patterns/guarantee.md](../patterns/guarantee.md)). Los botones dicen solo «Limpiar». La única excepción es borrar a mano una cookie protegida concreta,
con confirmación. Si un sitio está en las dos listas, gana la blanca.

## Componentes firma

- **Fila de cookie** (`re-tree__row--dense`, una línea), idéntica en «Esta pestaña» y en «Global»:
  checkbox · candado (`lock` marca = con candado, `lock-open` `slate-400` = sin candado) · clave
  (`re-tree__key--strong` si tiene candado) · valor · banderas `re-flag` H y S con tooltip `re-tip` (la
  palabra completa y qué significa) · caducidad en `re-tree__time` («2 h»; «Sesión» si no caduca; la frase
  completa, en el `title`), `--warning` si ya pasó o falta menos de 1 h (D15). Editar y eliminar flotan
  sobre la caducidad al pasar el ratón. En una cookie de rastreador, el valor deja paso al dominio y la
  `re-pill--sm` con su empresa ocupa el sitio de las banderas.
- **Lista blanca en el árbol**: se marca en la **cabecera del grupo** con `re-pill--success`
  «Lista blanca» (`shield-check`), que sustituye a su «Limpiar». Las filas no cambian: el candado sigue
  siendo de la cookie y se puede poner o quitar; al quitarlo, el toast recuerda que sigue protegida.
- **Fila de storage** (`re-tree__row--dense`): clave · valor (`re-tree__value--strong`) · formato
  (`re-badge` neutro, `JWT`, `JSON`) · tamaño, o la caducidad de un JWT con reloj y texto, en
  `re-tree__time`. Editar y eliminar flotan al pasar el ratón; el valor se copia en su hoja. Sin candado: limpiar un área
  no confirma y el toast permite deshacer durante 5 s.
- **Editor de una clave** en hoja, con las partes del de cookie: «Original | JWT» en `re-segmented--sm`. «JWT»
  está siempre y va `disabled`, con su motivo en el `title`, si el valor no lo es. Lo decodificado es de solo
  lectura (`re-textarea[readonly]`); un JSON se edita como texto.
- **Grupo de rastreadores**: un grupo más, porque siempre son cookies. Icono (`shield-alert`), conteo y
  filas neutros, con el hover de siempre, y su «Limpiar» se revela como el de cualquier grupo (D16).
- **Acciones de limpiar**: un solo «Limpiar» fijo por pantalla (D16). El peso lo da el alcance:

  | Alcance | Dónde | Cuándo se ve | Clase |
  |---|---|---|---|
  | Vista o selección | Resumen (o su modo selección) | Siempre | `re-btn--sm re-btn--danger-soft` |
  | Grupo (rastreadores incluidos) | Cabecera | Al pasar el ratón o con foco | `re-btn--xs re-btn--danger-outline` |
  | Una cookie | Fila | Al pasar el ratón o con foco | `re-icon-btn--danger` (`trash-2`) |

  Ningún «Limpiar» lleva icono. Todos dicen la cifra de lo que se borrará, sin contar lo protegido
  («Limpiar (7)»); en el modo selección cambia con la selección. Un área de storage se limpia con la misma
  tabla: el verbo es siempre «Limpiar» (D19).
- **Modo selección** (`re-summary--selection`, sustituye al resumen): checkbox maestro, «n seleccionadas»,
  «Seleccionar las n», «Proteger» neutro (`re-btn--secondary` con `lock`: el emerald es un estado, «Lista
  blanca», no una acción), «Limpiar (n)» y ✕. Sin contraer/expandir todo.
- **Todo el navegador**: el mismo árbol plano, con cada sitio como `re-tree__group--parent` (globo,
  «Esta pestaña», cifras y su «Limpiar») y sus dominios debajo, un paso adentro; los rastreadores, al final.
- **Iconos de sección** (`re-tree__icon`, gris, 12px): globo en un sitio y en el dominio raíz de «Este
  sitio»; carpeta en el resto de secciones de cookies (también el dominio raíz dentro de un sitio); escudo
  (`shield-alert`) en los rastreadores; base de datos en un área de storage. El dominio raíz va primero, luego
  sus subdominios y al final los rastreadores.
- **Status bar** (`re-statusbar`): el estado de Auto con `re-dot` (`--live` si está activo, gris si no) y
  «Auto · cada 15 min». Sin la garantía ni lo limpiado, que ya están en el resumen y el header.
- **Header**: el logo, lo limpiado hoy (`re-btn--sm re-btn--ghost` con `aria-expanded`, que abre
  `re-figures` en un `re-menu`), Auto (`re-icon-btn` con `re-dot--live` si está activo) y ajustes.
- **Tarjeta de limpieza automática** (`re-card` con switch, intervalo y tareas), con el último ciclo en
  `re-card__subtitle`.
- **Editor de cookie** en hoja ([patterns/editor-dialog.md](../patterns/editor-dialog.md#variante-hoja)):
  nombre como título, «Lista blanca» y el candado como `re-toggle-pill` en el header; el valor con su
  formato (JWT, JSON) y el contador `n / 4096 B`; caducidad (menú con la fecha de cada opción, tope de 400
  días), SameSite y acceso en `re-props`; «Nombre y ámbito» en `re-disclosure`, plegado al editar y arriba y
  abierto en una cookie nueva. Secure forzado por `SameSite=None` y por los prefijos `__Secure-` / `__Host-`.

- **Árbol con cabeceras fijas** (`re-tree--sticky`, 2.3.0): ReSession lo activa en todos sus árboles
  (cookies de pestaña, Global y storage). Se nota: la cabecera del grupo abierto queda arriba al hacer
  scroll y las anidadas se apilan debajo, restando 32px (+28px por nivel) a la zona de filas. Alternativa si
  falta altura: quitar la clase en los árboles de storage, que no anidan.

- **Árbol plano y fila densa** (`re-tree--flat`, `re-tree__row--dense`, 2.3.0, D19). Se nota: caben unas
  12 cookies donde antes cabían 8, y la jerarquía sitio → dominio deja de verse como sangría (los dominios
  son separadores fijos). Alternativa si se echa de menos la segunda línea: `re-tree__row--2line` sigue
  existiendo y puede volver en storage, donde el valor importa más que la clave.
- **Sin status bar** (2.3.0; **vuelve en 2.6.1** solo con el estado de Auto, ver arriba). Se nota: la garantía ya no está en todas las pantallas, solo donde se limpia
  (el resumen) y en la ayuda; Auto no la repite. Alternativa: volver a pintar `re-statusbar` (el toast sube
  solo a su sitio).
- **Pestañas en el header** (`re-tabs--header`, 2.3.0; **retiradas en 2.6.0**, ver abajo). Se nota: las vistas ya no son un segmented y «Añadir»
  sale del header (pasa a ser el `+` de «Esta pestaña»). Alternativa: el segmented sigue siendo válido en
  `re-header` si las pestañas no caben (con cuatro vistas o un nombre largo).
- **«Limpiar» también en storage** (2.3.0). Se nota: el botón de un área dice «Limpiar» en lugar de
  «Vaciar». Alternativa: ninguna dentro de la suite; si hiciera falta distinguirlo, lo dice la confirmación.

- **Navegación de 2.6.0** (`re-summary--compact`, `re-tree__group--parent`, `re-figures`, `re-dot` en
  `re-icon-btn`, `re-segmented__item:disabled`, `re-btn--ghost[aria-expanded]`). No toca la marca: todo va
  en neutros y roles. Se nota: la lista empieza arriba bajo una franja de 36px (antes, un resumen de 64px)
  y, sin `re-tabs--header`, **a 320px vuelve el título «ReSession»** en el header (regla de 2.5.1).
  Alternativas: `re-summary` normal si se quiere el nombre del sitio como título (28px más); para ocultar
  el título en estrecho, `max-[399px]:hidden` en el producto.
- **Sangría en el árbol plano** (2.6.1, P-63). Se nota: las filas entran un paso respecto a su cabecera y,
  bajo un sitio, sus dominios entran otro; con todo abierto se ve dónde acaba un sitio. Las filas pierden
  16px de ancho (32px bajo un sitio), que salen del valor. Alternativa: sobrescribir `--re-tree-indent` en
  el producto para un paso más corto.
- **Tema claro Latte** (2.7.0, D23; su D48). Lo eligió ReSession entre cinco rondas probadas en su popup.
  Se nota: en claro, grises lavanda, cabeceras del árbol sobre la tarjeta y acentos más tranquilos; las
  secciones de «Este sitio» miden 36px con el título en `text-xs`, como los sitios de «Navegador», y en claro
  van sobre la tarjeta con su divisor. Alternativa: sobrescribir los tokens del claro en el producto para
  volver al anterior.
- **Placeholder de `re-textarea`** (2.7.2). El «Valor» de ejemplo en el campo vacío de una cookie o de una
  clave pasa de mono a sans, como el placeholder de la búsqueda; el valor escrito sigue en mono.
  Alternativa: `.re-textarea::placeholder { font-family: var(--re-font-mono); }` en el producto para
  volver al anterior.
- **Calma** (2.8.0, D24; tanda 8 de ReSession, `2026-11-familiar`). Junto a otras extensiones, ReSession
  se sentía ajena. Lo eligió el autor tras probar la variante en la extensión real. `brands/resession.css`
  declara la calma (`color.md` §5): `--re-tree-font` sans, `--re-control-border` y `--re-soft-border`
  transparentes, `--re-control-fill` `slate-100` (`slate-200` en hover), `--re-success-text` `slate-600` con
  `--re-success-fill` `slate-100`, y `--re-danger-soft-fill` `rose-50` (`rose-100` en hover). Se nota: los
  nombres de cookies y dominios en sans (los valores siguen en mono); búsqueda, segmented, `+` y píldoras
  separados por relleno, sin borde; «n protegidas» y «Lista blanca» en gris con el escudo verde; «Limpiar»
  como tinte rojo sin borde. Alternativa: quitar del archivo de marca la variable que no convenza; cada una
  vuelve sola al valor de siempre.
- **Ya sin uso en ReSession** (se mantienen en la librería): `re-tabs--header`, `re-nav-list`, `re-meter`,
  `re-breadcrumb`.

## Excepciones declaradas

- **Iconos del árbol sin SVG** (su D64, noviembre de 2026; desde 2.8.2). Las filas y cabeceras del árbol
  (`cookie-item`, `cookie-container`, `site-group`) no usan `<ng-icon>`, como pide `iconography.md`, sino su
  directiva `TreeIcon`: el mismo SVG de `@ng-icons/lucide` como máscara CSS sobre el color del texto
  (`mask-image` con el SVG en una URL `data:` y `background-color: currentColor`). Es un elemento por icono
  y una regla compartida por icono. Motivo: con todo abierto y unas 2600 cookies eran casi 8000 SVG en
  línea, y el popup se congelaba. Se ve igual (comparado píxel a píxel, en claro y en oscuro) y cumple R6,
  porque sigue siendo Lucide. El resto del producto usa `<ng-icon>`. Si otro producto llega a listas de
  cientos de filas, la técnica pasa a `iconography.md` o a una clase `re-icon` de la librería.

## Propuestas

- Generalizar la «fila con candado» si ReTabs o ReLink necesitan fijar elementos.
- **La identidad de ReSession** (su D46, noviembre de 2026; pendiente de decidir). Tras varias rondas en
  su popup, el producto era limpio pero no se reconocía: el ámbar solo estaba en el logo, y ocho piezas
  con el mismo borde competían por la vista. Eligió cuatro ajustes, que su maqueta tenía en
  `src/app/mockup/identity.css` (en el historial de ReSession hasta `771e4a6`). La maqueta se retiró al
  terminar su fase 1, y la app no los tiene: esperan aquí. Todos usan tokens `--re-*`, así que claro y
  oscuro siguen solos.
  1. **El `+` de la franja con la marca en el símbolo y el borde** (`re-icon-btn--outline` dentro de
     `re-summary`: borde `brand-200`, icono `brand-600`, relleno neutro también en hover). **Choca con
     R13**: la marca va solo en la acción principal, y el `+` no lo es (lo es «Limpiar», en `rose`).
     Alternativas: (a) una variante `re-icon-btn--brand-outline` y una excepción declarada en esta ficha
     («el alta lleva la marca en línea, nunca en bloque»); (b) el `+` neutro en reposo y con la marca solo
     en hover y foco, que R13 ya permite; (c) dejarlo neutro, como hoy.
  2. **Segmented más ligero**: el borde del contenedor, `slate-200` al 40 %; la opción activa sigue
     elevándose. Cambiarlo en `re-segmented` afecta a todos los productos (R14). Alternativas: una variante
     `re-segmented--quiet`, solo para quien la pida; o el valor global, anotado en cada ficha.
  3. ~~**Búsqueda sin borde**~~: resuelta en 2.8.0 por la calma (D24), con relleno `slate-100` en lugar de
     `bg-card`; con foco, el borde de siempre.
  4. ~~**«Lista blanca» sin borde en el árbol**~~: resuelta en 2.8.0 por la calma (D24), en todas las
     píldoras y con el texto neutro; el escudo sigue verde.
  - El 2 (segmented) queda cubierto en parte: la calma le quita el borde y le pone el relleno de los
    controles. El 1 (`+` con la marca) sigue abierto.
