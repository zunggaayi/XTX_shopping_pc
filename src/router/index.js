import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Category from '@/views/category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/detail/index.vue'
import CartList from '@/views/cartlist/index.vue'
import CheckOut from '@/views/checkout/index.vue'
import Pay from '@/views/pay/index.vue'
import PayBack from '@/views/pay/payBack.vue'
import Member from '@/views/menber/index.vue'
import UserInfo from '@/views/menber/components/UserInfo.vue'
import UserOrder from '@/views/menber/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category/:id', component: Category },
        { path: '/category/sub/:id', component: SubCategory },
        { path: '/detail/:id', component: Detail },
        { path: '/cartlist', component: CartList },
        { path: '/checkout', component: CheckOut },
        { path: '/pay', component: Pay },
        {
          path: '/paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path: '/member',
          component: Member,
          redirect: '/member/user',
          // 关于重定向，可以使用redirect来指定重定向的页面，也可以将要重定向页面的路由置空
          children: [
            { path: 'user', component: UserInfo },
            { path: 'order', component: UserOrder }
          ]
        }
      ]
    }
  ],
  // 路由跳转滚动行为
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
