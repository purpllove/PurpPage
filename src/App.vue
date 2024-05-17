<template>
  <div>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
      <n-card>
        <n-space>
          <n-button @click="cc()"> 切换模式 </n-button>
          <!-- <purp-page /> -->
        </n-space>
      </n-card>
      <!-- 主题颜色编辑器 -->
      <!-- <n-theme-editor/> -->
      <RouterView />
    </n-config-provider>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<script setup lang="ts">
import PurpPage from "./views/page/PurpPage.vue";
import { ref } from "vue";
import { dateZhCN, zhCN } from "naive-ui";
// import { NThemeEditor } from 'naive-ui'
import "./common/css/app.css";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
const theme = ref<GlobalTheme | null>(null);
const isDark = ref<boolean>(true);
function cc() {
  const darkBool = isDark.value;
  theme.value = darkBool ? darkTheme : null;
  isDark.value = !darkBool;
}
</script>

<style scoped></style>
