<template>
  <div class="content banner">
    <div class="swiper-container banner-wrapper">
      <div class="swiper-wrapper">
        <div
          v-for="item in list"
          :key="item.id"
          class="swiper-slide"
          :style="`background-image:url(${item.url})`"
        ></div>
      </div>
      <div class="swiper-pagination" v-if="list.length>1"></div>
    </div>
    <router-link :to="{name:'Consult'}" class="get-consult-btn" >获取解决方案</router-link>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Banner',
  data() {
    return {
      // list: []
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
      new Swiper('.banner-wrapper', {
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 5000 //1秒切换一次
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less">
.banner {
  .banner-wrapper {
    --swiper-pagination-color: #ffffff; /* 两种都可以 */
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    .swiper-pagination {
      bottom: 110px;
    }
    .swiper-pagination-bullet {
      background: #ffffff;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      width: 50px;
      border-radius: 8px;
      opacity: 1;
    }
  }
  a.get-consult-btn {
    display:block;
    transition: all 0.2s;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    position: absolute;
    z-index: 2;
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    bottom: 180px;
    font-size: 20px;
    padding: 10px 40px;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #00afb7;
    }
  }
}
@media screen and (min-width: 641px) {
  .banner{
      height: 100vh;
  }
  .banner.content {
    position: relative;
    min-width: 1180px;
    .swiper-slide {
      height: 100vh;
    }
  }
}
@media screen and (max-width: 640px) {
   .banner{    height: 70vh;}
  .banner.content {
    position: relative;
    width: 100%;
    min-width: auto;
    .swiper-slide {
      height: 70vh;
    }
    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
    }
    .swiper-pagination-bullet-active {
      width: 25px;
      border-radius: 5px;
      opacity: 1;
    }
    .swiper-pagination {
      bottom: 50px;
    }
    button {
      font-size: 14px;
      padding: 5px 30px;
      bottom: 110px;
    }
  }
}
</style>