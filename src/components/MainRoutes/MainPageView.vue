<script setup lang="ts">
</script>

<template>
    <div class="ma-25 pa-25 grid-container mc-bg fc-fc br-10 bs-panel bw-1 oc-bc" id="container">

        <div id="logo" class="grid-container ai-center">
            <div>
                <img src="../../assets/logo.svg" alt="logo" class="w-100 h-100"> 
            </div>
            <p class="fs-48">Taskman - просто и быстро</p>
        </div>

        <p class="fs-32">Почему мы?</p>

        <ul>
            <li class="grid-container ac-center ai-center">
                <p class="fs-28">
                    Скорость.
                </p>

                <p class="fs-24">
                    Возможность быстро создать проект и настроить все доступы и роли.
                </p>
            </li>

            <li class="grid-container grid-container ac-center ai-center">
                <p class="fs-28">
                    Кастомизация.
                </p>

                <p class="fs-24">
                    Возможность настроить внешний вид в соответствии со стилем компании.
                </p>
            </li>

            <li class="grid-container grid-container ac-center ai-center">
                <p class="fs-28">
                    Простота.
                </p>

                <p class="fs-24">
                    Простой и удобный интерфейс в котором может разобраться любой сотрудник.
                </p>
            </li>
        </ul>

    </div>
</template>

<style scoped>
li{
    grid-template-columns: max-content max-content;
    gap: 15px;
}

#container{
    gap: 10px;
    grid-auto-flow: row;
    grid-auto-rows: auto;
}

#logo{
 grid-template-columns: 150px max-content;  
 gap: 15px;
}
</style>
