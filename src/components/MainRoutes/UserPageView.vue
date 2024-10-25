<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

let user = ref({
  selected: false,
  data: {
    id: "1",
    name: "fael",
    email: "faewl@fckje.com",
  },
});

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;

let myTask = ref([
  { name: "Отжуманя", code: "ID-83738" },
  { name: "Отжуманя", code: "ID-86738" },
  { name: "Отжуманя", code: "ID-87738" },
  { name: "Отжуманя", code: "ID-88738" },
  { name: "Отжуманя", code: "ID-89738" },
  { name: "Отжуманя", code: "ID-81738" },
  { name: "Отжуманя", code: "ID-84538" },
]);

let myProject = ref([
  { name: "Отжуманя", code: "ID-83738" },
  { name: "Отжуманя", code: "ID-86738" },
  { name: "Отжуманя", code: "ID-87738" },
  { name: "Отжуманя", code: "ID-88738" },
  { name: "Отжуманя", code: "ID-89738" },
  { name: "Отжуманя", code: "ID-81738" },
  { name: "Отжуманя", code: "ID-84538" },
]);

let accordionTask = ref(false);
let accordionProject = ref(false);
let accordionUser = ref(false);

function openAccordion(opened: boolean) {
  opened = !opened;
  return opened;
}

function leaveAccaunt() {
  cookies.remove("token");
  cookies.remove("admin");
}
</script>

<template>
  <div class="main-container pa-10 ac-bg">
    <div class="pc-bg grid-container br-10 bs-panel pa-25" id="container">
      <p class="fs-32 fc-fc">Профиль: {{ user.data.name }}</p>

      <div
        id="accordion"
        class="grid-container mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
      >
        <div
          @click="accordionUser = openAccordion(accordionUser)"
          class="grid-container ai-center ac-center"
          id="accordionTitle"
        >
          <p class="fc-fc fs-24">Мой профиль</p>
          <p class="fc-fc fs-18" v-if="!accordionUser">&#9660;</p>
          <p class="fc-fc fs-18" v-else>&#9650;</p>
        </div>

        <div id="accordionBody" v-if="accordionUser" class="fc-fc fs-24">
          <div id="table" class="grid-container ai-center ac-center">
            <p>Код</p>
            <p>Название</p>

            <label class="fs-24 fc-fc">E-mail</label>
            <p class="fs-24 fc-fc">{{ user.data.email }}</p>
          </div>
        </div>
      </div>

      <div
        id="accordion"
        class="grid-container mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
      >
        <div
          @click="accordionTask = openAccordion(accordionTask)"
          class="grid-container ai-center ac-center"
          id="accordionTitle"
        >
          <p class="fc-fc fs-24">Мои задачи</p>
          <p class="fc-fc fs-18" v-if="!accordionTask">&#9660;</p>
          <p class="fc-fc fs-18" v-else>&#9650;</p>
        </div>

        <div id="accordionBody" v-if="accordionTask" class="fc-fc fs-24">
          <div id="table" class="grid-container ai-center ac-center">
            <p>Код</p>
            <p>Название</p>
            <template
              v-for="task of myTask"
              class="grid-container ai-center ac-center"
              id="table"
            >
              <p>{{ task.code }}</p>
              <p>{{ task.name }}</p>
            </template>
          </div>
        </div>
      </div>

      <div
        id="accordion"
        class="grid-container mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
      >
        <div
          @click="accordionProject = openAccordion(accordionProject)"
          class="grid-container ai-center ac-center"
          id="accordionTitle"
        >
          <p class="fc-fc fs-24">Мои проекты</p>
          <p class="fc-fc fs-18" v-if="!accordionProject">&#9660;</p>
          <p class="fc-fc fs-18" v-else>&#9650;</p>
        </div>

        <div id="accordionBody" v-if="accordionProject" class="fc-fc fs-24">
          <div id="table" class="grid-container ai-center ac-center">
            <p>Код</p>
            <p>Название</p>
            <template
              v-for="project of myProject"
              class="grid-container ai-center ac-center"
              id="table"
            >
              <p>{{ project.code }}</p>
              <p>{{ project.name }}</p>
            </template>
          </div>
        </div>
      </div>

      <button
        class="pa-10 br-10 oc-bc bw-1 cb-bg fc-fc fs-18 grid-container bs-element"
        @click="leaveAccaunt"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<style scoped>
#accordionTitle {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 10px;
  user-select: none;
}

#table {
  grid-auto-flow: row;
  grid-template-columns: max-content 1fr;
  column-gap: 15px;
  overflow-x: auto;
}

#container {
  gap: 15px;
}

#accordion {
  gap: 15px;
}

button {
  justify-self: left;
}
</style>
