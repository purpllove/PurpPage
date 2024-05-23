<template>
    <n-space vertical>
        <n-space> <n-switch v-model:value="inverted" /> inverted 
            <n-button @click="login" class="justify-end" target="_blank">登录</n-button>
        </n-space>
        <n-layout>
            <n-layout-header :inverted="inverted" bordered>
                Header
                <!-- <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" /> -->
            </n-layout-header>
            <n-layout has-sider>
                <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="120"
                    :native-scrollbar="false" :inverted="inverted" style="max-height: 320px">
                    <n-menu :inverted="inverted" :collapsed-width="64" :collapsed-icon-size="22" :options="groupOption"
                        key-field="key" label-field="label" @update:value="handleMenuUpdate" />
                </n-layout-sider>
                <n-layout-content>
                    <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:6" :x-gap="8" :y-gap="8">
                        <n-grid-item v-for="item in smallLogy" :key="item.id"
                            :style="{ display: item.type === itemGroupType ? 'block' : 'none' }">
                            <technology-card v-if="item.type === itemGroupType" v-bind="item" />
                        </n-grid-item>
                    </n-grid>
                </n-layout-content>
            </n-layout>
            <n-layout-footer :inverted="inverted" bordered>
                Footer
            </n-layout-footer>
        </n-layout>
    </n-space>
</template>
<script setup lang="ts">
import { h, defineComponent, ref, Component } from 'vue'
import SvgIcon from '@/components/custom/svg-icon.vue';
import { TechnologyCard } from "../../views/page/components";
import { getAllPage } from "../../service/api";
import { NIcon } from 'naive-ui'

const smallLogy = ref<ApiPageManagement.Page[]>([]);
const groupLogy = ref<number[]>([]);
const groupOption = ref<CommonType.Menu.MenuOption[]>([]);
const itemGroupType = ref<number>();
const inverted = ref<boolean>(false);
async function getHomePages() {
    const { data } = await getAllPage();
    if (data) {
        setTimeout(() => {
            smallLogy.value = data.data.list;
            groupLogy.value = data.data.types;
            groupOption.value = data.data.types.map(item => ({ key: item, label: String(item + 'Group'), value: item }))
        });
        itemGroupType.value = data.data.types[0];
    }
}
function handleMenuUpdate(key: number) {
    itemGroupType.value = key
}
function renderIcon(icon: String) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
function login() {
    window.open("/login", "_blank");
}
getHomePages();

</script>