# Contenido

## Voz

Directa y técnica, sin jerga innecesaria. Segunda persona («tus sitios»), frases cortas, sin signos de
exclamación ni emojis en la interfaz.

## Botones y acciones

- **Verbo en infinitivo, una o dos palabras**: «Guardar», «Limpiar», «Añadir sitio».
- **Un verbo por acción en toda la suite**:
  - *Eliminar*: quitar **un** elemento concreto que el usuario señala.
  - *Limpiar*: borrar en lote todo lo que se puede borrar, respetando las garantías del producto. También
    un contenedor entero que no tiene protección (un `sessionStorage`): la diferencia, que se confirma, la
    dice el diálogo, no el verbo. «Vaciar» se retiró en 2.3.0 (D19).
  - No se usan sinónimos («Purgar», «Borrar», «Quitar», «Vaciar») para lo mismo.
- **Conteos entre paréntesis** cuando cambian lo que hace el botón: «Eliminar (3)», «Proteger (2)».
- **No se repiten garantías en los botones** («Limpiar libres», «Limpiar (excepto protegidas)»). La
  garantía se dice una vez, en su lugar fijo: [patterns/guarantee.md](../patterns/guarantee.md).

## Mensajes

| Tipo | Forma | Ejemplo |
|---|---|---|
| Toast de resultado | Participio + cantidad (+ lo que se conservó) | «7 cookies eliminadas · 3 protegidas se conservan» |
| Confirmación | Pregunta concreta + consecuencia | «¿Limpiar github.com? Se eliminarán 7 cookies.» |
| Vacío | Qué falta + cómo empezar | «No hay cookies en esta pestaña.» |
| Error | Qué pasó + qué hacer | «No se pudo guardar: el dominio no es válido.» |

## i18n

- Ningún texto fijo en plantillas ni componentes: todo son claves de traducción (Transloco en Angular).
- Los `title` y `aria-label` también se traducen.
- Español e inglés desde el primer día. Los textos de la interfaz se escriben primero en español.
