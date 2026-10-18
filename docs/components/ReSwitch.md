# ReSwitch · ReCheckbox · ReOption

| Control | Cuándo |
|---|---|
| `re-switch` | Activa o pausa algo que **actúa** (una regla, el temporizador, la extensión) |
| `re-checkbox` | Seleccionar para una acción en lote, u opciones dentro de un formulario |
| `re-option` | Cualquiera de los dos con título y descripción, clicable entero |

## HTML

```html
<!-- Switch: un solo tamaño en toda la suite (32×16) -->
<label class="re-switch" [title]="t('rule.toggle')">
  <input type="checkbox" role="switch" [checked]="on()" (change)="toggle.emit()" [attr.aria-label]="t('rule.toggle')" />
  <span class="re-switch__track"></span>
</label>

<!-- Interruptor general del producto: verde -->
<label class="re-switch re-switch--live">…</label>

<!-- Checkbox (admite indeterminate) -->
<input type="checkbox" class="re-checkbox" [checked]="selected()" [indeterminate]="partial()" />

<!-- Opción con texto -->
<label class="re-option">
  <input type="checkbox" class="re-checkbox" />
  <span class="re-option__text">
    <span class="re-option__title">HttpOnly</span>
    <span class="re-option__desc">{{ t('cookie.httpOnlyHint') }}</span>
  </span>
</label>
```

Con switch al final: `<label class="re-option"><span class="re-option__text">…</span><span class="re-switch">…</span></label>`
(el switch como `span` porque el `label` exterior ya hace de etiqueta).

## Reglas

- No hay switches grandes (`h-6 w-11`); no se dibujan checkboxes con utilidades.
- El estado de un switch se ve en su color; no hace falta escribir «Activado» al lado, salvo en el
  interruptor general del producto.
- Un booleano con consecuencias que el usuario debe entender lleva descripción (`re-option__desc`).
