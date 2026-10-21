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
| Cabeceras fijas al hacer scroll (opcional) | `re-tree--sticky` en `re-tree` | — |
| Árbol plano: secciones sobre una lista continua | `re-tree--flat` en `re-tree` | — |
| Nombre de la sección en un árbol plano (mono) | `re-tree__title` | — |
| Fila densa: una línea en cuatro celdas | `re-tree__row--dense` | 32px |
| Celdas de la fila densa | `re-tree__lead` · `re-tree__key` · `re-tree__value` · `re-tree__trail` | — |
| Tiempo o tamaño, en columna fija (`--warning` si avisa) | `re-tree__time` | — |
| Lo que tapan las acciones flotantes | `re-tree__end` | — |
| Banderas de una letra, en huecos fijos | `re-flags` > `re-flag` | 15px |

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

## Cabeceras fijas

`re-tree--sticky` en el `re-tree` fija la cabecera del grupo abierto mientras se hace scroll por sus filas,
así siempre se ve a qué grupo pertenecen. Es opcional: sin la clase, las cabeceras se desplazan con el
resto.

- La cabecera de primer nivel se fija arriba (32px); la anidada se apila debajo de la de su padre
  (28px por nivel extra), a cualquier profundidad.
- Una cabecera solo se fija dentro de su grupo: sale con él, y la del grupo siguiente la sustituye.
- Los fondos de cabecera pueden ser translúcidos, así que la variante fija los pinta sobre el fondo
  opaco del árbol (`--re-background`); no hay que tocarlos.
- Requiere un `re-tree` con scroll propio (`flex-1`, `overflow`); en un contenedor sin scroll no hace nada.

## Árbol plano

`re-tree--flat` es para vistas donde las secciones son **los sitios donde viven los datos** (los dominios
de un sitio) y no una jerarquía que se recorre: un solo nivel, sin sangría ni icono de grupo.

- La cabecera es un separador sobre el fondo de la página, fija al hacer scroll (no hace falta
  `re-tree--sticky`), con borde arriba y abajo. Sus filas van sobre `--re-card`.
- El nombre de la sección es un dato: `re-tree__title`, en mono y sin encoger. Lo que la describe
  («Subdominio · 8») va después en `re-tree__meta`, en sans, y es lo que se trunca.
- Úsalo con filas densas. Sin `--re-tree-depth`: un árbol plano no anida.

```html
<div class="re-tree re-tree--flat">
  <section class="re-tree__group">
    <div class="re-tree__head re-reveal-host" role="button" tabindex="0" [attr.aria-expanded]="open()">
      <div class="re-tree__head-main">
        <ng-icon class="re-tree__chevron" name="lucideChevronDown" size="11" />
        <span class="re-tree__title">gist.github.com</span>
        <span class="re-tree__meta">Subdominio · 8</span>
      </div>
      <div class="re-tree__actions re-reveal">
        <button type="button" class="re-btn re-btn--xs re-btn--danger-outline">Limpiar</button>
      </div>
    </div>
    <div class="re-tree__items" [hidden]="!open()">…filas densas…</div>
  </section>
</div>
```

## Fila densa

`re-tree__row--dense` pone cada elemento en **una línea de 32px** con cuatro celdas que se alinean entre
filas: inicio (`re-tree__lead`: checkbox, candado) · clave · valor · final (`re-tree__trail`: banderas,
tiempo). La columna de la clave es fija (`--re-tree-key`, 10rem por defecto, en el árbol o en la fila) y
el valor ocupa el resto, truncado.

- **Acciones flotantes**: `re-tree__actions` como hijo directo de la fila aparece sobre el final de la fila
  al pasar el ratón o con foco de teclado, y oculta lo marcado con `re-tree__end` (normalmente el tiempo).
  Así las acciones no reservan una columna vacía en cada fila. En pantallas táctiles (`hover: none`) se
  quedan fijas.
- **Seleccionada**: si el checkbox del inicio está marcado, la fila se tiñe con la marca al 6 %. No hace
  falta clase.
- **Tiempo o tamaño**: `re-tree__time`, en sans, cifras tabulares y una columna fija de 58px alineada a la
  derecha; `re-tree__time--warning` (ámbar) solo cuando avisa (caduca en menos de 1 h, ya caducó).
- **Ventana estrecha** (menos de 400px, el panel lateral): la fila pierde la celda del valor y queda
  inicio · clave · final.

```html
<div class="re-tree__row re-tree__row--dense">
  <span class="re-tree__lead">
    <input type="checkbox" class="re-checkbox" … />
    <button type="button" class="…" …><ng-icon name="lucideLock" size="12" /></button>
  </span>
  <span class="re-tree__key re-tree__key--strong" title="user_session">user_session</span>
  <span class="re-tree__value" title="…">ghs_89A7sdFk982jKqP2xL0m</span>
  <span class="re-tree__trail">
    <span class="re-flags">…</span>
    <span class="re-tree__time re-tree__end" title="Caduca dentro de 14 días">14 d</span>
  </span>
  <span class="re-tree__actions">
    <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--brand" …><ng-icon name="lucidePencil" size="12" /></button>
    <button type="button" class="re-icon-btn re-icon-btn--sm re-icon-btn--danger" …><ng-icon name="lucideTrash2" size="12" /></button>
  </span>
</div>
```

## Banderas

`re-flags` > `re-flag`: chips de **una letra** para atributos booleanos (H = HttpOnly, S = Secure). Cada
letra tiene su hueco fijo (`--re-flags`, 2 por defecto): una bandera ausente deja su hueco **vacío** (un
`<span>` sin clase), para que la otra no cambie de columna entre filas. La palabra completa va en el
`aria-label` y en un tooltip `re-tip` ([ReBadge](ReBadge.md#tooltip)), que es lo que permite la letra suelta.

```html
<span class="re-flags">
  <span class="re-flag re-tip re-tip--end" aria-label="HttpOnly">H
    <span class="re-tip__bubble" aria-hidden="true"><strong>HttpOnly</strong> · los scripts de la página no la leen</span>
  </span>
  <span></span>  <!-- sin Secure: el hueco se queda -->
</span>
```

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
- **Una línea o dos.** La fila densa es para listas que se recorren con la vista (decenas o cientos de
  filas con la misma forma); `re-tree__row--2line` sigue sirviendo cuando el valor necesita su línea.
  No se mezclan en un mismo árbol.
- En un árbol plano, la selección en lote vive en el resumen de la vista (`re-summary--selection`,
  [ReSummary](ReSummary.md)) en lugar de en una `re-batchbar` fija.
- Iconos de grupo: marca para lo normal, `--muted` en los anidados, `--warning` para lo que avisa, `--danger` para lo destructivo y
  `--success` para lo protegido.
