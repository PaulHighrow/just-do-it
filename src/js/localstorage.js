const modalBackdrop = document.querySelector('.modal');
console.log(modalBackdrop);

export function watchedBtnListener(key) {
    const watchedBtn = document.querySelector('button[data-action="watch"]');
    watchedBtn.setAttribute('key', key);
    watchedBtn.addEventListener('click', addToWatched);
  }
function addToWatched (event) {
    const movieId = Number(event.target.getAttribute('key'));
    console.log(movieId);
    const watchedBtn = document.querySelector('.trailer-btn');
    watchedBtn.setAttribute('disabled', true);
    localStorage.setItem("WatchedFilm", JSON.stringify(movieId));
  
}
  

export function queueBtnListener(key) {
    const queueBtn = document.querySelector('button[data-action="queue"]');
    queueBtn.setAttribute('key', key);
    queueBtn.addEventListener('click', addToQueue);
  }
  function addToQueue (event) {
    const movieId = Number(event.target.getAttribute('key'));
    console.log(movieId);
    const queueBtn = document.querySelector('button[data-action="queue"]');
    queueBtn.setAttribute('disabled', true);
    localStorage.setItem("QueueFilm", JSON.stringify(movieId));
}
