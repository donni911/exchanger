import { createRouter, createWebHistory } from "vue-router";

import Converter from "../pages/Converter.vue";
import ListCurrencies from "../pages/ListCurrencies.vue";

const routes = [
  {
    path: "/",
    name: "converter",
    component: Converter,
    meta: {
      title: "Converter",
    },
  },
  {
    path: "/list",
    name: "listCurrencies",
    component: ListCurrencies,
    meta: {
      title: "List Currencies",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? "Default Title";
});

export default router;
