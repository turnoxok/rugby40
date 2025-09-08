export async function handler(event) {
  try {
    const { idEvento, estado } = JSON.parse(event.body);

    const res = await fetch("https://script.google.com/macros/s/AKfycbwIEIglUxRi9WHE3Dp-RJFSsiQDSKb25IMvh6rGxvvnGEvxGBeD-hsHd6u6cQ7B-Z4f/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "responderInvitacion", // 👈 faltaba esto
        idEvento,
        estado
      })
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: err.message })
    };
  }
}











