<script setup lang="ts">
</script>

<template>
    <div id="main-container" class="grid-container bs-element br-10 bw-2 oc-bc">
        <nav class="pc-bg grid-container oc-bc">
            <RouterLink :to="{name:'main'}" exact-active-class="sc-bg bs-panel" class="w-100 oc-bc h-100 pa-10 ">
                <img src="../assets/logo.svg" alt="logo" class="w-100">
            </RouterLink>

            <RouterLink :to="{name:'mail'}" active-class="sc-bg bs-panel" class="grid-container ac-center w-100 oc-bc h-100 pa-10 ">
                <img src="../assets/mail.svg" alt="logo" class="w-100">
            </RouterLink>

            <RouterLink :to="{name:'task'}" active-class="sc-bg bs-panel" class="grid-container ac-center w-100 h-100 oc-bc pa-10 ">
                <img src="../assets/task.svg" alt="logo" class="w-100">
            </RouterLink>

            <RouterLink :to="{name:'people'}" active-class="sc-bg bs-panel" class="grid-container ac-center w-100 h-100 oc-bc pa-10 ">
                <img src="../assets/people.svg" alt="logo" class="w-100">
            </RouterLink>

            <RouterLink :to="{name:'settings'}" active-class="sc-bg bs-panel" class="grid-container ac-center w-100 h-100 oc-bc pa-10 ">
                <img src="../assets/settings.svg" alt="logo" class="w-100">
            </RouterLink>
        </nav>

        <div id="content-container" class="ac-bg">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>

#main-container{
    grid-template-columns: 100px 1fr;
    height: 100%;
    overflow: hidden;
}


nav{
    grid-auto-rows: 100px;
    border-right-width: 1px;
}

a{
    border-bottom-width: 1px;
}
</style>
