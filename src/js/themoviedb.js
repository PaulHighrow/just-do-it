const API_KEY = 'e146a7a5146c0f8a3c3cd99167c5b659';
console.log('API_KEY: ', API_KEY);

import axios from 'axios';

async function markupTrendingMovie(page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?`,
      {
        params: {
          api_key: API_KEY,
          page: page,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
markupTrendingMovie(1).then(data => {
  console.log(data);
});



async function markupGenres() {
  try {
    const respon = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?`,
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      }
    );

    if (respon.status !== 200) {
      throw new Error(respon.status);
    }

    return respon.data;
  } catch (error) {
    console.error(error);
  }
}

markupGenres().then(arr => {
  console.log(arr);
});
