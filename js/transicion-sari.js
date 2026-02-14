/**
 * Página de transición secreta hacia Sari.
 * Genera corazones flotantes y redirige tras la animación.
 */
(function () {
  'use strict';

  var DURACION_TRANSICION_MS = 5500;
  var CORAZONES_TOTAL = 40;
  var SARI_URL = 'sari.html';

  var heartChars = ['♥', '💕', '💗', '💖', '💘', '❤️', '💝'];

  function crearCorazon() {
    var heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    return heart;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.hearts-container');
    if (container) {
      for (var i = 0; i < CORAZONES_TOTAL; i++) {
        container.appendChild(crearCorazon());
      }
    }

    setTimeout(function () {
      document.body.style.transition = 'opacity 0.8s ease';
      document.body.style.opacity = '0';
      setTimeout(function () {
        window.location.href = SARI_URL;
      }, 800);
    }, DURACION_TRANSICION_MS);
  });
})();
