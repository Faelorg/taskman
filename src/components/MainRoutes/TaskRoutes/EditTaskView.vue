<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IColumn, ITask, IUser } from "../../../scripts/types";
import {
  getAllColumnsAPI,
  getAllUserAPI,
  getTaskByIdAPI,
  updateTaskAPI,
} from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let users = ref([] as IUser[]);
let columns = ref([] as IColumn[]);
let task = ref({
  name: "",
  description: "",
} as ITask);

onMounted(() => {
  getAllUserAPI(cookies.get("token")).then((x) => {
    users.value = x.object;
  });

  getAllColumnsAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject
  ).then((x) => {
    columns.value = x.object;
  });

  getTaskByIdAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idColumn,
    router.currentRoute._value.params.idTask
  ).then((x) => {
    task.value = x.object;
  });
});

function updateTask() {
  updateTaskAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idColumn,
    router.currentRoute._value.params.idTask,
    task.value
  ).then((x) => {
    if (x.code == "200") {
      return router.push({ name: "columns" });
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
      <p>Редактировать задачу {{ task.code }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Название</div>
      <input
        v-model="task!.name"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>Описание</div>
      <textarea
        v-model="task!.description"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>Статус</div>
      <select
        v-model="task!.status"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      >
        <option value="1">Новая</option>
        <option value="2">В работе</option>
        <option value="3">Выполнено</option>
      </select>

      <div>Ответственный</div>
      <select
        v-model="task!.id_user"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      >
        <template v-for="user of users">
          <option v-bind:value="user.id_user">
            {{ user.firstname }} {{ user.lastname }} {{ user.middlename }}
          </option>
        </template>
      </select>

      <div>Колонка</div>
      <select
        v-model="task!.id_column"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      >
        <template v-for="column of columns">
          <option v-bind:value="column.id_column">
            {{ column.name }}
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
        @click="updateTask"
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
  grid-template-columns: max-content max-content;
  overflow-y: auto !important;
}

#button-control {
  grid-template-columns: max-content max-content max-content 1fr;
  gap: 15px;
}

textarea {
  resize: vertical;
  height: 150px;
}
</style>
