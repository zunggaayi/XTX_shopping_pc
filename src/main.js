import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'

//引入懒加载插件
import { lazyPlugin } from '@/directives/index.js'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
