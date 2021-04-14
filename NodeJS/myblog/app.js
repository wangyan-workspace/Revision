// 引入koa
const Koa = require('koa');
// 引入ejs模板引擎
const views = require("koa-views");
// nodejs自带的模块，方便使用path.join方法将两部分路径拼接在一起
const path = require("path");
// 引入koa-static静态资源
const staticPath = require('koa-static');
// 引入bodyparser用于post表达提交
const bodyParser = require('koa-bodyparser');


const app = new Koa();
// 使用ctx.body解析中间件
app.use(bodyParser());

// 加载模板引擎
app.use(
    views(path.join(__dirname,"/views"),{
        extension: "ejs"
    })
)

// 配置静态资源目录对于相对入口文件app.js的路径
app.use(staticPath(
    path.join(__dirname,'/public')
))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);
console.log("start-quick is starting at port 3000");