import axios from 'axios'
import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const APIKEY = '4f8f2699713f7c3cc1758f5f2f2ed5e7'

// const backendUrl = "http://localhost:8888"
const backendUrl = "https://sep6-back-end-an6w7okvaa-lz.a.run.app"

const moviesToDisplayPerPage = 20

let movieListOffset = 0
let searchResultListOffset = 0

const state = {
    allGenres: [],
    movieList: [],
    searchResultList: [],
    movieDetails: {},
    trendingList: [],
    movie: {}
}

const actions = {

    getMovieList({commit}, {genre}) {
        axios.get(`${backendUrl}/movies/list/year/${moviesToDisplayPerPage}/${movieListOffset}/${genre}/1`)
            .then(response => {
                commit('SET_MOVIE_LIST', response.data)
            })
        movieListOffset+=moviesToDisplayPerPage
    },

    getSearchResultList({commit},{searchInput}) {
        let url = `${backendUrl}/movies/search/year/${moviesToDisplayPerPage}/${searchResultListOffset}/any/1/${searchInput}`
        axios.get(url)
            .then(response => {
                commit('SET_SEARCH_RESULT_LIST', response.data)
            })
        searchResultListOffset+=moviesToDisplayPerPage
    },

    getMovieDetails({commit},{movieId}) {
        axios.get(`${backendUrl}/movies/details/${movieId}`)
            .then(response => {
                commit('SET_MOVIE_DETAILS', response.data)
            })
    },

    getAllGenres({commit}){
        axios.get(`${backendUrl}/genres/all`)
            .then(response => {
                commit('SET_All_GENRES', response.data)
            })
    },

    getTrendingList({commit}) {
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=' + APIKEY)
            .then(response => {
                commit('SET_TRENDING_LIST', response.data)
            })

    },
    getMovie({commit}) {
        axios.get(`https://api.themoviedb.org/3/movie/576845?api_key=${APIKEY}`)
            .then(response => {
                commit('SET_MOVIE_INFO', response.data)
            })

    },
    clearExploreMovieList({commit}){
        commit("clearExploreMovieList")
    },
    clearSearchMovieList({commit}){
        commit("clearSearchMovieList")
    }
}

const mutations = {
    SET_All_GENRES(state, genres){
      state.allGenres = genres
    },
    SET_MOVIE_LIST(state, trendingMovieList) {
        trendingMovieList.forEach(movie =>{state.movieList.push(movie)})
    },
    SET_SEARCH_RESULT_LIST(state, searchResultList) {
        searchResultList.forEach(movie =>{state.searchResultList.push(movie)})
    },
    SET_MOVIE_DETAILS(state, movieDetails){
        state.movieDetails = movieDetails
    },
    SET_TRENDING_LIST(state, trendingList) {
        state.trendingList = trendingList.results
    },
    SET_MOVIE_INFO(state, movie) {
        state.movie = movie.result
    },
    clearExploreMovieList(state) {
        state.movieList = []
        movieListOffset = 0
    },
    clearSearchMovieList(state) {
        state.searchResultList = []
        searchResultListOffset = 0
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})