# Acciones destructivas

| Situación | Qué hacer |
|---|---|
| Borrar **un** elemento normal, reversible | Borrar al instante + toast con **Deshacer** |
| Borrar **en lote** (un grupo, una selección, un sitio) | Borrar al instante + toast con cifras y **Deshacer**, si se puede restaurar. Si no se puede (cookies `HttpOnly` de terceros, storage de otra pestaña), **confirmación** con la cifra exacta |
| Borrar algo que el producto **protege** (cookie con candado) a mano | **Confirmación** que lo diga: «Está protegida» |
| Limpiar un contenedor entero sin protección (un `sessionStorage`) | Confirmación |
| Ajustes o perfiles completos | Confirmación |

## Reglas

- Primero se calcula qué se va a borrar (excluyendo lo protegido) y luego se pregunta o se actúa. La
  cifra del toast o de la confirmación es la real.
- La confirmación nombra el objeto y la consecuencia («¿Limpiar github.com? Se eliminarán 7 cookies»);
  el botón repite el verbo («Limpiar»), nunca «Aceptar» o «Sí».
- Botón de confirmar: `re-btn--danger`. Cancelar recibe el foco.
- «Deshacer» guarda una instantánea de lo borrado mientras dura el toast.
