
const fetch = require('node-fetch');

module.exports.handler = async function(event, context) {
  try {
    const params = JSON.parse(event.body);

    const res = await fetch('https://script.google.com/macros/s/AKfycbyOtMf2865kYSQ-0kuUBkKqk9zA08TNcoW9KQTjVa7cTwFR0hpCyPqrkgh6FjjzSFAo/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'crearEvento', ...params })
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

