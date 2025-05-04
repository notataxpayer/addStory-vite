import homePresenter from '../presenters/HomePresenter.js';

export default {
  render(container) {
    container.innerHTML = `
      <section>
        <h2>Home</h2>
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
      </article>
    `).join('');
  }
};
