<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IColumn, IRole, ITask } from "../../../scripts/types";
import {
  deleteColumnsAPI,
  getAllColumnsAPI,
  getAllTaskAPI,
  getRoleFromUserAPI,
} from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

let columns = ref([] as IColumn[]);
let role = ref(cookies.get("roles") as IRole);
onMounted(async () => {
  let res = await getAllColumnsAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject
  );

  columns.value = res.object;

  columns.value.forEach(async (column) => {
    let res = await getAllTaskAPI(
      cookies.get("token"),
      cookies.get("companyId"),
      router.currentRoute._value.params.idProject,
      column.id_column
    );
    tasks.value.push({ id_column: column.id_column, tasks: res.object });
  });
});

let tasks = ref(
  [] as {
    id_column: string;
    tasks: ITask[];
  }[]
);

function createColumn() {
  router.push({ name: "createColumn" });
}

function updateColumn(id_column: string) {
  router.push({ name: "updateColumn", params: { idColumn: id_column } });
}

function updateTask(id_column: string, id_task: string) {
  router.push({
    name: "editTask",
    params: { idColumn: id_column, idTask: id_task },
  });
}

function deleteColumn(id_column: string) {
  columns.value.splice(
    columns.value.indexOf(columns.value.find((x) => x.id_column == id_column)!),
    1
  );

  deleteColumnsAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    id_column
  );
}
function createTask(id_column: string) {
  router.push({ name: "createTask", params: { idColumn: id_column } });
}

function openTask(id_column: string, id_task: string) {
  router.push({
    name: "task",
    params: { idColumn: id_column, idTask: id_task },
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
      id="columns-container"
    >
      <template v-for="column of columns">
        <div
          class="fc-fc bs-element br-10 bw-2 oc-bc grid-container pa-10"
          :style="{ 'background-color': column.color }"
          id="column-container"
        >
          <div class="grid-container" id="column-navigate">
            <div>{{ column.name }}</div>

            <button
              id="icon-button"
              @click="updateColumn(column.id_column)"
              v-if="role.update_column"
            >
              <img src="../../../assets/settings.svg" id="icon" />
            </button>

            <button
              id="icon-button"
              @click="deleteColumn(column.id_column)"
              v-if="role.delete_column"
            >
              <img src="../../../assets/trash.svg" id="icon" />
            </button>
          </div>
          <div id="column-body">
            <div id="tasks-container" class="grid-container">
              <div
                id="task-container"
                class="grid-container ma-10 pa-10 oc-bc bw-1 br-10"
                v-for="task of tasks.find(
                  (x) => x.id_column == column.id_column
                )?.tasks"
              >
                <div id="task-navigate">
                  <div>Код</div>
                  <div>{{ task.code }}</div>
                  <button
                    id="icon-button"
                    @click="updateTask(column.id_column, task.id_task)"
                    v-if="role.update_task"
                  >
                    <img src="../../../assets/settings.svg" id="icon" />
                  </button>
                </div>
                <div
                  id="task-body"
                  @click="openTask(column.id_column, task.id_task)"
                >
                  <div>Название</div>
                  <div>{{ task.name }}</div>
                  <div>Описание</div>
                  <div>{{ task.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <div id="column-footer">
            <button
              id="add-button"
              class="grid-container fc-fc w-100 h-100 sb-bg fs-32 bw-1 bs-element"
              v-if="role.create_task"
              @click="createTask(column.id_column)"
            >
              +
            </button>
          </div>
        </div>
      </template>
      <div
        class="pc-bg fc-fc bs-element br-10 bw-2 oc-bc grid-container ai-center pa-10 add-column"
        id="column-container"
        @click="createColumn"
        v-if="role.create_column"
      >
        <button
          id="add-button"
          class="grid-container fc-fc w-100 h-100 sb-bg fs-32 bw-1 bs-element"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#column-container {
  height: 100%;
  min-width: 250px;
  grid-template-rows: max-content 1fr max-content;
}

.add-column {
  grid-template-rows: 1fr !important;
}

#columns-container {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 15px;
  overflow-x: auto;
}

#add-button {
  display: grid;
  justify-self: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  border-radius: 50%;
}

#icon-button {
  background: none;
  border: none;
}

#icon-button:hover {
  filter: grayscale(90%);
}

#icon-button:active {
  filter: brightness(85%);
}

#icon {
  width: 25px;
  height: 25px;
}

#column-navigate {
  grid-template-columns: max-content max-content max-content;
  justify-content: left;
  align-content: center;
  gap: 10px;
  width: max-content;
}

#column-body {
  overflow-y: auto;
}

#task-container {
  gap: 10px;
}

#task-navigate {
  display: grid;
  gap: 10px;
  grid-template-columns: max-content max-content max-content;
}
#task-body {
  display: grid;
  grid-template-columns: max-content 1fr;
}
</style>
