# Redirects Rewrites

静态网站没有后端服务逻辑，所以没有办法在后端进行 HTTP 请求的跳转或者重写，但是部署在菜头云上的静态网站可以通过在`caitou.yml`中定义规则来快速满足一些前端部署场景的需求, 比如:

```yaml
site: demo
public: www
redirects:
  - source: /old
    destination: /new
rewrites:
  - source: /api/*
    destination: https://api.example.com/$1
  - source: /*
    destination: /index.html
```

## 跳转和重写的区别

跳转规则匹配意味着返回代表跳转的 HTTP 状态码，菜头云默认返回 `301` (永久转移)，但是可以在规则中定义其他状态 (详情见规则定义)。

重写规则则并不改变当前访问的浏览器地址，比如在一些单页面应用中，需要将所有的请求都重写到 `/index.html`，但是链接保持不变，就需要通过重写来完成。同时也可以在 `destination` 中使用外部链接，作为一个代理服务器 (proxy)，比如将外部服务器链接重写到本地路径来避免浏览器前端跨域不可访问的问题。作为代理服务器访问外部服务器时，最长请求时间为 **30 秒**，超过之后会返回超时错误。

值得注意的是，**只有当目标路径没有找到对应的静态文件(即将返回 404 页面)的时候才会去尝试寻找对应的跳转或者重写规则**

## 规则定义

无论是`rewrites`还是`redirects` 都是一个包含 `source` 和 `destination` 的列表, `source` 必须为`/`开始的路径, 可以使用 `*` 来匹配任意的字符, 在 `destination` 中可以使用 `$1`, `$2` 等来表示匹配的字符。所有的规则按照列表中的顺序执行，如果有匹配的则立即返回，不再继续匹配之后的规则。

| source     | destination                  | 效果                                             |
| ---------- | ---------------------------- | ------------------------------------------------ |
| `/old`     | `/new`                       | `/old` → `/new`                                  |
| `/api/*`   | `https://api.example.com/$1` | `/api/health` → `https://api.example.com/health` |
| `/a/*/b/*` | `/ab/$1/$2`                  | `/a/1/b/2` → `/ab/1/2`                           |

在`redirects`中的规则，可以通过 `type` 来设置 HTTP 的跳转状态码, 比如

```yaml
redirects:
  - source: /old
    destination: /new
    type: 307
```

代表跳转的 HTTP 状态码如下:

- 永久跳转
  - 301 (默认)
  - 308
- 暂时跳转
  - 302
  - 303
  - 307

关于状态码的更多详细信息可以访问 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections)，可以使用不同状态码实现不同效果。

## 常用规则

以下是一些常用场景的配置

### 前端单页面应用

将请求重写到本地 `/index.html`

```yaml
rewrites:
  - source: /*
    destination: /index.html
```

## 避免 API 跨域问题

将外部服务器链接重写到本地路径来避免浏览器前端跨域不可访问

```yaml
rewrites:
  - source: /api/*
    destination: https://api.example.com/$1
```
