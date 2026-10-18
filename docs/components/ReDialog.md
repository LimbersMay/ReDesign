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
  el cuerpo.
- Footer: destructivo a la izquierda (`re-dialog__footer-start`), Cancelar y la primaria a la derecha.
- El botón primario es el `submit` del formulario.
