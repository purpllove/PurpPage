import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { setupAssets } from './plugins';


async function setupApp() {
    setupAssets();
    const app = createApp(App);
    app.mount('#app');
}
setupApp();
// createApp(App).mount('#app')
