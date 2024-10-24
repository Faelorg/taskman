<script lang="ts" setup></script>

<template>
  <div class="ma-10 bs-panel pa-10 br-10 pc-bg grid-container" id="container">
    <h1 class="fc-fc grid-container">Настройки компании</h1>
    <div class="grid-container" id="company-grid">
      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Шаблон кода задач</label>
        <input type="text" class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc" />
      </div>

      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Email провайдер</label>
        <select class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc">
          <option value="yandex">Yandex.Ru</option>
          <option value="mail">Mail.Ru</option>
          <option value="gmail">Gmail.Com</option>
        </select>
      </div>

      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Почтовый ящик</label>
        <input type="email" class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc" />
      </div>

      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Пароль</label>
        <input
          type="password"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
        />
      </div>
    </div>
    <div id="button-panel" class="grid-container">
      <button class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element">
        Сохранить
      </button>

      <button class="cb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element">
        Отменить
      </button>
    </div>
  </div>
</template>

<style scoped>
#container {
  gap: 15px;
  grid-template-rows: auto 1fr;
  text-wrap: wrap;
}

#setting-grid {
  grid-template-columns: max-content 1fr;
  gap: 15px;
  height: max-content;
}

#company-grid {
  gap: 15px;
  grid-auto-rows: max-content;
  justify-content: left;
}

#button-panel {
  gap: 15px;
  grid-template-columns: max-content max-content 1fr;
}
</style>
