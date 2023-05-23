<template>
  <component :is="icon" />
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(() =>
  import(`../../assets/${props.name}.svg`)
);
</script>
