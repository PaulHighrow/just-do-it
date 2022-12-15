export { renderGallery };

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const galleryEl = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      const {
        id,
        backdrop_path,
        poster_path,
        title,
        original_title,
        genre_ids,
        release_date,
        vote_average,
      } = image;
      return `<li class="card">
  <div class="card_tumb">
    <img class="card_img" id="${id}" src="${IMG_URL + poster_path}
"alt="${title}" />
  </div>
  <h2 class="card_title">${original_title}</h2>
  <div class="card_caption">
  <ul class="card_list">
    <li class="card_item">${genre_ids}</li>
  </ul>
  <span class="card_year">${release_date}</span>
  <span class="card__rating">${vote_average}</span>
  </div>
</li>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}
