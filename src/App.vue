<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import PurpPage from "./components/PurpPage.vue";
import "./common/css/app.css";
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <purp-page msg="Page" />
</template>

<style scoped></style>
