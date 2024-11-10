<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { IRole, IUser } from "../../../scripts/types";
import {
  getAllUserFromRoleAPI,
  getRoleAPI,
  removeRoleAPI,
  removeUserFromRoleAPI,
} from "../../../scripts/api";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));
let role = ref({} as IRole);
onMounted(() => {
  getRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idRole
  ).then((x) => {
    role.value = x.object;
  });

  getAllUserFromRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idRole
  ).then((x) => {
    users.value = x.object;
  });
});

function updateRole() {
  router.push({ name: "updateRole" });
}

function removeRole() {
  removeRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idRole
  ).then((x) => {
    if (x.code == "200") {
      router.push({ name: "roles" });
    }
  });
}

function removeUserFromRole(id_user: string) {
  users.value.splice(
    users.value.indexOf(users.value.find((x) => x.id_user == id_user)!),
    1
  );
  removeUserFromRoleAPI(
    cookies.get("token"),
    cookies.get("companyId"),
    router.currentRoute._value.params.idProject,
    router.currentRoute._value.params.idRole,
    id_user
  ).then((x) => {
    if (x.code == "200") {
      router.push({ name: "role" });
    } else {
      alert("Выберите пользователя не назначенного в других ролях");
    }
  });
}

function addUserToRole() {
  router.push({ name: "setUserRole" });
}

let accordionUsers = ref(false);
let accordionInfo = ref(false);

let users = ref([] as IUser[]);

function openAccordion(opened: boolean) {
  opened = !opened;
  return opened;
}

function onClose() {
  router.push({ name: "roles" });
}
</script>

<template>
  <div
    class="grid-container ma-10 bs-panel br-10 pc-bg pa-10"
    id="modal-container"
  >
    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
    >
      <p>Карточка роли {{ role?.name }}</p>
    </div>

    <div
      class="grid-container fc-fc fs-24 h-100 mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
      id="data-container"
    >
      <div
        @click="accordionInfo = openAccordion(accordionInfo)"
        class="grid-container ai-center ac-center"
        id="accordionTitle"
      >
        <p class="fc-fc fs-24">Информаци о роли</p>
        <p class="fc-fc fs-18" v-if="!accordionInfo">&#9660;</p>
        <p class="fc-fc fs-18" v-else>&#9650;</p>
      </div>
      <div id="accordionBody" v-if="accordionInfo" class="fc-fc fs-24">
        <div>Название</div>
        <div class="fc-fc fs-18">{{ role?.name }}</div>
        <div>Описание</div>
        <div class="fc-fc fs-18">{{ role?.description }}</div>
        <div>Права на проект</div>
        <div class="fc-fc fs-18">
          {{
            role?.update_project == true
              ? "Может редактировать"
              : "Не может редактировать"
          }}
        </div>
        <div>Права на колонки</div>
        <div class="fc-fc fs-18">
          {{
            role?.create_column == true
              ? "Может создавать"
              : "Не может создавать"
          }}
        </div>
        <div class="fc-fc fs-18">
          {{
            role?.update_column == true
              ? "Может редактировать"
              : "Не может редактировать"
          }}
        </div>
        <div class="fc-fc fs-18">
          {{
            role?.delete_column == true ? "Может удалять" : "Не может удалять"
          }}
        </div>

        <div>Права на задачи</div>
        <div class="fc-fc fs-18">
          {{
            role?.create_task == true ? "Может создавать" : "Не может создавать"
          }}
        </div>
        <div class="fc-fc fs-18">
          {{
            role?.update_task == true
              ? "Может редактировать"
              : "Не может редактировать"
          }}
        </div>
        <div class="fc-fc fs-18">
          {{ role?.delete_task == true ? "Может удалять" : "Не может удалять" }}
        </div>
      </div>
    </div>

    <div
      id="accordion"
      class="grid-container mc-bg pa-10 br-10 bw-1 oc-bc bs-element"
    >
      <div class="grid-container ai-center ac-center" id="accordionTitle">
        <p class="fc-fc fs-24">Пользователи</p>
        <button
          id="add-button"
          class="grid-container fc-fc w-100 h-100 sb-bg fs-32 bw-1 bs-element"
          @click="addUserToRole"
        >
          +
        </button>
        <p
          class="fc-fc fs-18"
          v-if="!accordionUsers"
          @click="accordionUsers = openAccordion(accordionUsers)"
        >
          &#9660;
        </p>
        <p
          class="fc-fc fs-18"
          v-else
          @click="accordionUsers = openAccordion(accordionUsers)"
        >
          &#9650;
        </p>
      </div>

      <div id="accordionBody" v-if="accordionUsers" class="fc-fc fs-24">
        <div id="table" class="grid-container ai-center ac-center">
          <p>Логин</p>
          <p>Email</p>
          <p>Фамилия</p>
          <p>Имя</p>
          <p>Отчество</p>
          <p></p>
          <template
            v-for="user of users"
            class="grid-container ai-center ac-center"
            id="table"
          >
            <p>{{ user.login }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.firstname }}</p>
            <p>{{ user.lastname }}</p>
            <p>{{ user.middlename }}</p>
            <button
              id="add-button"
              v-if="isAdmin == 1"
              class="grid-container fc-fc w-100 h-100 cb-bg fs-32 bw-1 bs-element"
              @click="removeUserFromRole(user.id_user)"
            >
              -
            </button>
          </template>
        </div>
      </div>
    </div>

    <div
      class="grid-container ai-center fs-32 fc-fc mc-bg pa-10 br-10 bw-1 oc-bc bs-panel"
      id="button-control"
    >
      <button
        class="pa-10 br-10 oc-bc bw-1 sb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1 && role.name != 'Администратор'"
        @click="updateRole"
      >
        Редактировать
      </button>

      <button
        class="pa-10 br-10 oc-bc bw-1 cb-bg fc-fc fs-32 grid-container bs-element ac-center"
        v-if="isAdmin == 1 && role.name != 'Администратор'"
        @click="removeRole"
      >
        Удалить
      </button>

      <button
        class="pa-10 br-10 oc-bc bw-1 tb-bg fc-fc fs-32 grid-container bs-element ac-center"
        @click="onClose"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<style scoped>
#modal-container {
  grid-auto-flow: row;
  grid-auto-rows: max-content max-content max-content;
  gap: 15px;
}

#table {
  grid-auto-flow: row;
  grid-template-columns: max-content max-content max-content max-content max-content max-content;
  grid-auto-rows: max-content;
  column-gap: 15px;
  overflow-x: auto;
  overflow-y: hidden;
}

#data-container {
  grid-auto-rows: max-content;
  justify-content: left;
  gap: 10px;

  height: 100%;
  overflow-x: auto !important;
}

#button-control {
  grid-template-columns: max-content max-content max-content 1fr;
  gap: 15px;
}

#accordion {
  gap: 15px;
}

#add-button {
  display: grid;
  justify-self: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

#accordionTitle {
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 10px;
  user-select: none;
}
</style>
