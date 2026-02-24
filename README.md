# 🧮 Laboratorio #1 - Programación en Internet

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

## 📋 Descripción

Este proyecto contiene el primer laboratorio de la asignatura **Programación en Internet**, desarrollado completamente con tecnologías web modernas. El laboratorio incluye tres ejercicios progresivos que abarcan desde JavaScript puro hasta sistemas cliente-servidor con PHP y Ajax.

## 🎯 Ejercicios Incluidos

### Ejercicio 1: Calculadora con JavaScript Puro
- Implementación básica con HTML5 y JavaScript vanilla
- Validaciones completas de campos y tipos de datos
- Validación especial para división entre cero
- Uso de parseFloat() para números decimales
- Diseño ordenado y centrado

### Ejercicio 2: Calculadora Bootstrap + jQuery
- Diseño moderno con Bootstrap 5
- Interfaz responsiva y adaptativa
- Botones con colores diferenciados
- Animaciones suaves
- Mensajes elegantes con SweetAlert2
- Validaciones con jQuery

### Ejercicio 3: Sistema de Login Profesional
- **Frontend**: Bootstrap 5, jQuery, Ajax
- **Backend**: PHP con validación de seguridad
- Validación cliente-servidor
- Comunicación sin recargar la página (Ajax)
- Protección contra inyección básica
- Sistema de logging de accesos
- Credenciales de prueba: `admin` / `123456`

## 🚀 Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de las páginas |
| CSS3 | Estilos y diseño |
| JavaScript | Lógica del cliente |
| Bootstrap 5 | Framework CSS responsivo |
| jQuery | Manipulación del DOM y Ajax |
| PHP | Procesamiento del servidor |
| SweetAlert2 | Mensajes de alerta elegantes |

## 📁 Estructura del Proyecto

```
Laboratorio1/
├── index.html              # Página principal
├── README.md               # Este archivo
├── ejercicio1/
│   └── index.html          # Calculadora JS puro
├── ejercicio2/
│   └── index.html          # Calculadora Bootstrap + jQuery
├── ejercicio3/
│   ├── index.html          # Formulario de login
│   ├── script.js           # Lógica JavaScript + Ajax
│   ├── styles.css         # Estilos personalizados
│   ├── login.php           # Backend PHP
│   └── dashboard.html     # Página de acceso exitoso
└── Informe/
    └── informe.html        # Documentación formal
```

## ⚙️ Requisitos

Para ejecutar el laboratorio en tu entorno local:

### Para Ejercicios 1 y 2:
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a Internet (para cargar librerías CDN)

### Para Ejercicio 3 (PHP):
- Servidor web (XAMPP, WAMP, MAMP, Laragon, etc.)
- PHP 7.4 o superior
- Navegador web moderno

## 🔧 Instalación y Uso

### Instrucciones para Ejercicios 1 y 2:
1. Clona o descarga este repositorio
2. Navega a la carpeta `Laboratorio1`
3. Abre el archivo `index.html` en tu navegador
4. Selecciona el ejercicio que deseas probar

### Instrucciones para Ejercicio 3:
1. Instala un servidor web con PHP (XAMPP recomendado)
2. Coloca la carpeta `Laboratorio1` en el directorio `htdocs` o `www`
3. Inicia Apache desde el panel de XAMPP
4. Abre `http://localhost/Laboratorio1/ejercicio3/index.html`
5. Ingresa las credenciales: `admin` / `123456`

## 📝 Validaciones Implementadas

### Cliente (JavaScript/jQuery):
- ✅ Campos vacíos
- ✅ Tipos de datos numéricos
- ✅ División entre cero
- ✅ Longitud mínima de caracteres
- ✅ Caracteres especiales no permitidos

### Servidor (PHP):
- ✅ Sanitización de entradas
- ✅ Validación de longitud
- ✅ Filtrado de caracteres peligrosos
- ✅ Registro de intentos de login

## 🔐 Credenciales de Prueba (Ejercicio 3)

| Usuario | Contraseña |
|---------|------------|
| admin | 123456 |
| usuario | password |
| profesor | uni2024 |

## 📄 Documentación

El informe formal del laboratorio está disponible en:
- `Laboratorio1/Informe/informe.html`

## 👨‍🏫 Información Académica

- **Asignatura**: Programación en Internet
- **Universidad**: Universidad Salesiana de Bolivia
- **Carrera**: Ingeniería de Sistemas - 7° Semestre
- **Estudiante**: Beymar Fabian Rodriguez Machicado
- **Docente**: Edson Veneros
- **Fecha**: 23/02/2026

## 🤝 Contribuciones

Este proyecto fue desarrollado con fines educativos. Si deseas mejorarlo:

1. Haz un Fork del proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - puedes usarlo libremente con fines educativos.

---

⌨️ Desarrollado con ❤️ para fines educativos
