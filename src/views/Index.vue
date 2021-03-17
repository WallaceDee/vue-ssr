<template>
  <div>
    <BzHeader :productMenu="productMenu"></BzHeader>
    <keep-alive>
    <router-view :productMenu="productMenu" :newsList="newsList" :setting="setting"/>
    </keep-alive>
    <BzFooter :value="setting" :productMenu="productMenu" :newsList="newsList"></BzFooter>
  </div>
</template>
<script>
import { getSetting, getProductMenu,getNewsList } from '../api/'
import { getMetaInfoByPath } from '../libs/util.js'
import tdks from '../../public/tdk.json'
let currentTdk=getMetaInfoByPath(tdks,'index')
const loadData=async ()=>{
 let setting= await getSetting()
  let productMenu= await getProductMenu()
  let newsList= await getNewsList({
        page: 1,
        rows: 6
      })
  return {setting,productMenu,newsList}
}
export default {
  name: 'Index',
   metaInfo:currentTdk,
  data() {
    return {
      metaInfo:{},
      setting: {
        address:[],
        relatedLinks:[]
      },
      newsList:[],
      productMenu: []
    }
  },
  methods: {

  },
 async created () {
    let {setting,productMenu,newsList} = await this.$createFetcher(loadData)()
    this.setting=setting.data
    this.productMenu=productMenu.data
    this.newsList=newsList.data.rows
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