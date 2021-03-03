const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/core');

const text = fs.readFileSync(path.join(__dirname, 'README.md'), {
  encoding: 'utf8',
});

const octokit = new Octokit();

octokit.request('POST /markdown', { text }).then((resp) => {
  const html = `
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>菜头云 - 简单的前端部署</title>
<meta property="og:title" content="菜头云 - 简单的前端部署">
<meta name="description" content="菜头云是一个简单的帮助开发者快速迭代和部署前端静态网站的服务">
<meta property="og:description" content="菜头云是一个简单的帮助开发者快速迭代和部署前端静态网站的服务">
</head>
<body>${resp.data}</body>
</html>`;

  console.log(html.trim())
});
