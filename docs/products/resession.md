# ReSession

| | |
|---|---|
| Qué es | Inspector y limpiador de cookies y storage con protección por cookie, listas blanca/negra y limpieza automática |
| Marca | `brands/resession.css` · 75 ámbar · oscuro `#e5c890` · definitiva (D14) |
| Ventana | 540×600 + panel lateral |
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
  («HttpOnly», «Secure») y caducidad en `re-hint` («Caduca dentro de 2 h»; «Sesión» si no caduca) ·
  en la segunda, el valor (`re-tree__value`) · acciones reveladas (editar, eliminar). La caducidad
  pasa a `re-hint--warning` si ya pasó o falta menos de 1 h (D15). En una cookie de rastreador, la
  `re-pill` con su nombre ocupa el final de la fila y la segunda línea muestra el dominio.
- **Lista blanca en el árbol**: se marca en la **cabecera del grupo** con `re-pill--success`
  «Lista blanca» (`shield-check`), que sustituye a su «Limpiar». Las filas no cambian: el candado sigue
  siendo de la cookie y se puede poner o quitar; al quitarlo, el toast recuerda que sigue protegida.
- **Fila de storage** (`re-tree__row--2line`): clave (`re-tree__key--strong`) + formato (`re-badge` neutro,
  `{JWT}`, `{JSON}`) + valor (`re-tree__value--strong`). El tamaño y la caducidad son `re-hint`; la
  caducidad pasa a `re-hint--warning` solo cuando importa. Sin
  candado: «Vaciar» un área siempre se confirma.
- **Grupo de rastreadores**: icono (`shield-alert`), conteo y filas neutros, con el hover de siempre. Lo que lo distingue es su
  «Limpiar»: es el único grupo con la acción siempre visible (`re-btn--2xs re-btn--danger-soft`, con
  `flame` en lugar de `eraser`, «Limpiar (n)»); en el resto, «Limpiar» se
  revela al pasar el ratón.
- **Barra de lote**: «Proteger» y «Limpiar», con la cifra si hay selección, y contraer/expandir todo.
  En Global, «Proteger» exige selección y «Limpiar todo» se confirma con las cifras reales.
- **Tarjeta de limpieza automática** (`re-card` con switch, intervalo y tareas).
- **Editor de cookie** ([patterns/editor-dialog.md](../patterns/editor-dialog.md)). Específico de
  ReSession: detección de formato del valor (JWT, JSON, URL), contador `n / 4096 B`, atajos de caducidad
  con tope de 400 días (límite de Chrome), Secure forzado por `SameSite=None` y por los prefijos
  `__Secure-` / `__Host-`, y aviso de lista blanca de solo lectura bajo el switch de candado.

## Excepciones declaradas

Ninguna.

## Propuestas

- Generalizar la «fila con candado» si ReTabs o ReLink necesitan fijar elementos.
