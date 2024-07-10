export const Key = 'eab615197efa946b7ae33af6c2ce1b61';

const requests = {
  fetchTrending: `/trending/all/week?api_key=${Key}&language=en-Us`,
  fetchNetflixOriginals: `/discover/tv?api_key=${Key}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${Key}&language=en-Us`,
  fetchActionMovies: `/discover/movie?api_key=${Key}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${Key}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${Key}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${Key}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${Key}&with_genres=99`,
  fetchTVShows: `/discover/tv?api_key=${Key}&language=en-US`,
  fetchMovies: `/discover/movie?api_key=${Key}&language=en-US`,
  fetchRatings: `/movie/top_rated?api_key=${Key}&language=en-US`,
  fetchAmazonMovies: `/discover/movie?api_key=${Key}&with_provider=8`,
  fetchByLanguage: `/discover/movie?api_key=${Key}&with_original_language=es`,
  fetchCartoons: `/discover/movie?api_key=${Key}&with_genres=16`,
  fetchAnimatedTVShows: `/discover/tv?api_key=${Key}&with_genres=16`,
};

export default requests;
