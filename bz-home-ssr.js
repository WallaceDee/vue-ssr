const fs = require("fs");
const Koa = require("koa");
const path = require("path");
const koaStatic = require('koa-static')
const app = new Koa();

const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
app.use(koaStatic(resolve('./dist')))

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

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
app.use(async (ctx, next) => {
  const context = {
    title: "ssr test",
    url: ctx.url
  };
  // 将 context 数据渲染为 HTML
  const html = await renderToString(context);
  ctx.body = html;
});

const port = 89;
app.listen(port, function() {
  console.log(`server started at localhost:${port}`);
});
