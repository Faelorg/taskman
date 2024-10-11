<script setup lang="ts">
</script>

<template>
    <div class="main-container pc-bg grid-container jc-center ji-center ac-center ai-center br-50 bs-panel">
        <div class="grid-container jc-center ji-center "  id="main-container">
            <img src="../assets/logo.svg" alt="logo" class="w-50">

            <div class="grid-container ji-center w-100" id="form-container">
                <div class="grid-container ji-center js-center w-100" id="input-container">
                    <label class="fc-fc fs-32 ff-semibold">Логин</label>
                    <input id="loginInput" type="text" class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28">
                    <label class="fc-fc fs-32 ff-semibold">Пароль</label>
                    <input id="passwordInput" type="password" class="grid-container mh-25 js-center ac-bg br-10 pa-10 w-100 bs-panel oc-bc bw-2 afc-fc fs-28">
                </div>

                <div id="button-container" class="grid-container w-100">
                    <button class="sb-bg fc-fc pv-10 fs-32 br-15 ph-10 w-100 bw-2 oc-bc bs-element">Войти</button>
                    <button class="tb-bg fc-fc pv-10 ph-10 w-100 fs-28 br-15 bw-2 oc-bc bs-element">Забыли пароль</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    *{
        box-sizing: border-box;
    }
    #main-container{
        gap: 45px;   
        width: 400px;
    }

    #button-container{
        width:100%;
        grid-template-columns: 1.8fr 1fr;
        gap: 30px;
    }

    #form-container{
        gap: 25px;
    }
</style>
