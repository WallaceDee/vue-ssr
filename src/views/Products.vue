<template>
  <div class="products">
   <div class="banner"></div>
   <Solution v-if="type==1"></Solution>
   <Basic v-if="type==2"></Basic>
   <Oversea v-if="type==3"></Oversea>
  </div>
</template>
<script>
import Oversea from './Products/Oversea'
import Solution from './Products/Solution'
import Basic from './Products/Basic'
import { getMetaInfoByPath } from '../libs/util.js'
import tdks from '../../public/tdk.json'
const typeMapping=new Map([[1,'解决方案'],[2,'基础产品'],[3,'涉外业务']])
let currentTdk=getMetaInfoByPath(tdks,'products')
currentTdk.titleTemplate ='%s - '+currentTdk.title

export default {
  name:'Products',
  metaInfo(){
    return {
      ...currentTdk,
      title:typeMapping.get(this.type*1)
    }
  },
  components:{
    Basic,
    Solution,
    Oversea
  },
  computed:{
    type(){
        return this.$route.params.type
    }
  }
}
</script>
<style lang="less">
.products{
  .banner{
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/products_bg.jpg);
  }
}
@media screen and (min-width: 641px) {
.products{
  .banner{
    min-width: 1180px;
    height: 500px;
  }
}
}
@media screen and (max-width: 640px) {
.products{
  .banner{
    height: 160px;
  }
}
}
</style>