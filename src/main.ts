import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { setupAssets, setupNProgress } from "./plugins";
import { setupStore } from "./store";
import { setupRouter } from "./router";

async function setupApp() {
    // 加载资源文件
    setupAssets();
    
    // 添加进度条
    setupNProgress();

    // 创建app
    const app = createApp(App);

    // 添加Pinia
    setupStore(app);
    
    // 添加路由
    await setupRouter(app);
    
    app.mount("#app");
}
setupApp();
// createApp(App).mount('#app')
