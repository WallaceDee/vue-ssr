import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      description:'',
      data:[],
      productMenu:[],
      copyright:'',
      setting:{},
      headElements:[],
      tel:'',
      serviceHours:'',
      width:0,//document.body.clientWidth
      wechatQrCode:'',
      newsList:[]
    },
    mutations: {
      setNewsList(state, payload) {
        state.newsList=payload
      },
      setProductMenu(state, payload) {
        state.productMenu=payload
      },
      setWidth(state,payload){
        state.width=payload
      },
      setSetting(state,payload){
        state.setting=payload
        state.tel=payload.tel
        state.serviceHours=payload.serviceHours
        state.copyright=payload.copyright
        state.data=payload.data
        state.description=payload.description
        state.wechatQrCode=payload.wechatQrCode
        state.headElements=payload.headElements
      }
    },
    actions: {},
    modules: {}
  })
}