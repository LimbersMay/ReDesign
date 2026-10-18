# ReToast

Confirma lo que acaba de pasar y, si se puede, ofrece **Deshacer**. Superficie inversa (oscura en
claro, gris elevado en oscuro), centrada encima de la status bar. Viene de ReTabs (toast con acción
y temporizador).

```html
<div class="re-toast-region" aria-live="polite">
  <div class="re-toast" role="status" style="--re-toast-duration: 5s">
    <ng-icon class="re-toast__icon" name="lucideCheck" size="13" />
    <span class="re-toast__message">7 cookies eliminadas · 3 protegidas se conservan</span>
    <button type="button" class="re-toast__action">{{ t('common.undo') }}</button>
    <span class="re-toast__timer"></span>
  </div>
</div>
```

## Reglas

- Duración: 3s sin acción; 5s con «Deshacer». El temporizador se pausa con hover o foco.
- Un toast a la vez: uno nuevo sustituye al anterior.
- No se usa para errores que bloquean (eso va en línea con `re-error` o `re-notice--danger`) ni para
  avisar de lo que va a pasar (eso es una confirmación).
- Texto: participio + cantidad. Ver [foundations/content.md](../foundations/content.md).
- `--danger` cambia el color del icono cuando lo que se confirma es destructivo y no se puede deshacer.
