<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores'
// 用仓库pinia管理分类数据，这样就只用一次请求就行，然后分别在组件中导入仓库使用属性即可
const categoryStore = useCategoryStore()
categoryStore.getCategory()
</script>

<template>
  <div>
    <LayoutFixed></LayoutFixed>
    <layout-nav></layout-nav>
    <layout-header></layout-header>
    <router-view></router-view>
    <layout-footer></layout-footer>
  </div>
</template>

<style scoped></style>
