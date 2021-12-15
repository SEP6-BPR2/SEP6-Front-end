import axios from 'axios'
import Vue from 'vue'
import Vuex from "vuex";
// import {getAuth} from "firebase/auth";
Vue.use(Vuex)

const APIKEY = '4f8f2699713f7c3cc1758f5f2f2ed5e7'

const backendUrl = "http://localhost:8888"
// const backendUrl = "https://sep6-back-end-an6w7okvaa-lz.a.run.app"

const moviesToDisplayPerPage = 20

let movieListOffset = 0
let searchResultListOffset = 0

let generalCommentsToDisplay = 20
let generalCommentsOffset = 0

const state = {
    allGenres: [],
    sortOptions: [],
    movieList: [],
    searchResultList: [],
    movieDetails: {},
    trendingList: [],
    favouriteList:[],
    generalComments: [],
    user: {
        loggedIn: false,
        data: null
    }
}

const actions = {

    getMovieList({commit}, {genre, sort, order}) {
        axios.get(`${backendUrl}/movies/list/${sort}/${moviesToDisplayPerPage}/${movieListOffset}/${genre}/${order}`)
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

    getMovieDetails({commit},{userId,movieId,num}) {
        let url = `${backendUrl}/movies/details/${movieId}/${num}/${userId}`
        console.log(url)
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
    // eslint-disable-next-line no-unused-vars
    registerUser({commit},{userId,username,token,photoURL}) {
        let url = `${backendUrl}/users/register/${userId}/${username}`
        axios.post(url,{photoURL:photoURL},{headers: {authorization:token}})
            .then(response => {
                console.log(JSON.stringify(response.data) + "#########")
                commit('',response.data)
            })
            .catch(error =>{
                console.log(error)
            })
    },
    getFavourites({commit},{userId}) {
        let url =`${backendUrl}/favorites/${userId}`
        axios.get(url)
            .then(response => {
                commit('SET_FAVOURITE_LIST', response.data)
            })
    },
    addFavourite({commit},{userId, movieId,token}) {
        let url =`${backendUrl}/favorites/${userId}/${movieId}`
        axios.post(url,{},{headers: {authorization:token}})
            .then(response => {
                commit('ADD_FAVOURITE_LIST', response.data,movieId)
            })
    },
    deleteFavourite({commit},{userId, movieId,token}) {
        axios.delete(`${backendUrl}/favorites/${userId}/${movieId}`,{headers: {authorization:token}})
            .then(response => {
                commit('DELETE_FAVOURITE_LIST', response.data, movieId)
            })
    },

    // Comments
    // eslint-disable-next-line no-unused-vars
    async makeComment({commit},{comment, replyComment}){
        let uid = state.user.data.uid
        let url = `${backendUrl}/comments/${uid}/${state.movieDetails.id}`
        console.log(url)
        console.log(uid)
        console.log(replyComment)
        console.log(comment)
        await axios.post(url,{replyComment: replyComment, text: comment}, {headers: {authorization:state.user.data.stsTokenManager.accessToken}})
    },

    getFirstOrderComments({commit},{movieId}){
        let url = `${backendUrl}/comments/getFirstOrderComments/${movieId}/${generalCommentsToDisplay}/${generalCommentsOffset}`
        axios.get(url)
        .then(response => {
            commit('ADD_GENERAL_COMMENTS', response.data)
        })
    },
    fetchUser({ commit }, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
            commit("SET_USER", {
                ...user
            });
        } else {
            commit("SET_USER", null);
        }
    }
}

const mutations = {

    SET_MOVIE_LIST(state, trendingMovieList) {
        trendingMovieList.forEach(movie =>{state.movieList.push(movie)})
    },
    SET_SEARCH_RESULT_LIST(state, searchResultList) {
        searchResultList.forEach(movie =>{state.searchResultList.push(movie)})
    },
    SET_MOVIE_DETAILS(state, movieDetails){
        console.log(movieDetails)
        state.movieDetails = movieDetails
    },
    SET_All_GENRES(state, genres){
        state.allGenres = genres.genres
    },
    SET_SORTING_OPTIONS(state, sortOptions){
        state.sortOptions = sortOptions.sortingOptions
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
    },
    //Comments--------------------------------------
    ADD_GENERAL_COMMENTS(state,comments){
        state.generalComments = comments
    },
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value;
    },
    SET_USER(state, data) {
        state.user.data = data;

        if(data){
            state.user.loggedIn = true;
        }else{
            state.user.loggedIn = false;
        }
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})