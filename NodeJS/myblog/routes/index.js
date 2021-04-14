// 引入koa/router路由
const Router = require("@koa/router");
const router = new Router();

router.get('/',async (ctx) => {
    await ctx.render("index")
 })
 router.get('/login',async (ctx) => {
     await ctx.render("login");
 })
 router.get('/regist',async (ctx) => {
     await ctx.render("regist");
 })