import ViewUI from 'view-design'
import Vue from 'vue'
import App from './App.vue'
import { createRouter }  from './router'
import { createStore } from './store'
import components from './components/'
import VueLazyload from 'vue-lazyload'

Vue.use(components)
Vue.use(ViewUI)
Vue.config.productionTip = false
Vue.use(VueLazyload)

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app,router,store,App}
}