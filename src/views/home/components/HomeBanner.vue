<script setup>
import { homeGetBannerListAPI } from '@/apis/home.js'
import { ref } from 'vue'
const bannerList = ref([])
const getBannerList = async () => {
  const res = await homeGetBannerListAPI(1)
  bannerList.value = res.data.result
}
getBannerList()
</script>

<template>
  <div class="home-banner">
    <el-carousel trigger="click" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img v-img-lazy="item.imgUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  img {
    width: 100%;
    z-index: 98;
  }
}
</style>
