# ReTame

| | |
|---|---|
| Qué es | Ciclo de vida de las pestañas inactivas: las duerme en un grupo colapsado de la barra y, si siguen sin usarse, las guarda en un baúl ordenado por hilos |
| Marca | `brands/retame.css` · 340 ciruela · oscuro `#f4b8e4` · provisional (D20) |
| Ventana | 540×580 (R9). El mock de partida mide 420×600: es referencia de contenido, no de tamaño |
| Stack | Angular 20 · WXT · Tailwind v4 · `@ng-icons/lucide` · Transloco (plantilla `re-template`) |
| Estado frente a ReDesign | Recién dado de alta: requisitos en descubrimiento, sin interfaz todavía |

## Garantía (propuesta)

> **Ninguna pestaña se pierde**: solo se cierra después de quedar guardada en el baúl.

Dónde se dice está por decidir en `ReTame/docs/ux.md` ([patterns/guarantee.md](../patterns/guarantee.md)).

## Componentes firma (propuestos, sin construir)

- **Grupo de pausa**: el reflejo en el popup del grupo nativo «Dormidas (n)», con sus pestañas y
  «Despertar». Candidatos: `re-summary` para la cabecera y `re-tree--flat` con `re-tree__row--dense` para
  las filas.
- **Hilo del baúl**: cabecera con la etiqueta del hilo (lo buscado o el título de la página raíz) y su
  origen, y las pestañas debajo con «Restaurar». Candidato: `re-tree` con un grupo por hilo.
- **Ahorro del día**: pestañas pausadas y guardadas en el baúl hoy, contadas, no estimadas (Chrome no da
  a una extensión la memoria de cada pestaña; decisión P-06 de ReTame). Va en el Baúl. Candidato:
  `re-summary__stats`.

## Excepciones declaradas

Ninguna.

## Pendiente

- El tono (D20).
- El mock inicial (`ReTame/docs/inbox/ReTame.html`) es monocromo y usa `zinc` y hex: no sigue ReDesign.
  Sirve para el contenido y la estructura de las tres vistas, no para el aspecto.
