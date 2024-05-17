import type { App } from "vue";
import {
    createWebHashHistory,
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";

import HelloWorldView from ".././components/HelloWorld.vue";
import TestView from "@/views/management/Test.vue";

const routes = [
    {
        path: "/helloWorld",
        name: "helloWorld",
        component: HelloWorldView,
    },
    {
        path: "/test",
        name: "test",
        component: TestView,
    },
];

const router = createRouter({
    // history: createMemoryHistory(), // 不会和URL交互
    // history: createWebHashHistory(), // 中间隔了#符号 如http://localhost:9980/#/helloWorld
    history: createWebHistory(), // HTML5 模式 如http://localhost:9980/helloWorld
    routes,
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
    app.use(router);
    await router.isReady();
}
