2. Backend (Node.js + Express)
Estructura de rutas y endpoints
2.1 Autenticación

Endpoint: POST /auth/register

Tabla relacionada: users

Datos requeridos: name, email, password

Función: Crear usuario nuevo, guardar hash de contraseña.

Endpoint: POST /auth/login

Tabla relacionada: users

Datos requeridos: email, password

Función: Validar usuario, devolver JWT.

# Flujo frontend:

Formulario de registro: name, email, password.

Formulario de login: email, password.

Guardar JWT en localStorage o cookie.

2.2 Reseñas de usuarios

Endpoint: POST /reviews

Tabla relacionada: reviews

Datos requeridos: user_id (desde JWT), movie_id, rating, comment

Función: Crear reseña de un usuario.

Endpoint: PUT /reviews/:id

Tabla relacionada: reviews

Datos requeridos: rating, comment

Función: Editar reseña propia (verificar user_id).

Endpoint: DELETE /reviews/:id

Tabla relacionada: reviews

Función: Eliminar reseña propia.

Endpoint: GET /reviews?movieId=XYZ

Tabla relacionada: reviews

Función: Obtener todas las reseñas de una película específica.

Flujo frontend:

Formulario de reseña en detalle de película.

Mostrar lista de reseñas debajo de la película.

Botón editar/eliminar visible solo para reseñas propias.

2.3 Películas (TMDB API)

Endpoint: GET /movies?query=XYZ

Datos requeridos: query (término de búsqueda)

Función: Llamar a TMDB, devolver listado de películas.

Endpoint: GET /movies/:id

Datos requeridos: id (TMDB)

Función: Detalles de la película, rating promedio, y reseñas locales (reviews).

Flujo frontend:

Buscador de películas en Home.

Página de detalle con información de TMDB y reseñas locales.

Tarjetas con título, poster, rating promedio.

3. Frontend (React.js)
Secciones principales y endpoints asociados
Sección	Endpoint backend	Función
Home / Buscador	GET /movies?query=XYZ	Mostrar películas populares y resultados de búsqueda.
Detalle película	GET /movies/:id + GET /reviews?movieId=XYZ	Mostrar info de película y reseñas.
Crear reseña	POST /reviews	Permitir al usuario agregar una reseña.
Editar reseña	PUT /reviews/:id	Editar reseña propia.
Eliminar reseña	DELETE /reviews/:id	Eliminar reseña propia.
Registro	POST /auth/register	Crear usuario.
Login	POST /auth/login	Iniciar sesión y obtener JWT.
Perfil de usuario	GET /users/:id + GET /reviews?userId=XYZ	Mostrar reseñas hechas por el usuario.
Componentes React sugeridos

Navbar → login, registro, estado logueado.

Home → listado de películas y buscador.

MovieDetail → detalles de película y reseñas.

ReviewForm → formulario para crear o editar reseña.

UserProfile → historial de reseñas del usuario.

4. Flujo de desarrollo recomendado

Base de datos

Crear tablas users y reviews.

Insertar datos de prueba para login y reseñas.

Backend

Implementar autenticación (/auth/register y /auth/login) y probar con MySQL.

Implementar endpoints de reseñas (/reviews) y probar inserción, edición y eliminación.

Implementar integración con TMDB para búsqueda y detalle de películas.

Frontend

Implementar login y registro.

Crear Home con buscador de películas.

Página de detalle de película con listado de reseñas.

Formulario para agregar y editar reseñas.

Historial de reseñas por usuario.

Pruebas finales

Verificar JWT y permisos.

Verificar consultas a MySQL.

Revisar integración de TMDB y caching opcional.

Ajustes responsive y UI.
