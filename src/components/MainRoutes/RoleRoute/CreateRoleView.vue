<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { IRole } from "../../../scripts/types";
import { createRoleAPI } from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

let role = ref({
  close_project: false,
  create_column: false,
  create_task: false,
  delete_column: false,
  delete_task: false,
  update_column: false,
  update_project: false,
  update_task: false,
} as IRole);

function createRole() {
  createRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    role.value
  ).then((x) => {
    if (x.code == "200") {
      router.push({ name: "roles" });
    }
  });
}
function onCloseEdit() {
  router.push({
    name: "roles",
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
      <p>Создать роль</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Название</div>
      <input
        v-model="role.name"
        type="text"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>Описание</div>
      <input
        v-model="role.description"
        type="text"
        class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-18"
      />

      <div>
        <p class="fs-32">Права на проект</p>
        <div class="grid-container" id="field-container">
          <div>Может редактировать</div>
          <input
            v-model="role.update_project"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
          <div>Может закрывать</div>
          <input
            v-model="role.close_project"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
        </div>
      </div>

      <div>
        <p class="fs-32">Права на колонки</p>
        <div class="grid-container" id="field-container">
          <div>Может создавать</div>
          <input
            v-model="role.create_column"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
          <div>Может редактировать</div>
          <input
            v-model="role.update_column"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
          <div>Может удалять</div>
          <input
            v-model="role.delete_column"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
        </div>
      </div>

      <div>
        <p class="fs-32">Права на задачи</p>
        <div class="grid-container" id="field-container">
          <div>Может создавать</div>
          <input
            v-model="role.create_task"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
          <div>Может редактировать</div>
          <input
            v-model="role.update_task"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
          <div>Может удалять</div>
          <input
            v-model="role.delete_task"
            type="checkbox"
            class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 afc-fc fs-18"
          />
        </div>
      </div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1"
        @click="createRole()"
      >
        Создать
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
