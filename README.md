# 🎬 Distribución de Películas en Streaming - API Gateway (DDD)

**Autor:** Alexander Rubio Cáceres  
**Rol:** Ingeniero de Software | Especialista en Seguridad de la Información | Desarrollador Full Stack MERN  

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![DDD](https://img.shields.io/badge/Architecture-Domain%20Driven%20Design-orange)](https://domainlanguage.com/ddd/)  
[![MERN](https://img.shields.io/badge/Stack-MERN-9cf)](https://www.mongodb.com/mern-stack)

---

## 📌 Visión del Proyecto

API REST construida bajo **Domain-Driven Design (DDD)** para distribuir películas vía streaming, enfocada en:

- ✅ **Lenguaje ubicuo** entre desarrolladores y expertos del dominio  
- ✅ **Microservicios** desacoplados y escalables  
- ✅ **Seguridad multicapa** desde el acceso hasta la base de datos

---

## 🏗️ Arquitectura General

```mermaid
graph TD
    A{Cloud Border}
    A --> B{{Nginx}}
    B --> C[API Gateway]
    C --> D[Microservicio: Users]
    C --> E[Microservicio: Movies]
    D --> F[(MongoDB)]
    E --> F[(MongoDB)]
```

## 🐳 Diagrama de Despliegue Docker

```mermaid
graph TD
    subgraph Docker Cluster
        A[API Gateway: 8080]
        B[Users MS: 12301]
        C[Movies MS: 12302]
        D[(MongoDB: 27017)]
        F{{Nginx: 80,443}}
        G[Prometheus]
        
        F -->|Balanceo| A
        A -->|Routing| B
        A -->|Routing| C
        B --> D
        C --> D
        G -.->|Monitor| A
        G -.->|Monitor| B
        G -.->|Monitor| C
    end
```

### Características clave del diagrama:
1. **Aislamiento de Bases de Datos**: MongoDB separado para cada microservicio.
2. **Balanceador de Carga**: Nginx maneja tráfico entrante.
3. **Monitorización**: Integración con Prometheus.
4. **Variables de Entorno**: Configuración segura por servicio.
5. **Persistencia**: Volúmenes Docker para datos y código.