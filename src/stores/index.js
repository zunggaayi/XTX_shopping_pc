import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 仓库本地持久化插件
pinia.use(piniaPluginPersistedstate)

export default pinia

// import { useUserStore } from './modules/user.js'
// export { useUserStore }
// 这样写的目的是统一管理，并且其他组件使用导入时没有那么繁琐
// import {xx} from '@/stores
export * from './modules/category.js' // 接收所有来自user.js导出的属性和方法，并再次导出
