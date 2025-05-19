import authModel from '../models/authModel.js';
import notificationPresenter from './notificationPresenter.js';

export default {
  async login(email, password) {
    try {
      const token = await authModel.login(email, password);
      authModel.setToken(token);
      window.location.hash = '#/home';
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'Login failed. Check console for details.');
    }
  }
};
