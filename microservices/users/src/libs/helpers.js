const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config().parsed;
const jwt = require("jsonwebtoken");
const logger = require("./logger");

const saltRounds = 12;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const generateSecret = (Username) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  return {
    base32: secret.base32, // Clave secreta para almacenamiento
    otpauth_url: secret.otpauth_url.replace("SecretKey", "NetIX: " + Username),
    // URL para escanear en Google Authenticator
  };
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// 🔹 Configuración del transporte SMTP para Office 365
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // TLS requiere `false`
  auth: {
    user: dotenv.OFFICE365_USER, // Tu correo de Office 365
    pass: dotenv.OFFICE365_PASS, // Tu contraseña o App Password
  },
  tls: {
    ciphers: "SSLv3",
  },
});

// 🔹 Función para enviar correos
const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"GLIP" <${dotenv.OFFICE365_USER}>`,
      to: to,
      subject: subject,
      text: text, // Versión en texto plano
      html: html, // Versión con HTML
    });
    logger.info(`Correo enviado a ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error("Error al enviar correo:", error);
    throw error;
  }
};

const makeToken = (data, secret) => {
  const token = jwt.sign(data, secret, {
    algorithm: "HS512",
    expiresIn: dotenv.JWT_EXPIRES_IN,
  });
  return token;
};

// Middleware para validar JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    logger.info("verifyToken: Unauthorized " + req.url + " - " + req.method);
    return res.status(401).json({ message: "Unauthorized", status: 0 });
  }
  try {
    const verified = jwt.verify(
      token.replace("Bearer ", ""),
      req.body.serviceKey
    );
    req.user = verified;
    next();
  } catch (err) {
    logger.warn(
      "verifyToken: Invalid token " + req.url + " - " + req.method);
    res.status(403).json({ message: "Invalid token", status: 0 });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateSecret,
  sendMail,
  makeToken,
  verifyToken,
};
