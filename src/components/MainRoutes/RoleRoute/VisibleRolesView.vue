<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { getAllRoleAPI } from "../../../scripts/api";
import { IRole } from "../../../scripts/types";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let openModal = ref(false);
let roles = ref([] as IRole[]);

onMounted(() => {
  getAllRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject
  ).then((x) => {
    roles.value = x.object;
  });
});

function openRole(id_role: string) {
  router.push({
    name: "role",
    params: {
      idProject: router.currentRoute._value.params.idProject,
      idRole: id_role,
    },
  });
}

function openCreate() {
  router.push({ name: "createRole" });
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
        v-if="isAdmin == 1"
      >
        <button
          class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
          @click="openCreate"
        >
          Создать
        </button>
      </div>

      <div
        class="grid-container w-100 bs-panel fc-fc pa-10 br-10 mc-bg"
        id="element-container"
      >
        <div
          v-for="role of roles"
          id="element"
          class="grid-container pc-bg w-100 ph-10 br-10 ph-10 bw-1 fs-18 oc-bc bs-element ac-center h-100"
        >
          <div class="grid-container w-100 h-100" id="element-row">
            <div
              @click="openRole(role.id_role)"
              class="grid-container w-100 h-100"
              id="element-field"
            >
              <div
                class="grid-container ph-10 jc-center ji-center ai-center ac-center"
                id="border"
              >
                <p>{{ role.name }}</p>
              </div>
              <div
                class="grid-container ph-10 jc-center ji-center ai-center ac-center"
                id="border"
              >
                <p>{{ role.description }}</p>
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

#element-row {
  grid-auto-flow: column;
  grid-auto-columns: max-content 1fr;
  height: 75px;
}

#element-row > input[type="checkbox"] {
  width: fit-content;
}

#element-field {
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
