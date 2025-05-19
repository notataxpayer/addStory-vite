import authModel from './models/authModel.js';
import loginView from './views/loginView.js';
import homeView from './views/HomeView.js';
import Navbar from './views/NavbarView.js';
import AboutView from './views/AboutView.js';
import addStoryView from './views/AddStoryView.js';
import registerView from './views/RegisterView.js';
import offlineStoriesView from './views/OfflineStoriesView.js';

export default function router() {
  const main = document.getElementById('main-content');
  const hash = window.location.hash || '#/login';
  const token = authModel.getToken();

  Navbar.remove();

  if (!token && hash !== '#/login' && hash !== '#/register') {
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
    case '#/register':
      registerView.render(main);
      break;
    case '#/offlinestories':
      offlineStoriesView.render(main);
      break;
  }
}