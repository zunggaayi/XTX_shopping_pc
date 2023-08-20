import { ref, computed, onUnmounted } from 'vue'
// 封装倒计时函数
export const useCountDown = () => {
  const minter = ref(0)
  const second = ref(0)
  const time = ref(0)
  let timer = null
  const start = (currentTime) => {
    timer && clearInterval(timer)
    if (currentTime === -1) {
      return '付款时间已结束'
    }
    //倒计时逻辑
    time.value = currentTime
    timer = setInterval(() => {
      // console.log('计时器启动中')
      time.value--
    }, 1000)
  }
  // 自行封装了一个格式化倒计时函数，也可以使用dayjs插件来辅助完成
  // 定时器需要即使清理，因为就算切换了页面，定时器依然存在，因此需要切换页面后清除计时器
  const formatTime = computed(() => {
    minter.value =
      time.value / 60 >= 10
        ? parseInt(time.value / 60)
        : '0' + parseInt(time.value / 60)
    second.value =
      time.value % 60 >= 10 ? time.value % 60 : '0' + (time.value % 60)
    return minter.value + '分' + second.value + '秒'
  })
  // 组件销毁时，清除计时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
