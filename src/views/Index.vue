<template>
  <div>
    <BzHeader :productMenu="productMenu"></BzHeader>
    <keep-alive>
    <router-view />
    </keep-alive>
    <BzFooter :value="setting" :productMenu="productMenu"></BzFooter>
  </div>
</template>
<script>
import { getSetting, getProductMenu } from '../api/'
import { getMetaInfoByPath } from '../libs/util.js'
import tdks from '../../public/tdk.json'
let currentTdk=getMetaInfoByPath(tdks,'index')
export default {
  name: 'Index',
   metaInfo:currentTdk ,
  data() {
    return {
      metaInfo:{},
      setting: {
        address:[],
        relatedLinks:[]
      },
      productMenu: []
    }
  },
  methods: {
    getProductMenu() {
      getProductMenu().then(res => {
        if (res.status) {
          this.productMenu = res.data
          this.$store.commit('setProductMenu', this.productMenu)
        }
      })
    },
    getSetting() {
      getSetting().then(res => {
        if (res.status) {
          this.setting = res.data
          this.$store.commit('setSetting', this.setting)
        }
      })
    }
  },
  created () {
    this.getSetting()
    this.getProductMenu()
  }
}
</script>
<style lang="less">
 .article {
   >*{
     font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif!important;
     background-color:transparent!important;
        font-size: 14px !important;
         color: #858585 !important;
             line-height: 22px;
     }
    line-height: 22px;
    font-weight: normal !important;
    color: #858585 !important;
    font-size: 14px !important;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    b,span ,strong{
      color: #858585 !important;
      font-size: 14px !important;
      font-weight: normal!important;
    }
    img {
      display: none!important;
    }
  }
</style>