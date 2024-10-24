<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

let isAdmin = ref(cookies.get("admin"));

let users = ref([
  {
    selected: false,
    data: {
      id: "1",
      name: "fael",
      email: "faewl@fckje.com",
    },
  },

  {
    selected: false,
    data: {
      id: "2",
      name: "fael2",
      email: "faew222l@fckje.com",
    },
  },
]);

let user = users.value.find(
  (x) => x.data.id == router.currentRoute._value.params.idPerson
);

function onCloseEdit() {
  router.push({ name: "people" });
}

function OpenEdit() {
  router.push({
    name: "edit",
  });
}
</script>
<template>
  <RouterView user="user" />
</template>

<style scoped></style>
