const winston = require("winston");
const fs = require("fs");
const path = require("path");

// Ruta del directorio de logs
const logDir = "/logs";

// Verificar y crear el directorio si no existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
  console.log(`Directorio creado: ${logDir}`);
}

// Configuración del logger
const logger = winston.createLogger({
  level: "info", // Nivel mínimo de logs a registrar
  format: winston.format.combine(
    winston.format.splat(), // Interpolación de mensajes
    winston.format.timestamp(), // Agrega una marca de tiempo
    winston.format.json() // Formato JSON para los logs
  ),
  transports: [
    // Transporte para información (solo nivel 'info')
    new winston.transports.File({
      filename: path.join(logDir, "audit_movies.log"), // Archivo para información
      level: "info", // Solo registra información
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    // Transporte para consola (opcional)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorea los mensajes en consola
        winston.format.simple() // Formato simple para consola
      ),
    }),
  ],
});

module.exports = logger;
