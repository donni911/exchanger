<template>
  <section class="p-3 border-2 border-secondary rounded-lg">
    <div class="flex justify-center">
      <h1 class="text-2xl text-body font-semibold">Currency exchange</h1>
    </div>
    <div class="grid lg:grid-cols-2 gap-4">
      <div class="flex flex-col justify-center">
        <div class="flex flex-col items-center w-full py-4">
          <label for="exchange-input" class="mb-2 text-lg text-body"
            >Type currency you want to convert</label
          >
          <input
            ref="el"
            name="exchange-input"
            type="text"
            placeholder="15 USD in UAH"
            class="border-2 border-secondary rounded-md p-2 w-full"
            @keyup.enter="handleConvert"
          />
          <span class="text-left w-full italic text-sm text-gray-500"
            >Format: 15 USD in UAH</span
          >
        </div>
        <button
          class="py-4 px-4 border-2 bg-secondary text-white border-secondary font-bold rounded-lg hover:bg-transparent hover:text-secondary hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
          @click="handleConvert"
          :disabled="!disableBtn"
        >
          Convert
        </button>

        <transition name="fade" mode="out-in">
          <p v-if="errorMessage" class="italic text-red-600">
            {{ errorMessage }}
          </p>
        </transition>
      </div>
      <ConverterResult :convertInfo="convertInfo" />
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useIMask } from "vue-imask";
import { fetchCurrencyByName } from "../modules/fetchCurrency";
import ConverterResult from "../components/Converter/ConverterResult.vue";

const errorMessage = ref("");

const convertInfo = reactive({
  sum: "",
  currency: "",
  currencyChange: "",
  convertedSum: "",
  unit: "",
});

const { el, masked } = useIMask({
  mask: "NN YYY i\\n YYY",
  prepare: (str) => {
    return str.toUpperCase();
  },
  blocks: {
    YYY: {
      mask: "aaa",
    },

    NN: {
      mask: /^\d+$/,
    },
  },
});

const disableBtn = computed(() => {
  const maskedValue = masked.value;
  const maskPattern = /(\d+)\s+([A-Za-z]{3})\s+in\s+([A-Za-z]{3})/;
  return maskPattern.test(maskedValue);
});

const handleConvert = async () => {
  if (!disableBtn.value) {
    errorMessage.value = "Please enter correct value";
  } else {
    errorMessage.value = "";

    const splitedRequest = masked.value.split(" ");

    try {
      const [sum, currency, , currencyChange] = splitedRequest;
      convertInfo.sum = sum;
      convertInfo.currency = currency;
      convertInfo.currencyChange = currencyChange;

      const data = await fetchCurrencyByName(convertInfo);

      convertInfo.convertedSum =
        convertInfo.sum * data.conversion_rates[convertInfo.currencyChange];

      convertInfo.unit = data.conversion_rates[convertInfo.currencyChange];
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
};
</script>
