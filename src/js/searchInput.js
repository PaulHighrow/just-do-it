import apiService from './themoviedb';


const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');
const galleryEl = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

const options = {
  root: null,
  rootMargin: '200px',
  treshhold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

form.addEventListener('submit', onSearch);

let counter = 20;

function onLoad(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ApiService.getRequest().then(data => {
        renderGallery(data)
        counter += data.results.length;
        if (counter >= data.total_results) {
          observer.unobserve(guard);
          return alert("We're sorry, but you've reached the end of search results.");
        }
      });
    }
  });
}

const ApiService = new apiService();

function onClear() {
  galleryEl.innerHTML = '';
}

function onSearch(evn) {
  evn.preventDefault();

  ApiService.searchQuery = evn.currentTarget.elements.searchQuery.value;
  console.log(ApiService.searchQuery);
  if (ApiService.searchQuery === '') {
    onClear();
    return alert('Sorry, there are no images matching your search query. Please enter something!');
  }
  ApiService.resetPage();
  ApiService.getRequest().then(data => {
    console.log(data);
    onClear();
    renderGallery(data);
    observer.observe(guard);
  });
}

function renderGallery(data) {
    const markup = data.results
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
    <span class="card_year">${release_date.substring(0, 4)}</span>
    <span class="card__rating">${vote_average}</span>
    </div>
  </li>`;
      })
      .join('');
  
    galleryEl.insertAdjacentHTML('beforeend', markup);

  smoothScroll();

}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}


