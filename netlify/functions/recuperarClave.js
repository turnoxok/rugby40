exports.handler = async (event, context) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ definida" : "❌ no definida");
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ definida" : "❌ no definida");

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
