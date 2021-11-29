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
    movieList: [],
    searchResultList: [],
    trendingList: [],
    movie: {}
}

const actions = {

    getMovieList({commit}) {
        axios.get(`${backendUrl}/movies/list/year/${moviesToDisplayPerPage}/${movieListOffset}/any/1`)
            .then(response => {
                commit('SET_MOVIE_LIST', response.data)
            })
        movieListOffset+=moviesToDisplayPerPage
    },

    getSearchResultList({commit},{searchInput}) {
        axios.get(`${backendUrl}/movies/search/year/${moviesToDisplayPerPage}/${searchResultListOffset}/any/1/${searchInput}`)
            .then(response => {
                commit('SET_SEARCH_RESULT_LIST', response.data)
            })
        searchResultListOffset+=moviesToDisplayPerPage
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

    }
}

const mutations = {
    SET_MOVIE_LIST(state, trendingMovieList) {
        trendingMovieList.forEach(movie =>{state.movieList.push(movie)})
    },
    SET_SEARCH_RESULT_LIST(state, searchResultList) {
        searchResultList.forEach(movie =>{state.searchResultList.push(movie)})
    },
    SET_TRENDING_LIST(state, trendingList) {
        state.trendingList = trendingList.results
    },
    SET_MOVIE_INFO(state, movie) {
        state.movie = movie.result
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})