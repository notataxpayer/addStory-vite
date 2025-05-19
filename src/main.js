import router from './router.js';

window.addEventListener('hashchange', () => {
  if (document.startViewTransition) {
    document.startViewTransition(router);
  } else {
    router();
  }
});
window.addEventListener('load', router);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

