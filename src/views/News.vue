<template>
  <div class="news-content">
    <div class="banner"></div>
    <keep-alive>
      <router-view :setting="setting"/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  props: {
    setting: {
      type: Object,
      default: () => {}
    }
  }
  }
</script>
<style lang="less">
.news-content {
  background-color: #f8f8f8;
  .banner {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(../assets/images/news_bg.jpg);
  }
}
@media screen and (min-width: 641px) {
  .news-content {
    padding-bottom: 100px;
    overflow: hidden;
    min-width: 1180px;
    .banner {
      min-width: 1180px;
      height: 500px;
    }
  }
}
@media screen and (max-width: 640px) {
  .news-content {
    .banner {
      height: 160px;
    }
  }
}
</style>