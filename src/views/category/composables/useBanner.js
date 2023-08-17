// 轮播图相关的业务逻辑代码
// 1.命名以use开头的业务逻辑代码，外层包一个函数usexxx
// 2.里面写实现逻辑的代码
// 3.将外部要使用的数据return出去
// 4.导出整个函数
// 5.在外部导入使用，解构出要使用的数据渲染即可
import { ref } from 'vue'
import { homeGetBannerListAPI } from '@/apis/home.js'

export const useBanner = () => {
  const bannerList = ref([])
  const getBannerList = async () => {
    const res = await homeGetBannerListAPI(2)
    bannerList.value = res.data.result
  }
  getBannerList()
  return {
    bannerList
  }
}
