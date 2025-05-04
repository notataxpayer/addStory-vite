import router from './router.js';

window.addEventListener('hashchange', () => {
  if (document.startViewTransition) {
    document.startViewTransition(router);
  } else {
    router();
  }
});
window.addEventListener('load', router);
