
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('ServiceWorker registered:', reg))
      .catch(err => console.error('SW register failed:', err));
  });
}
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.createElement('button');
  installBtn.textContent = 'Install App';
  installBtn.id = 'install-btn';
  document.body.appendChild(installBtn);
  installBtn.addEventListener('click', async () => {
    installBtn.disabled = true;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log('User choice:', choice.outcome);
    installBtn.remove();
    deferredPrompt = null;
  });
});


const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const contentSection = document.getElementById('content-section');
const nav = document.getElementById('nav');

let isLoggedIn = false;

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  isLoggedIn = true;
  loginSection.style.display = 'none';
  nav.style.display = 'block';
  window.location.hash = 'home';
  renderPage();
});

export function renderPage() {
  if (!isLoggedIn) return;

  const page = window.location.hash.substring(1);
  if (page === 'about') {
    fetch('about.html')
      .then((res) => res.text())
      .then((html) => {
        contentSection.innerHTML = html;
        contentSection.style.display = 'block';
      });
  } else {
    contentSection.innerHTML = `
      <section>
        <h2>Home</h2>
        <p>Selamat datang di halaman Home!</p>
      </section>
    `;
    contentSection.style.display = 'block';
  }
}
