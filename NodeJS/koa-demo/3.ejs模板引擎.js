const Koa = require('koa')
// 引入中间件：模板引擎
const views = require('koa-views')
const path = require('path')
// koa-static:中间件用于静态资源配置的
const static = require('koa-static')
// @koa/router:用于路由有关的
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// 加载模板引擎
// console.log(__dirname); //固定语法文件的绝对路径
// 将绝对路径与路径下面的指定文件相连接
app.use(views(path.join(__dirname, './views'), {
    // 扩展名extension
  extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public'

app.use(static(
  path.join( __dirname,  staticPath)
))

router.get('/',async (ctx) => {
  // 定义需要传递的常量值
  let title = 'hello koa2';
  let message = 'Mr Lin,I love you❤️'
  // render：具体渲染哪个页面(扩展名为ejs的文件，后缀名可省略)
  // 第二个参数，是向具体的页面传递一些信息
  await ctx.render('index', {
    title,
    message
  })
})

router.get('/todo',async (ctx)=>{
    await ctx.render('todo.html')//如果手动指定扩展名，那么直接查找文件，否则默认查找ejs扩展名
} )
app.use(router.routes()).use(router.allowedMethods());

app.listen(80)
console.log('[demo] start-quick is starting at port 80')