# Diálogo editor

Estructura de un formulario de edición dentro del popup (ReRoute: editor de reglas; ReSession: editor
de cookies). El contenedor es [ReDialog](../components/ReDialog.md).

## Orden del contenido

1. **Identidad**: lo que identifica al elemento (nombre, título, patrón). Arriba y con foco inicial.
2. **Contenido**: el valor principal, con su modo de vista si tiene varios (`re-segmented`: Raw ·
   Decodificado).
3. **Ámbito**: dónde aplica (dominio, ruta, método), en rejilla de dos columnas si caben.
4. **Comportamiento**: duración, condiciones, secciones (`re-tabs` si hay más de tres bloques).
5. **Opciones avanzadas o técnicas**: en un `re-fieldset` con `re-section-title`.
6. **Estado de producto**: protección, activación. Un `re-option` con switch, al final.

## Variante hoja

Cuando el formulario no cabe en un diálogo centrado, el editor es una **hoja** (`re-dialog--sheet`,
[ReDialog](../components/ReDialog.md#hoja)) y el orden cambia para enseñar primero lo que se edita:

1. **Header**: ✕, el nombre del elemento como título (mono) y su estado de producto a la derecha, como
   píldoras (`re-toggle-pill` para lo que se cambia, `re-pill` para lo que solo se informa).
2. **Contenido**: el valor principal, con su modo de vista.
3. **Propiedades**: `re-props`, una por fila. Las opciones con fecha usan un `re-dropdown` con la fecha
   resultante en `re-dropdown__hint`, en lugar de atajos sueltos.
4. **Identidad y ámbito**, plegados al final (`re-disclosure`) si cambiarlos crea otro elemento. En un
   elemento **nuevo** van arriba y abiertos, con el foco: es lo primero que hay que escribir.

El pie es el mismo; en un elemento nuevo la primaria dice «Crear».

## Reglas

- Labels encima (`re-label`), hints debajo (`re-hint`), errores en `re-error` debajo del campo y
  `aria-invalid` en el input.
- Validación al salir del campo y al guardar; nunca mientras se escribe la primera vez.
- Si cambiar un campo crea un elemento nuevo en vez de modificar el actual (p. ej. nombre, dominio o
  ruta de una cookie), se dice con un `re-hint--warning` bajo ese campo cuando cambia.
- Los modos excluyentes (Sesión · Fecha fija) son `re-segmented--block`, no radios.
- Fechas: `input type="datetime-local"` dentro de `re-input-group` + atajos (`re-btn--xs`) para los
  valores habituales. No se construye un calendario propio.
- Footer: [destructivo] … [Cancelar] [Guardar]. Guardar es `submit` y se desactiva mientras el
  formulario sea inválido.
- Elemento nuevo y edición comparten diálogo: cambia el título («Nueva cookie» / «Editar cookie») y
  en el nuevo no hay botón de eliminar.
