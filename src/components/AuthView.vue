<script setup lang="ts">
import { onBeforeMount, onBeforeUpdate, getCurrentInstance } from "vue";
import { Router } from "vue-router";
const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties
  .$router as Router;
</script>

<template>
  <div
    class="main-container pc-bg grid-container jc-center ji-center ac-center ai-center br-50 bs-panel"
  >
    <div class="grid-container jc-center ji-center" id="main-container">
      <img src="../assets/logo.svg" alt="logo" class="w-50" />

      <div class="grid-container ji-center w-100" id="form-container">
        <RouterView />
      </div>
    </div>
    <div class="fc-fc" id="createCompany">
      <RouterLink :to="{ name: 'createCompany' }" class="fc-fc">
        Создать компанию
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
#main-container {
  gap: 45px;
  width: 300px;
}

#form-container {
  gap: 25px;
}

#createCompany {
  position: absolute;
  right: 5%;
  bottom: 5%;
}

a {
  text-align: center;
}
</style>
