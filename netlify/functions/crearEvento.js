const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    console.log('Recibido en Netlify Function:', event.body);

    const datos = JSON.parse(event.body);

    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbw17k9fOXwg93WDg77OMv1xZWjtVAK8qfaU_BjYjXMp9HPJfLaEPYOIzQXmAas9WcQ/exec';

    let data = { status: 'error', message: 'No se pudo conectar con Web App' };

    try {
      const response = await fetch(WEBAPP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      console.log('Respuesta del Web App:', response.status, response.statusText);

      if (response.ok) {
        data = await response.json();
        console.log('JSON recibido del Web App:', data);
      } else {
        data = { status: 'error', message: `Web App respondió con ${response.status}` };
      }
    } catch (e) {
      console.error('Error conectando con Web App:', e);
      data = { status: 'error', message: 'Error conectando con Web App' };
    }

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
