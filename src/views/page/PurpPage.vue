<script setup lang="ts">
import { ref } from "vue";
import { getAllPage } from "../../service/api";
import { TechnologyCard } from "./components";
// import {
//   NCollapse,
//   NCollapseItem,
//   NGrid,
//   NGridItem,
//   NSpace,
//   NCard,
// } from "naive-ui";
// defineProps<{ msg: string }>();
defineOptions({ name: "PurpPage" });
const smallLogy = ref<ApiPageManagement.Page[]>([]);
const groupLogy = ref<number[]>([]);
async function getHomePages() {
  const { data } = await getAllPage();
  // dataPage.value = await getPages();
  if (data) {
    setTimeout(() => {
      smallLogy.value = data.data.list;
      groupLogy.value = data.data.types;
    }, 1000);
  }
}

function init() {
  getHomePages();
}
// 初始化
init();
</script>
<template>
  <div>
    <!-- <n-space v-for="itemGroup in groupLogy" :key="itemGroup" :vertical="true" :size="16">
      <n-card :title="itemGroup + ''" :bordered="false" size="small" class="rounded-8px shadow-sm">
        <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:6" :x-gap="8" :y-gap="8">
          <n-grid-item v-for="item in smallLogy" :key="item.id"
            :style="{ display: item.type === itemGroup ? 'block' : 'none' }">
            <technology-card v-if="item.type === itemGroup" v-bind="item" />
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-space> -->
    <n-collapse v-for="itemGroup in groupLogy" :key="itemGroup" :vertical="true" :size="16" arrow-placement="right"
      :default-expanded-names="String(groupLogy[0])" :accordion=true>
      <n-collapse-item :title="String(itemGroup)" :bordered="false" size="small" class="rounded-8px shadow-sm"
        :name="String(itemGroup)">
        <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:6" :x-gap="8" :y-gap="8">
          <n-grid-item v-for="item in smallLogy" :key="item.id"
            :style="{ display: item.type === itemGroup ? 'block' : 'none' }">
            <technology-card v-if="item.type === itemGroup" v-bind="item" />
          </n-grid-item>
        </n-grid>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>
