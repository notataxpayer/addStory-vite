import homePresenter from '../presenters/HomePresenter.js';
import notificationPresenter from '../presenters/notificationPresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Home</h2>
        <button id="unsubscribe-btn">Subscribe</button>
        <button id="add-story-btn">Save All Story</button>
        <div id="map" style="height: 400px;"></div>
        <div id="stories"></div>
      </section>
    `;
    homePresenter.loadStories();
    this._initNotificationButton();
    this._initAddStoryButton();
  },
  _initAddStoryButton() {
    const btn = document.getElementById('add-story-btn');
    btn.addEventListener('click', () => {
      homePresenter.saveAllStory();
    });
  },

  async _initNotificationButton() {
    const btn = document.getElementById('unsubscribe-btn');
    async function updateBtn() {
      const isSub = await homePresenter.checkSubscription();
      console.log(isSub)
      btn.textContent = isSub ? 'Unsubscribe Notification' : 'Subscribe Notification';
    }

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Processing...';

      await homePresenter.toggleNotification();

      await updateBtn();
      btn.disabled = false;
    });
    await updateBtn();
  },
  
  renderStories(stories) {
    const storiesDiv = document.getElementById('stories');
    storiesDiv.innerHTML = stories.map(s => `
      <article>
        <h3>${s.name}</h3>
        <img src="${s.photoUrl}" alt="${s.description}">
        <p>${s.description}</p>
        <p>dibuat pada : ${s.createdAt}</p>
        <button class="save-story-btn">Simpan Story</button>
      </article>
    `).join('');

    // Save
     storiesDiv.querySelectorAll('.save-story-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        homePresenter.saveStory(stories[idx]);
      });
    });
      // Delete
      storiesDiv.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = Number(e.currentTarget.closest('article').dataset.id);
        await homePresenter.deleteStory(id);
      });
    });

    // 🗺️ Tambahkan Peta
    const map = L.map('map').setView([stories[0]?.lat || 0, stories[0]?.lon || 0], 4);
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
