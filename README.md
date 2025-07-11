# 🎬 API Gateway (Arquitectura DDD)

**Autor:** Alexander Rubio Cáceres  
**Rol:** Ingeniero de Software | Especialista en Seguridad de la Información | Desarrollador Full Stack MERN  

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![DDD](https://img.shields.io/badge/Architecture-Domain%20Driven%20Design-orange)](https://domainlanguage.com/ddd/)  
[![MERN](https://img.shields.io/badge/Stack-MERN-9cf)](https://www.mongodb.com/mern-stack)

---

## 📌 Visión del Proyecto

API REST construida bajo **Domain-Driven Design (DDD)** para la gestión de películas vía streaming, enfocada en:

- ✅ **Lenguaje ubicuo** entre desarrolladores y expertos del dominio  
- ✅ **Microservicios** desacoplados y escalables  
- ✅ **Seguridad multicapa** desde el acceso hasta la base de datos

---

## 🏗️ Arquitectura General

```mermaid
graph TD
    A{Internet}
    A --> B{{Nginx}}
    B --> C[Prometheus]
    B --> D[API Gateway]
    D --> E[Microservicio: Users]
    D --> F[Microservicio: Movies]
    E -.-> C[Prometeus]
    F -.-> C[Prometeus]
    E --> G[(MongoDB)]
    F --> G[(MongoDB)]
    E -.-> H[[Logs]]
    F -.-> H[[Logs]]
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
        H[[Logs]]
        
        F -->|Balanceo| A
        A -->|Routing| B
        A -->|Routing| C
        B --> D
        C --> D
        B -..-> |Audit| H
        C -..-> |Audit| H
        G -.->|Monitor| A
        G -.->|Monitor| B
        G -.->|Monitor| C
    end
```

### Características clave del diagrama:
1. **Aislamiento de Bases de Datos**: MongoDB separado para microservicios.
2. **Balanceador de Carga**: Nginx maneja tráfico entrante.
3. **Monitorización**: Integración con Prometheus.
4. **Variables de Entorno**: Configuración segura por servicio.
5. **Persistencia**: Volúmenes Docker para datos y código.
6. **Auditoría**: Centralización de logs, eventos de los Microservicios.


### Instrucciones para el Despliegue
1. **Requisitos previos**: Instalar (En Linux) docker, containerd, docker-compose [En Windows docker-desktop] y postman
2. **Clonar el proyecto**: git clone https://github.com/imeshinnovation/proyecto_ddd.git
3. **Desplegar**: docker-compose up -d --build
4. **Ejecutar Pruebas**: Importar en Postman el set de pruebas alojado en el directorio testing_set
