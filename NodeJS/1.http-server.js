//引入了http模块
var http = require("http");
//创建http服务器
http
    //响应给客户的信息 
    //状态码，返回的文档类型
    .createServer(function (req, res) {
        // 响应头携带的信息
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Node.js</h1>");
        //响应结束，必须要写的，否则会一直请求数据
        res.end("<p>Hello World</p>");
    })
    //监听端口号80
    .listen(80);
console.log("HTTP server is listening at port 80.");