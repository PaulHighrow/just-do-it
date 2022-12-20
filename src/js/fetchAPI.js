import axios from 'axios';
export const BASE_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = 'e146a7a5146c0f8a3c3cd99167c5b659';

export default class FetchApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.lang = '';
    this.genre = '';
    this.year = '';
    this.originalLanguage = '';
    this.vote = '';
  }
  // популярні
  async getPopularFilms() {
    try {
      const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=${this.lang}&page=${this.page}`;
      const response = await axios.get(url);
      console.log(response);
      return response;
    } catch (error) {
      console.error(`an error occurred` + error);
    }
  }
  // тренди
  async getTrendFilms() {
    try {
      const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`an error occurred` + error);
    }
  }

  async getFilmsByName() {
    try {
      const searchParams = new URLSearchParams({
        api_key: API_KEY,
        query: this.searchQuery,
        language: 'en-US',
        page: this.page,
        include_adult: false,
      });
      const url = `${BASE_URL}search/movie?${searchParams}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getFilmDetails(id) {
    try {
      const url = `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`an error occurred` + error);
    }
  }

  async getFilmVideo(id) {
    try {
      const url = `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=${this.lang}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`an error occurred` + error);
    }
  }

  async getFilteredMovies() {
    try {
      const searchParams = new URLSearchParams({
        api_key: API_KEY,
        language: this.lang,
        sort_by: 'popularity.desc',
        page: this.page,
        include_adult: false,
        with_genres: this.genre,
        primary_release_year: this.year,
        with_original_language: this.originalLanguage,
      });
      const url = `${BASE_URL}discover/movie?${searchParams}&vote_average.gte=${this.vote}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }

  setLang(newLang) {
    this.lang = newLang;
  }

  getLang() {
    return this.lang;
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
}
