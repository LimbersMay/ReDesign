# ReSegmented · ReTabs

| Control | Cuándo |
|---|---|
| `re-segmented` | Cambiar la vista principal (en el header), el ámbito (Cookies / Storage) o un modo excluyente dentro de un formulario (Raw / Decodificado, Sesión / Fecha fija) |
| `re-tabs` | Secciones dentro de un diálogo editor (ReRoute: Redirect / Headers / Params / Mock) |

## HTML

```html
<!-- Vistas: tablist -->
<div class="re-segmented" role="tablist">
  <button type="button" role="tab" class="re-segmented__item" aria-selected="true">
    <ng-icon name="lucideTarget" size="10" /><span>{{ t('nav.tab') }}</span>
  </button>
  <button type="button" role="tab" class="re-segmented__item" aria-selected="false">…</button>
</div>

<!-- Modo excluyente en un formulario: aria-pressed; ocupa todo el ancho -->
<div class="re-segmented re-segmented--block">
  <button type="button" class="re-segmented__item" aria-pressed="true">Raw</button>
  <button type="button" class="re-segmented__item" aria-pressed="false">Decodificado</button>
</div>

<!-- Opciones que SON roles: el rol tiñe texto e icono del activo, nunca el borde -->
<button type="button" class="re-segmented__item re-segmented__item--success" aria-pressed="true">Lista blanca</button>
<button type="button" class="re-segmented__item re-segmented__item--danger" aria-pressed="false">Lista negra</button>

<!-- Tabs subrayadas -->
<div class="re-tabs" role="tablist">
  <button type="button" role="tab" class="re-tabs__item" aria-selected="true">Headers</button>
</div>
```

`re-segmented--sm` reduce el padding (barras secundarias).

## Reglas

- El estado activo se marca con `aria-selected` o `aria-pressed`, no solo con una clase: así lo leen
  los lectores de pantalla y el CSS a la vez.
- El activo se marca por **elevación** (`bg-card` / `slate-300` en oscuro + sombra + `slate-800`), nunca
  con el color de la marca ([color.md §2](../foundations/color.md)). Igual que el selector de idioma y
  tema de ReRoute.
- `--success` / `--danger` solo cuando las opciones son roles (Lista blanca · Lista negra).
- Las píldoras inactivas mantienen su borde transparente (evita saltos de 1px).
- Dos a cuatro opciones. Con más, usa un dropdown.
