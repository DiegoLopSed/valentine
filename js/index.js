/**
 * Animación y transición al hacer clic en los corazones del index.
 * Intercepta el clic, reproduce la animación de salida y luego navega.
 * Easter egg: 10 clics → Sari, 15 clics → Karen, 20 clics → Fer (sin redirigir hasta dejar de clicar).
 */
(function () {
  'use strict';

  var DURACION_TRANSICION_MS = 520;
  var CLICS_PARA_SARI = 10;
  var CLICS_PARA_KAREN = 15;
  var CLICS_PARA_FER = 20;
  var DELAY_REDIRECT_MS = 400;
  var clicsSecretos = 0;
  var timeoutRedirect = null;

  function redirigirSecreto() {
    if (clicsSecretos >= CLICS_PARA_FER) {
      window.location.href = 'paginas/transicion-fer.html';
    } else if (clicsSecretos >= CLICS_PARA_KAREN) {
      window.location.href = 'paginas/transicion-karen.html';
    } else if (clicsSecretos >= CLICS_PARA_SARI) {
      window.location.href = 'paginas/transicion-sari.html';
    }
    clicsSecretos = 0;
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Easter egg: 10 clics → Sari, 15 clics → Karen, 20 clics → Fer */
    document.addEventListener('click', function () {
      clicsSecretos += 1;
      clearTimeout(timeoutRedirect);
      if (clicsSecretos >= CLICS_PARA_SARI) {
        timeoutRedirect = setTimeout(redirigirSecreto, DELAY_REDIRECT_MS);
      }
    });

    var cards = document.querySelectorAll('.heart-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        var href = card.getAttribute('href');
        if (!href || href === '#' || card.hasAttribute('data-no-transition')) {
          return;
        }
        e.preventDefault();

        card.classList.add('heart-card--clicked');
        document.body.classList.add('navigating');

        setTimeout(function () {
          window.location.href = href;
        }, DURACION_TRANSICION_MS);
      });
    });
  });
})();
