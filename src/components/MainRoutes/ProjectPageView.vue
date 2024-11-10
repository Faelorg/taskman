<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IProject } from "../../scripts/types";
import { getAllProjectAPI, getCompanyAPI } from "../../scripts/api";
const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
let isAdmin = ref(cookies.get("admin"));
let projects = ref([] as IProject[]);

onMounted(() => {
  if (isAdmin) {
    getAllProjectAPI(cookies.get("token"), cookies.get("companyId")).then(
      (x) => {
        projects.value = x.object;
        console.log(x.object);
      }
    );
  }
});

function onOpenProject(idProject: string) {
  router.push({ name: "oneProject", params: { idProject: idProject } });
}
</script>

<template>
  <div id="main-container" class="grid-container">
    <nav class="pc-bg grid-container oc-bc h-100">
      <div class="grid-container w-100 h-100 pa-10" id="project-container">
        <div v-for="project of projects" class="w-100" id="project">
          <a class="w-100" @click="onOpenProject(project.id_project)">
            <img src="../../assets/project.svg" class="w-100" alt="project" />
            <p id="project-name" class="fc-fc w-100">{{ project.name }}</p>
          </a>
        </div>
      </div>
      <p class="pa-10">
        <RouterLink
          id="add-button"
          class="grid-container fc-fc w-100 h-100 tb-bg fs-32 bw-1 bs-element"
          :to="{ name: 'addProject' }"
          v-if="isAdmin"
        >
          +
        </RouterLink>
      </p>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
#main-container {
  grid-template-columns: 75px 1fr;
}

nav {
  filter: brightness(90%);
  border-right-width: 1px;
  grid-auto-rows: max-content max-content;
  gap: 15px;
}

a {
  border-bottom-width: 1px;
  overflow: hidden;
  text-decoration: none;
  filter: brightness(110%);
}

a:hover {
  filter: brightness(95%);
}

a:active {
  filter: brightness(90%);
}

#project-container {
  grid-auto-flow: row;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 15px;

  grid-auto-rows: max-content;
  justify-content: center;
  justify-items: center;
  height: 800px;
}

#project {
  width: 54px;
  height: fit-content;
  text-align: center;
  text-wrap: wrap;
}

#add-button {
  display: grid;
  justify-self: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 54px;
  border-radius: 50%;
}
</style>
