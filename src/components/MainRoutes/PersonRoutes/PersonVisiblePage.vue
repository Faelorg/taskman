<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { getUserByIdAPI } from "../../../scripts/api";
import { IUser } from "../../../scripts/types";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let user = ref({} as IUser);
onMounted(() => {
  getUserByIdAPI(
    cookies.get("token"),
    router.currentRoute._value.params.idPerson
  ).then((u) => (user.value = u.object));
});

let isAdmin = ref(cookies.get("admin"));

function onCloseEdit() {
  router.push({ name: "people" });
}

function OpenEdit() {
  router.push({
    name: "edit",
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
      <p>Карточка сотрудника {{ user?.login }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Почта</div>
      <div class="fc-fc fs-18">{{ user?.email }}</div>
      <div v-if="user.firstname">Фамилия</div>
      <div class="fc-fc fs-18">{{ user?.firstname }}</div>
      <div v-if="user.lastname">Имя</div>
      <div class="fc-fc fs-18">{{ user?.lastname }}</div>
      <div v-if="user.middlename">Отчество</div>
      <div class="fc-fc fs-18">{{ user?.middlename }}</div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="OpenEdit"
      >
        Редактировать
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
