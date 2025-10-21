# API REST de Tareas con Autenticación de Usuarios (Firebase + Express)

Repositorio con un **API REST de tareas y autenticación de usuarios** implementada con **Express** y **Firebase Firestore** como base de datos.

---

## Dependencias utilizadas

- **Express**
- **Firebase Admin SDK**
- **Bcrypt** – para encriptar contraseñas
- **JSON Web Tokens (JWT)** – para autenticación
- **Dotenv** – para manejar variables de entorno

---

## Estructura del proyecto

```

src/
├── controllers/
│   ├── auth.controller.js
│   └── task.controllers.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── task.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── app.js
├── config.js
.env

````

---

## Endpoints principales

### Autenticación (`/api/auth`)

| Método | Ruta        | Descripción                  | Autenticación |
| :----- | :---------- | :--------------------------- | :------------ |
| POST   | `/register` | Registra un nuevo usuario    | No            |
| POST   | `/login`    | Inicia sesión y devuelve JWT | No            |

---

### Tareas (`/api/tasks`)

| Método | Ruta   | Descripción                   | Autenticación |
| :----- | :----- | :---------------------------- | :------------ |
| GET    | `/`    | Obtiene todas las tareas      | Si            |
| GET    | `/:id` | Obtiene una tarea por su ID   | Si            |
| POST   | `/`    | Crea una nueva tarea          | Si            |
| PUT    | `/:id` | Actualiza una tarea existente | Si            |
| DELETE | `/:id` | Elimina una tarea             | Si            |

> Todas las rutas de tareas requieren un token JWT válido. Generado al iniciar sesión (login)

---

## Modelos de datos

### Usuario

| Campo    | Tipo   | Ejemplo                                                          |
| :------- | :----- | :--------------------------------------------------------------- |
| username | String | `"Javier Jara"`                                                  |
| password | String | `"CONTRASEÑA ENCRIPTADA"` |

### Tarea

| Campo       | Tipo    | Ejemplo                             |
| :---------- | :------ | :---------------------------------- |
| title       | String  | `"Tarea de ejemplo"` (Obligatorio)  |
| description | String  | `"Esta es una tarea de ejemplo."`   |
| completed   | Boolean | `false` (por defecto)               |

---

1. **Registro de usuario**

   ```bash
   POST /api/auth/register
   {
     "username": "Javier",
     "password": "1234"
   }
   ```

2. **Inicio de sesión**

   ```bash
   POST /api/auth/login
   {
     "username": "Javier",
     "password": "1234"
   }
   ```

   Respuesta:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
   }
   ```

3. **Uso del token**

   ```http
   GET /api/tasks
   Authorization: Bearer <token>
   ```

---

## Diferencias entre modelos y controladores: Firebase vs Arreglo Local

### 🔹 Modelos

| Aspecto             | Con Arreglo Local                            | Con Firebase Firestore                                                  |
| :------------------ | :------------------------------------------- | :---------------------------------------------------------------------- |
| **Estructura**      | Usa un arreglo en memoria (`let tasks = []`) | Usa una colección de documentos en Firestore (`db.collection("tasks")`) |
| **Consultas**       | Métodos síncronos (`find`, `push`, `splice`) | Métodos asíncronos con `await`                                          |
| **Identificadores** | Generados con `randomUUID()`                 | Autogenerados por Firestore (`collection.add()`)                        |
| **Acceso a datos**  | Directo y en memoria                         | A través de `snapshot.docs.map()` o `doc.data()`                        |

### Controladores

| Aspecto                 | Con Arreglo Local               | Con Firebase Firestore                                       |
| :---------------------- | :------------------------------ | :----------------------------------------------------------- |
| **Manejo de errores**   | Prácticamente inexistente       | Se envuelven en bloques `try...catch`                        |
| **Flujo**               | Todo es inmediato (sin `await`) | Cada operación requiere `await`                              |
| **Código de respuesta** | Directo y simple                | Incluye validaciones de conexión o inexistencia de documento |

---

## Notas

* El proyecto usa Firebase como reemplazo de los arreglos de objetos utilizados en API rest anteriores.
---