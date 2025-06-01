const baseURL = 'https://wdd330-backend.onrender.com';

export default class ExternalServices {
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    const response = await fetch(`${baseURL}/checkout`, options);
    return await response.json();
  }
}
