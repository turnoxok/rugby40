// responderInvitacion.js
const fetch = require('node-fetch'); // solo si necesitas fetch en Node 18-19, de lo contrario Node 20+ tiene fetch nativo

module.exports = async function (event, context) {
  try {
    const { idEvento, estado } = JSON.parse(event.body);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIEIglUxRi9WHE3Dp-RJFSsiQDSKb25IMvh6rGxvvnGEvxGBeD-hsHd6u6cQ7B-Z4f/exec'; // reemplaza TU_SCRIPT_ID

    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'responderInvitacion',
        idEvento,
        estado
      })
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      const text = await res.text();
      console.error('Error parseando JSON desde Apps Script:', text);
      throw new Error('Respuesta del Apps Script no es JSON: ' + text);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error('Error en Netlify Function responderInvitacion:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
};
