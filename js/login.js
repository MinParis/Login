/* =========================================================
   login.js
   Controla la animación de las tarjetas de login/registro
   y la validación del acceso al sistema.
   Usa las funciones de utileria.js (validarCorreo, validarPassword).
   ========================================================= */

const contenido = document.querySelector('.contenido');
const loginLink = document.querySelector('.login-link');
const registrarLink = document.querySelector('.registrar-link');
const btn = document.querySelector('.btnLogin');
const iconCerrar = document.querySelector('.icon-cerrar');

registrarLink.addEventListener('click', () => {
    contenido.classList.add('activo');
});

loginLink.addEventListener('click', () => {
    contenido.classList.remove('activo');
});

btn.addEventListener('click', () => {
    contenido.classList.add('activo-btn');
});

iconCerrar.addEventListener('click', () => {
    contenido.classList.remove('activo-btn');
});


// Usuario "válido" de demostración (no hay backend real).
const USUARIO_DEMO = 'usuario@gmail.com';
const PASS_DEMO = 'Clave123!';

document.getElementById('btn-login').addEventListener('click', function () {
    const email = document.getElementById('login-correo').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    if (!validarNoVacio(email) || !validarNoVacio(pass)) {
        mostrarAlerta('Por favor, completa todos los campos.');
        return;
    }

    if (!validarCorreo(email)) {
        mostrarAlerta('Por favor, ingresa un correo válido.');
        return;
    }

    if (!validarPassword(pass)) {
        mostrarAlerta('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
    }

    // Simulación de autenticación (sin backend).
    // Cualquier registro hecho en el formulario de "Registrar" también
    // se acepta, además del usuario de demostración.
    const usuarios = JSON.parse(sessionStorage.getItem('usuariosRegistrados') || '[]');
    const usuarioRegistrado = usuarios.find(u => u.correo === email && u.pass === pass);

    if ((email === USUARIO_DEMO && pass === PASS_DEMO) || usuarioRegistrado) {
        // Nombre a mostrar en el navbar del index.html
        const nombreMostrado = usuarioRegistrado ? usuarioRegistrado.usuario : email.split('@')[0];

        sessionStorage.setItem('usuarioActivo', JSON.stringify({
            nombre: nombreMostrado,
            correo: email
        }));

        window.location.href = 'index.html';
    } else {
        mostrarAlerta('Usuario o contraseña incorrectos.');
    }
});

/* ---------- Registro ---------- */
document.getElementById('form-registro').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('registro-usuario').value.trim();
    const correo = document.getElementById('registro-correo').value.trim();
    const pass = document.getElementById('registro-pass').value.trim();
    const terminos = document.getElementById('registro-terminos').checked;

    if (!validarNoVacio(usuario) || !validarNoVacio(correo) || !validarNoVacio(pass)) {
        mostrarAlerta('Por favor, completa todos los campos.');
        return;
    }

    if (!validarCorreo(correo)) {
        mostrarAlerta('Por favor, ingresa un correo válido.');
        return;
    }

    if (!validarPassword(pass)) {
        mostrarAlerta('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
    }

    if (!terminos) {
        mostrarAlerta('Debes aceptar los términos y condiciones.');
        return;
    }

    // Guarda el usuario registrado en esta sesión del navegador
    // para que pueda iniciar sesión (simulación sin backend).
    const usuarios = JSON.parse(sessionStorage.getItem('usuariosRegistrados') || '[]');
    usuarios.push({ usuario, correo, pass });
    sessionStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

    mostrarAlerta('¡Registro exitoso! Ahora inicia sesión con tus datos.');

    // Regresa a la tarjeta de login con los datos precargados
    contenido.classList.remove('activo');
    document.getElementById('login-correo').value = correo;
    document.getElementById('form-registro').reset();
});
