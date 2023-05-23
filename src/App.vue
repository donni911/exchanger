<template>
  <main class="mx-auto md:w-[700px] lg:w-[900px] px-4">
    <NavBar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </transition>
    </router-view>
  </main>
</template>

<script setup>
import NavBar from "./components/UI/NavBar.vue";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
