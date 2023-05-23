<template>
  <section class="p-3">
    <div class="flex justify-center">
      <h2 class="text-2xl text-body font-semibold">Currencies list</h2>
    </div>

    <div class="w-1/2 mb-4">
      <h5 class="text-body">Basic currency:</h5>
      <div class="flex items-center">
        <input
          name="currency"
          type="text"
          placeholder="For example: USD"
          class="border-2 border-secondary rounded-md p-1"
          @keyup.enter="handleBasicCurrency"
          @input="handleCurrencyInput"
          v-model="basicCurrencyInput"
        />
        <button
          type="btn"
          :disabled="disableBtn"
          @click="handleBasicCurrency"
          class="ml-2 h-9 w-12 border-2 bg-secondary text-white border-secondary font-bold rounded-lg hover:bg-transparent hover:text-secondary hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
        >
          OK
        </button>
      </div>
      <transition name="fade" mode="out-in">
        <p v-if="errorMessage" class="italic text-red-600">
          {{ errorMessage }}
        </p>
      </transition>
    </div>

    <TransitionGroup
      name="list"
      tag="ul"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      v-if="store.currencies"
    >
      <li
        v-for="(item, index) in store.currencies"
        :key="index"
        class="relative flex items-center flex-col justify-center border-2 border-secondary rounded-lg p-2"
      >
        <p class="text-body">
          1 {{ item.basicCurrency || choosenBasicCurrency }}
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
    </TransitionGroup>
    <h4 class="text-center text-2xl" v-else>Try another currency</h4>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCurrenciesStore } from "@/store/currencies";
import icon from "../components/UI/Icon.vue";

const store = useCurrenciesStore();

const errorMessage = ref("");
const basicCurrencyInput = ref("USD");
const choosenBasicCurrency = ref("");

const handleCurrencyInput = () => {
  const inputValue = basicCurrencyInput.value;
  basicCurrencyInput.value = inputValue
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3);
};

const addToFavourite = (item) => {
  item.starred = !item.starred;
  if (item.starred) {
    store.addFavorite(item, choosenBasicCurrency.value);
  } else if (
    !item.starred &&
    choosenBasicCurrency.value != item.basicCurrency
  ) {
    store.deleteFavorite(item);
  }
};

const handleBasicCurrency = async () => {
  if (!basicCurrencyInput.value) {
    errorMessage.value = "Type basic currency";
  } else if (basicCurrencyInput.value.length < 3) {
    errorMessage.value = "Type at least 3 characters";
  } else {
    try {
      await store.fetchData(basicCurrencyInput.value);
      errorMessage.value = "";
      choosenBasicCurrency.value = basicCurrencyInput.value;
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
};

const disableBtn = computed(() => {
  if (!basicCurrencyInput.value) {
    return true;
  }
  return false;
});

onMounted(async () => {
  await handleBasicCurrency();
  choosenBasicCurrency.value = basicCurrencyInput.value;
});
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
