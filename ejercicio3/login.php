<?php
/**
 * ========================================
 * LOGIN.PHP - EJERCICIO 3
 * Sistema de Login con PHP y Ajax
 * ========================================
 */

// Establecer tipo de contenido como JSON
header('Content-Type: application/json');

// Configuración de zona horaria
date_default_timezone_set('America/Lima');

// ========================================
// CONFIGURACIÓN DE USUARIOS VÁLIDOS
// ========================================
$usuarios_validos = [
    'admin' => '123456',
    'usuario' => 'password',
    'profesor' => 'uni2024'
];

// ========================================
// FUNCIONES AUXILIARES
// ========================================

/**
 * Sanitiza una cadena de texto para prevenir inyección SQL básica
 * @param string $valor - Valor a sanitizar
 * @return string - Valor sanitizado
 */
function sanitizar($valor) {
    // Eliminar espacios en blanco al inicio y final
    $valor = trim($valor);
    
    // Eliminar barras invertidas
    $valor = stripslashes($valor);
    
    // Convertir caracteres especiales en entidades HTML
    $valor = htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
    
    return $valor;
}

/**
 * Registra un intento de login en el log
 * @param string $usuario - Usuario que intenta login
 * @param bool $exitoso - Si el login fue exitoso
 */
function registrarLog($usuario, $exitoso) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $fecha = date('Y-m-d H:i:s');
    $estado = $exitoso ? 'EXITOSO' : 'FALLIDO';
    
    $log = "[$fecha] IP: $ip - Usuario: $usuario - Estado: $estado\n";
    
    // Crear directorio de logs si no existe
    if (!is_dir('logs')) {
        mkdir('logs', 0755, true);
    }
    
    file_put_contents('logs/login.log', $log, FILE_APPEND);
}

/**
 * Envía una respuesta JSON y termina la ejecución
 * @param bool $success - Si la operación fue exitosa
 * @param string $message - Mensaje de respuesta
 * @param array $data - Datos adicionales
 */
function responder($success, $message, $data = []) {
    $respuesta = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    // Agregar datos adicionales si existen
    if (!empty($data)) {
        $respuesta = array_merge($respuesta, $data);
    }
    
    echo json_encode($respuesta);
    exit;
}

// ========================================
// PROCESAMIENTO DE LA SOLICITUD
// ========================================

// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(false, 'Método no permitido. Utilice POST para iniciar sesión.');
}

// ========================================
// OBTENER Y VALIDAR DATOS ENVIADOS
// ========================================

// Obtener datos del formulario
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// ========================================
// VALIDACIONES DEL LADO DEL SERVIDOR
// ========================================

// Validar que los campos no estén vacíos
if (empty($username)) {
    registrarLog('(vacío)', false);
    responder(false, 'El campo usuario es requerido.');
}

if (empty($password)) {
    registrarLog($username, false);
    responder(false, 'El campo contraseña es requerido.');
}

// Sanitizar entradas
$username = sanitizar($username);
$password = sanitizar($password);

// Validar longitud mínima del usuario
if (strlen($username) < 3) {
    registrarLog($username, false);
    responder(false, 'El usuario debe tener al menos 3 caracteres.');
}

// Validar que el usuario solo contenga caracteres válidos
if (!preg_match('/^[a-zA-Z0-9_-]+$/', $username)) {
    registrarLog($username, false);
    responder(false, 'El usuario contiene caracteres inválidos.');
}

// Validar longitud mínima de la contraseña
if (strlen($password) < 4) {
    registrarLog($username, false);
    responder(false, 'La contraseña debe tener al menos 4 caracteres.');
}

// ========================================
// VERIFICAR CREDENCIALES
// ========================================

// Verificar si el usuario existe en la lista de usuarios válidos
if (isset($usuarios_validos[$username]) && $usuarios_validos[$username] === $password) {
    // Credenciales correctas
    
    // Iniciar sesión (opcional)
    session_start();
    $_SESSION['usuario'] = $username;
    $_SESSION['login_time'] = time();
    $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    
    // Registrar login exitoso
    registrarLog($username, true);
    
    // Responder éxito
    responder(true, 'Bienvenido al sistema, ' . ucfirst($username) . '!', [
        'usuario' => $username,
        'redirect' => 'dashboard.html'
    ]);
} else {
    // Credenciales incorrectas
    
    // Registrar login fallido
    registrarLog($username, false);
    
    // Responder error
    responder(false, 'Usuario o contraseña incorrectos.');
}

// ========================================
// FIN DEL SCRIPT
// ========================================
