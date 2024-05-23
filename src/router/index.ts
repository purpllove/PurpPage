import type { App } from "vue";
import {
    createWebHashHistory,
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";

import HelloWorldView from "../components/HelloWorld.vue";
import LayoutView from "../components/layout/layout.vue";
import PurpPageView from "../views/page/purpPage.vue";
import TestView from "../views/management/Test.vue";
import FormView from "../views/login/form.vue";
import PageSettingView from "../views/management/pageSetting/index.vue";
// import IndexView from ".././views/login/index.vue";

const routes = [
    {
        path: "/purpPage",
        name: "purpPage",
        component: PurpPageView,
    },
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
    {
        path: "/login",
        name: "login",
        component: FormView,
    },
    // {
    //     path: "/index",
    //     name: "index",
    //     component: IndexView,
    // },
    {
        path: "/layout",
        name: "layout",
        component: LayoutView,
    },
    {
        path: "/management/pageSetting",
        name: "pageSetting",
        component: PageSettingView,
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
