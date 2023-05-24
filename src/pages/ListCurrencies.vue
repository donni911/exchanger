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

    <List v-if="store.currencies" :currencies="store.currencies" />

    <h4 v-else class="text-center text-2xl">Try another currency</h4>
  </section>
</template>

<script setup>
import List from "@/components/ListCurrencies/List.vue";

import { ref, computed, onMounted } from "vue";
import { useCurrenciesStore } from "@/store/currencies";
const store = useCurrenciesStore();

const errorMessage = ref("");
const basicCurrencyInput = ref("USD");

const handleCurrencyInput = () => {
  const inputValue = basicCurrencyInput.value;
  basicCurrencyInput.value = inputValue
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3);
};

const handleBasicCurrency = async () => {
  if (basicCurrencyInput.value && basicCurrencyInput.value.length < 3) {
    errorMessage.value = "Type at least 3 characters";
  } else {
    try {
      await store.fetchData(basicCurrencyInput.value);
      errorMessage.value = "";
      store.originalCurrency = basicCurrencyInput.value;
      console.log(store.originalCurrency);
    } catch (error) {
      errorMessage.value = error.message;
      console.log(error);
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
  store.originalCurrency = basicCurrencyInput.value;
});
</script>

<style scoped>
.list-move,
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
