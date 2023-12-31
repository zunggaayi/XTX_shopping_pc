<script setup>
import { useCartStore } from '@/stores'
import { useRouter } from 'vue-router'
const cartStore = useCartStore()
const router = useRouter()
// 注意组件不能直接修改仓库
// 必须使用仓库的方法
const singleCheck = (i, selected) => {
  cartStore.singleCheck(i.skuId, selected)
}
const allCheck = (selected) => {
  cartStore.allCheck(selected)
  // console.log(selected)
}
const changeCount = (i, val) => {
  cartStore.changeCount(i.skuId, val)
}
const onSubmit = () => {
  if (cartStore.totalSel !== 0) {
    router.push('/checkout')
  } else {
    ElMessage.warning('您还没有选择要购买的商品噢~')
  }
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <!-- 由于v-model双向绑定不适合命令时的操作，因此将其拆分为:model-value根据仓库是否勾选，然后用@change来改变仓库 -->
                <el-checkbox
                  :model-value="cartStore.isAll"
                  @change="(selected) => allCheck(selected)"
                />全选
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品列表 -->
          <tbody>
            <tr v-for="i in cartStore.cartList" :key="i.id">
              <td>
                <!-- 特别注意，仓库里面的值是不能由组件直接修改的，要遵循单向数据流的特点 -->
                <!-- 
                  因此需要告诉仓库来修改，那么就需要把当前选中和选中哪个商品告诉仓库，就需要传两个值，
                  但是，监听事件不支持同时传递两个值，因此需要在事件中嵌套一层箭头函数，用这个箭头函数先接收一个值，
                  接着箭头函数里面再传递另一个值，这样就可以将两个甚至多个值传递
                 -->
                <el-checkbox
                  :model-value="i.selected"
                  @change="(selected) => singleCheck(i, selected)"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="i.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ i.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ i.price }}</p>
              </td>
              <td class="tc">
                <el-input-number
                  :model-value="i.count"
                  :min="1"
                  @change="(val) => changeCount(i, val)"
                />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="cartStore.removeCart(i.skuId)"
                  >
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          共 {{ cartStore.totalCount }} 件商品，已选择
          {{ cartStore.totalSel }} 件，商品合计：
          <span class="red">¥ {{ cartStore.totalSelPrice }} </span>
        </div>
        <div class="total">
          <el-button size="large" type="primary" @click="onSubmit"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;

      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;

        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }

      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }

  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
      color: #999;
      padding: 20px 0;
    }
  }

  .tc {
    text-align: center;

    a {
      color: $xtxColor;
    }

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: $priceColor;
  }

  .green {
    color: $xtxColor;
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>
