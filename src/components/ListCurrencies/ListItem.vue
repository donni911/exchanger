<template>
  <li
    class="relative flex items-center flex-col justify-center border-2 border-secondary rounded-lg p-2"
  >
    <p class="text-body">
      1 {{ item.basicCurrency || store.originalCurrency }}
    </p>
    <span class="text-body">=</span>
    <span class="text-primary text-xl font-bold">
      {{ item.value }} {{ item.currency }}</span
    >
    <button
      class="absolute top-2 right-2 w-4 h-4 [&>svg>path]:transition hover:[&>svg>path]:fill-yellow-400"
      :class="{ '[&>svg>path]:fill-yellow-400': item.starred }"
      @click="addToFavourite(item)"
    >
      <icon name="star" />
    </button>
  </li>
</template>

<script setup>
import icon from "@/components/UI/Icon.vue";
import { useCurrenciesStore } from "@/store/currencies";

const store = useCurrenciesStore();

const props = defineProps({
  item: Object,
});

const addToFavourite = (item) => {
  item.starred = !item.starred;
  if (item.starred) {
    store.addFavourite(item);
  } else {
    store.deleteFavorite(item);
  }
};
</script>
