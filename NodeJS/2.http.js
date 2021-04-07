var http = require("http");
var querystring = require("querystring");

http.createServer(function (req, res) {
    // 设计两个页面
    // 1.http://localhost:3000/: 首页。显示的是用户注册的表单
    // 2.http://localhost:3000/regist:注册成功的回显页面
    res.writeHead(200, { "content-Type": "text/html; charset= utf-8" })
    // console.log(req.url);  //req.url返回地址栏中的路径信息
    if (req.url == "/") {
        res.write('<h1>用户注册</h1>');
        // 将表单提交到regist页面中，采用post的方式
        res.write('<form action="regist" method="post">');
        res.write('<p>用户名：<input type="text" name="username"></p>');
        res.write('<p>密码㊙️：<input type="password" name="password"></p>');
        res.write('<p>电话☎️：<input type="text" name="telephone"></p>');
        res.write('<p><button type="submit">注册</button></p>');
        res.write('</form>');
        //  res.end必须得有，否则会一直进行请求
        res.end('')
    } else if (req.url == "/regist") {
        var postData = "";
        req.on('data', function (data) {
            postData += data;
        });

        req.on("end", function () {
            // username=A02180256&password=sgfh&telephone=13796687320
            console.log(postData);
            // querystring : 将对象字符串，转变成数组
            var userInfo = querystring.parse(postData);
            // {username: '林海洋', password: 'lhy990619',telephone: '13796687320'}
            console.log(userInfo);
            console.log("用户名：", userInfo.username);
            console.log("密码㊙️：", userInfo.password);
            console.log("电话☎️：", userInfo.telephone);
        })
        //  res.end必须得有，否则会一直进行请求
        res.end('')
    }
})
    .listen(3000);
console.log("HTTP server is listening at port 3000.")