<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { resetPasswordAPI, restoreAPI } from "../../scripts/api";

let password = ref("");
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
let id_invite = router.currentRoute._value.params.resetId;
async function restorePassword() {
  let res = await resetPasswordAPI(password.value, id_invite);

  if (res.code == "200") {
    router.push({ name: "auth" });
  }
}
</script>

<template>
  <div class="grid-container ji-center js-center w-100" id="input-container">
    <label class="fc-fc fs-28 ff-semibold">Новый пароль</label>
    <input
      id="loginInput"
      type="password"
      v-model="password"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
  </div>
  <div id="button-container" class="grid-container w-100 ai-center">
    <button
      class="tb-bg fc-fc pv-10 ph-10 w-100 fs-24 br-15 bw-2 oc-bc bs-element"
      @click="restorePassword()"
    >
      Сменить
    </button>

    <RouterLink
      :to="{ name: 'auth' }"
      class="fc-fc fs-24 grid-container js-center"
      >Войти по логину</RouterLink
    >
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
