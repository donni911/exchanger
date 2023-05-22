<template>
    <header class="flex justify-center gap-8 pt-8 pb-4">
        <router-link class="nav-link" to="/">Converter</router-link>
        <router-link class="nav-link" to="/list"
            >List of currencies</router-link
        >
    </header>
</template>

<style scoped>
.nav-link {
    @apply text-body py-4 px-4 border-2 border-primary font-bold rounded-lg hover:bg-primary hover:text-white hover:shadow-2xl active:scale-95 transition;
}

.router-link-exact-active {
    @apply bg-primary text-white shadow-2xl;
}
</style>