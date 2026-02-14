/**
 * Transición única para Fer — partículas que convergen, corazón que florece,
 * chispas y texto revelado. Más llamativa y especial que el resto.
 */
(function () {
  'use strict';

  var DURACION_MS = 7500;
  var PARTICULAS = 50;
  var CHISPAS = 24;
  var FER_URL = 'fer.html';

  function crearParticula() {
    var p = document.createElement('div');
    p.className = 'particula';
    var corner = Math.floor(Math.random() * 4);
    var x0, y0;
    if (corner === 0) { x0 = Math.random() * 25; y0 = Math.random() * 25; }
    else if (corner === 1) { x0 = 75 + Math.random() * 25; y0 = Math.random() * 25; }
    else if (corner === 2) { x0 = Math.random() * 25; y0 = 75 + Math.random() * 25; }
    else { x0 = 75 + Math.random() * 25; y0 = 75 + Math.random() * 25; }
    var xPx = (x0 / 100) * window.innerWidth;
    var yPx = (y0 / 100) * window.innerHeight;
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    p.style.setProperty('--px', xPx + 'px');
    p.style.setProperty('--py', yPx + 'px');
    p.style.setProperty('--dx', (cx - xPx - 4) + 'px');
    p.style.setProperty('--dy', (cy - yPx - 4) + 'px');
    p.style.animationDelay = (Math.random() * 0.6) + 's';
    return p;
  }

  function crearChispa(index) {
    var c = document.createElement('div');
    c.className = 'chispa';
    var angle = (index / CHISPAS) * Math.PI * 2 + Math.random() * 0.5;
    var dist = 150 + Math.random() * 100;
    var tx = Math.cos(angle) * dist;
    var ty = Math.sin(angle) * dist;
    c.style.setProperty('--tx', tx + 'px');
    c.style.setProperty('--ty', ty + 'px');
    c.style.animationDelay = '2.6s';
    return c;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var aura = document.querySelector('.particulas-aura');
    if (aura) {
      for (var i = 0; i < PARTICULAS; i++) {
        aura.appendChild(crearParticula());
      }
    }

    var chispas = document.querySelector('.chispas-container');
    if (chispas) {
      for (var j = 0; j < CHISPAS; j++) {
        chispas.appendChild(crearChispa(j));
      }
    }

    setTimeout(function () {
      document.body.classList.add('salida-fer');
      setTimeout(function () {
        window.location.href = FER_URL;
      }, 1200);
    }, DURACION_MS);
  });
})();
