import registerPresenter from '../presenters/RegisterPresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Register</h2>
        <form id="register-form">
          <label for="email">Name</label>
          <input type="text" id="name" placeholder="myname123" required />
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="example@gmail.com" required />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="your password" required minlength="8" />
          <button type="submit" id="register-btn">Register</button>
        </form>
        <button id="back-btn" class="secondary-btn">Back to Login</button>
        <div id="register-message"></div>
      </section>
    `;
    document.getElementById('back-btn').addEventListener('click', () => {
      window.location.hash = '#/login';
    });
    const form = document.getElementById('register-form');
    const registerBtn = document.getElementById('register-btn');

    form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const originalText = registerBtn.innerHTML;
          registerBtn.innerHTML = `<span class="button-spinner"></span>`;
          registerBtn.disabled = true;
    
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const password = document.getElementById('password').value;
          await registerPresenter.registerUser({ name, email, password });
    
          registerBtn.innerHTML = originalText;
          registerBtn.disabled = false;
        });
  },

  
  showMessage(msg, isError = false) {
    const msgDiv = document.getElementById('register-message');
    msgDiv.textContent = msg;
    msgDiv.style.color = isError ? 'red' : 'green';
  }

  
};
