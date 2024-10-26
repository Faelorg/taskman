<script setup lang="ts"></script>

<template>
  <div class="grid-container ji-center js-center w-100" id="input-container">
    <label class="fc-fc fs-28 ff-semibold">Логин</label>
    <input
      id="loginInput"
      type="text"
      class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28"
    />
  </div>
  <div id="button-container" class="grid-container w-100 ai-center">
    <button
      class="tb-bg fc-fc pv-10 ph-10 w-100 fs-24 br-15 bw-2 oc-bc bs-element"
    >
      Забыли пароль
    </button>

    <RouterLink :to="{name:'auth'}" class="fc-fc fs-24 grid-container js-center">Войти по логину</RouterLink>
  </div>
</template>

<style scoped>
#input-container {
  gap: 10px;
}

#button-container{
  width: 100%;
  grid-template-columns: 1.8fr 1fr;
  gap: 30px;
}

a{
  text-align: center;
}
</style>
