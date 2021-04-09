const Koa = require('koa');
// 引入第三方的中间件路由
const Router = require('@koa/router');
// 引入中间件：模板引擎
const views = require('koa-views');
const path = require('path');

const app = new Koa();
const router = new Router();

// 加在模板引擎
console.log(__dirname); //固定语法文件的绝对路径  C:\Users\28455\Desktop\Revision\NodeJS\koa-demo
// 将绝对路径与路径下面的指定文件相连接
app.use(views(path.join(__dirname, './views'), {
    // 文件扩展名
    extension: 'ejs'
}))

// 引入mysql这个包
var mysql = require('mysql');

// 方式一，方式二
//  mysql.createConnection：调用mysql下面的方法创建链接
// var connection = mysql.createConnection({
//     //  host:连接到本地 localhost
//     host: 'localhost',
//     // user:用户名 (创建MySQL数据库时的用户名)
//     user: 'root',
//     //  password：密码。默认是没有的 
//     password: '',
//     // database：数据库的名字
//     database: 'blog'
// });

// 方式三
// 建立连接池
var pool = mysql.createPool({
    // 连接池中允许连接的数量
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
})

// 方式一
// // 链接数据库获取所有用户的信息
// function getUsers() {
//     // 进行数据库操作时费时，异步操作
//     return new Promise((resolve, reject) => {
//         connection.connect(); //打开这个链接
//         // query方法：两个参数，第一个参数MySQL查询语句，第二个参数：回调函数
//         // 回调函数中有俩参数，第一个参数：error，第二参数：返回的结果
//         connection.query('select * from t_user', function (error, results) {
//             // 如果出错了，返回错误信息
//             if (error) {
//                 reject(error);
//             } else {
//                 // 拿到数据了就返回数据
//                 resolve(results);
//             }
//         });
//         //关闭连接池
//         connection.end();
//     })
// }

// // 返回具体某个用户的详细信息
// function getUser(userId) {
//     // 进行数据库操作时费时，异步操作
//     return new Promise((resolve, reject) => {
//         // connection.connect();   //打开这个链接
//         // 连接查询
//         // query方法：两个参数，第一个参数MySQL查询语句，第二个参数：回调函数
//         // 回调函数中有俩参数，第一个参数：error，第二参数：返回的结果
//         connection.query('select * from t_user where user_id =' + userId, function (error, results) {
//             if (error) {
//                 // 如果出错了，返回错误信息
//                 reject(error);
//             } else {
//                 // 拿到数据了就返回数据
//                 resolve(results);
//             }
//         });
//         // connnection.end();  // 关闭结束链接

//     })
// }


// 方式二
// 针对数据库的操作
// function query(sql) {
//     // 异步操作
//     return new Promise((resolve, reject) => {
//         // connection.connect(); //打开这个链接
//         // 链接查询
//         // query方法：两个参数，第一个参数MySQL查询语句，第二个参数：回调函数
//         // 回调函数中有俩参数，第一个参数：error，第二参数：返回的结果
//         connection.query(sql,function (error, results) {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(results);
//                 }

//             }
//         );
//     })
// }

// 方式三
// 继续优化，使用连接池
function query(sql) {
    // 异步操作
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(sql, function (error, results) {
                // When done with the connection, release it.
                connection.release();

                // Handle error after the release.
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    })
}

// 方式一
// router.get('/', async (ctx) => {
//     let results = await getUsers();
//     await ctx.render("users", {
//         users: results
//     })
// })
// router.get('/userDetail', async (ctx) => {
//     // get方式的请求，通过ctx.query的方式接收传递过来的参数
//     let param = ctx.query;
//     console.log(param);  // { userId: '2' }
//     let result = await getUser(param.userId);
//     // [
//     //     RowDataPacket {
//     //       user_id: 2,
//     //       username: 'wangwu',
//     //       password: '123456',
//     //       tel: '15498762578',
//     //       create_time: 2021-04-07T12:33:41.000Z
//     //     }
//     // ]
//     console.log(result);
//     await ctx.render("user-detail", {
//         user: result[0]  //一定记得加上[0]
//     })
// })


// 方式二，方式三
router.get('/', async (ctx) => {
    let results = await query('select * from t_user');
    await ctx.render("users", {
        users: results,
    })
});
router.get('/userDetail', async (ctx) => {
    var param = ctx.query;
    let result = await query('select * from t_user where user_id=' + param.userId);
    console.log(result);
    await ctx.render("user-detail", {
        user: result[0]
    })
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('[demo] start-quick is starting at port 3000');
