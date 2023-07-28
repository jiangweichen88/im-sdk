# imSdkVisitor

## 依赖安装

```shell
yarn
```

### 运行服务

默认 `src/main.js` 入口文件

```shell
yarn serve
```

### 打包库

默认 `src/index.js` 入口文件

```shell
yarn lib
```

### 库使用示例

`yarn lib` 之后得到 `Login.umd.js`，修改 `dist/demo.html` 文件后使用浏览器打开

```html
<meta charset="utf-8" />
<title>im sdk</title>
<body>
  <div>
    <div id="imSdkVisitor"></div>
  </div>
</body>
<script src="./imSdkVisitor.umd.js"></script>

<script>
  console.log(imSdkVisitor)
  window.onload = function () {
    imSdkVisitor.init({
      // 渲染组件
      domId: 'imSdkVisitor',
      lang: 'zh', //多语言：中文'zh',英文'en'；默认值'zh'
      options: {
        tenantId: '370', // 企业ID
        imWebToken: ''
      },
    })
  }
</script>
```
