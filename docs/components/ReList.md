# ReList

Lista corta (hasta unas decenas) de filas ligeras: dominios de una lista blanca, entradas de un
historial. Sustituye a la antigua «ReCardItem», que tenía colores oscuros fijos.

```html
<div class="re-list">
  @for (site of sites(); track site.pattern) {
    <div class="re-list__row re-reveal-host">
      <div class="flex min-w-0 flex-1 items-center gap-2.5">
        <ng-icon name="lucideShieldCheck" size="12" class="shrink-0 text-emerald-500" />
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="re-mono truncate font-semibold text-slate-800">{{ site.pattern }}</span>
            <span class="re-badge" [class.re-badge--brand]="site.wildcard">{{ site.wildcard ? 'comodín' : 'exacto' }}</span>
          </div>
          <p class="re-hint truncate">{{ site.description }}</p>
        </div>
      </div>
      <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--danger re-reveal" …>
        <ng-icon name="lucideTrash2" size="11" />
      </button>
    </div>
  } @empty {
    <div class="re-list__empty">{{ t('lists.empty') }}</div>
  }
</div>
```

## Reglas

- Fila de ~40px; la zona izquierda es `min-w-0 flex-1` (trunca) y la derecha `shrink-0`.
- Acciones reveladas en hover o foco.
- Sin sombra por fila: la lista es un bloque con un único borde.
