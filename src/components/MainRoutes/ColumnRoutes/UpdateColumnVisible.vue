<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { IColumn } from "../../../scripts/types";
import {
  createColumnAPI,
  getByIdColumnsAPI,
  updateColumnAPI,
} from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

let column = ref({
  color: "#8eb2c6",
} as IColumn);

onMounted(() => {
  getByIdColumnsAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idColumn
  ).then((x) => {
    column.value = x.object;
  });
});

function updateColumn() {
  updateColumnAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    column.value
  ).then((x) => {
    if (x.code == "200") {
      router.push({ name: "columns" });
    }
  });
}
function onCloseEdit() {
  router.push({
    name: "columns",
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
      <p>Создать колонку</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Название</div>
      <input
        v-model="column.name"
        type="text"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>Описание</div>
      <input
        v-model="column.description"
        type="text"
        class="grid-container js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>Цвет</div>
      <input
        type="color"
        class="js-center ac-bg br-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
        v-model="column.color"
      />
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="updateColumn()"
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
  grid-auto-rows: max-content auto max-content;
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
