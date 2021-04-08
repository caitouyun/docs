const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/core');

const text = fs.readFileSync(path.join(__dirname, 'README.md'), {
  encoding: 'utf8'
});

const octokit = new Octokit();

octokit.request('POST /markdown', { text }).then(resp => {
  const html = `
<!doctype html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>菜头云 - 简单的前端部署</title>
<meta property="og:title" content="菜头云 - 简单的前端部署">
<meta name="description" content="菜头云是一个简单的帮助开发者快速迭代和部署前端静态网站的服务">
<meta property="og:description" content="菜头云是一个简单的帮助开发者快速迭代和部署前端静态网站的服务">
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<main class="markdown-body">
${resp.data}
</main>
<footer class="markdown-body">${`Copyright © ${new Date().getFullYear()}. 使用菜头云托管.
        <a href="https://beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
            >
              粤ICP备20013360号-1
            </a>
      `}</footer>
      <script>
function jump() {
var el = document.getElementById('user-content-'+decodeURIComponent(location.hash.substr(1)))
if (el) window.scrollTo(0, el.offsetTop-10)
}
jump();
window.onhashchange = jump;
      </script>
</body>
</html>`;

  console.log(html.trim());
});
