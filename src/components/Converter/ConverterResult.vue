<template>
  <div>
    <transition name="fade" mode="out-in">
      <div
        v-if="convertInfo.convertedSum"
        class="flex items-center justify-center flex-col h-full"
      >
        <p class="text-body">Converted value</p>
        <h2
          class="text-secondary font-bold"
          :class="{
            'md:text-xl': formatSum(convertInfo).length >= 30,
            'md:text-2xl': formatSum(convertInfo).length < 30,
            'md:text-3xl': formatSum(convertInfo).length <= 20,
          }"
        >
          {{ formatSum(convertInfo) }}
        </h2>
        <p class="text-gray-500 text-sm">
          {{ formatUnit(convertInfo) }}
        </p>
      </div>
      <div
        v-else
        class="flex flex-col justify-center items-center w-full h-full py-4"
      >
        <h2 class="mb-2 text-lg text-gray-500">Start converting currency...</h2>
        <div class="w-10 h-10">
          <img src="@/assets/convert-icon.png" alt="" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatUnit, formatSum } from "../../modules/format";

const props = defineProps({ convertInfo: Object });
</script>
