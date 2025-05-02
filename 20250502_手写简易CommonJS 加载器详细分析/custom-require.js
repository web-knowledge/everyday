const fs = require("fs");
const path = require("path");
const cache = {}; // 1. 定义缓存 { '/a/b/c': {} }

function customRequire(modulePath) {
  // 2. 解析依赖路径
  const absPath = path.resolve(modulePath);

  // 3. 是否已缓存
  if (cache[absPath]) {
    return cache[absPath].exports;
  }

  // 4. 定义模块对象
  const module = {
    exports: {},
  };

  // 5. 读取模块代码
  const code = fs.readFileSync(absPath, "utf-8");

  // 6. 封装模块执行与返回
  const wrapper = new Function(
    "require",
    "exports",
    "module",
    // '__filename',
    // '__dirname',
    code + "\n return module.exports;"
  );

  // 7. 传参及执行
  wrapper.call(
    module.exports,
    (depPath) => customRequire(depPath),
    module.exports,
    module,
    // absPath,
    // path.dirname(absPath)
  );

  // 8. 缓存模块
  cache[absPath] = module;
  return module.exports;
}

module.exports = customRequire;
