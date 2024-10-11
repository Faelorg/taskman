import { createApp } from 'vue'
import './output.css'
import App from './App.vue'
import Main from './components/MainView.vue'
import Auth from './components/AuthView.vue'
import * as VueRouter from "vue-router";
import * as VueCookies from 'vue-cookies'
import NotFound from './components/ErrorRoutes/NotFound.vue'
import AccessDenied from './components/ErrorRoutes/AccessDenied.vue'
import Unauthorized from './components/ErrorRoutes/Unauthorized.vue'
import MainPageView from './components/MainRoutes/MainPageView.vue'
import MailPageView from './components/MainRoutes/MailPageView.vue'
import TaskPageView from './components/MainRoutes/TaskPageView.vue'
import SettingsPageView from './components/MainRoutes/SettingsPageView.vue'
import PeoplePageView from './components/MainRoutes/PeoplePageView.vue'

let companyName = "company"
let routes=[
    { path: `/${companyName}`, name:'home',
    children:[
        {
            path:'main',
            name:'main',
            component:MainPageView
        },
        {
            path:'mail',
            name:'mail',
            component:MailPageView
        },
        {
            path:'task',
            name:'task',
            component:TaskPageView
        },
        {
            path:'people',
            name:'people',
            component:PeoplePageView
        },
        {
            path:'settings',
            name:'settings',
            component:SettingsPageView
        }
    ], components:{
        default: Main,
    } },
    { path: '/auth', component: Auth,},
    { path: '/404', component: NotFound },
    { path: '/403', component: AccessDenied },
    { path: '/401', component: Unauthorized },
]

const router = VueRouter.createRouter({
    routes,
    history:VueRouter.createWebHistory(),
})

createApp(App).use(VueCookies,[{ expires: '1d',domain:'',path:'/'}]).use(router).mount('#app')
