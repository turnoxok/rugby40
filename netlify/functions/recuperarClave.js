// recuperarClave.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    const { email, clave } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ status: "error", msg: "Falta el email" }) };
    }

    // Configuración segura del transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Contenido del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      text: `Hola, tu clave es: ${clave}`
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return { statusCode: 200, body: JSON.stringify({ status: "ok" }) };

  } catch (err) {
    console.error("Error en recuperarClave:", err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", msg: err.message }) };
  }
};
