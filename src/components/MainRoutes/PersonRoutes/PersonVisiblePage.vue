<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

let users = ref([
  {
    selected: false,
    data: {
      id: "1",
      name: "fael",
      email: "faewl@fckje.com",
    },
  },

  {
    selected: false,
    data: {
      id: "2",
      name: "fael2",
      email: "faew222l@fckje.com",
    },
  },
]);

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let user = users.value.find(
  (x) => x.data.id == router.currentRoute._value.params.idPerson
);
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
      <p>Карточка сотрудника {{ user?.data.name }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Название</div>
      <div class="fc-fc fs-18">{{ user?.data.name }}</div>

      <div>Почта</div>
      <div class="fc-fc fs-18">{{ user?.data.email }}</div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin"
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
