# Proyecto de Gestión de Colonias

Este proyecto es una aplicación que permite gestionar colonias y sus respectivos comentarios. Los usuarios pueden agregar, modificar y eliminar colonias, así como ver y gestionar los comentarios asociados a cada colonia.

## Tecnologías Utilizadas

- **Backend**: Node.js con Express
- **Base de Datos**: SQLite3
- **Frontend**: HTML, CSS, JavaScript
- **API**: RESTful API


1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Slacarta11/colonias.git

## Instalación y Configuración

1. **En carpeta backend instala las dependencias**

npm install

2. **Iniciar tanto el backend como el frontend (iniciar en sus respectivas carpetas con cd "Nombre del a carpeta")**

npm start

## ESTRUCTURA DEL PROYECTO

/frontend

  /index.html              # Vista para listar colonias registradas.

  /registro.html           # Formulario para registrar nuevas colonias.

  /modificar.html          # Formulario para modificar colonias existentes.

  /comentarios.html        # Vista para ver y agregar comentarios de una colonia.

  /modificarComentario.html# Formulario para modificar un comentario.

  /comentarios.js          # Lógica JavaScript para manejar los comentarios.

/backend

  /index.js                # Backend en Node.js con Express para manejar rutas RESTful.

  /colonias.db             # Base de datos SQLite que almacena la información de las colonias y los comentarios.
