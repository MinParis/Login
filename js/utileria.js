/* =========================================================
   utileria.js
   ========================================================= */

/**
 * Valida que un correo electrónico tenga un formato correcto.
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(correo).trim());
}

/**
 * Valida que una contraseña cumpla con reglas mínimas de seguridad:
 * al menos 6 caracteres, una mayúscula, una minúscula,
 * un número y un carácter especial.
 * @param {string} pass
 * @returns {boolean}
 */
function validarPassword(pass) {
    pass = String(pass).trim();
    if (pass.length < 6) return false;
    if (!/[A-Z]/.test(pass)) return false;
    if (!/[a-z]/.test(pass)) return false;
    if (!/[0-9]/.test(pass)) return false;
    if (!/[\W_]/.test(pass)) return false;
    return true;
}

/**
 * Valida que un número de control tenga exactamente
 * una cantidad determinada de dígitos numéricos (por defecto 6).
 * @param {string} numControl
 * @param {number} longitud
 * @returns {boolean}
 */
function validarNumControl(numControl, longitud = 6) {
    const regex = new RegExp(`^\\d{${longitud}}$`);
    return regex.test(String(numControl).trim());
}

/**
 * Valida que un campo de texto no esté vacío.
 * @param {string} valor
 * @returns {boolean}
 */
function validarNoVacio(valor) {
    return String(valor).trim() !== '';
}

/**
 * Calcula si una persona es mayor de edad a partir de su edad en años.
 * @param {number} edad
 * @returns {boolean}
 */
function esMayorDeEdad(edad) {
    return Number(edad) >= 18;
}

/**
 * Muestra una alerta simple. Centraliza el manejo de mensajes
 * por si más adelante se quiere cambiar por un componente visual (toast, etc).
 * @param {string} mensaje
 */
function mostrarAlerta(mensaje) {
    alert(mensaje);
}
