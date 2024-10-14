import { createApp } from "vue";
import "./output.css";
import App from "./App.vue";
import Main from "./components/MainView.vue";
import Auth from "./components/AuthView.vue";
import * as VueRouter from "vue-router";
import * as VueCookies from "vue-cookies";
import NotFound from "./components/ErrorRoutes/NotFound.vue";
import AccessDenied from "./components/ErrorRoutes/AccessDenied.vue";
import Unauthorized from "./components/ErrorRoutes/Unauthorized.vue";
import MainPageView from "./components/MainRoutes/MainPageView.vue";
import MailPageView from "./components/MainRoutes/MailPageView.vue";
import TaskPageView from "./components/MainRoutes/TaskPageView.vue";
import SettingsPageView from "./components/MainRoutes/SettingsPageView.vue";
import PeoplePageView from "./components/MainRoutes/PeoplePageView.vue";
import LoginView from "./components/AuthRoutes/LoginView.vue";
import RememberView from "./components/AuthRoutes/RememberView.vue";

let companyName = "company";

const router = VueRouter.createRouter({
  routes: [
    {
      path: `/${companyName}`,
      redirect: (to) => {
        return `${companyName}/main`;
      },
      name: "home",
      meta: { requiresAuth: true },
      children: [
        {
          path: "main",
          name: "main",
          component: MainPageView,
        },
        {
          path: "mail",
          name: "mail",
          component: MailPageView,
        },
        {
          path: "task",
          name: "task",
          component: TaskPageView,
        },
        {
          path: "people",
          name: "people",
          component: PeoplePageView,
        },
        {
          path: "settings",
          name: "settings",
          component: SettingsPageView,
        },
      ],
      components: {
        default: Main,
      },
    },
    { path: "/", component: MailPageView },
    {
      path: "/auth",
      name: "auth",
      redirect(to) {
        return "/auth/login";
      },
      component: Auth,
      children: [
        {
          path: "login",
          component: LoginView,
        },
        {
          path: "restore",
          component: RememberView,
        },
      ],
    },
    { path: "/404", component: NotFound },
    { path: "/403", component: AccessDenied },
    { path: "/401", component: Unauthorized },
    {
      path: "",
      redirect: (to) => {
        return `${companyName}`;
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect(to) {
        return "404";
      },
    },
  ],
  history: VueRouter.createWebHistory(),
});

router.beforeEach((to, from) => {
  if (to.path.includes("/auth")) {
    if (document.cookie.includes("token")) {
      return { name: "home" };
    }
  }

  if (to.path.includes(companyName)) {
    if (!document.cookie.includes("token")) {
      return { name: "auth" };
    }
  }
});

createApp(App)
  .use(VueCookies, [{ expires: "1d", domain: "", path: "/" }])
  .use(router)
  .mount("#app");
