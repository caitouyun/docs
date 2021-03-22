# Redirects Rewrites

静态网站由于没有后端腹肌逻辑，所以没有办法来进行 HTTP 请求的跳转或者重写，菜头云部署通过在`caitou.yml`中定义一些规则，可以很方便的满足一些前端部署的场景。

## 跳转和重写的区别

重写规则并不改变当前访问的浏览器地址，比如在一些单页面应用中，需要将所有的请求都重写到 `/index.html`，但是链接保持不变，就需要通过重写来完成。

跳转则意味着返回代表跳转的 HTTP 状态码，菜头云默认返回 301 (永久转移)，但是可以在规则中自定义。

**只有当目标路径没有找到对应的静态文件的时候才会去尝试寻找对应的规则**

## 规则定义

无论是`rewrites`还是`redirects`都是 `source` 和 `destination` 的数组, source 必须为`/`开始的路径, 可以使用 `*` 来匹配任意的字符, 在`destination` 中可以使用 `$1`, `$2` 等来表示匹配的第几段字符。

| source     | destination                  | 作用                                             |
| ---------- | ---------------------------- | ------------------------------------------------ |
| `/old`     | `/new`                       | `/old` → `/new`                                  |
| `/api/*`   | `https://api.example.com/$1` | `/api/health` → `https://api.example.com/health` |
| `/a/*/b/*` | `/ab/$1/$2`                  | `/a/1/b/2` → `/ab/1/2`                           |

## 常用规则

### 前端单页面应用

```yaml
rewrites:
  - source: /*
    destination: /index.html
```

## API 跨域

```yaml
rewrites:
  - source: /api/*
    destination: https://api.example.com/$1
```
