const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { idEvento, estado } = JSON.parse(event.body);

    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbx6uCd9BL7PsMsuAYoro3D6Fd2-lhbUNF6hXCFQ8V9jpCtJ-EAuhjEVMAmwoMx8jhze/exec';

    const response = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'responderInvitacion',
        idEvento,
        estado
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  }
};
