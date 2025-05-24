# Proyecto de Homologación de Pensum

Sistema backend para calcular homologaciones entre un pensum antiguo y uno nuevo. Permite generar reportes PDF oficiales para uso académico en la Universidad Popular del Cesar.

---

## Funcionalidades

- Calcular materias homologadas y faltantes por estudiante
- Generar reporte PDF oficial
- API RESTful en Node.js
- Base de datos Oracle
- Pruebas unitarias e integración con Jest
- Dockerización del backend

---

## Estructura del Proyecto

```
homologacion-app/
├── controllers/            # Lógica principal del negocio
├── routes/                 # Endpoints REST
├── services/               # Acceso a Oracle DB
├── utils/                  # Generación PDF
├── templates/              # Plantilla HTML para PDF
├── public/                 # Logo y archivos estáticos
├── config/                 # Conexión DB
├── tests/                  # Pruebas unitarias/integración
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

---

## Configuración

### 1. Variables de entorno

Crea un archivo `.env` con los siguientes datos:

```env
DB_USER=system
DB_PASSWORD=Oracle123
DB_CONNECT_STRING=oracle-db:1521/XEPDB1
```

> ⚠️ Asegúrate de que la base de datos Oracle esté accesible desde la red.

---

##  Pruebas

### Ejecutar pruebas unitarias y de integración:

```bash
npm run test
```

### Ver reporte de cobertura:

```bash
npm run test:coverage
```

---

##  Uso con Docker

### 1. Construir y levantar la app

```bash
docker-compose up --build
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

##  Endpoints

### POST `/homologacion/calcular`

**Body de entrada:**
```json
{
  "tipo_documento": "CC",
  "cedula": "1234567890",
  "nombre": "Juan Pérez",
  "materias_antiguas": [
    { "nombre": "Álgebra Lineal", "semestre": 1, "nota": 4.2 }
  ]
}
```

**Respuesta:**
```json
{
  "nombre": "Juan Pérez",
  "cedula": "1234567890",
  "creditos_homologados": 10,
  "creditos_faltantes": 110,
  "materias_faltantes": [...],
  "detalle_homologacion": [...]
}
```

---

### GET `/homologacion/reporte/pdf`

- Devuelve el PDF generado de la última homologación calculada.

---

##  Autor

- Julio Morales – _Backend Developer_

---

##  Licencia

Este proyecto es de uso académico y pertenece a la Universidad Popular del Cesar.