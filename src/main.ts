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
import SettingsPageView from "./components/MainRoutes/SettingsPageView.vue";
import PeoplePageView from "./components/MainRoutes/PeoplePageView.vue";
import LoginView from "./components/AuthRoutes/LoginView.vue";
import RememberView from "./components/AuthRoutes/RememberView.vue";
import VisibleView from "./components/MainRoutes/SettingsRoutes/VisibleView.vue";
import { getCompanyAPI, loginAPI } from "./scripts/api";
import UserPageView from "./components/MainRoutes/UserPageView.vue";
import PersonPageView from "./components/MainRoutes/PersonPageView.vue";
import PersonUpdatePage from "./components/MainRoutes/PersonRoutes/PersonUpdatePage.vue";
import PersonVisiblePage from "./components/MainRoutes/PersonRoutes/PersonVisiblePage.vue";
import PersonAddPage from "./components/MainRoutes/PersonRoutes/PersonAddPage.vue";
import MainVisibleView from "./components/MainRoutes/MainRoutes/MainVisibleView.vue";
import MainRedactorView from "./components/MainRoutes/MainRoutes/MainRedactorView.vue";
import AddProjectView from "./components/MainRoutes/ProjectRoutes/AddProjectView.vue";
import RegisterView from "./components/AuthRoutes/RegisterView.vue";
import MainCompanyView from "./components/MainCompanyView.vue";
import CompanyView from "./components/MainRoutes/SettingsRoutes/CompanyView.vue";
import ResetPassword from "./components/AuthRoutes/ResetPassword.vue";
import ProjectPageView from "./components/MainRoutes/ProjectPageView.vue";
import VisibleProjectView from "./components/MainRoutes/ProjectRoutes/VisibleProjectView.vue";
import EditProjectView from "./components/MainRoutes/ProjectRoutes/EditProjectView.vue";
import VisibleRolesView from "./components/MainRoutes/RoleRoute/VisibleRolesView.vue";
import VisibleRoleView from "./components/MainRoutes/RoleRoute/VisibleRoleView.vue";
import CreateRoleView from "./components/MainRoutes/RoleRoute/CreateRoleView.vue";
import SetUserRoleView from "./components/MainRoutes/RoleRoute/SetUserRoleView.vue";
import EditRoleView from "./components/MainRoutes/RoleRoute/EditRoleView.vue";
import ColumnsVisibleView from "./components/MainRoutes/ColumnRoutes/ColumnsVisibleView.vue";
import CreateColumnVisible from "./components/MainRoutes/ColumnRoutes/CreateColumnVisible.vue";
import UpdateColumnVisible from "./components/MainRoutes/ColumnRoutes/UpdateColumnVisible.vue";
import CreateTaskView from "./components/MainRoutes/TaskRoutes/CreateTaskView.vue";
import VisibleTaskView from "./components/MainRoutes/TaskRoutes/VisibleTaskView.vue";
import EditTaskView from "./components/MainRoutes/TaskRoutes/EditTaskView.vue";

let getTokenFromCookie = (): string => {
  let token = "";
  document.cookie.split(";").forEach((x) => {
    if (x.includes("token")) {
      token = x.split("=")[1];
    }
  });

  return token;
};

let getCompanyFromCookie = (): string => {
  if (document.cookie.includes("company")) {
    let company = "";
    document.cookie.split(";").forEach((c) => {
      if (c.includes("company")) {
        company = c.split("=")[1];
      }
    });

    return company;
  }

  return "0";
};

let removeCookie = () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

