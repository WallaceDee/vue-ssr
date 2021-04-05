const fs = require("fs");
const Koa = require("koa");
const path = require("path");
const koaStatic = require('koa-static')
const app = new Koa();
const LRU = require('lru-cache')
const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
app.use(koaStatic(resolve('./dist/client')))

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("./dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/client/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle
  , {
  runInNewContext: false,
  template: fs.readFileSync(resolve("./public/index.temp.html"), "utf-8"),
  clientManifest: clientManifest
}
);

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if(err){
        reject(err)
      }{
        const {
          title, htmlAttrs, headAttrs, bodyAttrs, link,
          style, script, noscript, meta
        } = context.meta.inject()
        resolve(`
        <!doctype html>
        <html ${htmlAttrs.text(true)}>
          <head ${headAttrs.text()}>
            ${meta.text()}
            ${title.text()}
            ${link.text()}
            ${style.text()}
            ${script.text()}
            ${noscript.text()}
          </head>
          <body ${bodyAttrs.text()}>
            <!-- prepended metaInfo properties -->
            ${style.text({ pbody: true })}
            ${script.text({ pbody: true })}
            ${noscript.text({ pbody: true })}
            <!-- app -->
            ${html}
            <!-- appended metaInfo properties -->
            ${style.text({ body: true })}
            ${script.text({ body: true })}
            ${noscript.text({ body: true })}
          </body>
        </html>
      `);
      }
    });
  });
}
// 第 3 步：添加一个中间件来处理所有请求
const microCache = new LRU({
  max: 100,
  maxAge: 1000*60 // 重要提示：条目在 1 秒后过期。
})
app.use(async (ctx, next) => {
  const hit = microCache.get(ctx.url)
  if (hit) {
    console.log('读取缓存')
    ctx.body =hit
    return false
  }else{
  const context = {
    url: ctx.url
  }
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context);
  microCache.set(ctx.url, html)
  ctx.body = html;
  }
});

const port = 89;
app.listen(port, function() {
  console.log(`server started at localhost:${port}`);
});
