# ReBooks

| | |
|---|---|
| Marca | `brands/rebooks.css` · 300 malva · oscuro `#ca9ee6` · pendiente (D9) |
| Stack | Angular 17 · **PrimeNG + PrimeIcons** |
| Estado frente a ReDesign | Sin adoptar |

## Componentes firma

- **Tarjeta de libro**: `re-card` con miniatura (56×80, `rounded-lg`) y barra de progreso
  (`h-1.5 rounded-full bg-slate-100` con relleno `bg-brand-500`).

## Deuda frente a ReDesign 1.0

| Qué | Hacia |
|---|---|
| PrimeNG (tema y componentes propios) | Componentes `re-*`; PrimeNG solo donde no haya equivalente y con su tema mapeado a `--re-*` |
| PrimeIcons | Lucide |

## Tema claro Latte (2.7.0)

Al subir a 2.7.0 (D23), el claro cambia: lienzo y tarjeta lavanda (`#e4e7ee`, `#f5f6f9`), texto más suave
(`#4c4f69`, 7,4:1 sobre la tarjeta), cabeceras de árbol sobre la tarjeta y colores de marca y categoría
400–800 con menos croma. El botón primario y el oscuro no cambian. Al migrar ya lo encuentra así. Alternativa: sobrescribir en el
producto `--re-slate-*`, `--re-background`, `--re-card` y `--re-c-400…800` para quedarse con el claro
anterior. Sin probar aún en ReBooks.
