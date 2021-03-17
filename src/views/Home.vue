<template>
  <div>
    <Banner :list="bannerList"></Banner>
    <Solution :list="productMenu"></Solution>
    <BasicProducts :list="productMenu"></BasicProducts>
    <OverseaBusiness :blockInfo="productMenu[2]"></OverseaBusiness>
    <Case :list="casesList"></Case>
    <Partners></Partners>
    <News :list="newsList"></News>
  </div>
</template>
<script>
import Banner from './Home/Banner'
import Solution from './Home/Solution'
import BasicProducts from './Home/BasicProducts'
import OverseaBusiness from './Home/OverseaBusiness'
import Case from './Home/Case'
import Partners from './Home/Partners'
import News from './Home/News'
import { getCasesList,getBannerList } from '../api/'
const loadData=async ()=>{
 let casesList= await getCasesList()
 let bannerList= await getBannerList()
  return { casesList,bannerList }
}
export default {
  name: 'Home',
  components:{
    Banner,
    Solution,
    BasicProducts,
    OverseaBusiness,
    Partners,
    Case,
    News
  },
  data() {
    return {
      casesList:[],
      bannerList:[]
    }
  },
  props: {
    productMenu: {
      type: Array,
      default: () => []
    },
    newsList: {
      type: Array,
      default: () => []
    }
  },
   async created () {
    let {casesList,bannerList} = await this.$createFetcher(loadData)()
    this.casesList=casesList.data
    this.bannerList=bannerList.data
  },
  mounted() {

  }
}
</script>
