/**
 * Página especial de Fer — interactiva, única y llamativa.
 * - Corazón clicable: spawn de corazones flotantes
 * - Brillo que sigue al cursor
 * - Clic en la carta también genera corazones
 */
(function () {
  'use strict';

  var HEART_CHARS = ['♥', '💕', '💗', '💖', '💘', '❤️', '💝'];
  var MAX_FLOATING = 30;

  function crearCorazonFlotante(x, y) {
    var container = document.getElementById('floating-hearts');
    if (!container) return;

    var count = container.querySelectorAll('.floating-heart').length;
    if (count >= MAX_FLOATING) return;

    var heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    heart.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
    heart.style.color = Math.random() > 0.5 ? '#d4af37' : '#b76e79';

    container.appendChild(heart);
    setTimeout(function () {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 2600);
  }

  function spawnHearts(e, count) {
    count = count || 5;
    var x = e.clientX;
    var y = e.clientY;
    for (var i = 0; i < count; i++) {
      setTimeout(function () {
        crearCorazonFlotante(x + (Math.random() * 40 - 20), y + (Math.random() * 40 - 20));
      }, i * 80);
    }
  }

  function moverBrillo(e) {
    var glow = document.getElementById('cursor-glow');
    if (!glow) return;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var corazon = document.getElementById('corazon-fer');
    var card = document.getElementById('card-fer');

    if (corazon) {
      corazon.addEventListener('click', function (e) {
        spawnHearts(e, 8);
      });
      corazon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var rect = corazon.getBoundingClientRect();
          spawnHearts({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 }, 8);
        }
      });
    }

    if (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('#corazon-fer')) return;
        if (e.target.closest('.mensaje') || e.target.closest('.subtitulo-especial')) {
          spawnHearts(e, 4);
        }
      });
    }

    document.addEventListener('mousemove', moverBrillo);

    document.addEventListener('touchstart', function (e) {
      if (e.touches.length > 0) {
        var t = e.touches[0];
        moverBrillo({ clientX: t.clientX, clientY: t.clientY });
      }
    }, { passive: true });

    /* Burst inicial de corazones al cargar — cerca del corazón */
    setTimeout(function () {
      var corazonEl = document.getElementById('corazon-fer');
      if (!corazonEl) return;
      var rect = corazonEl.getBoundingClientRect();
      var cx = rect.left + rect.width / 2 - 15;
      var cy = rect.top + rect.height / 2 - 10;
      for (var i = 0; i < 4; i++) {
        setTimeout(function () {
          crearCorazonFlotante(cx + (Math.random() * 60 - 30), cy + (Math.random() * 40 - 20));
        }, i * 120);
      }
    }, 2200);
  });
})();
