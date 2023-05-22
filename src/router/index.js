import { createRouter, createWebHistory } from "vue-router";

import Converter from "../pages/Converter.vue";
import ListCurrencies from "../pages/ListCurrencies.vue";

const routes = [
  {
    path: "/",
    name: "converter",
    component: Converter,
  },
  {
    path: "/list",
    name: "listCurrencies",
    component: ListCurrencies,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
