const Koa = require('koa');
// 引入第三方的中间件路由
const Router = require('@koa/router');
var bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();


// 使用ctx.body解析中间件
app.use(bodyParser())

// router.get('/', (ctx) => {
//   ctx.body = '首页...'
// });

// // 请求路由时传参  (/index?name = lisi&age = 23)
// router.get('/index', (ctx) => {
  // ctx.querystring 或者 ctx.query可以获取路由上传递的参数
//   // 1."name = lisi&age = 23"
//   // let query = ctx.querystring;
//   // 2.{name: 'lisi',age : '23'}
//   let query = ctx.query;
//   console.log(query);
//   ctx.body = query.name + ',' + query.age;
// });

// //3.url params (传递的参数/index/lisi/23)
// // :name/:age
// router.get('/index/:name/:age',(ctx)=>{
//   let params = ctx.params;
//   console.log(params);
//   ctx.body = params.name + "," + params.age;
// })

// router.get('/todo', (ctx) => {
//   ctx.body = 'todo...'
// });

router.get("/index",(ctx)=>{
  // action="/regist"  :信息提交到regist页面
  let html = `
  <h1>koa2 request post demo</h1>
  <form method="POST" action="/regist">
    <p>userName</p>
    <input name="userName" /><br/>
    <p>nickName</p>
    <input name="nickName" /><br/>
    <p>email</p>
    <input name="email" /><br/>
    <button type="submit">submit</button>
  </form>
`
  ctx.body = html
});

// router.post()接收regist的数据
router.post('/regist',(ctx)=>{
  // ctx.request.body: 可获取提交过来的所有数据
  let data = ctx.request.body;
  console.log(data);
  ctx.body = data.userName + ',' + data.nickName + ',' + data.email;
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(80)
console.log('[demo] start-quick is starting at port 80')