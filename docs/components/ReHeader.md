# ReHeader · ReStatusBar

Cabecera (48px) y barra inferior (32px) de la ventana. Las dos son iguales en todos los productos;
solo cambian el logo, el nombre y lo que va en las zonas centrales.

## Anatomía del header

```
┌ re-header ──────────────────────────────────────────────────────────────┐
│ [logo] Nombre      ‹zona de vista: re-segmented›      [acciones][+ Añadir][⚙] │
└──────────────────────────────────────────────────────────────────────────┘
```

| Zona | Contenido | Reglas |
|---|---|---|
| Identidad | `re-header__logo` + `re-header__title` (+ `re-header__subtitle` opcional) | El logo es el icono del producto; el nombre, en `text-xs` 700 |
| Vista (opcional) | Un `re-segmented` con las vistas principales | Máximo 3 vistas; si hay más, la app necesita otra navegación |
| Acciones | Icon buttons de la vista activa · **una** primaria `re-btn--sm` · **siempre al final** el engranaje de ajustes | El engranaje abre el [menú de ajustes](../patterns/settings-menu.md) |

```html
<header class="re-header">
  <div class="re-header__brand">
    <div class="re-header__logo"><ng-icon name="lucideCookie" size="13" /></div>
    <span class="re-header__title">ReSession</span>
  </div>

  <div class="re-segmented" role="tablist">…</div>

  <div class="re-header__actions">
    <button type="button" class="re-btn re-btn--sm re-btn--primary">
      <ng-icon name="lucidePlus" size="11" /><span>{{ t('common.add') }}</span>
    </button>
    <button type="button" class="re-icon-btn" aria-haspopup="menu" [attr.aria-expanded]="open()"
            [title]="t('header.settings')" [attr.aria-label]="t('header.settings')">
      <ng-icon name="lucideSettings" size="13" />
    </button>
    <!-- re-menu, ver ReMenu.md -->
  </div>
</header>
```

## Status bar

Dos zonas: a la izquierda el **estado** o la **garantía** del producto; a la derecha un enlace
(normalmente «Ayuda»).

```html
<footer class="re-statusbar">
  <div class="re-statusbar__guarantee">
    <ng-icon name="lucideShieldCheck" size="10" />
    <span>{{ t('statusBar.guarantee') }}</span>
  </div>
  <button type="button" class="re-link">{{ t('statusBar.help') }}</button>
</footer>
```

Con estado en vivo (ReRoute): `<span class="re-dot re-dot--live re-dot--pulse"></span> 12 reglas activas`.

## No hacer

- Header o footer con fondo de color (`bg-brand-500`) o títulos centrados.
- Más de una acción primaria en el header.
- Exportar, importar, idioma o tema sueltos en el header o el footer: van en el menú de ajustes.
- Más de 48px de header o 32px de footer.
