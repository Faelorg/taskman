<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import MonacoEditor from "monaco-editor-vue3";
import { ICompany } from "../../../scripts/types";
import { getCompanyAPI, updateCompanyAPI } from "../../../scripts/api";

let value = ref("");
let company: ICompany;

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

onMounted(() => {
  getCompanyAPI(cookies.get("token")).then((c) => {
    company = c.object;
    value.value = c.object.mainpage;
  });
});

function updateCompany() {
  company.mainpage = value.value;

  updateCompanyAPI(cookies.get("token"), company).then((x) => {
    if (x.code == "200") {
      router.push({ name: "main", reload: true }).then(() => {
        window.location.reload();
      });
    }
  });
}
function onCloseEdit() {
  router.push({ name: "main", reload: true }).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <div class="pa-10 grid-container h-100" id="redactor">
    <MonacoEditor
      theme="vs"
      language="html"
      v-model:value="value"
    ></MonacoEditor>
    <div id="button-controls" class="grid-container">
      <div></div>
      <button
        class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
        @click="updateCompany()"
        v-if="isAdmin == 1"
      >
        Сохранить
      </button>

      <button
        class="cb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
        @click="onCloseEdit"
      >
        Отменить
      </button>
    </div>
  </div>
</template>

<style scoped>
#redactor {
  grid-template-rows: 1fr max-content;
  gap: 15px;
}

#redactor > .monaco-editor-vue3 {
  width: 100% !important;
}

#button-controls {
  gap: 15px;
  grid-template-columns: 1fr max-content max-content;
}
</style>
