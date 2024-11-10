<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { getCompanyAPI, registerAPI } from "../../scripts/api";
const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
let login = ref("");
let password = ref("");
let firstname = ref("");
let middlename = ref("");
let lastname = ref("");
let id_invite = router.currentRoute._value.params.referalId;

async function register() {
  let res = await registerAPI(
    login.value,
    password.value,
    firstname.value,
    lastname.value,
    middlename.value,
    id_invite
  );

  if (res.code == "200") {
    cookies.set("token", res.object);
    let com = await getCompanyAPI(cookies.get("token"));
    cookies.set("company", com.object.name);
    router.go({ name: "home", params: { companyName: com.object.name } });
    return;
  }

  alert("Недопустимый ввод");
}
</script>

<template>
  <div class="grid-container ji-center js-center w-100" id="input-container">
    <label class="fc-fc fs-28 ff-semibold">Логин</label>
    <input
      id="loginInput"
      type="text"
      v-model="login"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
    <label class="fc-fc fs-28 ff-semibold">Фамилия</label>
    <input
      id="loginInput"
      type="text"
      v-model="firstname"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
    <label class="fc-fc fs-28 ff-semibold">Имя</label>
    <input
      id="loginInput"
      type="text"
      v-model="lastname"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
    <label class="fc-fc fs-28 ff-semibold">Отчество</label>
    <input
      id="loginInput"
      type="text"
      v-model="middlename"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
    <label class="fc-fc fs-28 ff-semibold">Пароль</label>
    <input
      id="passwordInput"
      type="password"
      v-model="password"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
  </div>
  <div id="button-container" class="grid-container w-100">
    <button
      class="sb-bg fc-fc pv-10 fs-28 br-15 ph-10 w-100 bw-2 oc-bc bs-element"
      @click="register()"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<style scoped>
#input-container {
  gap: 10px;
}

#button-container {
  width: 100%;
}

a {
  text-align: center;
}
</style>
