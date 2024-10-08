// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// 你的第一个 API 端点
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// 请求头解析器微服务
app.use('/api/whoami', function (req, res) {
  // 获取请求头信息
  var headers = req.headers;
  
  // 提取客户端IP地址
  var ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // 提取语言信息
  var language = headers['accept-language'];
  
  // 提取软件信息（User-Agent）
  var software = headers['user-agent'];
  
  // 构建响应对象
  var responseObject = {
    "ipaddress": ipAddress,
    "language": language,
    "software": software
  };
  
  // 返回请求头信息
  res.json(responseObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
