// /netlify/functions/responderInvitacion.js
export async function handler(event) {
  try {
    // Parseamos el body recibido desde el front
    const { idEvento, estado } = JSON.parse(event.body);

    // URL de tu Apps Script web app
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIEIglUxRi9WHE3Dp-RJFSsiQDSKb25IMvh6rGxvvnGEvxGBeD-hsHd6u6cQ7B-Z4f/exec'; // 🔹 reemplaza TU_SCRIPT_ID

    // Enviamos el POST al Apps Script con el action correcto
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'responderInvitacion', // muy importante
        idEvento,
        estado
      })
    });

    // Para debug: si falla res.json(), podemos usar res.text() temporalmente
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
      s
