/* ACCESO AL PORTAFOLIO */
(function () {
  "use strict";

  const USUARIO_VALIDO = "david";
  const CLAVE_VALIDA = "123";
  const LLAVE_SESION = "portafolioDavidAcceso";

  function $(id) { return document.getElementById(id); }

  function mostrarPortafolio() {
    const loginScreen = $("loginScreen");
    const appRoot = $("appRoot");
    if (loginScreen) {
      loginScreen.hidden = true;
      loginScreen.style.display = "none";
    }
    if (appRoot) {
      appRoot.hidden = false;
      appRoot.style.display = "";
    }
  }

  function mostrarLogin() {
    const loginScreen = $("loginScreen");
    const appRoot = $("appRoot");
    if (appRoot) {
      appRoot.hidden = true;
      appRoot.style.display = "none";
    }
    if (loginScreen) {
      loginScreen.hidden = false;
      loginScreen.style.display = "flex";
    }
    const error = $("loginError");
    if (error) error.hidden = true;
  }

  function guardarSesion() {
    try { sessionStorage.setItem(LLAVE_SESION, "true"); } catch (e) {}
  }

  function borrarSesion() {
    try { sessionStorage.removeItem(LLAVE_SESION); } catch (e) {}
    try { localStorage.removeItem(LLAVE_SESION); } catch (e) {}
  }

  function tieneSesion() {
    try {
      return sessionStorage.getItem(LLAVE_SESION) === "true" ||
             localStorage.getItem(LLAVE_SESION) === "true";
    } catch (e) {
      return false;
    }
  }

  // Función global: también permite entrar si el evento submit del navegador falla.
  window.ingresarAlPortafolio = function (evento) {
    if (evento) evento.preventDefault();

    const user = $("loginUser");
    const pass = $("loginPass");
    const error = $("loginError");
    const form = $("loginForm");

    const usuario = user ? user.value.trim().toLowerCase() : "";
    const clave = pass ? pass.value : "";

    if (usuario === USUARIO_VALIDO && clave === CLAVE_VALIDA) {
      guardarSesion();
      try { localStorage.setItem(LLAVE_SESION, "true"); } catch (e) {}
      if (error) error.hidden = true;
      mostrarPortafolio();
      return false;
    }

    if (error) error.hidden = false;
    if (pass) {
      pass.value = "";
      pass.focus();
    }
    if (form) {
      form.classList.remove("login__form--shake");
      void form.offsetWidth;
      form.classList.add("login__form--shake");
    }
    return false;
  };

  window.cerrarSesion = function (evento) {
    if (evento) evento.preventDefault();
    borrarSesion();
    mostrarLogin();
    const user = $("loginUser");
    const pass = $("loginPass");
    if (user) user.focus();
    if (pass) pass.value = "";
    return false;
  };

  // Inicialización
  const form = $("loginForm");
  const btnSalir = $("btnSalir");

  if (form) {
    form.addEventListener("submit", window.ingresarAlPortafolio);
  }
  if (btnSalir) {
    btnSalir.addEventListener("click", window.cerrarSesion);
  }

  if (tieneSesion()) {
    mostrarPortafolio();
  } else {
    mostrarLogin();
  }
})();
