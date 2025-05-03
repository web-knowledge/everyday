class Dep {
  constructor() {
    this.subs = new Set();
  }
  depend() {
    if (Dep.target) {
      this.subs.add(Dep.target);
    }
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

Dep.target = null;

class Watcher {
  constructor(updateFn) {
    this.updateFn = updateFn;
    Dep.target = this;
    updateFn(); // 触发getter收集依赖
    Dep.target = null;
  }

  update() {
    // 触发更新
    this.updateFn();
    // 这里可以执行更新逻辑，比如重新渲染视图等
    console.log("update UI");
  }
}

function reactive(obj, key) {
  let value = obj[key];
  const dep = new Dep();
  // 数据劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend(); // 依赖收集
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue;
        dep.notify(); // 通知更新
      }
    },
  });
}

const demo = { count: 0 };
reactive(demo, "count");
const watcher = new Watcher(() => {
  console.log("count changed", demo.count);
});

demo.count = 1; // update 、 count changed 1
demo.count = 2; // update 、 count changed 2
demo.count = 2; // 无输出
