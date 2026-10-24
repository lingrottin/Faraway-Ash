---
title: 在原子 Fedora 上安装 Guix
date: "2026-10-19"
path: "2026/1019/840e87cb0bde/"
description: "介绍在原子 Fedora 上安装 GNU Guix 的方法：启用临时可写根目录，通过 systemd 将持久化目录绑定挂载到 /gnu，并配置开机自动挂载，兼顾不可变系统与 SELinux 的要求。"
tags: []
categories: []
---

## 前言

[GNU Guix](https://guix.gnu.org) 是和 [Nix](https://nixos.org/) 一脉相承的另一个包管理器。

Guix 项目一开始是把 Nix 的源代码翻译成 [Guile](https://www.gnu.org/software/guile/)[^1]，~~并且引入了 GNU 项目的自由软件洁癖~~，后来两个项目各发展出了不同的道路。

[^1]: Guile 是 [Scheme](https://www.scheme.org/)（一种 [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) 方言）的一个实现。

我是在为一台服务器选择声明式配置系统时开始正式上手 Guix 的，并在那台服务器上安装了 Guix System。

或许读者会问：为什么我不使用生态更庞大、资料更充足且没有自由软件洁癖的 Nix(OS)？我就要回答了：虽然 Nix 用户群体庞大、生态相当发达，但是 Nix lang 的语法真的是相当诡异。我想八辈子都想不出来的 `:` 作为函数定义的语法，居然被另一群人当作习以为常的事情。

相比之下，Guix 本身使用 Scheme 编写，并且配置文件也是 Scheme（而不是一个语法极其神必的 DSL）。虽然 Lisp 的理念在 C 系语言大行其道的当下也比较难理解，但至少在可读性上是远胜 Nix lang 的。

~~还有一个重要的原因是，我是小众逼。（跑~~

## 缘起

总而言之，为了本地测试[自己编写的软件包定义](https://git.feniota.org/feniota/guix-packages)以及加快服务器构建[^2]，我在我日用的原子 Fedora 上安装了 Guix 包管理器，以下是我的步骤。

[^2]: IDC 太神秘了，保守估计每个 CPU 核心被 50 台以上 VM 占据以至于编译 Linux 内核要数个小时。

## 情况

原子 Fedora 的根目录是不可修改的。然而 Guix 依赖于 `/gnu/store` 目录[^3]，这给我们安装 Guix 造成了很大的麻烦。

我的想法是把 `/gnu` 目录给做成实际指向 `/var/guix-store` 的符号链接，这和原子 Fedora 处理 `/etc`(->`/var/etc`), `/usr/local`(->`/var/usrlocal`) 等其他可变且可持久化目录的逻辑类似。

一开始，我的方案是利用 `rpm-ostree` 的 layer 机制，将 `/var/guix-store` 和 `/gnu` （作为指向 `/var/guix-store` 的符号链接）装进一个 RPM 包里，再用 `rpm-ostree` 安装。不过这就出了一个问题：为了正确管理原子化系统，`rpm-ostree` 对安装的文件和它们要去的目录有极其严格的限制。由于 `/gnu` 位于一个不正确的目录导致它安装失败（）。

[^3]: 和 Nix 的 `/nix/store` 类似。

总之以下是我的新办法。

## 操作方法

### 解锁根目录

首先要解锁 `/`，让它默认运行时可修改。这个可以通过[修改 bootc 配置](https://bootc.dev/bootc/bootc-filesystem.7.html#enabling-transient-root)实现：

```bash
cat << EOF | sudo tee -a /etc/ostree/prepare-root.conf
[composefs]
enabled = yes
[root]
transient = true
EOF
rpm-ostree initramfs-etc --track=/etc/ostree/prepare-root.conf
```

执行之后可以重启，这样根目录就默认可读写了。当然，可读写是临时的，此时对根目录的修改不会固化到 OSTree 提交中，因此重启之后就会丢失。

### `/gnu`

然后，我们需要让 `/gnu` 存在，且在 `guix-daemon` 之前被创建。[^4]我是通过创建 Systemd 的 oneshot 服务和挂载点实现的。所以：

[^4]: `guix-basedir.service` 有 `DefaultDependencies=no`，这是为了避免 Systemd 为其加上隐式的 `sysinit.target` 依赖。如果不这样做，那么就会产生 `sysinit.target` -> ... -> `local-fs.target` -> `gnu.mount` -> `guix-basedir.service` -> `sysinit.target` 的依赖循环，造成意料之外的问题。

```ini
# /etc/systemd/system/gnu.mount
[Unit]
Description=Mount point for /gnu
Requires=guix-basedir.service
After=guix-basedir.service
Before=guix-daemon.service

[Mount]
What=/var/guix-store
Where=/gnu
Type=none
Options=bind

[Install]
RequiredBy=guix-daemon.service
```

```ini
# /etc/systemd/system/guix-basedir.service
[Unit]
Description=Create base /gnu dir for GNU Guix
DefaultDependencies=no
Before=local-fs.target

[Service]
Type=oneshot
User=root
Group=root
ExecStart=/usr/bin/mkdir -p /gnu /var/guix-store
RemainAfterExit=yes
```

在相应位置添加上面的两个单元文件之后，执行

```bash
sudo systemctl daemon-reload
```

来让 Systemd 知道这两个单元文件。然后可以通过

```bash
sudo systemctl start gnu.mount
```

创建并绑定 `/gnu`。不出意外的话，`/gnu` 接下来会出现在你的系统里。

#### 技术细节

- `guix-basedir.service`:

  它会在开机时自动执行 `mkdir -p /gnu /var/guix-store`，以确保这两个目录存在。

- `gnu.mount`:

  它会把 `/var/guix-store` **绑定**到 `/gnu`。
  
  至于为什么是 bind mount 而不是符号链接，这是因为 SELinux 会展开目录符号链接，通过内部目录的实际安全上下文去判断是否拒绝。如果把 `/gnu`
  做成符号链接，就很难在启用 SELinux 的情况下使用 Guix（因为 Guix 会安装一个复杂的 SELinux 安全策略，其中 `/gnu` 目录是写死的，很难修改）。不过
  bind mount 就不一样，它和符号链接都可以达到把 `/gnu` 无缝映射到 `/var/guix-store` 的需求，但它在别的应用程序看来就是一个正常的文件系统挂载点，
  因此不会让 SELinux 产生上述问题。

### 安装 Guix

接下来，在确保 `/gnu` 存在且是指向 `/var/guix-store` 的绑定挂载点之后，就可以通过正常程序安装 Guix 包管理器了：

```bash
wget https://guix.gnu.org/install.sh -O guix-install.sh
# 由于我们预创建了 /gnu，所以安装脚本会以为我们安装过 Guix，默认情况下会拒绝直接安装。
# 这里通过设置 GUIX_ALLOW_OVERWRITE 环境变量来绕过这一要求。
sudo env GUIX_ALLOW_OVERWRITE=1 bash ./guix-install.sh
```

### `/gnu` 的开机自创建

在重启之前，请运行

```bash
sudo systemctl enable gnu.mount
```

由于 `gnu.mount` 里的依赖关系定义比较明确，所以 Systemd 会自动在启动 `guix-daemon.service` 之前创建 `/gnu` 并执行相应的挂载。

到此，Guix 就系统级可用了。享受吧！
