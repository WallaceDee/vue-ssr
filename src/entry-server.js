import Vue from 'vue'
import { createApp } from "./main";
import { createServerPlugin } from 'vue-ssr-prefetcher'

const routerReady =(router)=> {
  return new Promise(resolve => {
    router.onReady(resolve)
  })
}
export default async context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
    let   serverPlugin=createServerPlugin()
  Vue.use(serverPlugin)
    const { app, router,store  } = createApp();
    const meta = app.$meta() // here
    // 设置服务器端 router 的位置
    router.push(context.url);
    context.meta = meta // and here
    await routerReady(router)
      // 3. Set `context.rendered` to `serverPlugin.done`
      context.rendered = serverPlugin.done
    
      context.state = {
        $$stroe: store ? store.state : undefined,
        // 4. `app.$$selfStore` is a property injected by the serverPlugin
        $$selfStore: app.$$selfStore
      }
    
      return app
};
