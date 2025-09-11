const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const { email, clave } = JSON.parse(event.body);

  // Configuración transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Recuperación de contraseña - Rugby40",
    text: `Tu contraseña es: ${clave}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: JSON.stringify({ status: "ok" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: "error", message: err.message }) };
  }
};
