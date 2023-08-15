import { defineStore } from 'pinia'
import { ref } from 'vue'
import { layoutGetCategoryAPI } from '@/apis/layout.js'

export const useCategoryStore = defineStore('xtx_category', () => {
  const categoryList = ref([])
  const getCategory = async () => {
    const res = await layoutGetCategoryAPI()
    categoryList.value = res.data.result
  }
  return {
    categoryList,
    getCategory
  }
})
