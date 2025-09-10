const fetch = require("node-fetch");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby3-TFBkxd5bso4MHx0aa-lzR6EEjuqM5e7DZFcYetucj-_Bq_zdaY-2voJquBvY-Nv/exec";

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const text = await res.text(); // 👈 primero leo como texto

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // El Apps Script no devolvió JSON válido
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          status: "error",
          message: "Respuesta no es JSON válido",
          raw: text
        })
      };
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ status: "error", message: err.message })
    };
  }
};
