# ReCard

Elemento repetible **con identidad propia** que se activa, se edita y se elimina: una regla
(ReRoute), una función (ReLink), un libro (ReBooks), una automatización (ReSession). Para cientos de
datos homogéneos usa [ReTree](ReTree.md); para filas ligeras, [ReList](ReList.md).

## Anatomía

```html
<article class="re-card re-reveal-host" [class.is-paused]="!live()" style="--re-card-accent: var(--re-brand-500)">
  <div class="re-card__bar"></div>

  <div class="re-card__header">
    <div class="re-card__heading">
      <span class="re-dot" [class.re-dot--live]="live()"></span>
      <span class="re-badge">GET</span>
      <h4 class="re-card__title">{{ title() }}</h4>
    </div>
    <div class="re-card__actions re-reveal">
      <button type="button" class="re-icon-btn re-icon-btn--brand" …><ng-icon name="lucideSquarePen" size="13" /></button>
      <label class="re-switch mx-1">…</label>
      <button type="button" class="re-icon-btn re-icon-btn--danger" …><ng-icon name="lucideTrash2" size="13" /></button>
    </div>
  </div>

  <div class="re-code-box">…</div>
</article>
```

## Reglas

- Barra lateral siempre. Su color es el estado o la **categoría** (`--re-card-accent`): marca por
  defecto, una categoría (`--re-purple-500`…) para tipos; nunca un rol (`rose`) como categoría.
- Pausada (`is-paused`): opacidad 60 %, fondo `slate-100`, barra y punto en `slate-300`.
- Las acciones se revelan en hover o foco de teclado (`re-reveal`), salvo que la tarjeta sea única en su vista.
- El contenido técnico va en `re-code-box` (mono, hundido).
- Variante con miniatura (ReBooks) y variante de automatización (ReSession) son **componentes firma**:
  ver `docs/products/`.
