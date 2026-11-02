# ReTame

| | |
|---|---|
| Qué es | Ciclo de vida de las pestañas inactivas: las duerme en un grupo colapsado de la barra y, si siguen sin usarse, las guarda en un baúl ordenado por hilos |
| Marca | `brands/retame.css` · 340 ciruela · oscuro `#f4b8e4` · provisional (D20) |
| Ventana | 540×580 (R9). El mock de partida mide 420×600: es referencia de contenido, no de tamaño |
| Stack | Angular 20 · WXT · Tailwind v4 · `@ng-icons/lucide` · Transloco (plantilla `ReTemplate`) |
| Estado frente a ReDesign | Recién dado de alta: requisitos en descubrimiento, sin interfaz todavía |

## Garantía (propuesta)

> **Ninguna pestaña se pierde**: solo se cierra después de quedar guardada en el baúl.

Dónde se dice, y si está siempre a la vista, lo decide la estructura de ReTame (`ReTame/docs/ux.md`,
R15). [patterns/guarantee.md](../patterns/guarantee.md) solo pide que se diga en un único lugar.

## Componentes firma

Ninguno todavía. La estructura del popup (qué vistas hay, dónde viven las acciones, cómo se navega) se
decide en `ReTame/docs/ux.md` con bocetos neutros, sin componentes de ReDesign (R15). Los componentes
firma se declaran aquí cuando esa estructura esté elegida.

## Excepciones declaradas

Ninguna.

## Pendiente

- El tono (D20).
- El mock inicial (`ReTame/docs/inbox/mock.html`) es monocromo y usa `zinc` y hex: no sigue ReDesign.
  Es una referencia de contenido, no de estructura ni de aspecto. La estructura se decide en
  `ReTame/docs/ux.md`, y el mock entra en esa exploración como una opción más (R15).

## Tema claro Latte (2.7.0)

Al subir a 2.7.0 (D23), el claro cambia: lienzo y tarjeta lavanda (`#e4e7ee`, `#f5f6f9`), texto más suave
(`#4c4f69`, 7,4:1 sobre la tarjeta), cabeceras de árbol sobre la tarjeta y colores de marca y categoría
400–800 con menos croma. El botón primario y el oscuro no cambian. Lo verá al subir desde 2.5.0. Alternativa: sobrescribir en el
producto `--re-slate-*`, `--re-background`, `--re-card` y `--re-c-400…800` para quedarse con el claro
anterior. Sin probar aún en ReTame.
