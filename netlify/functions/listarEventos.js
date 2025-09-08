const fetch = require('node-fetch'); // solo si Node < 20

module.exports.handler = async function(event, context) {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbwORLG74do170DE12HT5yX4UQOA_wnFCwGLfEU-HLQPtvc1KL601ZOlEQBcqC8MhFnt/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'listarEventos' })
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
};
