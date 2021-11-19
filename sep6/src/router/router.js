import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviePage from "../view/MoviePage";
import Account from "../components/toolbar/toolbarMenu/cards/Account";
import HomePage from "@/view/HomePage";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "homePage",
            component: HomePage
        },
        {
            path: "/results",
            name: "results",
            component: MoviePage,
            props: (route)=>({doo: route.query.doo})
        },
        {
            path: "/account",
            name: "Account",
            component: Account
        }
    ]
})