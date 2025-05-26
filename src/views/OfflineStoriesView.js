import offlinePresenter from '../presenters/OfflinePresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Offline Stories</h2>
        <div id="offline-stories"></div>
      </section>
    `;
    offlinePresenter.loadOfflineStories();
  },

  renderOfflineStories(stories) {
    const container = document.getElementById('offline-stories');

    if (!stories.length) {
      container.innerHTML = '<p>Tidak ada data offline.</p>';
      return;
    }

    container.innerHTML = stories.map(s => `
      <article data-id="${s.id}" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
        <h3>${s.name}</h3>
        <img src="${s.photoUrl}" alt="${s.description}" style="max-width: 100%; height: auto;">
        <p>${s.description}</p>
        <p><em>Dibuat: ${new Date(s.createdAt).toLocaleString()}</em></p>
        <button class="delete-btn">Hapus</button>
      </article>
    `).join('');

    this._attachDeleteEvents();
  },

  _attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    // const id = button.dataset.id;

    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const article = event.target.closest('article');
        const id = article.dataset.id;
        console.log('ID yang akan dihapus:', id);
        const confirmed = confirm('Yakin ingin menghapus cerita ini dari penyimpanan offline?');
        if (!confirmed) return;

        await offlinePresenter.deleteStory(id);
        await offlinePresenter.loadOfflineStories();
      });
    });
  }
};
