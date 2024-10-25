<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";

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

let isAdmin = ref(false);

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

router.push({ name: "people" });

let openModal = ref(false);

isAdmin = cookies.get("admin");

function openEditMode(user: any) {
  openModal = ref(true);
  router.push({
    name: "person",
    params: {
      idPerson: user.data.id,
    },
  });
}
function openCreateMode() {
  openModal = ref(true);
  router.push({ name: "add" });
}
</script>

<template>
  <div class="h-100 grid-container">
    <div
      v-if="openModal"
      class="ma-10 bs-panel br-10 pc-bg grid-container pa-10"
    >
      <RouterView />
    </div>
    <div
      v-else
      class="ma-10 bs-panel br-10 pc-bg grid-container pa-10"
      id="container"
    >
      <div
        id="control-buttons"
        class="bs-panel br-10 mc-bg grid-container jc-center w-100 pa-10 bw-1 oc-bc"
        v-if="isAdmin"
      >
        <button
          class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
          @click="openCreateMode()"
        >
          Создать
        </button>
        <button class="cb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element">
          Удалить
        </button>
      </div>

      <div
        class="grid-container w-100 bs-panel fc-fc pa-10 br-10 mc-bg"
        id="element-container"
      >
        <div
          v-for="user of users"
          id="element"
          class="grid-container pc-bg w-100 ph-10 br-10 ph-10 bw-1 fs-18 oc-bc bs-element ac-center h-100"       
        >
          <div class="grid-container w-100 h-100" id="element-row">
            <input
                type="checkbox"
                v-if="isAdmin"
                v-model="user.selected"
              />
              <div v-else></div>

              <div @click="openEditMode(user)" class="grid-container w-100 h-100" id="element-field">
                <div
                  class="grid-container ph-10 h-100 jc-center ji-center ai-center ac-center"
                  id="border"
                >
                  <p>{{ user.data.name }}</p>
                </div>
                <div
                  class="grid-container ph-10 jc-center ji-center ai-center ac-center"
                  id="border"
                >
                  <p>{{ user.data.email }}</p>
                </div>

              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  gap: 15px;
  grid-auto-rows: auto 1fr;
  text-wrap: wrap;
  box-sizing: border-box !important;
}

#control-buttons {
  grid-template-columns: max-content max-content 1fr;
  gap: 15px;
  height: max-content;
}

#element-container {
  grid-auto-rows: max-content;
  gap: 10px;
  height: 100%;
  overflow-x: auto !important;
}

#element-row{
  grid-auto-flow: column;
  grid-auto-columns: max-content 1fr;
  height: 75px;
}

#element-row>input[type="checkbox"]{
  width: fit-content;
}

#element-field{
  grid-auto-flow: column;
  width: auto;
  grid-auto-columns: max-content;
}

#element {
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 1px;
  height: 75px;
}

#border > input {
  z-index: 1000;
}
</style>
