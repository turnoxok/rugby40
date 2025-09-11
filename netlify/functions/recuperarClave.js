const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ status: "error", msg: "Falta el email" }) };
    }

    // Generar clave temporal aleatoria
    const claveTemporal = Math.random().toString(36).slice(-8);

    // Transporter con Gmail y credenciales del .env en Netlify
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // tu correo Gmail
        pass: process.env.EMAIL_PASS  // contraseña de app de Gmail
      }
    });

    // Configurar correo
    const mailOptions = {
      from: `"Soporte TurnoX" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de clave",
      text: `Tu clave temporal es: ${claveTemporal}\n\nIngresala en el login para continuar.`
    };

    // Enviar
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "ok", msg: "Correo enviado", claveTemporal })
    };

  } catch (err) {
    console.error("Error en recuperarClave:", err);
    return { statusCode: 500, body: JSON.stringify({ status: "error", msg: err.message }) };
  }
};
