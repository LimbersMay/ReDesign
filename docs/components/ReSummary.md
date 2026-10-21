# ReSummary

**De qué trata la vista**, con su acción principal: el sitio de la pestaña, un sitio de una lista. Va arriba,
bajo el header, y es donde se dice la garantía del producto, junto al botón que la pone a prueba
([patterns/guarantee.md](../patterns/guarantee.md)). Con una selección pasa a **modo selección**: la misma
caja hace de barra de lote, con el mismo alto, así que nada de debajo se mueve.

## Piezas

| Pieza | Clase | Notas |
|---|---|---|
| Contenedor | `re-summary` | Mínimo 64px de alto |
| Icono del sitio | `re-favicon` (`--lg`) | El favicon (`<img>`) o la inicial sobre un neutro. 22px; `--lg`, 34px |
| Texto | `re-summary__main` > `re-summary__title` + `re-summary__stats` | El título en `text-sm` (también con `re-mono` si es un dominio) |
| Cifras | hijos de `re-summary__stats` | Separadas por un punto que pone el CSS. `re-summary__stat--success` (con su icono) para lo protegido |
| Acciones | `re-summary__actions` | La acción principal de la vista; **una** |
| Modo selección | `re-summary--selection` | Fondo de marca al 6 % |
| Cuántas hay seleccionadas | `re-summary__count` | |

## HTML

```html
<!-- Resumen -->
<section class="re-summary">
  <span class="re-favicon re-favicon--lg">g</span>
  <div class="re-summary__main">
    <h1 class="re-summary__title re-mono">gist.github.com</h1>
    <div class="re-summary__stats">
      <span>16 cookies</span>
      <span>20 claves de storage</span>
      <span class="re-summary__stat--success"><ng-icon name="lucideShieldCheck" size="11" />8 protegidas</span>
    </div>
  </div>
  <div class="re-summary__actions">
    <button type="button" class="re-btn re-btn--sm re-btn--danger-soft">Limpiar (8)</button>
  </div>
</section>

<!-- Modo selección: checkbox maestro · cuántas · «Seleccionar las n» … acciones · cerrar -->
<section class="re-summary re-summary--selection">
  <input type="checkbox" class="re-checkbox" [checked]="all()" [indeterminate]="!all()" … />
  <div class="flex min-w-0 flex-1 items-center gap-2.5">
    <span class="re-summary__count">2 seleccionadas</span>
    <button type="button" class="re-link">Seleccionar las 8</button>
  </div>
  <div class="re-summary__actions">
    <button type="button" class="re-btn re-btn--sm re-btn--secondary"><ng-icon name="lucideLock" size="12" />Proteger</button>
    <button type="button" class="re-btn re-btn--sm re-btn--danger-soft">Limpiar (2)</button>
    <button type="button" class="re-icon-btn" title="Quitar selección" aria-label="Quitar selección">
      <ng-icon name="lucideX" size="13" />
    </button>
  </div>
</section>
```

## Reglas

- Una sola acción en reposo: la que da sentido a la vista («Limpiar (n)»), y su cifra ya descuenta lo
  protegido. Las demás acciones de lote solo aparecen en modo selección.
- La garantía se lee en las cifras («8 protegidas», en verde y con escudo) y no en el botón (R8,
  [content.md](../foundations/content.md)). Si todo está protegido, la cifra lo dice («todas protegidas»).
- El modo selección **sustituye** al resumen mientras hay algo seleccionado; no se apilan. Esc o la ✕
  quitan la selección y vuelve el resumen.
- `re-favicon` nunca lleva el color de la marca: es el sitio, no el producto.
