export const API_KEY = 'e146a7a5146c0f8a3c3cd99167c5b659';
// console.log('API_KEY: ', API_KEY);

import axios from 'axios';

async function getTrendingMovies(page) {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?`,
      {
        params: {
          api_key: API_KEY,
          page: page,
        },
      }
    );
    // console.log('getTrendingMovies', resp);
    if (!resp) {
      throw new Error();
    }

    return resp.data;
  } catch (error) {
    console.error(error);
  }
}

async function getGenres() {
  try {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?`,
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      }
    );
    // console.log('getGenres', resp);
    if (!resp) {
      throw new Error();
    }

    return resp.data;
  } catch (error) {
    console.error(error);
  }
}

export class apiService {
  constructor() {
    this.searchQuery = '';
  }
  async getRequest(page) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?`,
        {
          params: {
            api_key: API_KEY,
            language: 'en-uk',
            query: `${this.searchQuery}`,
            page: page,
            include_adult: false,
          },
        }
      );
      if (!response) {
        throw new Error();
      }
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export { getGenres, getTrendingMovies };
