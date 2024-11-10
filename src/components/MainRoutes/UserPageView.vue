<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  onBeforeMount,
  ref,
  watch,
  onBeforeUpdate,
} from "vue";
import { getProfileAPI, logoutAPI } from "../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
let user = ref({
  selected: false,
  data: {} as any,
});
getProfileAPI(cookies.get("token")).then((x) => (user.value.data = x.object));

onMounted(async () => {});

let myTask = ref([
  { name: "Анжуманя", code: "ID-83738" },
  { name: "Анжуманя", code: "ID-86738" },
  { name: "Анжуманя", code: "ID-87738" },
  { name: "Анжуманя", code: "ID-88738" },
  { name: "Анжуманя", code: "ID-89738" },
  { name: "Анжуманя", code: "ID-81738" },
  { name: "Анжуманя", code: "ID-84538" },
]);

let myProject = ref([
  { name: "Отжуманя", code: "ID-83738" },
  { name: "Отжуманя", code: "ID-86738" },
  { name: "Отжуманя", code: "ID-87738" },
  { name: "Отжуманя", code: "ID-88738" },
  { name: "Отжуманя", code: "ID-89738" },
  { name: "Отжуманя", code: "ID-81738" },
  { name: "Отжуманя", code: "ID-84538" },
]);

let accordionTask = ref(false);
let accordionProject = ref(false);
let accordionUser = ref(false);

function openAccordion(opened: boolean) {
  opened = !opened;
  return opened;
}

function leaveAccaunt() {
  logoutAPI(cookies.get("token"));
  cookies.remove("token");
  cookies.remove("login");
  cookies.remove("password");
  cookies.remove("company");
  cookies.remove("admin");
  router.push({ name: "auth" });
}
</script>

<template>
  <div class="main-container pa-10 ac-bg">
    <div class="pc-bg grid-container br-10 bs-panel pa-25" id="container">
      <p
        class="fs-32 fc-fc"
        v-if="user.data.firstname != null && user.data.lastname != null"
      >
        Профиль: {{ user.data.firstname }} {{ user.data.lastname }}
      </p>
      <p class="fs-32 fc-fc" v-else>Профиль: {{ user.data.email }}</p>

      <div
        id="accordion"
        class="grid-container mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
      >
        <div
          @click="accordionUser = openAccordion(accordionUser)"
          class="grid-container ai-center ac-center"
          id="accordionTitle"
        >
          <p class="fc-fc fs-24">Мой профиль</p>
          <p class="fc-fc fs-18" v-if="!accordionUser">&#9660;</p>
          <p class="fc-fc fs-18" v-else>&#9650;</p>
        </div>

        <div id="accordionBody" v-if="accordionUser" class="fc-fc fs-24">
          <div id="table" class="grid-container ai-center ac-center">
            <label class="fs-24 fc-fc">E-mail: </label>
            <p class="fs-24 fc-fc">{{ user.data.email }}</p>
            <label class="fs-24 fc-fc">Логин: </label>
            <p class="fs-24 fc-fc">{{ user.data.login }}</p>
            <label class="fs-24 fc-fc" v-if="user.data.firstname"
              >Фамилия:
            </label>
            <p class="fs-24 fc-fc" v-if="user.data">
              {{
                user.data.firstname == null ? "Не указана" : user.data.firstname
              }}
            </p>
            <label class="fs-24 fc-fc" v-if="user.data.firstname">Имя: </label>
            <p class="fs-24 fc-fc" v-if="user.data">
              {{
                user.data.lastname == null ? "Не указана" : user.data.lastname
              }}
            </p>
            <label class="fs-24 fc-fc" v-if="user.data.firstname"
              >Отчество:
            </label>
            <p class="fs-24 fc-fc" v-if="user.data">
              {{
                user.data.middlename == null
                  ? "Не указана"
                  : user.data.middlename
              }}
            </p>
          </div>
        </div>
      </div>

      <button
        class="pa-10 br-10 oc-bc bw-1 cb-bg fc-fc fs-18 grid-container bs-element"
        @click="leaveAccaunt"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<style scoped>
#accordionTitle {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 10px;
  user-select: none;
}

#table {
  grid-auto-flow: row;
  grid-template-columns: max-content 1fr;
  column-gap: 15px;
  overflow-x: auto;
}

#container {
  gap: 15px;
}

#accordion {
  gap: 15px;
}

button {
  justify-self: left;
}
</style>
