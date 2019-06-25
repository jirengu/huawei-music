# huawei-musi

## 环境搭建

```
npm init -y
npm install --save-dev parcel-bundler
```

如果npm安装包太慢，可以切换源。

以下是nrm工具切换源

```
npm install -g nrm
nrm use cnpm
nrm use npm
```
也可直接用命令切换

```
# 切换到cnpm的源
npm config set registry http://r.cnpmjs.org/
# 切换回来
npm config set registry https://registry.npmjs.org/
```

## 创建文件
```
mkdir src dist
touch index.html
cd src
mkdir ts scss
cd ts
touch index.ts
cd ../scss
touch index.scss
```

## 修改文件
index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="src/scss/index.scss">
  <title>华为音乐</title>
</head>
<body>
  <p>华为音乐</p>
  <img src="src/svg/music.svg" alt="music">
  <script src="src/ts/index.ts"></script>  
</body>
</html>
```

src/ts/index.ts

```
console.log('hello world')
```

src/scss/index.scss

```
$color: red;

body {
  color: $color;
}
```

## 开发发布
开发

```
npx parcel index.html
```

发布

```
npx parcel build index.html
```
编译后自动动到dist目录

## 参考文档
- [parcel.js使用文档](https://parceljs.org/getting_started.html)
- [scss使用文档](https://www.sasscss.com/getting-started/)
- [typescript使用文档](https://www.tslang.cn/docs/handbook/basic-types.html)