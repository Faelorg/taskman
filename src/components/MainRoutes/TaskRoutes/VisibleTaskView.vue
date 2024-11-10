<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { ITask, IUser } from "../../../scripts/types";
import { getTaskByIdAPI, getUserByIdAPI } from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let user = ref({} as IUser);

let task = ref({
  name: "",
  description: "",
} as ITask);

onMounted(async () => {
  let res = await getTaskByIdAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idColumn,
    router.currentRoute._value.params.idTask
  );
  task.value = res.object;
  let resu = await getUserByIdAPI(cookies.get("token"), res.object.id_user);
  user.value = resu.object;
});

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
      <p>Задача {{ task.code }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="data-container"
    >
      <div>Название</div>
      <div class="grid-container mh-25 js-center fc-fc fs-24">
        {{ task!.name }}
      </div>

      <div>Описание</div>
      <div class="grid-container mh-25 js-center fc-fc fs-24">
        {{ task!.description }}
      </div>

      <div>Ответственный</div>
      <div class="grid-container mh-25 js-center fc-fc fs-24">
        {{ user.firstname }} {{ user.lastname }} {{ user.middlename }}
      </div>

      <div>Статус</div>
      <div
        class="grid-container mh-25 js-center fc-fc fs-24"
        v-if="task.status == 1"
      >
        Новая
      </div>
      <div
        class="grid-container mh-25 js-center fc-fc fs-24"
        v-if="task.status == 2"
      >
        В работе
      </div>
      <div
        class="grid-container mh-25 js-center fc-fc fs-24"
        v-if="task.status == 3"
      >
        Выполнено
      </div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
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
