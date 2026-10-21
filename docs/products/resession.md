# ReSession

| | |
|---|---|
| Qué es | Inspector y limpiador de cookies y storage con protección por cookie, listas blanca/negra y limpieza automática |
| Marca | `brands/resession.css` · 75 ámbar · oscuro `#e5c890` · definitiva (D14) |
| Ventana | 540×580 + panel lateral |
| Stack | Angular 20 (subir a 21 como ReRoute) · Tailwind v4 · `@ng-icons/lucide` · Transloco (propuesto: ver `ReSession/docs/architecture.md`) |
| Estado frente a ReDesign | Maqueta Angular completa con ReDesign 2.3.0; la guía de implementación va por el paso 05 |
| Layout | «El sitio primero» (D19): resumen del sitio, pestañas en el header, árbol plano con filas densas, Global como lista de sitios, editor en hoja |

## Garantía

> **Lo protegido nunca se limpia**: cookies con candado y sitios en lista blanca.

Vive en el **resumen** de cada vista: «n protegidas» (verde, con escudo) junto a «Limpiar (n)», cuya cifra
ya lo descuenta. Sin status bar. Se explica entera en la sección *Qué protege ReSession* de la ayuda
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
  (`re-badge` neutro, `JWT`, `JSON`) · tamaño o caducidad en `re-tree__time`. Sin candado: «Limpiar» un área
  siempre se confirma.
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
- **Global**: lista de sitios (`re-nav-list`) con favicon, «Pestaña actual», dominios y candados, un
  `re-meter--success` con la parte protegida y el total; la última fila, «Rastreadores de terceros». Cada
  sitio abre una página con migas (`re-breadcrumb`), su resumen y su árbol plano.
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
- **Sin status bar** (2.3.0). Se nota: la garantía ya no está en todas las pantallas, solo donde se limpia
  (el resumen) y en la ayuda; Auto no la repite. Alternativa: volver a pintar `re-statusbar` (el toast sube
  solo a su sitio).
- **Pestañas en el header** (`re-tabs--header`, 2.3.0). Se nota: las vistas ya no son un segmented y «Añadir»
  sale del header (pasa a ser el `+` de «Esta pestaña»). Alternativa: el segmented sigue siendo válido en
  `re-header` si las pestañas no caben (con cuatro vistas o un nombre largo).
- **«Limpiar» también en storage** (2.3.0). Se nota: el botón de un área dice «Limpiar» en lugar de
  «Vaciar». Alternativa: ninguna dentro de la suite; si hiciera falta distinguirlo, lo dice la confirmación.

## Excepciones declaradas

Ninguna.

## Propuestas

- Generalizar la «fila con candado» si ReTabs o ReLink necesitan fijar elementos.
