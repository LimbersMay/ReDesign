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

## Lista de navegación

`re-nav-list` es una lista cuyas filas **abren una página propia** (un sitio de Global). Cada fila es un
`<button>` entero: imagen (`re-favicon`) · título y subtítulo · datos al final · chevron.

```html
<nav class="re-nav-list">
  <button type="button" class="re-nav-list__row" [attr.aria-label]="t('global.openSite', { site })">
    <span class="re-favicon">g</span>
    <span class="re-nav-list__main">
      <span class="re-nav-list__title">github.com <span class="re-pill re-pill--sm">Pestaña actual</span></span>
      <span class="re-nav-list__sub">2 dominios · 7 con candado</span>
    </span>
    <span class="re-nav-list__end">
      <span class="re-meter re-meter--success" style="--re-meter-value: 0.54"></span>
      <span class="w-6 text-right">13</span>
      <ng-icon name="lucideChevronRight" size="13" />
    </span>
  </button>
</nav>
```

**Medidor** (`re-meter`): cuánto de un todo tiene un rol. La parte llena es `--re-meter-value` (de 0 a 1);
`--success` = protegido. Es un dato de apoyo: la cifra exacta va al lado o en el subtítulo.

**Migas** (`re-breadcrumb`): la barra de la página abierta desde una lista. Volver a la lista y dónde estás.
Esc hace lo mismo que «‹ Global».

```html
<div class="re-breadcrumb">
  <button type="button" class="re-breadcrumb__back"><ng-icon name="lucideChevronLeft" size="13" />Global</button>
  <span>/</span>
  <span class="re-breadcrumb__current re-mono">github.com</span>
</div>
```

- Con cientos de elementos que se abren, una lista de navegación y una página por elemento se leen mejor
  que un árbol de tres niveles: la página puede reutilizar el resumen y el árbol plano de otra vista.
