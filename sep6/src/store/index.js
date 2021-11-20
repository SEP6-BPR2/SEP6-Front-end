import axios from 'axios'
import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const APIKEY = '4f8f2699713f7c3cc1758f5f2f2ed5e7'

const state = {
    trendingList:[],
    movie: {}
}

const actions = {
    getTrendingList({commit}) {
        axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=' + APIKEY)
            .then(response => {
                commit('SET_TRENDING_LIST',response.data)
            })

    },
    getMovie({commit}) {
        axios.get(`https://api.themoviedb.org/3/movie/576845?api_key=${APIKEY}`)
            .then(response => {
                commit('SET_MOVIE_INFO',response.data)
            })

    }
}

const mutations = {
    SET_TRENDING_LIST(state,trendingList){
        state.trendingList = trendingList.results
    },
    SET_MOVIE_INFO(state, movie){
        state.movie = movie.result
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})