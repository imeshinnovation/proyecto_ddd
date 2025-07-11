# Distribución de Películas en Streaming - API Gateway (DDD)

**Autor:** Alexander Rubio Caceres  
**Rol:** Ingeniero de Software | Especialista en Seguridad de la Información | Desarrollador Full Stack MERN  

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![DDD](https://img.shields.io/badge/Architecture-Domain%20Driven%20Design-orange)](https://domainlanguage.com/ddd/)
[![MERN](https://img.shields.io/badge/Stack-MERN-9cf)](https://www.mongodb.com/mern-stack)

## 📌 Visión del Proyecto
API REST basada en **Domain-Driven Design** para la distribución de películas en streaming, enfatizando:
- **Lenguaje Ubicuo** entre desarrolladores y expertos de dominio  
- **Microservicios** independientes y escalables  
- **Seguridad** integrada en capas  

## 🏗️ Arquitectura
```mermaid
graph TD
    A{Cloud Border}
    A --> B[API Gateway] --> C[Microservicio: Users]
    B --> D[Microservicio: Movies]
    C --> E[(MongoDB)]
    D --> E[(MongoDB)]