<script setup>
import { goodGetHotGoodsAPI } from '@/apis/good.js'
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

// 接收数据
const props = defineProps({
  hotType: {
    type: Number,
    required: true
  }
})
const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])
const route = useRoute()
const hotList = ref([])
const getHotList = async () => {
  const {
    data: { result }
  } = await goodGetHotGoodsAPI({
    id: route.params.id,
    type: props.hotType
  })
  hotList.value = result
}
getHotList()
onBeforeRouteUpdate(() => {
  getHotList()
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/detail/${item.id}`"
      class="goods-item"
      v-for="item in hotList"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;
    margin-bottom: 5px;
    transition: all 0.3s;
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
  .goods-item:hover {
    box-shadow: 0 0 10px #999;
  }
}
</style>
