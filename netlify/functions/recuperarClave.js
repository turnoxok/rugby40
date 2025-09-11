// netlify/functions/recuperarClave.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    // Solo aceptar POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parsear el body
    const { email, clave } = JSON.parse(event.body);

    if (!email || !clave) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: "error", msg: "Faltan datos" }),
      };
    }

    // Configuración del transporter con variables de entorno
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opciones del mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperar clave",
      text: `Hola, tu clave es: ${clave}`,
    };

    // Enviar mail
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok" }),
    };
  } catch (err) {
    console.error("Error enviar mail:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", msg: "Error al enviar correo" }),
    };
  }
};
