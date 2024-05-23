<template>
  <div class="h-full">
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN" class="h-full">
      <n-button @click="updateTheme()"> 切换模式 </n-button>
      <NLoadingBarProvider>
        <NDialogProvider>
          <NNotificationProvider>
            <NMessageProvider>
              <!-- <ContextHolder /> -->
              <slot>
                <RouterView />
              </slot>
            </NMessageProvider>
          </NNotificationProvider>
        </NDialogProvider>
      </NLoadingBarProvider>
      <!-- 主题颜色编辑器 -->
      <!-- <n-theme-editor/> -->
    </n-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { dateZhCN, zhCN } from "naive-ui";
// import { NThemeEditor } from 'naive-ui'
import "./common/css/app.css";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
const theme = ref<GlobalTheme | null>(null);
const isDark = ref<boolean>(true);
function updateTheme() {
  const darkBool = isDark.value;
  theme.value = darkBool ? darkTheme : null;
  isDark.value = !darkBool;
}
</script>

<style scoped></style>
