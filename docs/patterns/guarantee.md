# Garantías del producto: decir una vez lo que nunca pasa

Algunos productos prometen algo que no se rompe nunca. ReSession: *nada protegido se borra en
lote*. Si esa promesa se repite en cada botón («Limpiar libres», «Limpiar (excepto protegidas)»,
«Salvaguarda: …»), pasan dos cosas: los botones se alargan y la promesa pierde fuerza, porque el
usuario empieza a dudar de los botones que **no** la repiten.

## La regla

1. **Un lugar fijo y siempre visible**, de una de dos formas:
   - **Junto a la acción** (recomendado si cada vista tiene un resumen): las cifras del
     [resumen](../components/ReSummary.md) dicen lo protegido («8 protegidas», verde, con escudo) al lado de
     «Limpiar (8)», cuya cifra ya lo descuenta. La garantía se lee donde se decide.
   - **En la status bar** (`re-statusbar__guarantee`), con el icono de escudo, si el producto no tiene
     resumen. Ejemplo:
     > 🛡 **Lo protegido nunca se limpia**: cookies con candado y sitios en lista blanca.
2. **Ampliada en la ayuda**, con la misma redacción y los casos límite. Es el único sitio donde se explica
   entera; la status bar, si la hay, enlaza a esa sección («Detalles»).
3. **Los botones solo dicen el verbo**: «Limpiar», «Limpiar (12)».
4. **El resultado lo confirma con números** en el toast: «7 cookies eliminadas · 3 protegidas se
   conservan». Así se cumple la promesa a la vista, sin repetirla.
5. **La confirmación da la cifra exacta** cuando la pide (ver
   [destructive-actions.md](destructive-actions.md)): «Se eliminarán 7 cookies; 3 protegidas se
   conservan».

## Requisitos para que sea verdad

Una garantía escrita en la interfaz es una regla del **dominio**, no del componente:

- Una única función decide si algo está protegido (en ReSession: `isProtected(cookie, lists)` en
  `engine/`), y **todos** los caminos de borrado en lote pasan por ella: botones, temporizador, lista
  negra, importaciones.
- Hay tests que intentan saltársela por cada camino.
- La única excepción es la que el usuario hace a mano sobre un elemento concreto, y se confirma.
