const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const datos = JSON.parse(event.body);

  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzfXo7YpTGli_JUvCuq8oFvBeMiQOqH_3n3YXIFh2UK__n04yyuHnbULm3foveoFOle/exec';

  const res = await fetch(WEBAPP_URL, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(datos)
  });

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
