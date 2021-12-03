import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchPage from "../view/SearchPage";
import Account from "../components/toolbar/toolbarMenu/cards/Account";
import HomePage from "@/view/HomePage";
import ExplorePage from "@/view/ExplorePage";
import FavouritesPage from "../view/FavouritesPage";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "homePage",
            component: HomePage
        },
        {
            path:"/favourites",
            name:"favourites",
            component:FavouritesPage
        },
        {
            path: "/results",
            name: "results",
            component: SearchPage,
            props: (route)=>({doo: route.query.doo}),
        },
        {
            path: "/explore",
            name: "explore",
            component: ExplorePage
        },
        {
            path: "/account",
            name: "Account",
            component: Account
        }
    ]
})