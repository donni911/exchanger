<template>
  <section class="p-3">
    <div class="flex justify-center">
      <h2 class="text-2xl text-body font-semibold">Currencies list</h2>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <div class="sm:mb-4">
        <h5 class="text-body">Basic currency:</h5>
        <div class="flex items-center">
          <input
            name="currency"
            type="text"
            placeholder="For example: USD"
            class="w-full border-2 border-secondary rounded-md p-1"
            @keyup.enter="handleBasicCurrency"
            @input="handleCurrencyInput($event.target)"
            v-model="basicCurrencyInput"
          />
          <button
            type="btn"
            :disabled="disableBtn"
            @click="handleBasicCurrency"
            class="flex-shrink-0 ml-2 h-9 w-12 border-2 bg-secondary text-white border-secondary font-bold rounded-lg hover:bg-transparent hover:text-secondary hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
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

      <div class="mb-4">
        <h5 class="text-body">Search currency:</h5>
        <div class="flex items-center">
          <input
            name="find-currency"
            type="text"
            placeholder="For example: UAH"
            class="w-full border-2 border-secondary rounded-md p-1"
            @input="findCurrencies"
            v-model="findCurrenciesInput"
          />
        </div>
      </div>
    </div>

    <List v-if="currenciesList.length" :currencies="currenciesList" />

    <h4 v-else-if="!currenciesList.length" class="text-center text-2xl">
      {{ errorStatus }}
    </h4>
  </section>
</template>

<script setup>
import List from "@/components/ListCurrencies/List.vue";

import { ref, computed, onMounted } from "vue";
import { useCurrenciesStore } from "@/store/currencies";
const store = useCurrenciesStore();

const errorMessage = ref("");
const errorStatus = ref("");
const currenciesList = ref([]);
const findCurrenciesInput = ref("");
const basicCurrencyInput = ref("USD");

const handleCurrencyInput = (input) => {
  const inputValue = input.value;
  input.value = inputValue
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase()
    .slice(0, 3);
};

const findCurrencies = () => {
  handleCurrencyInput(findCurrenciesInput);

  const findedCurrencies = store.findCurrencies(findCurrenciesInput.value);

  if (findCurrenciesInput.value.length && findedCurrencies.length) {
    currenciesList.value = findedCurrencies;
  } else if (!findedCurrencies.length) {
    errorStatus.value = `Cannot find ${findCurrenciesInput.value}`;
    currenciesList.value = findedCurrencies;
    console.log(errorStatus.value);
  } else {
    currenciesList.value = store.currencies;
  }
};

const handleBasicCurrency = async () => {
  if (basicCurrencyInput.value && basicCurrencyInput.value.length < 3) {
    errorMessage.value = "Type at least 3 characters";
  } else if (!basicCurrencyInput.value) {
    errorMessage.value = "Type at least 3 characters";
  } else {
    try {
      await store.fetchData(basicCurrencyInput.value);
      errorMessage.value = "";
      store.originalCurrency = basicCurrencyInput.value.toUpperCase();
      currenciesList.value = store.currencies;
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
  store.originalCurrency = basicCurrencyInput.value;
  currenciesList.value = store.currencies;
});
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  @apply transition-all;
}

.list-enter-from,
.list-leave-to {
  @apply translate-y-8 opacity-0;
}
</style>
