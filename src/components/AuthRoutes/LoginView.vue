<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { getCompanyAPI, loginAPI } from "../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let login = ref("");
let password = ref("");

async function loginFunction(l: string, p: string) {
  let res = await loginAPI(l, p);
  if (res.code == "200") {
    cookies.set("login", l);
    cookies.set("password", p);
    cookies.set("token", res.object);
    let com = await getCompanyAPI(cookies.get("token"));
    console.log(com);

    if (com.code == "200") {
      cookies.set("company", com.object.name);
      cookies.set("companyId", com.object.id_company);
      router.go({ name: "home", params: { companyName: com.object.name } });
      return;
    }
  }

  alert("Неверный логин или пароль");
}
</script>

<template>
  <div class="grid-container ji-center js-center w-100" id="input-container">
    <label class="fc-fc fs-28 ff-semibold">Логин/Email</label>
    <input
      id="loginInput"
      type="text"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
      v-model="login"
    />
    <label class="fc-fc fs-28 ff-semibold">Пароль</label>
    <input
      id="passwordInput"
      type="password"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
      v-model="password"
    />
  </div>
  <div id="button-container" class="grid-container w-100">
    <button
      class="sb-bg fc-fc pv-10 fs-28 br-15 ph-10 w-100 bw-2 oc-bc bs-element"
      @click="loginFunction(login, password)"
    >
      Войти
    </button>
    <RouterLink
      :to="{ path: 'restore' }"
      class="fc-fc pv-10 ph-10 w-100 fs-24 br-15 bw-2"
    >
      Забыли пароль
    </RouterLink>
  </div>
</template>

<style scoped>
#input-container {
  gap: 10px;
}

#button-container {
  width: 100%;
  grid-template-columns: 1.8fr 1fr;
  gap: 30px;
}

a {
  text-align: center;
}
</style>
