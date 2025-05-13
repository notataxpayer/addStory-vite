import homePresenter from '../presenters/HomePresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Home</h2>
        <div id="map" style="height: 400px;"></div>
        <div id="stories"></div>
      </section>
    `;
    homePresenter.loadStories();
  },

  renderStories(stories) {
    const storiesDiv = document.getElementById('stories');
    storiesDiv.innerHTML = stories.map(s => `
      <article>
        <h3>${s.name}</h3>
        <img src="${s.photoUrl}" alt="${s.description}">
        <p>${s.description}</p>
        <p>dibuat pada : ${s.createdAt}</p>
      </article>
    `).join('');

    // 🗺️ Tambahkan Peta
    const map = L.map('map').setView([stories[0]?.lat || 0, stories[0]?.lon || 0], 4); // zoom level 4
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    stories.forEach(story => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`
            <strong>${story.name}</strong><br>
            <img src="${story.photoUrl}" alt="${story.description}" style="width: 100px; height: auto; margin: 4px 0;"><br>
            ${story.description}
            `)
          .on('click', () => {
            map.setView([story.lat, story.lon], 10); 
          });
      }
    });
  }
};
