import Vue from 'vue'
import { createApp } from './main'
import { clientPlugin } from 'vue-ssr-prefetcher'
Vue.use(clientPlugin)
// 客户端特定引导逻辑……
const { app, router } = createApp()
router.onReady(() => {
    // 3. Deconstructing `$$selfStore` from `window.__INITIAL_STATE__`
    const { $$selfStore } = window.__INITIAL_STATE__
    // 4. Add `$$selfStore` to the root component instance
    if ($$selfStore) app.$$selfStore = $$selfStore
    app.$mount('#app')
    // 5. This is very important, it is used to avoid repeated data fetch,
    //    and must be after the `$mount()` function
    clientPlugin.$$resolved = true
  })