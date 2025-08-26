# 🧸 peluchesApp
Sistema integral de gestión para tienda de peluches online.  
Frontend en **React 19 + SCSS** · Backend en **Node 20 + Express 5 + Sequelize 6** · Base de datos **MySQL 8** · Orquestado con **Docker Compose**.
---

## 👤 Desarrollador
| Integrante |
|------------|
| **[Patricio]** |

---

## 🚀 Stack principal
| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 19 · React-Router 7 · SCSS (CRA) |
| **Backend** | Node 20 · Express 5 · Sequelize 6 |
| **DB** | MySQL 8.3 |
| **DevOps** | Docker · Docker Compose · Nodemon · Sequelize-CLI |

---

## 📁 Estructura general (monorepo)
```text
peluchesApp/
├── backend/
│   ├── src/
│   │   ├── modules/            # → 1 módulo = 1 carpeta (Peluches, Categorias, …)
│   │   │   └── Peluches/
│   │   │       ├── controllers/
│   │   │       ├── models/
│   │   │       ├── repositories/
│   │   │       ├── services/
│   │   │       └── validators/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   ├── middlewares/
│   │   ├── routes/             # index.js concatena rutas de todos los módulos
│   │   └── utils/
│   ├── config/
│   │   └── config.json         # ← usado por Sequelize-CLI dentro del contenedor
│   ├── .sequelizerc            # paths de modelos / migraciones / seeders
│   ├── .env                    # vars usadas solo por Node (host=mysql, etc.)
│   ├── Dockerfile.prod
│   ├── index.js                # entry-point Express
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── services/           # axios config y API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile.prod
│   └── package.json
│
├── docker-compose.yml
└── README.md   ← este archivo
```

## 🧸 Modelo de datos - Peluches

### Tabla: `peluches`
| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `id` | INT AUTO_INCREMENT | ID único del peluche | 1 |
| `nombre` | VARCHAR(100) | Nombre del peluche | "Osito Teddy Clásico" |
| `descripcion` | TEXT | Descripción detallada | "Peluche suave de oso marrón..." |
| `precio` | DECIMAL(10,2) | Precio en pesos | 12500.50 |
| `stock` | INT | Cantidad disponible | 25 |
| `imagen` | VARCHAR(255) | URL de la imagen | "https://..." |
| `categoria` | VARCHAR(50) | Categoría del peluche | "Osos", "Unicornios", "Perros" |
| `createdAt` | TIMESTAMP | Fecha de creación | Auto |
| `updatedAt` | TIMESTAMP | Fecha de actualización | Auto |

## 🔗 API Endpoints - CRUD Peluches

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/peluches` | Obtener todos los peluches |
| `GET` | `/api/peluches/:id` | Obtener un peluche específico |
| `POST` | `/api/peluches` | Crear nuevo peluche |
| `PUT` | `/api/peluches/:id` | Actualizar peluche existente |
| `DELETE` | `/api/peluches/:id` | Eliminar peluche |

---

## 🐳 Cómo levantar el proyecto con Docker

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/peluchesApp.git
cd peluchesApp
```

2. **Crear el archivo `.env` en `/backend/.env` con el siguiente contenido:**
```env
PORT=5000
DB_NAME=peluches_db
DB_USER=root
DB_PASSWORD=peluche123
DB_HOST=mysql
NODE_ENV=development
```

3. **Levantar el entorno:**
```bash
docker-compose up --build
```
El flag `--build` es necesario solo la primera vez o si cambias dependencias.

4. **Acceder al sistema:**
- **Frontend:** http://localhost:3000
- **Backend (API):** http://localhost:5000
- **Adminer:** http://localhost:8080

---

## 🗄️ Migraciones con Sequelize-CLI
### Ejecutar dentro del contenedor
```bash
# Aplicar migraciones pendientes
docker compose exec backend npx sequelize-cli db:migrate

# Revertir la última migración
docker compose exec backend npx sequelize-cli db:migrate:undo

# Revertir todas las migraciones
docker compose exec backend npx sequelize-cli db:migrate:undo:all

# Ver estado de migraciones
docker compose exec backend npx sequelize-cli db:migrate:status

# Ejecutar seeders
docker compose exec backend npx sequelize-cli db:seed:all
```

---

## 🎯 Funcionalidades Implementadas

### Frontend (React)
- ✅ Lista de peluches con diseño de cards
- ✅ Formulario para agregar/editar peluches
- ✅ Eliminación con modal de confirmación
- ✅ Búsqueda por nombre
- ✅ Filtros por categoría
- ✅ Diseño responsive con SCSS
- ✅ Manejo de estados de carga y errores

### Backend (Node.js + Express)
- ✅ API REST completa con validaciones
- ✅ Arquitectura modular por features
- ✅ Middleware de manejo de errores
- ✅ CORS configurado para desarrollo
- ✅ Logging de requests
- ✅ Validaciones con express-validator

---

## 📌 Contexto Académico

**Trabajo Práctico N°5** - Desarrollo Full Stack  
**Objetivos:** Docker, Azure, Desarrollo web, Máquinas virtuales, Nginx  
**Fecha de entrega:** 31/08/2025  

### Tareas completadas:
- [ ] Backend API CRUD
- [ ] Frontend que consume la API
- [ ] Dockerfiles para backend y frontend
- [ ] Docker Compose orchestration
- [ ] Subir imágenes a Docker Hub
- [ ] Máquina virtual en Azure
- [ ] Despliegue en producción
- [ ] Proxy inverso con Nginx (opcional)

---

## 📌 Notas adicionales

- El backend se conecta a MySQL usando el hostname `mysql`, ya que es el nombre del servicio definido en `docker-compose.yml`.
- Las migraciones se ejecutan automáticamente al levantar el contenedor backend.
- La base de datos se almacena en un volumen persistente para no perder datos.
- El frontend incluye hot-reload en desarrollo.

---

## 📬 Contacto

Para bugs o sugerencias sobre **peluchesApp**, contactá al desarrollador.  
¡Gracias por explorar este proyecto de tienda de peluches! 🧸