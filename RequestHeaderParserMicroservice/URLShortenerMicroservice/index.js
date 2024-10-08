require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const dns = require('dns');
const url = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// 存储短链接和原始URL的映射
const urlDatabase = {};
let urlCounter = 1;

// 处理 POST 请求，创建短链接
app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

  // 使用 URL 模块解析主机名
  const hostname = url.parse(originalUrl).hostname;

  if (!hostname) {
    return res.json({ error: 'invalid url' });
  }

  // 使用 DNS 核心模块验证 URL
  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    // 如果 URL 有效，生成短链接
    const shortUrl = urlCounter++;
    urlDatabase[shortUrl] = originalUrl;

    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

// 处理 GET 请求，通过短链接重定向到原始 URL
app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found' });
  }
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
