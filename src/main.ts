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
import VisibleView from "./components/MainRoutes/SettingsRoutes/VisibleView.vue";
import { getCompanyNameAPI } from "./scripts/api";
import UserPageView from "./components/MainRoutes/UserPageView.vue";
import CompanyView from "./components/MainRoutes/SettingsRoutes/CompanyView.vue";
import PersonPageView from "./components/MainRoutes/PersonPageView.vue";
import PersonUpdatePage from "./components/MainRoutes/PersonRoutes/PersonUpdatePage.vue";
import PersonVisiblePage from "./components/MainRoutes/PersonRoutes/PersonVisiblePage.vue";
import PersonAddPage from "./components/MainRoutes/PersonRoutes/PersonAddPage.vue";

const router = VueRouter.createRouter({
  routes: [
    {
      path: `/:companyName`,
      redirect: (to) => {
        return { name: "main" };
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
          name: "user",
          path: "user",
          component: UserPageView,
        },
        {
          path: "task",
          name: "task",
          component: TaskPageView,
        },
        {
          path: "people",
          name: "people",
          redirect(to) {
            return { name: "all" };
          },
          children: [
            {
              name: "all",
              path: "all",
              component: PeoplePageView,
            },
            {
              name: "add",
              path: "add",
              component: PersonAddPage,
            },
            {
              path: "person/:idPerson",
              name: "person",
              props: true,
              component: PersonPageView,
              redirect: { name: "visible" },
              children: [
                {
                  path: "visible",
                  name: "visible",
                  component: PersonVisiblePage,
                },

                {
                  path: "edit",
                  name: "edit",
                  component: PersonUpdatePage,
                },
              ],
            },
          ],
        },
        {
          path: "settings",
          name: "settings",
          redirect: (to) => {
            return { name: "view" };
          },
          component: SettingsPageView,
          children: [
            { name: "view", path: "view", component: VisibleView },
            { name: "company", path: "company", component: CompanyView },
          ],
        },
        { path: "404", name: "404", component: NotFound },
        { path: "403", name: "403", component: AccessDenied },
      ],
      components: {
        default: Main,
      },
    },
    {
      path: "/",
      redirect(to) {
        return { name: "auth" };
      },
    },
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
    { path: "/401", component: Unauthorized },
    {
      path: "/:pathMatch(.*)*",
      redirect(to) {
        return { name: "404", params: { companyName: getCompanyNameAPI() } };
      },
    },
  ],
  history: VueRouter.createWebHistory(),
});

router.beforeEach((to, from) => {
  console.log(to.fullPath.split("/").length);

  if (to.path.includes("/admin")) {
    if (!document.cookie.includes("admin")) {
      return { name: "403", params: { companyName: getCompanyNameAPI() } };
    }
  }

  if (to.path.includes("edit") && to.path.includes("person")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "person",
        params: {
          companyName: getCompanyNameAPI(),
          idPerson: to.params.idPerson,
        },
      };
    }
  }

  if (to.path.includes("add") && to.path.includes("person")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "person",
        params: {
          companyName: getCompanyNameAPI(),
          idPerson: to.params.idPerson,
        },
      };
    }
  }

  if (to.path.includes("/auth")) {
    if (document.cookie.includes("token")) {
      return { name: "home", params: { companyName: getCompanyNameAPI() } };
    }
  }

  if (to.params.companyName != null) {
    if (!document.cookie.includes("token")) {
      return { name: "auth" };
    }
  }
});

createApp(App)
  .use(VueCookies, [{ expires: "1d", domain: "", path: "/" }])
  .use(router)
  .mount("#app");
