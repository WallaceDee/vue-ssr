<template>
<div class="news-detail">
  <Title :title="{label:'专利情报',subTitle:'NEWS'}">
    <Spin fix v-if="loading"></Spin>
    <div class="news-detail-wrapper">
      <div class="content">
        <div class="left">
          <h1>{{getDate(data.createTime,'yyyymmdd','-')}}</h1>
          <p>来源：帮专网</p>
        </div>
        <div class="main">
          <h1>{{data.title}}</h1>
          <Divider />
          <div v-html="data.content" class="article-container"></div>
        </div>
      </div>
    </div>
    <previewer v-if="!loading" ref="previewer" :list="previewerList"></previewer>
  </Title>
</div>
</template>
<script>
import { getNewsDetail } from '../../api/'
import { getDate } from '../../libs/tools'
import { getMetaInfoByPath } from '../../libs/util.js'
import tdks from '../../../public/tdk.json'
let currentTdk=getMetaInfoByPath(tdks,'news/detail')
currentTdk.titleTemplate ='%s - '+currentTdk.title

export default {
  name: 'NewsDetail',
  metaInfo(){
    return {
      ...currentTdk,
      title:this.data.title
    }
  },
  data() {
    return {
      loading: true,
      data: {},
      previewerList: []
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  watch: {
    '$store.state.width'(val) {
      if (val < 640) {
        document.querySelector('.main').classList.add('mobile')
      } else {
        document.querySelector('.main').classList.remove('mobile')
      }
    }
  },
  methods: {
    getArticleImages(content) {
      let imgReg = /<img.*?(?:>|\/>)/gi //匹配图片中的img标签
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
      let arr = content.match(imgReg) //筛选出所有的img
      let srcArray = []
      for (let i = 0; i < arr.length; i++) {
        let src = arr[i].match(srcReg)
        srcArray.push({
          src: src[1]
        })
      }
      return srcArray
    },
    getDate
  },
  async created () {
    let newsDetail = await this.$createFetcher(getNewsDetail)({
        id: this.id
      })
     this.data = newsDetail.data
  },
  mounted(){
              this.$nextTick(() => {
            let previewerList = []
            document
              .querySelector('.main')
              .querySelectorAll('img')
              .forEach((item, index) => {
                previewerList.push({
                  src: item.src
                })
                item.addEventListener(
                  'click',
                  () => {
                    this.$refs.previewer.show(index)
                  },
                  false
                )
              })
              this.loading=false
            this.previewerList = previewerList
          })
  },
  activated() {
    // this.getData()
    if (document.body.clientWidth < 640) {
      document.querySelector('.main').classList.add('mobile')
    } else {
      document.querySelector('.main').classList.remove('mobile')
    }
    document.scrollingElement.scrollTop = 0
  }
}
</script>
<style lang="less">
.news-detail{
.news-detail-wrapper {
  .content {
    min-height: 100vh;
  }
  .left {
    color: #858585;
  }
  .main {
    h1 {
      color: #202020;
    }
  }
}
.main.mobile {
  img {
    width: 100%;
    display: block;
  }
  .article-container *{
    word-break: break-all;
  }
}
}
@media screen and (min-width: 641px) {
  .news-detail{
  .news-detail-wrapper {
    .content {
      width: 1180px;
      margin-right: auto;
      margin-left: auto;
      overflow: auto;
      padding: 0 50px;
    }
    .left {
      float: left;
      width: 30%;
      h1 {
        font-size: 20px;
        font-weight: normal;
      }
    }
    .main {
      float: left;
      width: 70%;
      min-height: 500px;
      h1 {
        font-size: 20px;
      }
    }
  }
}
}
@media screen and (max-width: 640px) {
  .news-detail{
  .news-detail-wrapper {
    .content {
      padding: 0 25px 20px 25px;
      .left {
        h1 {
          font-size: 18px;
          font-weight: normal;
        }
      }
      .main {
        margin-top: 5px;
        h1 {
          font-size: 20px;
          font-weight: 500;
        }
        .ivu-divider {
          margin: 10px 0;
        }
      }
    }
  }
  }
}
</style>