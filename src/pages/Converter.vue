<template>
    <section class="p-3">
        <div class="flex justify-center">
            <h1 class="text-2xl text-body font-semibold">Currency exchange</h1>
        </div>
        <div class="flex flex-col justify-center w-1/2 mx-auto">
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
                    @input="inputHandler"
                />
                <span class="text-left w-full italic text-sm text-gray-500"
                    >Format: 15 USD in UAH</span
                >
            </div>
            <button
                class="py-4 px-4 border-2 bg-secondary text-white border-secondary font-bold rounded-lg hover:bg-transparent hover:text-secondary hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition"
                @click="handleConvert('USD')"
                :disabled="!disableBtn"
            >
                Convert
            </button>

            {{ disableBtn }}
            <transition name="fade" mode="out-in">
                <p v-if="errorMessage" class="italic text-red-600">
                    {{ errorMessage }}
                </p>
            </transition>
        </div>
    </section>
</template>


<script setup>
import { ref, computed } from "vue";

import fetchCurrency from "../modules/fetchCurrency";
import { useIMask } from "vue-imask";

const requestValue = ref("");

const errorMessage = ref("");

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
    const maskPattern = /(\d+)\s+([A-Za-z]+)\s+in\s+([A-Za-z]+)/;
    return maskPattern.test(maskedValue);
});

const handleConvert = async (cur) => {
    // const data = await fetchCurrency(cur);

    if (!disableBtn.value) {
        errorMessage.value = "Please enter correct value";
    } else {
        errorMessage.value = "";

        console.log(masked.value);
    }
};
</script>