/**
 * Animación y transición al hacer clic en los corazones del index.
 * Intercepta el clic, reproduce la animación de salida y luego navega.
 * Easter egg: 10 clics en cualquier lugar llevan a la página especial de Sari.
 */
(function () {
  'use strict';

  var DURACION_TRANSICION_MS = 520;
  var CLICS_PARA_SARI = 10;
  var clicsSecretos = 0;

  document.addEventListener('DOMContentLoaded', function () {
    /* Easter egg: 10 clics en la página → acceso a la página especial de Sari */
    document.addEventListener('click', function () {
      clicsSecretos += 1;
      if (clicsSecretos >= CLICS_PARA_SARI) {
        window.location.href = 'paginas/transicion-sari.html';
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
