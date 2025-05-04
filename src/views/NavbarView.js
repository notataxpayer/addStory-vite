import authModel from "../models/authModel";

export default {
    render(parentElement) {
      const navbar = document.createElement('nav');
      navbar.innerHTML = `
        <div class="navbar">
          <a href="#/home">Home</a>
          <a href="#/about">About</a>
          <a href="#/addstory">Add Story</a>
          <button id="logout-btn">Logout</button>
        </div>
      `;
      parentElement.prepend(navbar);
  
      // Logout: Hapus token & redirect ke login
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