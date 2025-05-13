import registerView from '../views/RegisterView.js';
import registerModel from '../models/RegisterModel.js';
import authModel from '../models/authModel.js';

export default {
  async registerUser(data) {
    if (data.password.length < 8) {
      registerView.showMessage('Password must be at least 8 characters.', true);
      return;
    }

    try {
      const result = await registerModel.registerUser(data);
      registerView.showMessage(result.message || 'User registered successfully');

      const token = await authModel.login(data.email, data.password);
      authModel.setToken(token);
      registerView.showMessage('Logged in successfully.');

      window.location.hash = '#/home';
    } catch (err) {
      registerView.showMessage(err.message, true);
    }
  }
};
