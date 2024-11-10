<script setup lang="ts">
import { getCurrentInstance, onMounted, onUpdated, ref } from "vue";
import { IProject, IRole } from "../../../scripts/types";
import { getProjectAPI, getRoleFromUserAPI } from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

function onCloseEdit() {
  router.push({ name: "project" });
}

function OpenEdit() {
  router.push({
    name: "editProject",
    params: {
      idProject: router.currentRoute._value.params.idProject,
    },
  });
}

function OpenRoles() {
  router.push({
    name: "roles",
    params: {
      idProject: router.currentRoute._value.params.idProject,
    },
  });
}

function openTasks() {
  router.push({ name: "columns" });
}

let project = ref({} as IProject);
let oldId = "";
let role = ref({} as IRole);
onUpdated(() => {
  if (oldId != router.currentRoute._value.params.idProject) {
    getProjectAPI(
      cookies.get("token"),
      cookies.get("companyId"),
      router.currentRoute._value.params.idProject
    ).then((x) => {
      project.value = x.object;
    });
    oldId = router.currentRoute._value.params.idProject;

    getRoleFromUserAPI(
      cookies.get("token"),
      cookies.get("companyId"),
      router.currentRoute._value.params.idProject
    ).then((x) => {
      role.value = x.object;
      cookies.set("roles", x.object);
    });
  }
});

onMounted(() => {
  getProjectAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject
  ).then((x) => {
    project.value = x.object;
  });
  oldId = router.currentRoute._value.params.idProject;
  getRoleFromUserAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject
  ).then((x) => {
    role.value = x.object;
    cookies.set("roles", x.object);
  });
});
</script>

<template>
  <div
    class="grid-container ma-10 bs-panel br-10 pc-bg pa-10"
    id="modal-container"
  >
    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
    >
      <p>Карточка проекта {{ project?.name }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Описание</div>
      <div class="fc-fc fs-18">{{ project?.description }}</div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="role.update_project"
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
      <button
        class="pa-10 br-10 oc-bc bw-1 tb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="OpenRoles"
      >
        Роли
      </button>

      <button
        class="pa-10 br-10 oc-bc bw-1 tb-bg fc-fc fs-32 grid-container bs-element ac-center"
        @click="openTasks"
      >
        Задачи
      </button>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  grid-auto-flow: row;
  grid-auto-rows: max-content max-content;
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
  grid-template-columns: max-content max-content max-content max-content 1fr;
  gap: 15px;
}
</style>
