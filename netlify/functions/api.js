const fetch = require("node-fetch");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyOtMf2865kYSQ-0kuUBkKqk9zA08TNcoW9KQTjVa7cTwFR0hpCyPqrkgh6FjjzSFAo/exec";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
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

    const data = await res.json(); // Apps Script ahora devuelve JSON válido

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ status: "error", message: err.message })
    };
  }
};
