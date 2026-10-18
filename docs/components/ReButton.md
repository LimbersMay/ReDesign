# ReButton

## Variantes

| Clase | Cuándo |
|---|---|
| `re-btn re-btn--primary` | La acción principal de la vista o del diálogo. **Una** por contexto |
| `re-btn re-btn--secondary` | Acciones normales con borde (barras de lote, «Exportar») |
| `re-btn re-btn--ghost` | «Cancelar», acciones terciarias |
| `re-btn re-btn--danger` | Confirmar un diálogo destructivo |
| `re-btn re-btn--danger-soft` | Acción destructiva visible en una barra (limpiar un grupo de rastreadores) |
| `re-btn re-btn--danger-ghost` | «Eliminar» al principio del footer de un editor |
| `re-icon-btn` (+ `--brand` / `--danger`, `--sm`) | Solo icono: acciones de fila, de tarjeta y del header |

## Tamaños

| Modificador | Alto | Dónde | Icono |
|---|---|---|---|
| — | 30px | Formularios, diálogos, barras de búsqueda | 12 |
| `re-btn--sm` | 28px | Header | 11 |
| `re-btn--xs` | 24px | Barras de lote | 11 |
| `re-btn--2xs` | 20px | Cabeceras de grupo del árbol | 10 |
| `re-icon-btn` / `--sm` | 28 / 24px | Tarjetas y header / filas densas | 13 / 11 |

## HTML

```html
<button type="button" class="re-btn re-btn--primary">
  <ng-icon name="lucideCheck" size="12" /><span>{{ t('common.save') }}</span>
</button>

<button type="button" class="re-icon-btn re-icon-btn--danger re-reveal"
        [title]="t('common.delete')" [attr.aria-label]="t('common.delete')">
  <ng-icon name="lucideTrash2" size="13" />
</button>
```

## Reglas

- `type` siempre (`button`, o `submit` solo en el botón que envía el formulario).
- Los botones de solo icono llevan `title` **y** `aria-label`.
- En filas y tarjetas repetidas, las acciones se revelan con `re-reveal` dentro de un `re-reveal-host`.
- Sin anchos fijos: el ancho sale del padding (o `re-btn--block` en una rejilla).
- `disabled` en vez de ocultar cuando la acción existe pero ahora no aplica; ocultar cuando no existe
  en ese contexto.
