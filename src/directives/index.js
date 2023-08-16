//自定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
// 1。实现图片懒加载，只有视窗进入图片区域才请求加载，使用了vueUse的方法
export const lazyPlugin = {
  install(app) {
    //逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
