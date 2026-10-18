# ReEmptyState · ReNotice

## Empty state

Una vista o un contenedor sin datos. Dice qué falta y, si hay una, ofrece la acción para empezar.

```html
<div class="re-empty">
  <div class="re-empty__icon"><ng-icon name="lucideCookie" size="18" /></div>
  <p class="re-empty__title">{{ t('tab.empty.title') }}</p>
  <p class="re-empty__text">{{ t('tab.empty.text') }}</p>
  <button type="button" class="re-btn re-btn--secondary mt-2">…</button>
</div>
```

## Notice

Mensaje en línea, dentro de una vista o un diálogo, que explica una situación: una cookie que expira
al cerrar el navegador, un sitio en lista blanca, un cambio que crea un elemento nuevo.

```html
<div class="re-notice re-notice--success">
  <ng-icon name="lucideShieldCheck" size="12" />
  <span><strong>.github.com</strong> está en tu lista blanca: sus cookies nunca se limpian.</span>
</div>
```

Tonos: neutro (información), `--brand`, `--success`, `--warning`, `--danger`.

## Reglas

- Un notice explica **este** caso. Las garantías generales del producto no se repiten en notices: van
  en la status bar ([patterns/guarantee.md](../patterns/guarantee.md)).
- Como mucho un notice visible por bloque.
