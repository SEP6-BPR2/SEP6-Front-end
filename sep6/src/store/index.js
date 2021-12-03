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
    sortOptions: [],
    movieList: [],
    searchResultList: [],
    movieDetails: {},
    trendingList: [],
    movie: {},
    favouriteList:[],
}

const actions = {

    getMovieList({commit}, {genre, sort}) {
        axios.get(`${backendUrl}/movies/list/${sort}/${moviesToDisplayPerPage}/${movieListOffset}/${genre}/1`)
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

    getMovieDetails({commit},{userId,movieId}) {
        let url = `${backendUrl}/movies/details/${movieId}/1/${userId}`
        axios.get(url)
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
    getSortingOptions({commit}){
        axios.get(`${backendUrl}/movies/sorting`)
            .then(response => {
                commit('SET_SORTING_OPTIONS', response.data)
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
    },
    //Favourites------------------------------------------------
    registerUser({commit},{userId,username}) {
        let url = `${backendUrl}/users/register/${userId}/${username}`
        axios.post(url)
            .then(response => {
                commit('',response.data)
            })
            .catch(error =>{
                console.log(error)
            })
    },
    getFavourites({commit},{userId}) {
        axios.get(`${backendUrl}/favorites/${userId}`)
            .then(response => {
                commit('SET_FAVOURITE_LIST', response.data)
            })
    },
    addFavourite({commit},{userId, movieId}) {
        let url =`${backendUrl}/favorites/${userId}/${movieId}`
        axios.post(url)
            .then(response => {
                commit('ADD_FAVOURITE_LIST', response.data,movieId)
            })
    },
    deleteFavourite({commit},{userId, movieId}) {
        axios.delete(`${backendUrl}/favorites/${userId}/${movieId}`)
            .then(response => {
                commit('DELETE_FAVOURITE_LIST', response.data, movieId)
            })
    },
}

const mutations = {

    SET_MOVIE_LIST(state, trendingMovieList) {
        trendingMovieList.forEach(movie =>{state.movieList.push(movie)})
    },
    SET_SEARCH_RESULT_LIST(state, searchResultList) {
        searchResultList.forEach(movie =>{state.searchResultList.push(movie)})
    },
    SET_MOVIE_DETAILS(state, movieDetails){
        state.movieDetails = movieDetails
    },
    SET_All_GENRES(state, genres){
        state.allGenres = genres
    },
    SET_SORTING_OPTIONS(state, sortOptions){
        state.sortOptions = sortOptions
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
    },
    //Favourites------------------------------------
    SET_FAVOURITE_LIST(state,favouriteList){
        state.favouriteList = favouriteList.movies
    },
    ADD_FAVOURITE_LIST(state,status,movieId){
        if(status == "200"){
            state.favouriteList.push(movieId)
        }
    },
    DELETE_FAVOURITE_LIST(state,status,movieId){
        if(status == "200") {
            state.favouriteList = state.favouriteList.filter(id => id != movieId)
        }
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})