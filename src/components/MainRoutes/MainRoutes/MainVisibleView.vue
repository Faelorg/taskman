<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { getCompanyAPI } from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
let isAdmin = cookies.get("admin");
onMounted(() => {
  getCompanyAPI(cookies.get("token")).then((x) => {
    document.querySelector("#container")!.innerHTML += x.object.mainpage;
  });
});
</script>

<template>
  <div
    class="ma-25 pa-25 grid-container mc-bg fc-fc br-10 bs-panel bw-1 oc-bc"
    id="container"
  >
    <div id="settings" v-if="isAdmin == 1">
      <RouterLink :to="{ name: 'main_redactor' }">
        <img src="../../../assets/settings.svg" alt="" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
#settings {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 4%;
}

#settings img {
  width: 25px;
  height: 25px;
}

li {
  grid-template-columns: max-content max-content;
  gap: 15px;
}

#container {
  gap: 10px;
  grid-auto-flow: row;
  grid-auto-rows: auto;
}

#logo {
  grid-template-columns: 150px max-content;
  gap: 15px;
}
</style>
