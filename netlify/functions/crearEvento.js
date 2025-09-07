

// crearEvento.js - Netlify Function
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'ok', message: 'Funciona!' })
  };
};

    // URL de tu Google Apps Script Web App
    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzfXo7YpTGli_JUvCuq8oFvBeMiQOqH_3n3YXIFh2UK__n04yyuHnbULm3foveoFOle/exec';

    // Llamamos al Web App con los datos del evento
    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const data = await response.json();

    // Retornamos la respuesta al frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    
  } catch (error) {
    console.error('Error en Netlify Function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: 'Error en la función de servidor.' })
    };
  }
};
