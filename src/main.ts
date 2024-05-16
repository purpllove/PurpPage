import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";

async function setupApp() {
    // 加载资源文件
    setupAssets();
    const app = createApp(App);
    setupStore(app);
    app.mount("#app");
}
setupApp();
// createApp(App).mount('#app')
