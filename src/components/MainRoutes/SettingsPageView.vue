<script setup lang="ts"></script>

<template>
  <div id="main-container" class="grid-container">
    <nav class="pc-bg grid-container oc-bc">
      <RouterLink
        :to="{ name: 'view' }"
        exact-active-class="sc-bg bs-panel"
        class="pa-10 w-100 oc-bc h-100"
      >
        <img src="../../assets/design.svg" alt="logo" class="w-100" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'company' }"
        exact-active-class="sc-bg bs-panel"
        class="pa-10 w-100 oc-bc h-100"
      >
        <img src="../../assets/company.svg" alt="logo" class="w-100" />
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
#main-container {
  grid-template-columns: 60px 1fr;
}

nav {
  filter: brightness(90%);
  border-right-width: 1px;
  grid-auto-rows: 60px;
}

a {
  border-bottom-width: 1px;
}
</style>
