let token = '';

export default {
  
  async login(email, password) {
    const res = await fetch('https://story-api.dicoding.dev/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Login failed');

    token = data.loginResult.token;
    return token;
  },
    setToken(token) {
      localStorage.setItem('token', token);
    },
    getToken() {
      return localStorage.getItem('token');
    },
    removeToken() {
      localStorage.removeItem('token');
    },
    setAuthData(token, expiresIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiry', Date.now() + expiresIn * 1000);
    }
  };


