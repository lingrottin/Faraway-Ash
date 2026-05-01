---
title: 浅谈 JavaScript 中的闭包、this 和箭头函数
date: 2025-01-29 15:59:48
excerpt: 本文介绍了 JavaScript 中的闭包、this 和箭头函数。通过对比 Rust 的闭包，解释了 JavaScript 闭包如何携带父作用域，并探讨了闭包在处理 this 时的局限性。特别分析了传统函数中 this 被篡改的问题，并展示了箭头函数如何解决这一问题，确保 this 不被改变。最后，文章深入讨论了 JavaScript 中 this 的绑定机制及原型链的工作原理，解释了为什么箭头函数不能放在原型上。
categories:
  - 星耀
tags:
  - JavaScript
  - 编程
  - 代码
  - 猫猫课堂
---

{# <!-- markdownlint-disable MD049 --> #}

## 前言

JavaScript 真的混乱极了。各种冗杂的混乱的东西糅在一起，真是十分让人一头雾水。JavaScript 里的闭包问题更是尤其难以理解，恰巧又十分常用。我依照自己的理解，记在下面。

## Rust 中的闭包

在这之前，~~作为一名 Rust 狂信徒~~，我想先介绍一下 Rust 中的闭包。

```rust
fn call_closure<T: FnMut() -> ()>(mut f: T) -> () {
    f();
}

fn main() -> () {
    let mut x = 5;
    let closure = || {
        x += 1;
    };
    call_closure(closure);
    println!("{}", x); // 6
}
```

在上面的示例中，定义了一个名为 `closure` 的闭包，它的功能是将父作用域中的变量 `x` 增加 1。随后我们将这个闭包传递给 `call_closure` 函数，并在 `call_closure` 函数的内部调用这个闭包。

神奇的事情发生了：`x` 的值竟然真的被改变了！

`call_closure` 和 `main` 毕竟是两个不同的函数，但是借助一个“闭包”，竟然能够在 `call_closure` 里改变 `main` 里 `x` 的值。真的是太神奇了。这究竟是为什么呢？

## 对闭包的解释

闭包（closure）的本质是一种匿名函数，但和纯粹的函数稍微有一点不一样。

闭包作为一个值，不仅是一个**指向某个函数的内存地址**，还**包含了这个函数使用到的外部变量**。

这是什么意思呢？

回到上面的这个例子。理论上，因为 `call_closure` 和 `main` 分别具有两个互不相干的作用域，因此互相改变内部声明的变量近乎是不可能的。

但是我们声明了一个闭包。它**携带**了父作用域 `main` 中的变量 `x`，从而，在 `call_closure` 函数里也能够透过这个闭包改变 `x` 的值。

所以也可以更浅显地将闭包理解为**携带了父作用域的函数**，或者**总是在声明时的上下文中执行的函数**。

## JavaScript 中的闭包

JavaScript 中的闭包，和 Rust 中类似，都可以理解为一个函数**携带了它的父作用域**。

以下是一个常用的闭包的例子（来自 MDN）：

```javascript
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // 控制台输出： Mozilla
```

在上面的代码中，我们定义了一个叫 `makeFunc` 的函数，它返回了另一个叫 `displayName` 的函数。我们把它的返回值装进一个叫 myFunc 的变量中，就可以通过调用它来访问 `makeFunc` 函数中的变量 `name` 了。

这里的 `displayName` 就是一个闭包。它携带了父作用域中的 `name` 变量，所以在外部调用时也可以访问这个私有的变量。

## JS 中闭包的局限性

闭包拥有携带父作用域的能力，这毋庸置疑。然而，一旦涉及到 `this` 这个在 JS 里很魔幻的东西，事情就变得好玩起来了。

考虑一下下面的代码：

```javascript
class Foo {
  a;

  foo_func() {
    console.log(this.a);
  }

  constructor() {
    this.a = "foo";
  }
}

let foo = new Foo();
document.getElemenyById("some-element").onclick = foo.foo_func;
```

然后，点击一下 `some-element`，神奇的事情发生了：

![神奇的事情](/img/js-closure/1.webp)

什么？不应该返回“foo”的吗？怎么会冒出来一个 undefined？这究竟是怎么回事？

原因在于，当 `foo.foo_func` 被赋值给 `onclick` 时，`this` 被篡改了。

理论上，`foo_func` 该是个闭包。它应该携带了父作用域，尤其是这个 `a`。然而，在它作为值被传递给 `onclick` 时，它的 `this` 被篡改了，变成了 `some-element`。`some-element` 上显然没有 `a` 这个东西，所以返回了 `undefined`。

## 箭头函数

上面的这些问题，都可以用箭头函数来完美地解决。

箭头函数，同样是一种匿名函数。它也类似于一般的闭包，可以携带一个作用域。但是它的特殊之处是，**携带的作用域一定不会被改变**。

考虑一下下面的代码。

```javascript
class Foo {
  will_be_tampered() {
    console.log(this);
  }

  wont_be_tampered = () => {
    console.log(this);
  };

  constructor() {}
}

let foo = new Foo();
let a = { tampered: true };

foo.will_be_tampered.call(a); // {tampered: true}
foo.wont_be_tampered.call(a); // Foo {wont_be_tampered: ƒ}
```

`函数.call` 方法的意思是，强行将其放在另一个上下文中执行。上面的 `foo.will_be_tampered()` 是一个正常的函数，虽然作为闭包携带了一个 `Foo` 对象，然而我们使用 `call` 方法将其强行放在了 `a` 这个对象上，所以它的 `this` 被篡改了，作为闭包所携带的那个作用域也相应地被篡改了。

但是为什么 `foo.wont_be_tampered()` 不会因为 `call` 方法而改变 `this` 呢？

因为它是一个**箭头函数**。箭头函数所携带的作用域**永远**都会是它被声明时所在的上下文。就算我们使用 `call` 方法显式地指定了它的 `this`，这个 `this` 也**不会**被改变。

所以上面的一切问题都得到了解决——只要将其声明为箭头函数。

这里也得出了我们的一个结论：在 JavaScript 里，一般的函数是一个“部分的闭包”，箭头函数则是一个不会被篡改的固若金汤的“完全的闭包”。

## 深入探究

下面的讨论与“闭包”无关，但是是对 `this` 的问题的一个比较深入的探讨，并且可能涉及一些 JavaScript 的底层知识。

### 神出鬼没的 this

JS 还有一个相对于其他语言来说很奇妙的特性：所有代码都是运行在一个对象里的。（这里的“一个”是 any，不是 very）

这又是什么意思呢？

JS 存在一个全局变量（在浏览器下叫做 `window`，在 Node 里叫做 `global`）。你在代码里不加前缀地访问的任何东西（比如说 `Math`、`console` 什么的），除了 `window` 和 `global` 本身，都是全局对象的一个属性。

```javascript
var a = "foo";
console.log(a === window.a); // true

a = undefined; // 其实这个 undefined 也是 window 上的一个只读属性 ^^
```

在上面的代码中，我们声明的变量 `a` 完全就是 `window` 的属性。

类似地，在 JavaScript 中，**任何代码都会运行在一个（any）对象的里面**，所以**任何地方都存在一个 `this`**。

```javascript
function foo() {
  console.log(this === window); // true
}

class Foo {
  foo() {
    console.log(this); // 这个 this 会是 Foo 的一个实例
  }
}

let a = { something: "something" };
a.somefunc = function () {
  console.log(this === a); // true
};

// ...
```

这样，如果是在全局声明的函数，那么它的 this 就是全局对象；如果是在对象上声明的函数，那么它的 this 就是这个对象。无论如何，总会有一个 this 指向某个东西。

#### this 可以被更改

这就出现了 `this` 这个东西的玄妙问题：它是可以被更改的。

比如说，重新考虑一个类似的代码：

```javascript
class A {
  func = function () {
    console.log(this);
  };
  constructor() {}
}

let a = new A();
let b = { not: "a" };

a.func.call(b); // { not: "a" }
```

上面的代码中，我们使用了 `call` 方法，将 `a.func` 的 `this` 改为了 `b`。

不过我们已经知道了，上面的代码用 ES6 的箭头函数语法，可以很轻易地改正：

```diff
class A {
-  func = function () {
+  func = () => {
    console.log(this);
  };
  constructor() {}
}

let a = new A();
let b = { not: "a" };

a.func.call(b); // A { func: ƒ }
```

那如果在箭头函数没有诞生的年代，大家又是如何解决这个问题的呢？

#### this 的绑定

类似于 `call` 方法，JavaScript 的函数有另一个和 `this` 相关的方法——`bind`。

`bind` 方法可以**固定一个函数的 `this`**，避免受其他影响。同样还是上面的示例：

```javascript
class A {
  func = function () {
    console.log(this);
  };
  constructor() {}
}

let a = new A();
let b = { not: "a" };

a.func.bind(a).call(b); // A {func: ƒ}
```

怎么样，是不是和用箭头函数来声明的效果一样？

### 另一个问题

如果你比较细心的话，可能会发现一个问题。

在上面的一个代码示例（如下）中，`foo` 对象的打印结果似乎不包含 `will_be_tampered` 这个函数。这是为什么呢？

```javascript
class Foo {
  will_be_tampered() {
    console.log(this);
  }

  wont_be_tampered = () => {
    console.log(this);
  };

  constructor() {}
}

let foo = new Foo();
let a = { tampered: true };

foo.will_be_tampered.call(a); // {tampered: true}
foo.wont_be_tampered.call(a); // Foo {wont_be_tampered: ƒ}
```

下面我们来探讨一下这个问题。

#### 基于原型的面向对象机制

JavaScript 是一种面向对象语言。和大部分其他 OOP 语言不同的是，它**基于原型**。

要深入阐述“原型是什么”、“为什么需要原型”、“为什么其他 OOP 语言没有原型”等不是本文的主题，这里就不多赘述了。我们只需要知道以下几点。

- 在 JavaScript 中，所有东西都是对象（Object）。
- 总有一些对象有共同的东西，这些共同的东西不可能每个对象都复制一份。
- 因此，JavaScript 使用原型来共享这些共同的东西。

关于为什么需要原型，以上这样浅显的说明对于本文已经足够。下面来说明一些关于原型的语言机制。

1. 对象。
   对象可以简单地理解成一个键值对集合。`object.key` 可以访问到 `object` 上的 `key` 属性。
2. 对象上的原型。
   对象有一个原型。原型的作用是，如果在查找和访问属性的时候，发现对象并没有这个属性，就会去它的原型上找。
3. 原型链。
   原型也是一个对象，所以（大多数时候）也有一个原型。如果在查找属性的时候，原型上也没有这个属性，那么就会找到“原型的原型”上。如此往复，就形成了一个链状结构，这就是原型链。

（事实上这就是 JS 中对象继承的实现方式）

#### `class` 语法糖

既然 JavaScript 是基于原型的 OOP，它应该是不存在 _类_ 这个东西的。

`class` 实际上是一个 ES6 新增的语法糖，作用是简化 JS 中对象的声明。

```javascript
class Foo {
  a;
  b() {
    console.log(this.a);
  }
  constructor(a) {
    this.a = a;
  }
}

// 等价于以下传统形式

function Foo(a) {
  this.a = a;
}
Foo.prototype.b = function () {
  console.log(this.a);
};
```

用这两种形式声明的 Foo 对象的“使用方法”都是 `new Foo(a)`，只是 `class` 把这个对象的属性都列了出来，更加直观优雅。

所以看起来上面的问题就迎刃而解了：`class` 这个语法糖的作用形式就是*把用等号来赋值的东西放到 this 上，把方法放到 prototype 上*。

吗？

#### 箭头函数不在 prototype 上的必要性

其实，虽然以上说法确实有一定道理，但箭头函数之所以不在 prototype 上，而是在对象本身，是因为它**必须**在那里。

还记得箭头函数的特殊性吗？它的 `this` 不会被改变。这其实等价于一个“不箭头的”函数加上一个 `bind` 方法。

然而，`bind` 方法的作用方式有必要特殊地提到：**复制一份函数，并把 `this` 绑定到指定的对象上。**

所以，每一个被 bind 的函数都已经独一无二了。

```javascript
function func() {
  // do something...
}
let a = {};
let b = {};
console.log(func.bind(a) === func.bind(b)); // false
```

（解释一下：对于非基本类型对象，`===`的作用是比较两个对象的内存地址；这个比较的结果是 false，说明函数被 `bind` 之后已经被复制成新的一份了）

那么，既然箭头函数也等于一个被 bind 的函数，它也是独一无二的一个。

还记得我们对原型必要性的描述吗？原型是一个**存储一些对象间共同点**的地方。

对于不同的实例，箭头函数所绑定的 this 是不同的。基于 `bind` 的原理，这些箭头函数本身也是不同的。既然不是共同点，那么也就无法放到 prototype 上了。

## 后记

感谢来到 Enita 的猫猫课堂听讲 ^^（？？？？）
