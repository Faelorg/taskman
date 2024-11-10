<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IRole, IUser } from "../../../scripts/types";
import {
  createRoleAPI,
  getAllUserAPI,
  setUserToRoleAPI,
} from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let users = ref([] as IUser[]);
let user = ref();
onMounted(() => {
  getAllUserAPI(cookies.get("token")).then((x) => {
    users.value = x.object;
  });
});

function onClose() {
  router.push({ name: "role" });
}

function setUser() {
  setUserToRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idRole,
    user.value
  ).then((x) => {
    if (x.code == "200") {
    } else {
      alert("Выберите пользователя не назначенного в других ролях");
      return;
    }
    router.push({ name: "role" });
  });
}
</script>

<template>
  <div
    class="grid-container ma-10 bs-panel br-10 pc-bg pa-10"
    id="modal-container"
  >
    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
    >
      <p>Назначить пользователя</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <select
        name=""
        id=""
        class="w-100 h-100 fs-24 pa-10 ac-bg br-10 oc-bc bw-1 afc-fc"
        v-model="user"
      >
        <template v-for="user of users">
          <option v-bind:value="user.id_user">
            {{ user.firstname }} {{ user.lastname }} {{ user.middlename }}
          </option>
        </template>
      </select>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="setUser"
      >
        Назначить
      </button>

      <button
        class="pa-10 br-10 oc-bc bw-1 cb-bg fc-fc fs-32 grid-container bs-element ac-center"
        @click="onClose"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  grid-auto-flow: row;
  grid-auto-rows: max-content 1fr max-content;
  gap: 15px;
}

#data-container {
  grid-auto-rows: max-content;
  justify-content: left;
  gap: 10px;

  height: 100%;
  overflow-y: auto !important;
}

#button-control {
  grid-template-columns: max-content max-content max-content 1fr;
  gap: 15px;
}
#field-container {
  grid-template-columns: max-content max-content;
  gap: 10px;
  margin-top: 5px;
}
</style>
