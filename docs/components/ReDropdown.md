# ReDropdown

Elegir **uno** de una lista, con acciones opcionales por fila (editar, eliminar) y un botón de alta al
pie. Es el `app-custom-dropdown` de ReRoute: aspecto en `re-dropdown*`, comportamiento en el componente
de cada framework.

> Para una lista corta sin acciones, `re-select-inline` (nativo) es suficiente y más accesible.

## Contrato del componente (igual en todos los frameworks)

| Entrada | Tipo | Por defecto | |
|---|---|---|---|
| `items` | `{ id, label, isEditable?, isDeletable? }[]` | — | requerido |
| `selectedId` | `T \| null` | `null` | |
| `placeholder` | `string` | `''` | texto si no hay selección |
| `buttonId` | `string` | `''` | para asociar un `<label for>` |
| `fontMono` | `boolean` | `false` | opciones técnicas (métodos, códigos) |
| `showItemActions` | `boolean` | `false` | muestra editar/eliminar en hover |
| `addActionLabel` | `string` | `''` | si no está vacío, muestra el botón de alta |
| `align` | `'start' \| 'end'` | `'start'` | `end` añade `re-dropdown__panel--end` |
| `disabled` | `boolean` | `false` | |

| Salida | Cuándo |
|---|---|
| `selectionChange(id)` | Al elegir una opción |
| `editItem(item)` / `deleteItem(item)` | Acciones de fila (solo si `isEditable !== false` / `isDeletable`) |
| `addItem()` | Botón del pie |

Un ítem sin `isDeletable` deja un hueco de 24px en lugar del botón, para que las filas queden alineadas.

**Cambio respecto a ReRoute v1:** `buttonClass` y `menuClass` desaparecen. El alto y el ancho salen
del sistema (30px, ancho del trigger con mínimo 130px); para otro ancho del panel se usa `align` y el
ancho del contenedor.

## HTML de referencia

```html
<div class="re-dropdown">
  <button type="button" class="re-dropdown__trigger" [class.re-mono]="fontMono()"
          aria-haspopup="listbox" [attr.aria-expanded]="open()" [id]="buttonId() || null" [disabled]="disabled()">
    <span class="re-dropdown__label">{{ displayLabel() }}</span>
    <ng-icon class="re-dropdown__chevron" name="lucideChevronDown" size="11" />
  </button>

  @if (open()) {
    <div class="re-dropdown__panel" [class.re-dropdown__panel--end]="align() === 'end'">
      <div class="re-dropdown__list" role="listbox" [attr.aria-activedescendant]="activeId()">
        @for (item of items(); track item.id) {
          <div class="re-dropdown__option re-reveal-host" role="option" [id]="optionId(item)"
               [attr.aria-selected]="item.id === selectedId()" [class.is-focused]="item.id === activeItemId()"
               (click)="select(item)">
            <span class="re-dropdown__option-main">
              <ng-icon class="re-dropdown__check" name="lucideCheck" size="11" />
              <span class="re-dropdown__label" [class.re-mono]="fontMono()">{{ item.label }}</span>
            </span>
            @if (showItemActions()) {
              <span class="flex gap-0.5">
                <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--brand re-reveal" …><ng-icon name="lucidePencil" size="10" /></button>
                <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--danger re-reveal" …><ng-icon name="lucideTrash2" size="10" /></button>
              </span>
            }
          </div>
        }
      </div>
      @if (addActionLabel()) {
        <div class="re-dropdown__footer">
          <button type="button" class="re-dropdown__add"><ng-icon name="lucidePlus" size="11" />{{ addActionLabel() }}</button>
        </div>
      }
    </div>
  }
</div>
```

## Teclado (obligatorio; ReRoute v1 aún no lo cumple)

| Tecla | Efecto |
|---|---|
| Enter / Espacio / ↓ en el trigger | Abre y enfoca la opción seleccionada |
| ↑ / ↓ | Mueve el foco (`is-focused`, `aria-activedescendant`) |
| Home / End | Primera / última opción |
| Enter | Elige la opción enfocada y cierra |
| Esc / clic fuera / Tab | Cierra sin elegir; el foco vuelve al trigger |

## Reglas

- No se crea un menú desplegable desde cero si este sirve.
- Cada texto de opción lleva `min-w-0` + truncado (`re-dropdown__label`).
- Si una opción necesita decir lo que da («En 30 días» → «20 nov 2026»), va a la derecha en
  `re-dropdown__hint`, más pequeño y callado.
- Los títulos «Editar» / «Eliminar» de las acciones se traducen (en ReRoute v1 están fijos en español).