let resetCookie = async () => {
  let cookies: string[] = [];
  let login = "";
  let password = "";
  document.cookie.split(";").forEach((c) => {
    if (
      !(c.includes("token") || c.includes("company") || c.includes("admin"))
    ) {
      cookies.push(c);
    }

    if (c.includes("login")) login = c.split("=")[1];

    if (c.includes("password")) password = c.split("=")[1];
  });

  let res = await loginAPI(login.replace("%40", "@"), password);

  if (res.code != "200") {
    return "stop";
  }
  let token = res.object;
  let company = (await getCompanyAPI(token)).object.name;
};

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
          redirect(to) {
            return { name: "main_view" };
          },
          children: [
            {
              path: "",
              name: "main_view",
              component: MainVisibleView,
            },

            {
              path: "redactor",
              name: "main_redactor",
              component: MainRedactorView,
            },
          ],
        },
        {
          name: "user",
          path: "user",
          component: UserPageView,
        },
        {
          path: "project",
          name: "project",
          component: ProjectPageView,
          children: [
            {
              name: "addProject",
              path: "add",
              component: AddProjectView,
            },
            {
              name: "oneProject",
              path: ":idProject",
              component: VisibleProjectView,
            },
            {
              name: "editProject",
              path: ":idProject/edit",
              component: EditProjectView,
            },

            {
              name: "roles",
              path: ":idProject/roles",
              component: VisibleRolesView,
            },

            {
              name: "role",
              path: ":idProject/roles/:idRole",
              component: VisibleRoleView,
            },

            {
              name: "createRole",
              path: ":idProject/roles/create",
              component: CreateRoleView,
            },

            {
              name: "setUserRole",
              path: ":idProject/roles/:idRole/users/set",
              component: SetUserRoleView,
            },

            {
              name: "updateRole",
              path: ":idProject/roles/:idRole/edit",
              component: EditRoleView,
            },

            {
              name: "columns",
              path: ":idProject/columns",
              component: ColumnsVisibleView,
            },

            {
              name: "createColumn",
              path: ":idProject/columns/create",
              component: CreateColumnVisible,
            },

            {
              name: "updateColumn",
              path: ":idProject/columns/:idColumn",
              component: UpdateColumnVisible,
            },

            {
              name: "createTask",
              path: ":idProject/columns/:idColumn/tasks/create",
              component: CreateTaskView,
            },

            {
              name: "task",
              path: ":idProject/columns/:idColumn/tasks/:idTask/visible",
              component: VisibleTaskView,
            },

            {
              name: "editTask",
              path: ":idProject/columns/:idColumn/tasks/:idTask/edit",
              component: EditTaskView,
            },
          ],
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
        {
          path: ":referalId/register",
          component: RegisterView,
        },
        {
          path: ":resetId/reset",
          component: ResetPassword,
        },
      ],
    },
    {
      path: "/company",
      name: "createCompany",
      component: MainCompanyView,
    },
    { path: "/401", component: Unauthorized },
    {
      path: "/:pathMatch(.*)*",
      redirect(to) {
        return {
          name: "404",
          params: {
            companyName: getCompanyFromCookie(),
          },
        };
      },
    },
  ],
  history: VueRouter.createWebHistory(),
});

router.beforeEach(async (to, from) => {
  // await resetCookie();

  if (to.path.includes("/company")) {
    return;
  }

  if (to.path.includes("/admin")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "403",
        params: {
          companyName: getCompanyFromCookie(),
        },
      };
    }
  }

  if (to.path.includes("edit") && to.path.includes("person")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "person",
        params: {
          companyName: getCompanyFromCookie(),
          idPerson: to.params.idPerson,
        },
      };
    }
  }

  if (to.path.includes("add") && to.path.includes("people")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "people",
        params: {
          companyName: getCompanyFromCookie(),
        },
      };
    }
  }

  if (to.path.includes("/auth")) {
    if (document.cookie.includes("token")) {
      return {
        name: "home",
        params: {
          companyName: getCompanyFromCookie(),
        },
      };
    }
  }

  if (to.params.companyName != null) {
    if (!document.cookie.includes("token")) {
      return {
        name: "auth",
        params: {
          companyName: getCompanyFromCookie(),
        },
      };
    }
  }

  if (to.path.includes("/redactor")) {
    if (!document.cookie.includes("admin")) {
      return {
        name: "home",
        params: {
          companyName: getCompanyFromCookie(),
        },
      };
    }
  }
  if (
    to.params.companyName != getCompanyFromCookie() &&
    getTokenFromCookie() != ""
  ) {
    return {
      name: "home",
      params: { companyName: getCompanyFromCookie() },
    };
  }
  if (getCompanyFromCookie() == "0" && !to.path.includes("/auth")) {
    document.cookie = "";
    return { name: "auth" };
  }

  let res = resetCookie();

  res.then((x) => {
    if (x === "stop") {
      removeCookie();
    }
  });
});

createApp(App)
  .use(VueCookies, [{ expires: "1d", domain: "/", path: "/" }])
  .use(router)
  .mount("#app");
