<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    v-if="currencies"
  >
    <ListItem v-for="(item, index) in currencies" :key="index" :item="item" />
  </TransitionGroup>
</template>

<script setup>
import ListItem from "./ListItem.vue";
const props = defineProps({ currencies: Object });
</script>
