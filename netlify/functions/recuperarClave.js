const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const { email, clave } = JSON.parse(event.body); // email de destino y clave a enviar

    if (!email || !clave) {
      return { statusCode: 400, body: "Faltan parámetros" };
    }

    // Configuración del transporter con Gmail y variables de entorno
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // tu correo de Gmail
        pass: process.env.EMAIL_PASS  // contraseña de aplicación
      }
    });

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de clave - Rugby40",
      text: `Hola! Tu clave de acceso es: ${clave}`
    };

    // Envío del correo
    await transporter.sendMail(mailOptions);

    return { statusCode: 200, body: JSON.stringify({ status: "ok", msg: "Correo enviado" }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", msg: err.message }) };
  }
};
