<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from "vue";
import { getCompanyAPI, getProfileAPI } from "../scripts/api";

let isAdmin = ref(false);

const cookies =
  getCurrentInstance()?.appContext.config.globalProperties.$cookies!;
isAdmin = cookies.get("admin");

let style = document.querySelector("#custom");

onMounted(() => {
  getCompanyAPI(cookies.get("token")).then((colors) => {
    localStorage.setItem("mainpage", colors.object.mainpage);

    style!.innerHTML = `.mc-bg {
    background-color: ${colors.object.maincolor} !important;
    }
    
    .ac-bg {
      background-color: ${colors.object.additionalcolor} !important;
      }
      
      .pc-bg {
        background-color: ${colors.object.panelcolor} !important;
        }
        
        .fc-fc {
          color: ${colors.object.fontcolor} !important;
          }
          
          .oc-bc {
            border-style: solid;
            border-color: ${colors.object.outlinecolor} !important;
            }
            
            .sb-bg {
              background-color:${colors.object.selectedbuttoncolor} !important;
              }
              
              .cb-bg {
                background-color: ${colors.object.cancelbuttoncolor} !important;
                }
                
                .tb-bg {
                  background-color: ${colors.object.truebuttoncolor}  !important;
                  }
                  
                  .sc-bg {
                    background-color: ${colors.object.truebuttoncolor} !important;
                    }
                    
                    .afc-fc {
                      color: ${colors.object.additionalfontcolor} !important;
                      }`;
  });
});
getProfileAPI(cookies.get("token")).then((x) =>
  cookies.set("admin", x.object.is_admin)
);
</script>

<template>
  <div id="main-container" class="grid-container bs-element br-10 bw-2 oc-bc">
    <nav class="pc-bg grid-container oc-bc">
      <RouterLink
        :to="{ name: 'main' }"
        active-class="sc-bg bs-panel"
        class="w-100 oc-bc h-100 pa-10"
      >
        <img src="../assets/logo.svg" alt="logo" class="w-100" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'project' }"
        active-class="sc-bg bs-panel"
        class="grid-container ac-center w-100 h-100 oc-bc pa-10"
      >
        <img src="../assets/task.svg" alt="logo" class="w-100" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'people' }"
        active-class="sc-bg bs-panel"
        class="grid-container ac-center w-100 h-100 oc-bc pa-10"
      >
        <img src="../assets/people.svg" alt="logo" class="w-100" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'settings' }"
        v-if="isAdmin"
        active-class="sc-bg bs-panel"
        class="grid-container ac-center w-100 h-100 oc-bc pa-10"
      >
        <img src="../assets/settings.svg" alt="logo" class="w-100" />
      </RouterLink>

      <RouterLink
        :to="{ name: 'user' }"
        active-class="sc-bg bs-panel"
        class="grid-container ac-center w-100 h-100 oc-bc pa-10"
      >
        <img src="../assets/user.svg" alt="logo" class="w-100" />
      </RouterLink>
    </nav>

    <div id="content-container" class="ac-bg">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#main-container {
  grid-template-columns: 60px 1fr;
  height: 100%;
  overflow: hidden;
}

nav {
  grid-auto-rows: 60px;
  border-right-width: 1px;
}

a {
  border-bottom-width: 1px;
}
</style>
