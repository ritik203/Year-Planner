export async function apiFetch(url, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      let errorMessage = `HTTP error! status: ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {}
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (err) {
    console.error("API error:", err.message);
    throw err;
  }
}
