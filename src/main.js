import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// 导入我们自定义的pinia，主要是持久化插件
import pinia from './stores/index.js'
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'

//引入懒加载插件
import { lazyPlugin } from '@/directives/index.js'
import { componentPlugin } from '@/components/index.js'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
