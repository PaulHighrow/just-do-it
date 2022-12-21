import axios from 'axios';
import { API_KEY } from './fetchAPI';
import { BASE_URL } from './fetchAPI';
import FetchApi from './fetchAPI';
const modalBackdrop = document.querySelector('.modal');
// console.log(modalBackdrop);

const getMoviesTrailer = async key => {
  const { data } = await axios.get(
    `${BASE_URL}movie/${key}/videos?api_key=${API_KEY}`
  );
  // console.log(data);

  return data.results.filter(item => {
    if (item.site === 'YouTube' && item.name.includes('Official Trailer')) {
      return item;
    }
  });
};
export const movieTrailer = async keyId => {
  let movie = '';
  await getMoviesTrailer(keyId)
    .then(r => (movie = `https://www.youtube.com/embed/${r[0].key}`))
    .catch(error => (movie = false));

  return movie; //готове посилання на трейлер
};

//приймає ключ (id)
export async function trailerMarkup(event) {
  const movieId = Number(event.target.getAttribute('key'));
  // console.log(movieId);
  const trailerBtn = document.querySelector('.trailer-btn');
  trailerBtn.setAttribute('disabled', true);
  await movieTrailer(movieId).then(r => {
    if (r) {
      modalBackdrop.insertAdjacentHTML(
        'beforeend',
        `<iframe id="ytplayer" type="text/html" width="782" height="360"
      src="${r}"
      frameborder="0"/>`
      );
      document
        .querySelector('#ytplayer')
        .scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      modalBackdrop.insertAdjacentHTML(
        'beforeend',
        `<div class="trailer-placeholder"></div>`
      );
      document
        .querySelector('.trailer-placeholder')
        .scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });
}
export function trailerBtnListener(key) {
  const trailerBtn = document.querySelector('.trailer-btn');
  trailerBtn.setAttribute('key', key);
  trailerBtn.addEventListener('click', trailerMarkup);
}
