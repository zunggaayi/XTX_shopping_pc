<script setup>
import { categoryGetCategoryDataAPI } from '@/apis/category'
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { homeGetBannerListAPI } from '@/apis/home.js'
import GoodItem from '../home/components/GoodItem.vue'

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
const bannerList = ref([])
const getBannerList = async () => {
  const res = await homeGetBannerListAPI(2)
  bannerList.value = res.data.result
}
getBannerList()
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
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img v-img-lazy="item.imgUrl" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类详情 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <a>
              <img v-img-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
    <el-backtop :right="80" :bottom="100">
      <div style="font-size: 14px">顶部</div>
    </el-backtop>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
.home-banner {
  width: 1240px;
  height: 500px;
  z-index: 98;
  img {
    width: 100%;
    z-index: 98;
  }
}
</style>
