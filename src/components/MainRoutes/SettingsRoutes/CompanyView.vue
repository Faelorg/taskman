<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { getCompanyAPI, updateCompanyAPI } from "../../../scripts/api";
import { ICompany } from "../../../scripts/types";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let company: ICompany;
let codetask = ref("");
let smtpsender = ref("");
let smtpprovider = ref("");
let smtpserver = ref("");
let smtpport = ref("");
let smtplogin = ref("");
let smtppassword = ref("");

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

onMounted(() => {
  getCompanyAPI(cookies.get("token")).then((c) => {
    company = c.object;
    codetask.value = c.object.codetask;
    smtpsender.value = c.object.smtpsender;
    smtpprovider.value = c.object.smtpprovider;
    smtpserver.value = c.object.smtpserver;
    smtpport.value = c.object.smtpport;
    smtplogin.value = c.object.smtplogin;
    smtppassword.value = c.object.smtppassword;
  });
});

function updateCompany() {
  let mail = mails.find((x) => x.name == selectedMail.value);

  smtpport.value = mail!.port;
  smtpserver.value = mail!.server;

  company.codetask = codetask.value;
  company.smtpsender = smtpsender.value;
  company.smtpprovider = smtpprovider.value;
  company.smtpserver = smtpserver.value;
  company.smtpport = smtpport.value;
  company.smtplogin = smtplogin.value;
  company.smtppassword = smtppassword.value;

  updateCompanyAPI(cookies.get("token"), company).then((x) => {
    if (x.code == "200") {
      router.push({ name: "main", reload: true }).then(() => {
        window.location.reload();
      });
    }
  });
}

function onCloseEdit() {
  router.push({ name: "main" }).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <div class="ma-10 bs-panel pa-10 br-10 pc-bg grid-container" id="container">
    <h1 class="fc-fc grid-container">Настройки компании</h1>
    <div class="grid-container" id="company-grid">
      <div
        class="grid-container oc-bc br-10 bw-1 fc-fc fs-24 bs-panel pa-10 mc-bg w-100"
        id="setting-grid"
      >
        <label for="">Шаблон кода задач</label>
        <input
          type="text"
          class="w-100 h-100 ac-bg br-10 oc-bc bw-1 afc-fc"
          v-model="codetask"
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
          v-model="smtpsender"
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
          v-model="smtppassword"
        />
      </div>
    </div>
    <div id="button-panel" class="grid-container">
      <button
        class="sb-bg pa-10 oc-bc bw-1 br-10 fc-fc fs-24 bs-element"
        @click="updateCompany"
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
