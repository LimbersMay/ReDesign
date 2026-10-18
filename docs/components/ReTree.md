# ReTree

Árbol colapsable para **datos densos y homogéneos**: cientos de filas agrupadas por uno o dos niveles.
Es genérico; las filas especializadas de cada producto (la fila de cookie de ReSession, con candado y
banderas) son componentes firma construidos con estas piezas.

## Piezas

| Pieza | Clase | Alto |
|---|---|---|
| Barra de lote (seleccionar todo + acciones) | `re-batchbar` | 32px |
| Contenedor (scroll, mono 11px) | `re-tree` | flex-1 |
| Grupo | `re-tree__group` | — |
| Cabecera de nivel 1 | `re-tree__head` | 32px |
| Cabecera de nivel 2 | `re-tree__head re-tree__head--l2` | 28px |
| Filas del grupo | `re-tree__items` | — |
| Hoja | `re-tree__row` (`--2line`, `--l3`, `--danger`) | 36 / 44 / 32px |
| Mensaje dentro de un grupo vacío | `re-tree__note` | — |

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
- Sangría: 16 → 28 → 32 → 48px (lo dan las clases; no se ajusta a mano).
- **Un solo hover** para todas las líneas, cabeceras y filas de cualquier nivel: `slate-100`. El
  nivel se lee en la sangría, no en el color. La única excepción es `re-tree__row--danger` (rose,
  rastreadores), porque es una señal de rol. La cabecera de nivel 2 sí tiene fondo propio en reposo
  (`slate-50`, superficie hundida).
- Expandir/contraer todo es una acción del árbol: va en su `re-batchbar`, no en el header de la ventana.
- Iconos de grupo: marca para lo normal, `--muted` en el nivel 2, `--danger` para lo peligroso y
  `--success` para lo protegido.
