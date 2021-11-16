import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../view/Home";
import Movies from "../view/Movies";
import Account from "../components/toolbar/toolbarMenu/cards/Account";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/results",
            name: "results",
            component: Movies,
            props: (route)=>({doo: route.query.doo})
        },
        {
            path: "/account",
            name: "Account",
            component: Account
        }
    ]
})