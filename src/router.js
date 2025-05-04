// import loginView from './views/loginView.js';
// import homeView from './views/HomeView.js';

// export default function router() {
//   const main = document.getElementById('main-content');
//   const hash = window.location.hash || '#/login';

//   if (hash === '#/login') {
//     loginView.render(main);
//   } else if (hash === '#/home') {
//     homeView.render(main);
//   }
// }

import authModel from './models/authModel.js';
import loginView from './views/loginView.js';
import homeView from './views/HomeView.js';
import Navbar from './views/NavbarView.js';
import AboutView from './views/AboutView.js';
import addStoryView from './views/AddStoryView.js';

export default function router() {
  const main = document.getElementById('main-content');
  const hash = window.location.hash || '#/login';
  const token = authModel.getToken(); // Pakai model, bukan localStorage langsung

  Navbar.remove();

  // Proteksi route
  if (hash !== '#/login' && !token) {
    window.location.hash = '#/login';
    return;
  }

  if (token) Navbar.render(document.body);

  switch (hash) {
    case '#/login':
      loginView.render(main);
      break;
    case '#/home':
      homeView.render(main);
      break;
    case '#/about':
      AboutView.render(main);
      break;
    case '#/addstory':
      addStoryView.render(main);
      break;
  }
}