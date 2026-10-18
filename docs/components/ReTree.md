# ReTree

Árbol colapsable para **datos densos y homogéneos**: cientos de filas agrupadas en tantos niveles como haga falta.
Es genérico; las filas especializadas de cada producto (la fila de cookie de ReSession, con candado y
banderas) son componentes firma construidos con estas piezas.

## Piezas

| Pieza | Clase | Alto |
|---|---|---|
| Barra de lote (seleccionar todo + acciones) | `re-batchbar` | 32px |
| Contenedor (scroll, mono 11px) | `re-tree` | flex-1 |
| Grupo | `re-tree__group` | — |
| Cabecera | `re-tree__head` | 32px; 28px y fondo hundido si está anidada |
| Filas del grupo | `re-tree__items` | — |
| Hoja | `re-tree__row` (`--2line`) | 36 / 44px; 32px dentro de un grupo anidado |
| Clave (`--strong` si es la protagonista de la fila) | `re-tree__key` | — |
| Valor (`--strong` si es el contenido de la fila) | `re-tree__value` | — |
| Mensaje dentro de un grupo vacío | `re-tree__note` | — |

## Niveles

No hay clases por nivel. Cada grupo declara su profundidad con la variable `--re-tree-depth`
(0 = primer nivel, 1, 2… sin límite) en el elemento que envuelve su cabecera y sus items:

```html
<section class="re-tree__group" style="--re-tree-depth: 0">
  <div class="re-tree__head">…</div>
  <div class="re-tree__items">
    <div class="re-tree__row">…</div>
    <div style="--re-tree-depth: 1">           <!-- grupo anidado -->
      <div class="re-tree__head">…</div>
      <div class="re-tree__items">
        <div class="re-tree__row">…</div>
      </div>
    </div>
  </div>
</section>
```

- La cabecera se sangra `16px + profundidad × 16px`, y sus filas un paso más (la variable se
  hereda; las filas no la declaran).
- Una cabecera dentro de los items de otro grupo sale compacta y con fondo hundido, a cualquier
  profundidad; sus filas, compactas. Lo da la estructura, no una clase.
- El paso de sangría es `--re-tree-indent` (16px), en `.re-tree`.
- `re-tree__head--l2` y `re-tree__row--l3` se eliminaron en 2.0.0: declara `--re-tree-depth: 1` en el grupo.

## HTML

```html
<div class="re-batchbar">
  <label class="re-batchbar__select">
    <input type="checkbox" class="re-checkbox" [checked]="all()" [indeterminate]="some()" />
    <span>{{ selectionLabel() }}</span>
  </label>
  <div class="re-batchbar__actions">
    <button type="button" class="re-btn re-btn--xs re-btn--secondary">…</button>
    <button type="button" class="re-icon-btn re-icon-btn--sm" …><ng-icon name="lucideChevronsUpDown" size="11" /></button>
  </div>
</div>

<div class="re-tree">
  <section class="re-tree__group">
    <div class="re-tree__head re-reveal-host" role="button" tabindex="0" [attr.aria-expanded]="open()"
         (click)="toggle()" (keydown.enter)="toggle()" (keydown.space)="toggle(); $event.preventDefault()">
      <div class="re-tree__head-main">
        <ng-icon class="re-tree__chevron" name="lucideChevronDown" size="11" />
        <ng-icon class="re-tree__icon" name="lucideFolder" size="12" />
        <span class="re-tree__label">{{ label() }}</span>
        <span class="re-tree__meta">{{ meta() }}</span>
        <span class="re-badge re-badge--micro">{{ count() }}</span>
      </div>
      <div class="re-tree__actions re-reveal">
        <button type="button" class="re-btn re-btn--2xs re-btn--ghost" (click)="$event.stopPropagation(); clean.emit()">
          {{ t('common.clean') }}
        </button>
      </div>
    </div>

    <div class="re-tree__items" [hidden]="!open()">
      <div class="re-tree__row re-reveal-host">
        <div class="re-tree__row-main">
          <input type="checkbox" class="re-checkbox" />
          <span class="re-tree__key">clave</span>
          <span class="re-tree__value">valor</span>
        </div>
        <div class="re-tree__row-end">
          <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--danger re-reveal" …><ng-icon name="lucideTrash2" size="11" /></button>
        </div>
      </div>
    </div>
  </section>
</div>
```

## Reglas

- Para cientos de elementos, nunca tarjetas con margen y sombra: filas de `re-tree`.
- Las acciones de una cabecera llevan `$event.stopPropagation()` (si no, también pliegan el grupo) y
  se revelan en hover o foco; no se muestran fijas en cada grupo.
- La cabecera es el botón de plegar (`role="button"`, `aria-expanded`, Enter/Espacio). Los items
  cerrados llevan `hidden`.
- Sangría: la da `--re-tree-depth`; no se ajusta a mano con padding.
- **Un solo hover** para todas las líneas, cabeceras y filas de cualquier nivel: `slate-100`. El
  nivel se lee en la sangría, no en el color, y tampoco hay variante para las filas de rastreadores
  (`re-tree__row--danger` se eliminó en 2.0.0). Las cabeceras anidadas sí tienen fondo propio en reposo
  (`slate-50`, superficie hundida).
- **Valor**: por defecto es una pista (`slate-400`, junto a una clave que manda). `re-tree__value--strong`
  (`slate-600`) es para filas donde el valor es lo que se viene a leer, como el storage. Solo cambia el
  tono: mantiene el truncado y el `max-width`, y nunca supera a la clave (`slate-800`). Es un neutro: no
  señala un rol, así que no sustituye a `--danger` ni `--success`.
- Expandir/contraer todo es una acción del árbol: va en su `re-batchbar`, no en el header de la ventana.
- Iconos de grupo: marca para lo normal, `--muted` en los anidados, `--warning` para lo que avisa (rastreadores), `--danger` para lo destructivo y
  `--success` para lo protegido.
