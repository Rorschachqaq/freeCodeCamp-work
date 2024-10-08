// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// 时间戳 API 端点
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  
  // 如果日期参数为空，则使用当前时间
  if (!date) {
    var now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toGMTString()
    });
  } else {
    // 尝试解析日期
    var dateObj;
    // 检查是否为毫秒数
    if (!isNaN(date) && (date.toString().length === 12 || date.toString().length === 13)) {
      dateObj = new Date(parseInt(date));
    } else {
      dateObj = new Date(date);
    }
    // 验证日期是否有效
    if (isNaN(dateObj.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({
        unix: dateObj.getTime(),
        utc: dateObj.toGMTString()
      });
    }
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
