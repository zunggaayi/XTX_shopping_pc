<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeNew from './components/HomeNew.vue'
import HomePopular from './components/HomePopular.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <home-category></home-category>
    <home-banner></home-banner>
  </div>
  <home-new></home-new>
  <home-popular></home-popular>
  <home-product></home-product>
</template>

<style scoped>
.container {
  position: relative;
}
</style>
