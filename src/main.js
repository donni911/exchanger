import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

// Router
import router from "./router";
//

// Store
const pinia = createPinia();
//

createApp(App).use(pinia).use(router).mount("#app");
