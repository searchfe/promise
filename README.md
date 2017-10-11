# promise

[![Build Status](https://travis-ci.org/searchfe/promise.svg?branch=master)](https://travis-ci.org/searchfe/promise)
[![Coverage Status](https://coveralls.io/repos/github/searchfe/promise/badge.svg?branch=master)](https://coveralls.io/github/searchfe/promise?branch=master)

一个简易的、移动端专用的 Promise。

> Promise/A+ spec. see: https://promisesaplus.com/

## 使用方式

使用 [APM][apmjs] 安装：

```bash
apmjs install @searchfe/promise
```

RequireJS 示例使用：

```javascript
require.config({
    baseUrl: "/amd_modules"
})
require(['@searchfe/promise'], function(Promise){
    Promise.resolve('hello').then(console.log)
})
```

## API

在 Promises/A+ 的基础上新增了若干 [bluebird][bluebird] 风格的 API。现有 API 如下：

* `#then()`
* `#catch()`
* `#finally()`
* `.resolve()`
* `.reject()`
* `.all()`
* `.fromCallback()`
* `.mapSeries()`

## 实现细节

### unhandledrejection

按照 V8 的 Promise 实现，未捕获的 Promise 异常会触发一个名为 `unhandledrejection` 的 `PromiseRejectionEvent`。该 Promise 实现中，也会尝试触发这个事件。

### nextTick

由于浏览器端没有 `nextTick` API，清空调用栈是借由其他机制实现的。
这些机制的 Fallback 顺序如下（序号越小优先级越高）：

1. `setImmediate` (W3C 标准)
2. `MessageChannel.postMessage`（支持 Worker 的浏览器）
3. `window.postMessage`（非 IE8）
4. `setTimeout`（IE 8 及以下）

## 使用范围

* 移动端专用：使用了移动端支持良好的 ES5 特性，IE 中使用可能会有问题
* AMD 环境：目前只支持 [AMD][amd] 环境

[amd]: http://requirejs.org/docs/whyamd.html
[bluebird]: http://bluebirdjs.com/docs/getting-started.html
[apmjs]: https://github.com/apmjs/apmjs
