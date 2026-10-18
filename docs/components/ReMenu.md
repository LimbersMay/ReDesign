# ReMenu

Menú anclado a un botón: secciones de ajustes, interruptores y acciones. Se usa sobre todo para el
[menú de ajustes](../patterns/settings-menu.md) del engranaje, que es igual en toda la suite.

## Anatomía

| Parte | Clase | Contenido |
|---|---|---|
| Panel | `re-menu` | 240px, alineado a la derecha del botón |
| Sección de ajuste | `re-menu__section` + `re-section-title` | Un control: `re-segmented re-segmented--block`, o un `re-option` con switch |
| Grupo de acciones | `re-menu__group` | `re-menu__item` (icono 13 + texto); los grupos se separan solos |
| Extremo derecho de un ítem | `re-menu__item-end` | `re-kbd-combo` o un chevron |

```html
<div class="re-header__actions">
  <button type="button" class="re-icon-btn" aria-haspopup="menu" [attr.aria-expanded]="open()" …>
    <ng-icon name="lucideSettings" size="13" />
  </button>
  @if (open()) {
    <div class="re-menu" role="menu">
      <div class="re-menu__section">
        <span class="re-section-title">{{ t('settings.language') }}</span>
        <div class="re-segmented re-segmented--block">
          <button type="button" class="re-segmented__item" [attr.aria-pressed]="lang() === 'es'">ES</button>
          <button type="button" class="re-segmented__item" [attr.aria-pressed]="lang() === 'en'">EN</button>
        </div>
      </div>
      <div class="re-menu__group">
        <button type="button" role="menuitem" class="re-menu__item"><ng-icon name="lucideDownload" size="13" />{{ t('settings.export') }}</button>
      </div>
    </div>
  }
</div>
```

## Comportamiento

- Se cierra con Esc, con un clic fuera y al ejecutar una acción. Cambiar un ajuste (idioma, tema,
  un switch) **no** lo cierra: así se ve el efecto.
- ↑/↓ recorren los `menuitem`; el foco vuelve al botón al cerrar.
- El contenedor del botón es `position: relative` (`re-header__actions` ya lo es).

## No hacer

- Usar `bg-slate-200/70` + `dark:bg-slate-300` para el selector interno (ReRoute v1): es un
  `re-segmented re-segmented--block`.
- Poner acciones destructivas en el menú de ajustes sin confirmación.
