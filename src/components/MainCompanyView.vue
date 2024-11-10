<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue";
import { createCompanyAPI } from "../scripts/api";

let mails = [
  {
    name: "yandex",
    server: "smtp.yandex.ru",
    port: "465",
  },
  {
    name: "mail",
    server: "smtp.mail.ru",
    port: "587",
  },
  {
    name: "gmail",
    server: "smtp.gmail.com",
    port: "465",
  },
];

let selectedMail = ref();
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
let company = ref({
  name: "",
  maincolor: "#4e8cb5",
  additionalcolor: "#d1e1ea",
  panelcolor: "#8eb2c6",
  outlinecolor: "#1e3d58",
  truebuttoncolor: "#025c96",
  cancelbuttoncolor: "#86000c",
  selectedbuttoncolor: "#188700",
  fontcolor: "#eef0f0",
  additionalfontcolor: "#2db2bb",
  codetask: "ID",
  smtpsender: "",
  smtpserver: "",
  smtpport: "",
  smtppassword: "",
});

function createCompany() {
  let mail = mails.find((x) => x.name == selectedMail.value);

  company.value.smtpport = mail!.port;
  company.value.smtpserver = mail!.server;

  createCompanyAPI(company.value).then((x) => {
    if (x.code == "200") {
      router.push({ name: "auth" });
      return;
    }
    alert("Введите корректные данные");
  });
}
</script>

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
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.maincolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Дополнительный цвет</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.additionalcolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет панелей</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.panelcolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Основной цвет текста</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.fontcolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Дополнительный цвет текста</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg grid-container as-center"
            v-model="company.additionalfontcolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет обводки</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg grid-container as-center"
            v-model="company.outlinecolor"
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
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.truebuttoncolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет кнопки сохранения</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.selectedbuttoncolor"
          />
        </div>

        <div
          class="grid-container ac-center ai-center oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 pc-bg w-100"
          id="color-grid"
        >
          <label for="">Цвет кнопки отмены</label>
          <input
            type="color"
            class="w-100 h-100 ac-bg"
            v-model="company.cancelbuttoncolor"
          />
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
  </div>
  <div class="ma-10 bs-panel pa-10 br-10 pc-bg grid-container" id="container">
    <h1 class="fc-fc grid-container">Настройки компании</h1>
    <div class="grid-container" id="company-grid">
      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Название компании</label>
        <input
          type="text"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="company.name"
        />
      </div>
      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Шаблон кода задач</label>
        <input
          type="text"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="company.codetask"
        />
      </div>

      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Email провайдер</label>
        <select
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="selectedMail"
        >
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
        <input
          type="email"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="company.smtpsender"
        />
      </div>

      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Пароль</label>
        <input
          type="password"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="company.smtppassword"
        />
      </div>
    </div>
    <div id="button-panel" class="grid-container">
      <div></div>
      <button
        class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
        @click="createCompany()"
      >
        Создать
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
