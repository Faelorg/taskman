<script setup lang="ts"></script>

<template>
  <div class="ma-10 bs-panel pa-10 br-10 pc-bg grid-container" id="container">
    <h1 class="fc-fc grid-container">Настройки интерфейса</h1>
    <div id="setting-grid" class="grid-container">
      <div
        class="grid-container js-center ji-center oc-bc br-10 bw-1 fc-fc fs-24 bs-element pa-10 mc-bg w-75"
        id="setting-container"
      >
        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Основной цвет</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Дополнительный цвет</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет панелей</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Основной цвет текста</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Дополнительный цвет текста</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg grid-container as-center"
          />
        </div>
      </div>

      <div
        class="grid-container js-center ji-center oc-bc br-10 bw-1 fc-fc fs-24 bs-element pa-10 mc-bg w-75"
        id="setting-container"
      >
        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет кнопки подтверждения</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет кнопки сохранения</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет кнопки отмены</label>
          <input type="color" class="w-100 h-100 ac-bg" />
        </div>
      </div>

      <div
        class="grid-container js-center ji-center oc-bc br-10 bw-1 fc-fc fs-24 bs-element pa-10 mc-bg w-75"
        id="setting-container"
      >
        <div class="grid-container ji-center" id="container">
          <img src="../../../assets/logo.svg" alt="" />
          <div
            class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
            id="file-grid"
          >
            <label for="">Логотип</label>
            <input
              type="file"
              id="custom-file-upload"
              class="w-100 h-100 br-10"
            />
          </div>
        </div>
      </div>
    </div>

    <div id="button-panel" class="grid-container">
      <div></div>
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

h1 {
  height: max-content;
}

input[type="color"] {
  border: none;
  outline: none;
  -webkit-appearance: none;
  border-radius: 100%;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

input[type="file"] {
  display: none;
}
#custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background: none;
  margin: 0;
}

#color-grid {
  grid-template-columns: 1fr 28px;
  gap: 15px;
  height: max-content;

  box-sizing: border-box;
}

#file-grid {
  grid-template-columns: 1fr max-content;
  gap: 15px;
  height: max-content;

  box-sizing: border-box;
}

#setting-grid {
  grid-template-columns: 1fr 1fr 1fr;
}

#setting-container {
  overflow-y: auto;
  grid-auto-rows: max-content;
  gap: 15px;
}

#button-panel {
  gap: 15px;
  grid-template-columns: 1fr max-content max-content;
}
</style>
