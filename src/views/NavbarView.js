import authModel from "../models/authModel";

export default {
    render(parentElement) {
      const navbar = document.createElement('nav');
      navbar.innerHTML = `
        <div class="navbar">
          <a href="#main-content" class="skip-link">Skip to content</a>
          <a href="#/home">Home</a>
          <a href="#/about">About</a>
          <a href="#/addstory">Add Story</a>
          <a href="#/offlinestories">Local Stories</a>
          <button id="logout-btn">Logout</button>
        </div>
      `;
      parentElement.prepend(navbar);
  
      document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('token');
        authModel.removeToken();
        window.location.hash = '#/login';
      });
    },
    remove() {
      const navbar = document.querySelector('.navbar');
      if (navbar) navbar.remove();
    }
  };