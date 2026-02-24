/**
 * ========================================
 * SCRIPT PERSONALIZADO - EJERCICIO 3
 * Sistema de Login con jQuery y Ajax
 * ========================================
 */

$(document).ready(function() {
    // ========================================
    // VARIABLES GLOBALES
    // ========================================
    const $form = $('#loginForm');
    const $username = $('#username');
    const $password = $('#password');
    const $submitBtn = $('#submitBtn');
    const $togglePassword = $('#togglePassword');

    // ========================================
    // FUNCIONES DE VALIDACIÓN
    // ========================================

    /**
     * Valida que el campo de usuario no esté vacío
     * @returns {boolean}
     */
    function validarUsuario() {
        const valor = $username.val().trim();
        
        if (valor === '') {
            mostrarError($username, 'El usuario es requerido');
            return false;
        }
        
        // Validar longitud mínima
        if (valor.length < 3) {
            mostrarError($username, 'El usuario debe tener al menos 3 caracteres');
            return false;
        }
        
        // Validar que solo contenga caracteres válidos (letras, números, guiones)
        if (!/^[a-zA-Z0-9_-]+$/.test(valor)) {
            mostrarError($username, 'El usuario solo puede contener letras, números, guiones y guiones bajos');
            return false;
        }
        
        mostrarExito($username);
        return true;
    }

    /**
     * Valida que el campo de contraseña no esté vacío
     * @returns {boolean}
     */
    function validarPassword() {
        const valor = $password.val();
        
        if (valor === '') {
            mostrarError($password, 'La contraseña es requerida');
            return false;
        }
        
        // Validar longitud mínima
        if (valor.length < 4) {
            mostrarError($password, 'La contraseña debe tener al menos 4 caracteres');
            return false;
        }
        
        mostrarExito($password);
        return true;
    }

    /**
     * Muestra el mensaje de error en el campo
     * @param {jQuery} $input - Elemento input
     * @param {string} mensaje - Mensaje de error
     */
    function mostrarError($input, mensaje) {
        $input.removeClass('is-valid');
        $input.addClass('is-invalid');
        $input.next('.invalid-feedback').text(mensaje);
    }

    /**
     * Muestra el estado de éxito en el campo
     * @param {jQuery} $input - Elemento input
     */
    function mostrarExito($input) {
        $input.removeClass('is-invalid');
        $input.addClass('is-valid');
    }

    /**
     * Limpia el estado de validación del campo
     * @param {jQuery} $input - Elemento input
     */
    function limpiarValidacion($input) {
        $input.removeClass('is-invalid is-valid');
    }

    // ========================================
    // EVENTOS DE VALIDACIÓN EN TIEMPO REAL
    // ========================================

    // Validar usuario al perder el foco
    $username.on('blur', function() {
        validarUsuario();
    });

    // Validar contraseña al perder el foco
    $password.on('blur', function() {
        validarPassword();
    });

    // Limpiar validación al escribir
    $username.on('input', function() {
        limpiarValidacion($username);
    });

    $password.on('input', function() {
        limpiarValidacion($password);
    });

    // ========================================
    // MOSTRAR/OCULTAR CONTRASEÑA
    // ========================================
    $togglePassword.on('click', function() {
        const tipoActual = $password.attr('type');
        const $icono = $('#eyeIcon');
        
        if (tipoActual === 'password') {
            $password.attr('type', 'text');
            $icono.removeClass('fa-eye');
            $icono.addClass('fa-eye-slash');
        } else {
            $password.attr('type', 'password');
            $icono.removeClass('fa-eye-slash');
            $icono.addClass('fa-eye');
        }
    });

    // ========================================
    // ENVÍO DEL FORMULARIO CON AJAX
    // ========================================
    $form.on('submit', function(e) {
        // Prevenir envío tradicional del formulario
        e.preventDefault();

        // Validar campos antes de enviar
        const usuarioValido = validarUsuario();
        const passwordValido = validarPassword();

        // Si la validación falla, mostrar mensaje y salir
        if (!usuarioValido || !passwordValido) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Por favor complete todos los campos correctamente',
                confirmButtonColor: '#667eea'
            });
            return;
        }

        // Deshabilitar botón y mostrar indicador de carga
        $submitBtn.prop('disabled', true);
        $submitBtn.find('.btn-text').addClass('d-none');
        $submitBtn.find('.btn-loading').removeClass('d-none');

        // Preparar datos para enviar
        const datos = {
            username: $username.val().trim(),
            password: $password.val()
        };

        // Enviar solicitud Ajax
        $.ajax({
            url: 'login.php',
            type: 'POST',
            dataType: 'json',
            data: datos,
            success: function(respuesta) {
                // Habilitar botón nuevamente
                $submitBtn.prop('disabled', false);
                $submitBtn.find('.btn-text').removeClass('d-none');
                $submitBtn.find('.btn-loading').addClass('d-none');

                // Procesar respuesta del servidor
                if (respuesta.success) {
                    // Login exitoso
                    Swal.fire({
                        icon: 'success',
                        title: '¡Bienvenido!',
                        text: respuesta.message,
                        confirmButtonColor: '#28a745',
                        allowOutsideClick: false,
                        willClose: () => {
                            // Aquí redirigir a la página principal o mostrar panel
                            window.location.href = 'dashboard.html';
                        }
                    });
                } else {
                    // Login fallido
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Acceso',
                        text: respuesta.message,
                        confirmButtonColor: '#dc3545'
                    });
                    
                    // Animación de error
                    $('.login-card').addClass('shake');
                    setTimeout(() => {
                        $('.login-card').removeClass('shake');
                    }, 500);
                }
            },
            error: function(xhr, status, error) {
                // Habilitar botón nuevamente
                $submitBtn.prop('disabled', false);
                $submitBtn.find('.btn-text').removeClass('d-none');
                $submitBtn.find('.btn-loading').addClass('d-none');

                // Mensaje de error de conexión
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Conexión',
                    text: 'No se pudo conectar con el servidor. Verifique su conexión e intente nuevamente.',
                    confirmButtonColor: '#667eea'
                });
                
                console.error('Error Ajax:', status, error);
            }
        });
    });

    // ========================================
    // FUNCIÓN AUXILIAR: SANITIZAR ENTRADA
    // ========================================
    function sanitizarEntrada(texto) {
        // Eliminar caracteres especiales potencialmente peligrosos
        return texto
            .replace(/[<>"'&]/g, '') // Eliminar caracteres HTML
            .trim();                 // Eliminar espacios al inicio y final
    }
});
