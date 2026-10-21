# ReDialog

Dos tipos: el **editor** (formulario de un elemento) y la **confirmación** (una pregunta antes de
algo irreversible). Los dos se abren dentro de la ventana, sobre un velo (`re-dialog-overlay`).

## Editor

```html
<div class="re-dialog-overlay" (click)="close()">
  <form class="re-dialog" role="dialog" aria-modal="true" aria-labelledby="dlgTitle"
        (click)="$event.stopPropagation()" (ngSubmit)="save()">
    <header class="re-dialog__header">
      <div class="min-w-0">
        <h3 class="re-dialog__title" id="dlgTitle"><ng-icon name="lucideCookie" size="14" />{{ title() }}</h3>
        <p class="re-dialog__subtitle">{{ subtitle() }}</p>
      </div>
      <button type="button" class="re-icon-btn re-icon-btn--sm" (click)="close()" …><ng-icon name="lucideX" size="13" /></button>
    </header>

    <div class="re-dialog__body">
      <!-- re-field, re-fieldset, re-segmented… -->
    </div>

    <footer class="re-dialog__footer">
      <button type="button" class="re-btn re-btn--danger-ghost re-dialog__footer-start">…Eliminar</button>
      <button type="button" class="re-btn re-btn--ghost" (click)="close()">{{ t('common.cancel') }}</button>
      <button type="submit" class="re-btn re-btn--primary">{{ t('common.save') }}</button>
    </footer>
  </form>
</div>
```

Estructura del contenido: [patterns/editor-dialog.md](../patterns/editor-dialog.md).

## Hoja

`re-dialog--sheet` (con `re-dialog-overlay--sheet` en el velo) es un editor que **ocupa toda la
ventana** y sube desde abajo, en lugar de flotar centrado. Para formularios con más campos de los que un
diálogo centrado enseña sin scroll en 540×580. Mismo header, cuerpo y pie que el editor.

```html
<div class="re-dialog-overlay re-dialog-overlay--contained re-dialog-overlay--sheet">
  <form class="re-dialog re-dialog--sheet" role="dialog" aria-modal="true" aria-labelledby="ceTitle">
    <header class="re-dialog__header">
      <button type="button" class="re-icon-btn" …><ng-icon name="lucideX" size="14" /></button>
      <div class="re-dialog__heading">
        <h3 class="re-dialog__title re-mono" id="ceTitle">auth_token</h3>
        <p class="re-dialog__subtitle">.github.com · /</p>
      </div>
      <span class="re-pill re-pill--success" …><ng-icon name="lucideShieldCheck" size="11" />Lista blanca</span>
      <button type="button" class="re-toggle-pill" [attr.aria-pressed]="locked()">
        <ng-icon name="lucideLockOpen" size="12" />Sin candado
      </button>
    </header>
    <div class="re-dialog__body">
      <!-- campo principal, re-props, re-disclosure -->
    </div>
    <footer class="re-dialog__footer">…</footer>
  </form>
</div>
```

- La ✕ va a la izquierda del título; a la derecha, el estado del elemento (píldoras).
- Sin velo visible ni clic fuera: se cierra con la ✕, «Cancelar» o Esc.
- `re-dialog__heading` agrupa título y subtítulo y se trunca; con `re-mono` el título es el nombre del elemento.

### Controles de la hoja

| Pieza | Clase | Para qué |
|---|---|---|
| Interruptor con su estado por texto | `re-toggle-pill` (`aria-pressed`) | Un booleano del elemento en el header («Con candado» / «Sin candado»). El texto dice el estado, no la acción |
| Lista de propiedades | `re-props` > `re-props__row` > `re-props__label` + `re-props__control` (+ `re-props__hint`) | Ajustes cortos de un objeto, uno por fila (caducidad, SameSite, acceso), sin un título por sección. Etiqueta de 92px (`--re-props-label`) |
| Casilla con su etiqueta en un chip | `re-check-chip` | Dos o tres flags independientes en una fila |
| Sección plegada | `<details class="re-disclosure">` > `re-disclosure__summary` (+ `re-disclosure__value`) + `re-disclosure__body` | Lo que casi nunca se cambia. El resumen enseña el valor actual a la derecha |

```html
<div class="re-props">
  <div class="re-props__row">
    <span class="re-props__label">Acceso</span>
    <div class="re-props__control">
      <label class="re-check-chip"><input type="checkbox" class="re-checkbox" checked />HttpOnly</label>
      <label class="re-check-chip"><input type="checkbox" class="re-checkbox" checked />Secure</label>
    </div>
    <span class="re-props__hint">HttpOnly: los scripts de la página no la leen · Secure: solo viaja por HTTPS</span>
  </div>
</div>

<details class="re-disclosure">
  <summary class="re-disclosure__summary">
    <ng-icon name="lucideChevronRight" size="13" />Nombre y ámbito
    <span class="re-disclosure__value">.github.com · /</span>
  </summary>
  <div class="re-disclosure__body">…</div>
</details>
```

## Confirmación

```html
<div class="re-dialog-overlay re-dialog-overlay--confirm">
  <div class="re-dialog re-dialog--confirm" role="alertdialog" aria-modal="true"
       aria-labelledby="cfTitle" aria-describedby="cfMsg">
    <div class="re-dialog__confirm-body">
      <span class="re-dialog__confirm-icon"><ng-icon name="lucideTriangleAlert" size="15" /></span>
      <div class="min-w-0">
        <h3 class="re-dialog__title" id="cfTitle">¿Eliminar user_session?</h3>
        <p class="re-dialog__message" id="cfMsg">Está protegida. Se borrará solo esta cookie.</p>
      </div>
    </div>
    <footer class="re-dialog__footer">
      <button type="button" class="re-btn re-btn--ghost" #cancel>{{ t('common.cancel') }}</button>
      <button type="button" class="re-btn re-btn--danger">{{ t('common.delete') }}</button>
    </footer>
  </div>
</div>
```

## Comportamiento

- Al abrir, el foco va al primer campo (editor) o a «Cancelar» (confirmación). Tab no sale del diálogo.
- Esc cierra el diálogo de arriba; al cerrar, el foco vuelve al botón que lo abrió.
- Clic en el velo: cierra el editor solo si no hay cambios sin guardar; la confirmación no se cierra
  con el velo.
- Un diálogo no abre otro editor; sí puede abrir una confirmación.

## Reglas

- Ancho máximo 512px (editor) y 320px (confirmación); alto máximo 92% de la ventana, con scroll en
  el cuerpo. La hoja ocupa la ventana entera.
- Footer: destructivo a la izquierda (`re-dialog__footer-start`), Cancelar y la primaria a la derecha.
- El botón primario es el `submit` del formulario.
