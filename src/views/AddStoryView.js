import addStoryPresenter from '../presenters/AddStoryPresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section class="add-story">
        <h2>Add New Story</h2>
        <form id="story-form">
          <label for="description">Description</label>
          <textarea id="description" required></textarea>
          
          <label for="photo">Photo (Max 1MB)</label>
          <input type="file" id="photo" accept="image/*" required>
          
          <label for="lat">Latitude (Optional)</label>
          <input type="number" id="lat" step="any">
          
          <label for="lon">Longitude (Optional)</label>
          <input type="number" id="lon" step="any">
          
          <button type="submit">Submit</button>
          <p id="error-message" class="error"></p>
        </form>
        <div id="map" style="height: 300px; margin-top: 20px;"></div>
      </section>
    `;

    this.initMap();
    this.setupForm();
  },

  initMap() {
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let marker;
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      document.getElementById('lat').value = lat;
      document.getElementById('lon').value = lng;
      
      if (marker) marker.remove();
      marker = L.marker([lat, lng]).addTo(map);
    });
  },

  setupForm() {
    const form = document.getElementById('story-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      try {
        const description = document.getElementById('description').value;
        const photo = document.getElementById('photo').files[0];
        const lat = document.getElementById('lat').value || null;
        const lon = document.getElementById('lon').value || null;

        await addStoryPresenter.postStory({ description, photo, lat, lon });
        window.location.hash = '#/home'; // Redirect setelah sukses
      } catch (error) {
        document.getElementById('error-message').textContent = error.message;
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
};