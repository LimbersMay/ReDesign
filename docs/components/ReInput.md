# ReInput

El marco (`re-input-group`) dibuja el borde, el relleno y el anillo de foco; los `<input>` que contiene
van desnudos. Varios inputs pueden compartir marco (clave + valor). En Angular el marco es el
componente `<app-input-group>` (alias aceptado), que además mueve el foco con ←/→ entre inputs.

## Campo con label

```html
<div class="re-field">
  <label class="re-label" for="cookieName">
    {{ t('cookie.name') }} <span class="re-label__optional">({{ t('common.optional') }})</span>
  </label>
  <div class="re-input-group">
    <input id="cookieName" class="re-mono" type="text" />
  </div>
  <span class="re-hint">{{ t('cookie.nameHint') }}</span>
</div>
```

## Variantes

| Caso | HTML |
|---|---|
| Buscador | `<div class="re-input-group"><ng-icon name="lucideSearch" size="13" /><input …/></div>` |
| Con select en línea | `<div class="re-input-group"><select class="re-select-inline text-brand-600">…</select><input …/></div>` |
| Fecha y hora | `<div class="re-input-group"><input type="datetime-local" class="re-mono" /></div>` |
| Multilínea / valor largo | `<textarea class="re-textarea" rows="3"></textarea>` |
| Inválido | `aria-invalid="true"` en el input (el marco se pone en `rose`) + `<span class="re-error">` |

## Reglas

- Un input nunca lleva borde, fondo ni anillo propios: siempre dentro de `re-input-group`.
- 30px de alto. Sin `h-9` ni `h-10`.
- Valores técnicos (dominios, rutas, claves, valores) en `re-mono`.
- El label va encima, en `re-label`; nunca solo un placeholder como label.
- Para elegir de una lista corta usa `re-select-inline` (nativo) o [ReDropdown](ReDropdown.md) cuando
  las opciones necesiten acciones o estilo propio.
