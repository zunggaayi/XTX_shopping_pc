<script setup>
import {
  categoryGetCategoryFilterAPI,
  categoryGetSubGoodListAPI
} from '@/apis/category.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodItem from '../home/components/GoodItem.vue'
const route = useRoute()
// 面包屑导航
const categoryFilterData = ref({})
const getCategoryFilterData = async () => {
  const {
    data: { result }
  } = await categoryGetCategoryFilterAPI(route.params.id)
  categoryFilterData.value = result
}
getCategoryFilterData()
// 基础列表渲染
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const subGoodList = ref([])
const counts = ref(0)
const getSubGoodList = async () => {
  const {
    data: { result }
  } = await categoryGetSubGoodListAPI(reqData.value)
  subGoodList.value = result.items
  console.log(result)
  counts.value = result.counts
}
getSubGoodList()
// 改变筛选条件列表重新渲染
const handleChange = () => {
  reqData.value.page = 1
  getSubGoodList()
}
// 列表无限加载
const disabled = ref(false)
const load = async () => {
  // console.log('需要加载')
  // 获取下一页数据
  reqData.value.page++
  const {
    data: { result }
  } = await categoryGetSubGoodListAPI(reqData.value)
  // 通过展开运算符拼接数组，并重新赋值
  subGoodList.value = [...subGoodList.value, ...result.items]
  if (subGoodList.value.length >= counts.value) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryFilterData.parentId}` }"
          >{{ categoryFilterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="handleChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        infinite-scroll-delay="1000"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <good-item
          v-for="good in subGoodList"
          :key="good.id"
          :good="good"
        ></good-item>
      </div>
    </div>
    <el-backtop :right="80" :bottom="100">
      <div style="font-size: 14px">顶部</div>
    </el-backtop>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
