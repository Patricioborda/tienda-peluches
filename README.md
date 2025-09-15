# 🧸 Tienda Capitan Capibara
Sistema integral de gestión para tienda de peluches online.  
Frontend en **React 19 + SCSS** · Backend en **Node 20 + Express 5 + Sequelize 6** · Base de datos **MySQL 8** · Orquestado con **Docker Compose** en VM de **Azure** con **Nginx** como proxy inverso.

---

## 👤 Desarrollador
| Integrante |
|------------|
| **Patricio** |

---

## 🚀 Stack principal
| Capa | Tecnologías |
|------|-------------|
| **Frontend** | React 19 · React-Router 7 · SCSS (CRA) · Axios |
| **Backend** | Node 20 · Express 5 · Sequelize 6 |
| **DB** | MySQL 8.3 |
| **DevOps / Infra** | Docker · Docker Compose · Nginx · Azure VM |

---

## 📁 Estructura general
```text
peluchesApp/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── utils/
│   ├── config/config.json
│   ├── .sequelizerc
│   ├── .env
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md

# 🐳 Levantar la aplicación en producción (Azure VM)

## 1. Clonar repositorio en la VM
```bash
git clone https://github.com/tu-usuario/peluchesApp.git
cd peluchesApp

##.env

```text
PORT=4000
DB_NAME=capibara_db
DB_USER=admin
DB_PASSWORD=capibara123
DB_HOST=db
NODE_ENV=production

docker compose up -d --build

Acceder al sistema desde la IP pública de la VM

Frontend (React vía Nginx): http://http://20.201.113.0/

Backend (API): http://http://20.201.113.0/api


## nginx

```text
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://backend:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}


##🔗 API Endpoints - CRUD Productos

| Método   | Endpoint             | Descripción                    |
| -------- | -------------------- | ------------------------------ |
| `GET`    | `/api/productos`     | Obtener todos los productos    |
| `GET`    | `/api/productos/:id` | Obtener un producto específico |
| `POST`   | `/api/productos`     | Crear nuevo producto           |
| `PUT`    | `/api/productos/:id` | Actualizar producto existente  |
| `DELETE` | `/api/productos/:id` | Eliminar producto              |


🗄️ Base de datos

DB: MySQL 8.

Volumen persistente para no perder datos: definido en docker-compose.yml.

Migraciones ejecutadas automáticamente al levantar backend en producción.

##🎯 Funcionalidades Implementadas Frontend

✅ Lista de peluches con diseño de cards

✅ Formulario para agregar/editar peluches

✅ Eliminación con modal de confirmación

✅ Búsqueda por nombre y filtros por categoría

✅ Diseño responsive con SCSS

✅ Manejo de estados de carga y errores

## Backend

✅ API REST completa con validaciones

✅ Arquitectura modular por features

✅ Middleware de manejo de errores

✅ Logging de requests

✅ Conexión segura a MySQL

✅ Migraciones y seeders automáticos

## 📌 Notas de producción

Todo el tráfico se sirve desde la IP de la VM vía Nginx.

El backend está accesible únicamente a través del proxy (/api).

La app ya no depende de Sequelize-CLI manual; migraciones se aplican al levantar el contenedor.

Puertos expuestos en Azure: 80 (frontend/Nginx) y 3307 (MySQL) para administración.
