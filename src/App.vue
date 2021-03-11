<template>
  <div id="app">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default{
  name:'App',
  metaInfo: {
    meta:[{ charset: 'utf-8' },
          { 'http-equiv': 'X-UA-Compatible',content:'IE=edge' },
          { name: 'viewport',content:'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' }
          ],
    link:[{
      rel:'icon',href:'/favicon.ico'
    }]
  },
  mounted(){
    this.$store.commit('setWidth',document.body.clientWidth)
    window.addEventListener('resize', () => {
        this.$store.commit('setWidth',document.body.clientWidth)
  })
  }
}
</script>
<style lang="less">
html{font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
  * {
    -webkit-overflow-scrolling: touch; }
#app,body,html{

}
</style>