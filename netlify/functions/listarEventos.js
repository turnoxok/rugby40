// listarEventos.js - Netlify Function
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // URL de tu Google Apps Script Web App
    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx6uCd9BL7PsMsuAYoro3D6Fd2-lhbUNF6hXCFQ8V9jpCtJ-EAuhjEVMAmwoMx8jhze/exec';

    // Llamamos al Web App indicando acción "listarEventos"
    const response = await fetch(WEBAPP_URL, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'listarEventos' })
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ status: 'error', message: 'Error al obtener eventos' })
      };
    }

    const data = await response.json();
    console.log('Eventos recibidos:', data);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error en Netlify Function listarEventos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: 'Error interno en la función' })
    };
  }
};
