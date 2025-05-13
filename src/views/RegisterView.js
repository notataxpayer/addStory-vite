import registerPresenter from '../presenters/RegisterPresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Register</h2>
        <form id="register-form">
          <input type="text" id="name" placeholder="Name" required />
          <input type="email" id="email" placeholder="Email" required />
          <input type="password" id="password" placeholder="Password" required minlength="8" />
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

    // document.getElementById('register-form').addEventListener('submit', async (e) => {
    //   e.preventDefault();
    //   const name = document.getElementById('name').value.trim();
    //   const email = document.getElementById('email').value.trim();
    //   const password = document.getElementById('password').value;

    //   registerPresenter.registerUser({ name, email, password });
    // });
  },

  
  showMessage(msg, isError = false) {
    const msgDiv = document.getElementById('register-message');
    msgDiv.textContent = msg;
    msgDiv.style.color = isError ? 'red' : 'green';
  }

  
};
