const fetch = require("node-fetch"); // asegúrate que está en package.json

exports.handler = async function(event, context) {
  try {
    // 🔹 URL de tu Apps Script
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby3-TFBkxd5bso4MHx0aa-lzR6EEjuqM5e7DZFcYetucj-_Bq_zdaY-2voJquBvY-Nv/exec";

    // 🔹 Parsear el body que llega del frontend
    const body = JSON.parse(event.body);

    // 🔹 Enviar al Apps Script
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    // 🔹 Devolver respuesta al frontend con CORS habilitado
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ status: "error", msg: "Proxy error", error: err.message })
    };
  }
};
