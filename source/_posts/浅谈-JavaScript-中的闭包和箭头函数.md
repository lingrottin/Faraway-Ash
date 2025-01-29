---
title: 浅谈 JavaScript 中的闭包和箭头函数
date: 2025-01-29 15:59:48
tags:
---

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

闭包拥有携带父作用域的能力，这毋庸置疑。然而，JavaScript 中的“闭包”，和不携带作用域的函数，界限十分奇怪和模糊。

### 1. 被篡改的 this

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

理论上，`foo_func` 该是个闭包。它应该携带了父作用域，尤其是这个 `a`。然而，在它作为值被传递给 `onclick` 时，它的 `this` 被篡改了，变成了 `document`。`document` 上显然没有 `a` 这个东西，所以返回了 `undefined`。

### 2. ？

{# 问题没有复现成功，暂时不写。这个问题真的存在吗？ #}

WIP

## 箭头函数

上面的这些问题，都可以用箭头函数来完美地解决。

箭头函数，同样是一种匿名函数。它也类似于一般的闭包，可以携带一个作用域。但是它的特殊之处是，**携带的作用域一定不会被改变**。

考虑一下下面的代码。

```javascript
class Foo {
  function will_be_tampered(){
    console.log(this);
  }

  const wont_be_tampered=()=>{
    console.log(this);
  }

  constructor(){}
}

let foo=new Foo();
let a={tampered:true};

foo.will_be_tampered.call(a); // {tampered: true}
foo.wont_be_tampered.call(a); // Foo {wont_be_tampered: ƒ}
```

`函数.call` 方法的意思是，强行将其放在另一个上下文中执行。上面的 `foo.will_be_tampered()` 是一个正常的函数，虽然作为闭包携带了一个 `Foo` 对象，然而我们使用 `call` 方法将其强行放在了 `a` 这个对象上，所以它的 `this` 被篡改了，作为闭包所携带的那个作用域也相应地被篡改了。

但是为什么 `foo.wont_be_tampered()` 不会因为 `call` 方法而改变 `this` 呢？

因为它是一个**箭头函数**。箭头函数所携带的作用域**永远**都会是它被声明时所在的上下文。就算我们使用 `call` 方法显式地指定了它的 `this`，这个 `this` 也**不会**被改变。

所以上面的一切问题都得到了解决——只要将其声明为箭头函数。

这里也得出了我们的一个结论：在 JavaScript 里，一般的函数是一个“部分的闭包”，箭头函数则是一个不会被篡改的固若金汤的“完全的闭包”。

> 在上面的 `Foo` 类里，箭头函数和普通函数还有一个区别是，箭头函数是 Foo 上的一个变量，而普通的函数是位于 Foo 的 prototype 上的。这一点和 JavaScript 基于原型的面向对象机制有关，这里不做赘述。
