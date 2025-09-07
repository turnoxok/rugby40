// crearEvento.js - Netlify Function
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Verificamos que event.body exista
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: 'error', message: 'No se recibieron datos.' })
      };
    }

    const datos = JSON.parse(event.body);

    // URL de tu Google Apps Script Web App
    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzfXo7YpTGli_JUvCuq8oFvBeMiQOqH_3n3YXIFh2UK__n04yyuHnbULm3foveoFOle/exec';

    // Llamada al Web App con manejo de errores
    let data = { status: 'error', message: 'No se pudo conectar con Web App' };
    try {
      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      // Intentamos parsear como JSON si hay respuesta
      if (response.ok) {
        data = await response.json();
      } else {
        data = { status: 'error', message: `Web App respondió con ${response.status}` };
      }
    } catch (e) {
      console.error('Error conectando con Web App:', e);
      data = { status: 'error', message: 'Error conectando con Web App' };
    }

    // Retornamos siempre JSON al frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error en Netlify Function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: 'Error interno en la función' })
    };
  }
};
