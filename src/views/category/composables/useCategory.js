// 获取分类数据逻辑代码
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { categoryGetCategoryDataAPI } from '@/apis/category'

export const useCategory = () => {
  // 路由缓存问题（带有参数的路由）
  // 这里是分类下的商品列表页，通过顶部导航路由跳转得到，注意这个跳转仅仅只参数的变化，
  // 那么由于vue官方对相同相同组件的优化，复用的组件是不会销毁的，但是也意味着生命周期函数不会被调用
  // 因此页面的内容不会变化
  const categoryData = ref({})
  const route = useRoute()
  // 设置默认参数
  const getCategory = async (id = route.params.id) => {
    const {
      data: { result }
    } = await categoryGetCategoryDataAPI(id)
    categoryData.value = result
  }
  getCategory()
  //实现页面描点跳转
  // 路由跳转后有bug!!,导致无法再次获取v-for生成的el(DOM元素)
  // const itemsTop = ref([])
  // // 批量获取v-for中的组件
  // const setItemRef = (el) => {
  //   const top =
  //     el.getBoundingClientRect().top + document.documentElement.scrollTop - 100
  //   itemsTop.value.push(top)
  // }
  // const gotoItem = (index) => {
  //   document.documentElement.scrollTop = itemsTop.value[index]
  // }

  // 在路由跳转前更新需要的数据
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}
