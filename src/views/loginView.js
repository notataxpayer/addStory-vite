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
          <button type="submit" id="login-btn">Login</button>
        </form>
        <button id="register-btn" class="secondary-btn">Register</button>
        <p id="error-message" class="error"></p>
      </section>
    `;

    const form = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalText = loginBtn.innerHTML;
      loginBtn.innerHTML = `<span class="button-spinner"></span>`;
      loginBtn.disabled = true;

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      await loginPresenter.login(email, password);

      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;
    });

    document.getElementById('register-btn').addEventListener('click', () => {
      window.location.hash = '#/register';
    });
  }
};
