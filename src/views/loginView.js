import loginPresenter from '../presenters/loginPresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section class="login-section">
        <h2>Login</h2>
        <form id="login-form">
          <label for="email">Email</label>
          <input id="email" type="email" required>
          <label for="password">Password</label>
          <input id="password" type="password" required>
          <button type="submit">Login</button>
        </form>
        <p id="error-message" class="error"></p>
      </section>
    `;
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      await loginPresenter.login(email, password);
    });
  }
};

  