## (一)需求分析
    1.登录/注册
    2.文章列表 :首页
    3.文章详情
    4.发表文章
    5.文章评论
## (二)项目结构设计
    1.node_modules: 各种npm包
    2.views: 视图文件(html,ejs)
    3.public
        3.1 images: 存放图片
        3.2 javascripts: 存放js文件
        3.3 stylesheets: 存放css文件
    4.routes: 路由文件
    5.controllers: 控制器文件
    6.modules: 数据模型文件(数据库操作相关的文件)
    7.config: 配置文件
    8.app.js: 项目的启动(入口)文件
    9.package.json: 项目的配置文件
## (三)数据库设计
    1.名词解释：
        1.1ER图(Entity Relationship): 用来描绘数据库表结构之间的关系
        1.2主键(Primary Key):用来确保表中记录的唯一性
        1.2外键(Foregin Key):用来维护父表和子表之间的关系，外键需要进行配置，外键的命名规范：fk_父表名_子表名_外键名
    2.数据库表间关系
        2.1 一对多：最常见，比如一个用户可以发表多个文章，数据库中通过在子表中放置一个外键来维护一对多的关系
        2.2 一对一： 用户与身份证信息，数据库中使用『唯一外键』和『主键关联』两种方式维护一对一关系
        2.3 多对多： 老师与学生信息，数据库中通过再创建一个第三张表，来维护多对多关系
    3.数据库设计
        3.1 t_user：用户名
        3.2 t_blog: 文章表
## (四)安装配置
    1. npm init -y  (生成package.json文件)
    2. npm i koa    (安装koa的基础结构框架)
    3. npm i @koa/router :路由2.0的安装方式
    4. npm i koa-bodyparser :处理表单post方式提交数据
    5. npm i koa-static: 静态资源文件配置
    6. 模板引擎
        6.1 npm i koa-views
        6.2 npm i ejs
    7. npm i mysql:mysal数据库驱动
    8. npm install koa-session

## (五)开发流程
    1.设计views页面，figma原型
    2.配置public静态资源
    3.设计和配置路由：
        3.1 "/":进入index.ejs
        3.2 "/login":进入login.ejs
        3.3 "/regist":进入regist.ejs
        将路由的代码放置在routes下的index.js模块中，减少app.js中的代码量
    4.正式开发
        4.1开发login功能
            4.1.1 开发login.ejs页面
            4.1.2 编写post方式的/login路由逻辑
        4.2models中的方法命名规范：get查、save增、delete删、update改
## (六)补充知识
    1.redirect和render的区别：redirect是重定向，它会将页面的地址重新定向到新路由，他不能向页面传递参数；render是跳转，他不会重新定向地址，但是可以传递数据给页面
    2.MVC(Model,Views,Controller)
        1.View：视图文件(用户可见的页面)
        2.Controller：控制器文件，用来处理业务逻辑的，控制业务流程跳转
        3.Model：数据模型，简单的来说就是和数据库操作有关的代码
    3.session:会话作用域
## (n)设计过程
    1.在终端myblog目录下，输入 npm inin -y 初始化一个 .json文件
    2.在终端继续输入 npm i koa 将koa的框架加进来
    3.在app.js里面搭建一个服务器
       const Koa = require("koa");
       const app = new Koa();
       app.use(async (ctx) => {
           ctx.body = "hello koa2";
        });
        app.listen(3000);
        console.log("[demo] start-quick is starting at port 3000");
    4.在views文件夹下建立，登录和注册页面，login.ejs 和 regist.ejs ，写一下登录页面的头部，
      在public>stylesheets建立style.css文件，用于样式设计
    5.页面跳转需要路由，在终端中输入 npm i @koa/router，安装路由的包文件，方便使用
    6.安装各种依赖包，执行安装配置4~7的npm指令
