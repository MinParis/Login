/* =========================================================
   index.js
   ========================================================= */

/* ---------- Protección simple de la vista ----------
   Si no hay una sesión activa (no vino desde login.html),
   regresa al login. */
const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo') || 'null');

if (!usuarioActivo) {
    window.location.href = 'login.html';
}

/* ---------- Navbar: mostrar nombre del usuario ---------- */
if (usuarioActivo) {
    document.getElementById('usuario-nombre').textContent = usuarioActivo.nombre;
    document.getElementById('usuario-correo').textContent = usuarioActivo.correo;
    document.getElementById('usuario-avatar').textContent = usuarioActivo.nombre.charAt(0);
    document.getElementById('saludo-nombre').textContent = usuarioActivo.nombre;
}

/* ---------- Sidebar: colapsar / expandir (hamburguesa) ---------- */
const sidebar = document.getElementById('sidebar');
const btnHamburguesa = document.getElementById('btn-hamburguesa');

btnHamburguesa.addEventListener('click', () => {
    if (window.innerWidth <= 720) {
        sidebar.classList.toggle('movil-abierto');
    } else {
        sidebar.classList.toggle('colapsado');
    }
});

/* ---------- Sidebar: submenú Usuarios > Captura ---------- */
const btnUsuarios = document.getElementById('btn-usuarios');
const submenuUsuarios = document.getElementById('submenu-usuarios');

btnUsuarios.addEventListener('click', () => {
    btnUsuarios.classList.toggle('abierto');
    submenuUsuarios.classList.toggle('abierto');
});

/* ---------- Navegación entre vistas ---------- */
const botonesMenu = document.querySelectorAll('.menu-item[data-target], .submenu-item[data-target]');
const vistas = document.querySelectorAll('.vista');

botonesMenu.forEach(boton => {
    boton.addEventListener('click', () => {
        const destino = boton.getAttribute('data-target');

        // Actualiza estado visual del menú activo
        document.querySelectorAll('.menu-item, .submenu-item').forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');

        // Muestra la vista correspondiente
        vistas.forEach(v => v.classList.remove('activa'));
        document.getElementById(destino).classList.add('activa');

        // En móvil, cierra el sidebar al navegar
        if (window.innerWidth <= 720) {
            sidebar.classList.remove('movil-abierto');
        }
    });
});

/* ---------- Navbar: menú desplegable del usuario ---------- */
const usuarioBtn = document.getElementById('usuario-btn');
const usuarioDropdown = document.getElementById('usuario-dropdown');

usuarioBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    usuarioDropdown.classList.toggle('abierto');
});

document.addEventListener('click', () => {
    usuarioDropdown.classList.remove('abierto');
});

/* ---------- Salir del sistema ---------- */
document.getElementById('btn-salir').addEventListener('click', () => {
    sessionStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
});

/* ---------- Formulario: Usuarios > Captura ---------- */
const formCaptura = document.getElementById('form-captura-usuario');
const tablaUsuarios = document.querySelector('#tabla-usuarios tbody');

formCaptura.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('captura-usuario').value.trim();
    const correo = document.getElementById('captura-correo').value.trim();
    const pass = document.getElementById('captura-pass').value.trim();

    if (!validarNoVacio(usuario) || !validarNoVacio(correo) || !validarNoVacio(pass)) {
        mostrarAlerta('Completa todos los campos.');
        return;
    }

    if (!validarCorreo(correo)) {
        mostrarAlerta('El correo no tiene un formato válido.');
        return;
    }

    if (!validarPassword(pass)) {
        mostrarAlerta('La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
    }

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${usuario}</td><td>${correo}</td>`;
    tablaUsuarios.appendChild(fila);

    formCaptura.reset();
    mostrarAlerta('Usuario capturado correctamente.');
});

/* ---------- Formulario: Alumnos + Modal de edad ---------- */
const formAlumno = document.getElementById('form-alumno');
const tablaAlumnos = document.querySelector('#tabla-alumnos tbody');

const modalEdad = document.getElementById('modal-edad');
const modalIcono = document.getElementById('modal-icono');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');

formAlumno.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('alumno-nombre').value.trim();
    const numControl = document.getElementById('alumno-control').value.trim();
    const edad = document.getElementById('alumno-edad').value.trim();

    if (!validarNoVacio(nombre) || !validarNoVacio(numControl) || !validarNoVacio(edad)) {
        mostrarAlerta('Completa todos los campos.');
        return;
    }

    if (!validarNumControl(numControl, 6)) {
        mostrarAlerta('El número de control debe tener exactamente 6 dígitos.');
        return;
    }

    const fila = document.createElement('tr');
    const mayor = esMayorDeEdad(edad);
    fila.innerHTML = `<td>${nombre}</td><td>${numControl}</td><td>${edad}</td>
        <td>${mayor ? 'Mayor de edad' : 'Menor de edad'}</td>`;
    tablaAlumnos.appendChild(fila);

    // Muestra el modal con el resultado
    if (mayor) {
        modalIcono.setAttribute('name', 'checkmark-circle');
        modalTitulo.textContent = 'Mayor de edad';
        modalTexto.textContent = `${nombre} tiene ${edad} años y es mayor de edad.`;
    } else {
        modalIcono.setAttribute('name', 'alert-circle');
        modalTitulo.textContent = 'Menor de edad';
        modalTexto.textContent = `${nombre} tiene ${edad} años y es menor de edad.`;
    }
    modalEdad.classList.add('abierto');

    formAlumno.reset();
});

document.getElementById('modal-cerrar').addEventListener('click', () => {
    modalEdad.classList.remove('abierto');
});

document.getElementById('modal-aceptar').addEventListener('click', () => {
    modalEdad.classList.remove('abierto');
});

modalEdad.addEventListener('click', (e) => {
    if (e.target === modalEdad) {
        modalEdad.classList.remove('abierto');
    }
});
