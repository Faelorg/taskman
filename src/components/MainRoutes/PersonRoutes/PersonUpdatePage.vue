<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IUser } from "../../../scripts/types";
import { getUserByIdAPI, updateUserAPI } from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let user: IUser;
let email = ref("");
let firstname = ref("");
let lastname = ref("");
let middlename = ref("");
let login = ref("");
onMounted(() => {
  getUserByIdAPI(
    cookies.get("token"),
    router.currentRoute._value.params.idPerson
  ).then((x) => {
    user = x.object;
    email.value = x.object.email;
    firstname.value = x.object.firstname!;
    lastname.value = x.object.lastname!;
    middlename.value = x.object.middlename!;
    login.value = x.object.login!;
  });
});

function updateUser() {
  user.email = email.value;
  user.firstname = firstname.value;
  user.lastname = lastname.value;
  user.middlename = middlename.value;
  user.login = login.value;

  updateUserAPI(
    cookies.get("token"),
    router.currentRoute._value.params.idPerson,
    user
  ).then((x) => {
    if (x.code == "200") {
      router.push({ name: "people" });
    }
  });
}

function onCloseEdit() {
  router.push({
    name: "person",
    params: { idUser: router.currentRoute._value.params.idPerson },
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
      <p>Карточка сотрудника {{ email }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Почта</div>
      <input
        v-model="email"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Логин</div>
      <input
        v-model="login"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Фамилия</div>
      <input
        v-model="firstname"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Имя</div>
      <input
        v-model="lastname"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Отчество</div>
      <input
        v-model="middlename"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="updateUser"
      >
        Сохранить
      </button>

      <button
        class="pa-10 br-10 oc-bc bw-1 cb-bg fc-fc fs-32 grid-container bs-element ac-center"
        @click="onCloseEdit"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  grid-auto-flow: row;
  grid-auto-rows: 1fr auto 1fr;
  gap: 15px;
  overflow-y: auto;
}

#data-container {
  grid-auto-rows: auto;
  justify-content: left;
  gap: 10px;

  height: 100%;
  overflow-x: auto !important;
}

#button-control {
  grid-template-columns: max-content max-content max-content 1fr;
  gap: 15px;
}
</style>
