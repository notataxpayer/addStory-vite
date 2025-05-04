import authModel from '../models/authModel.js';

export default {
  async login(email, password) {
    try {
      const res = await fetch('https://story-api.dicoding.dev/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      authModel.setToken(data.loginResult.token);
      window.location.hash = '#/home';
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Check console for details.');
    }
  }
};