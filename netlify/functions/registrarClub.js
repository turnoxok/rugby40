const fetch = require("node-fetch"); // Asegurate que node-fetch está en package.json

exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);

    const res = await fetch("https://script.google.com/macros/s/AKfycbyOtMf2865kYSQ-0kuUBkKqk9zA08TNcoW9KQTjVa7cTwFR0hpCyPqrkgh6FjjzSFAo/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // 👈 habilitamos CORS
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
