# ReSession

| | |
|---|---|
| Qué es | Inspector y limpiador de cookies y storage con protección por cookie, listas blanca/negra y limpieza automática |
| Marca | `brands/resession.css` · 75 ámbar · oscuro `#e5c890` · definitiva (D14) |
| Ventana | 540×580 + panel lateral |
| Stack | Angular 20 (subir a 21 como ReRoute) · Tailwind v4 · `@ng-icons/lucide` · Transloco (propuesto: ver `ReSession/docs/architecture.md`) |
| Estado frente a ReDesign | Wireframe (`index.html`); el código aún es el placeholder de Angular |

## Garantía

> **Lo protegido nunca se limpia**: cookies con candado y sitios en lista blanca.

Vive en la status bar, con un enlace «Detalles» a la sección *Qué protege ReSession* de la ayuda,
que es el único sitio donde se explica entera ([patterns/guarantee.md](../patterns/guarantee.md)).
Los botones dicen solo «Limpiar». La única excepción es borrar a mano una cookie protegida concreta,
con confirmación. Si un sitio está en las dos listas, gana la blanca.

## Componentes firma

- **Fila de cookie** (`re-tree__row--2line`), idéntica en «Esta pestaña» y en «Global»: checkbox ·
  candado (`lock` marca = con candado, `lock-open` `slate-400` = sin candado) · en la primera línea,
  clave (`re-tree__key--strong` si tiene candado), banderas `re-badge` con la palabra completa
  («HttpOnly», «Secure») y caducidad en `re-hint` (icono `clock` + el tiempo que falta, «2 h»; «Sesión» si
  no caduca; la frase completa, «Caduca dentro de 2 h», va en el tooltip) ·
  en la segunda, el valor (`re-tree__value`) · acciones reveladas (editar, eliminar). La caducidad
  pasa a `re-hint--warning` si ya pasó o falta menos de 1 h (D15). En una cookie de rastreador, la
  `re-pill` con su nombre ocupa el final de la fila y la segunda línea muestra el dominio.
- **Lista blanca en el árbol**: se marca en la **cabecera del grupo** con `re-pill--success`
  «Lista blanca» (`shield-check`), que sustituye a su «Limpiar». Las filas no cambian: el candado sigue
  siendo de la cookie y se puede poner o quitar; al quitarlo, el toast recuerda que sigue protegida.
- **Fila de storage** (`re-tree__row--2line`): clave (`re-tree__key--strong`) + formato (`re-badge` neutro,
  `{JWT}`, `{JSON}`) + valor (`re-tree__value--strong`). El tamaño y la caducidad son `re-hint`; la
  caducidad es `clock` + el tiempo que falta («2 h») y pasa a `re-hint--warning` solo cuando importa. Sin
  candado: «Vaciar» un área siempre se confirma.
- **Grupo de rastreadores**: un grupo más, porque siempre son cookies. Icono (`shield-alert`), conteo y
  filas neutros, con el hover de siempre, y su «Limpiar» se revela como el de cualquier grupo (D16).
- **Acciones de limpiar**: un solo «Limpiar» fijo por pantalla (D16). El peso lo da el alcance:

  | Alcance | Dónde | Cuándo se ve | Clase |
  |---|---|---|---|
  | Vista o selección | Barra de lote | Siempre | `re-btn--xs re-btn--danger-soft` |
  | Grupo (rastreadores incluidos) | Cabecera | Al pasar el ratón o con foco | `re-btn--xs re-btn--danger-outline` |
  | Una cookie | Fila | Al pasar el ratón o con foco | `re-icon-btn--danger` (`trash-2`) |

  Ningún «Limpiar» lleva icono. Todos dicen la cifra de lo que se borrará, sin contar lo protegido
  («Limpiar (7)»); en la barra cambia con la selección. «Vaciar» un área de storage sigue la misma tabla.
- **Barra de lote**: «Proteger» neutro (`re-btn--secondary` con `lock`: el emerald es un estado, «Lista
  blanca», no una acción), «Limpiar (n)» y contraer/expandir todo. En Global, «Proteger» exige selección
  y «Limpiar todo (n)» se confirma con las cifras reales.
- **Tarjeta de limpieza automática** (`re-card` con switch, intervalo y tareas).
- **Editor de cookie** ([patterns/editor-dialog.md](../patterns/editor-dialog.md)). Específico de
  ReSession: detección de formato del valor (JWT, JSON, URL), contador `n / 4096 B`, atajos de caducidad
  con tope de 400 días (límite de Chrome), Secure forzado por `SameSite=None` y por los prefijos
  `__Secure-` / `__Host-`, y aviso de lista blanca de solo lectura bajo el switch de candado.

## Excepciones declaradas

Ninguna.

## Propuestas

- Generalizar la «fila con candado» si ReTabs o ReLink necesitan fijar elementos.
