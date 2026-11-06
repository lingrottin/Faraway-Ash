---
title: Fedora Silverblue 使用小记
date: "2026-05-12"
path: "2026/0512/c031b0d235aa/"
description: 从原子化更新、只读根目录到 rpm-ostree、Flatpak 与 Toolbx，记录 Fedora Silverblue 的日常使用体验，以及软件分层安装与系统定制的实践建议。
tags: []
categories: []
---

## 前言

自我[上次那篇关于 Fedora 的文章](/2025/0524/a9a82b4fc5f0/)，已经过了大约一年的时间。这期间我完成了高考，进入了大学，拥有了更多时间做自己喜欢的事情。

这就包括了在电脑上安装 Fedora Silverblue。嘻嘻嘻嘻。

### 介绍

Fedora Silverblue 是一个原子化的操作系统。这里的“原子化”取的是“原子作为物质的最小单元不可再分”的语义，指的是将数据的变化拆解成一个个不连续的“状态”，不同状态间没有过渡态，切换状态要么完全成功，要么完全失败。可见将原子化的概念放在操作系统上——特别是对于桌面 Linux 这种迅猛发展，时常有软件包更新的操作系统上——的好处是相当明显的。

考虑一下，如果你在 Windows 更新时突然关闭了电脑，这一定会带来灾难性的后果。不过，在原子化操作系统上就不存在这样的顾虑：系统更新要么成功，要么就彻底失败（失败的后果是系统回退到更新前的状态），不存在“更新到一半失败了”的情况。

常见的原子 OS 有 [NixOS](https://nixos.org/)（虽然系统不可变，但确实符合原子的定义）、[Vanilla OS](https://vanillaos.org/)、Fedora Atomic、[Universal Blue 系列](https://universal-blue.org/)（含 [Bazzite](https://bazzite.gg/)、[Aurora](https://getaurora.dev/en/)、[Bluefin](https://projectbluefin.io/)、[Guix System](https://guix.gnu.org/)（NixOS 的 GNU 洁癖版）等。

相信聪明的读者应该可以发现，“原子化”的思想有点类似版本管理软件——虽然版本管理中不强调“不存在中间态”，但每个版本所代表的状态是固定的，这正好和原子化的“状态固定”思想所契合。因此，OSTree 就参考 Git 版本管理软件的思想，构建了一个“操作系统的 Git”。

Fedora 的原子系列系统是基于 [OSTree](https://github.com/ostreedev/ostree) 和 rpm-ostree 构建的。

rpm-ostree 则是基于 libostree 和 RPM 构建的一个用 OSTree 管理红帽系 OS 的工具，用来管理红帽系原子操作系统的文件系统。

### 好处

- **没有中间状态**。这一点在上面已经大概陈述过了：系统更新要么成功，要么什么都没有改变。
- **状态可回滚**。OSTree 有能力保留当前和上一次两个系统状态。要是系统真的崩溃了或是你不喜欢更新的内容，则随时可以回滚到上一个系统状态。这里还支持固定某一个特定的系统状态，永久保留。
- **系统目录只读**[^1]。这意味着你的系统不会被随便哪来的病毒或你自己手贱（`sudo rm -rf /*`）弄崩坏。

[^1]: 严格来说，“原子化”并不强调系统只读。也有“原子化但系统可写”的发行版，如 NixOS。但至少对于基于 OSTree 的原子发行版而言，[系统必须是只读的](https://github.com/ostreedev/ostree#:~:text=It%27s%20unlike%20git%20in%20that%20it%20%22checks%20out%22%20the%20files%20via%20hardlinks%2C%20and%20they%20thus%20need%20to%20be%20immutable%20to%20prevent%20corruption)。

### 坏处

- **和传统不同**。很多运维知识在原子操作系统上都会失效。
- **系统目录只读**。这在为你的用机安全保驾护航的同时也有可能是个负担。

但我认为和它带来的好处比起来是利大于弊的。

## 术语

下面是这篇文章会提到的名词列表。为避免混乱，先在此处澄清。

Fedora Atomic
: 指 Fedora Atomic Desktops（见下）、Fedora CoreOS 和 Fedora IoT。这些 Fedora 变体都是基于 `rpm-ostree` 构建的原子化操作系统。注意，虽然这个词在 Fedora 官方文档中有提及，但这不是官方术语。

Fedora Atomic Desktops
: 指 Fedora 原子化变体中**面向桌面用户**的几个，即 Fedora Silverblue (GNOME), Fedora Kinoite (KDE Plasma), Fedora Sway Atomic, Fedora Budgie Atomic 和 Fedora COSMIC Atomic。这些变体间除了桌面环境和预装的桌面软件（如 GDM for Silverblue 和 SDDM for Kinoite）之外并没有什么区别。

OSTree, libostree
: 一个用来管理原子化文件系统的库。

rpm-ostree
: 用 RPM 管理软件包、OSTree 管理文件系统的程序。用官方语言来说：“镜像/软件包的混合管理系统”。

Toolbx, Toolbox[^2]
: 一个基于容器化技术（主要是 Buildah 和 Podman）打造的“开发容器”方案，[主要目的是在原子化系统里提供可变根目录](https://github.com/containers/toolbox/commit/c6b5a4836fe63601#:~:text=this%20project%20was%20specifically%0Aincubated%20to%20make%20it%20easier%20to%20hack%20on%20Fedora%20Silverblue)。其主打特点是，在容器内也能无缝和主机交互，容器内的电脑设备、用户和权限以及家目录和主机都是共通的。

Flatpak
: 一个基于容器化技术和 OSTree 构建的桌面应用包管理器，具有完善的沙箱隔离机制和“一次打包、到处运行”的特点。和臭名昭著的 Snap 类似，但是比 Snap 更节省空间、性能更好、更自由。

部署（Deployment）
: 在这里的语境下，指文件系统的一个“状态”，即一个可启动的“系统快照”。这非常类似于 Git 的提交（Commit），只是 OSTree 不把它叫作“提交”这个名字而已。

[^2]: Toolbox 是它的旧称。尽管在很多地方（如 `toolbox` 二进制文件）仍在使用 Toolbox 这一名字，该项目本身已经改名成了 Toolbx。见[官方陈述](https://github.com/containers/toolbox#:~:text=Toolbx%20was%20previously%20known%20as%20Toolbox)。

## 安装

我仍然没有买 U 盘。具体安装方法见[上一篇文章](/2025/0524/a9a82b4fc5f0/#an-zhuang)。

## 使用

由于原子化的特点，当你在 Fedora Atomic Desktops[^3] 上工作时，只读的根目录可能会让你很难随意修改，`rpm-ostree` 在安装新的软件包——或称为进行一次部署（deployment）——后，要重启之后才能生效[^4]，这些有可能让你感觉到非常不便。

[^3]: 三个单词太难打了。由于我说的这些基本上都是 Fedora 原子桌面的共性，从此处开始下文统称 Silverblue。
[^4]: 虽然 rpm-ostree 支持热加载（`-A --apply-live`）新的部署，但有很多限制且可能出问题，因此一般来说不推荐使用这个功能；就算临时需要，使用了这个功能，也应该在一定时间后重启。

但是我要说——不便就对了！

在修改系统目录比较麻烦的前提下，用户会尽可能少地修改系统根目录，并尽量使用容器、Flatpak，或安装在家目录的方式来安装软件。诚然这似乎并没有直接使用系统软件包管理器安装软件一样方便，但是在这一使用习惯之下，用户乱搞导致系统出现问题的概率、使用来路不明的软件造成的风险都会大大降低。并且，容器和 Flatpak 由于特殊的运行机制，本身就是一个即用即弃的沙箱，这让管理系统实际上变得更加 effortless。

并且，虽然大部分系统目录都不可写，但是在 Fedora 开发者的努力下，Silverblue 中大部分的可能需要频繁更改的配置都被移动到了 `/var`(variable, 可变) 下，并且很大一部分传统 Unix 目录都变成了对 `/var/` 下目录的同名符号链接。

```
$ ls -l /
总计 52
lrwxrwxrwx.   1 root root    7 1970年 1月 1日 bin -> usr/bin
drwxr-xr-x.   7 root root 4096  9月14日 11:31 boot
drwxr-xr-x.  19 root root 4820  9月14日 10:42 dev
drwxr-xr-x.   1 root root 4362  9月 2日 11:30 etc
lrwxrwxrwx.   1 root root    8 1970年 1月 1日 home -> var/home
lrwxrwxrwx.   1 root root    7 1970年 1月 1日 lib -> usr/lib
lrwxrwxrwx.   1 root root    9 1970年 1月 1日 lib64 -> usr/lib64
lrwxrwxrwx.   1 root root    9 1970年 1月 1日 media -> run/media
lrwxrwxrwx.   1 root root    7 1970年 1月 1日 mnt -> var/mnt
lrwxrwxrwx.   1 root root    7 1970年 1月 1日 opt -> var/opt
lrwxrwxrwx.   1 root root   14 1970年 1月 1日 ostree -> sysroot/ostree
dr-xr-xr-x. 515 root root    0  9月14日 10:42 proc
lrwxrwxrwx.   1 root root   12 1970年 1月 1日 root -> var/roothome
drwxr-xr-x.  55 root root 1360  9月14日 10:42 run
lrwxrwxrwx.   1 root root    8 1970年 1月 1日 sbin -> usr/sbin
lrwxrwxrwx.   1 root root    7 1970年 1月 1日 srv -> var/srv
dr-xr-xr-x.  13 root root    0  9月14日 17:32 sys
drwxr-xr-x.   1 root root   74 2026年 1月 7日 sysroot
drwxrwxrwt.  22 root root  520  9月14日 17:28 tmp
drwxr-xr-x.  11 root root  224 1970年 1月 1日 usr
drwxr-xr-x.   1 root root  236  9月14日 10:40 var
$ ls -l /usr/local
lrwxrwxrwx. 1 root root 15 1970年 1月 1日 /usr/local -> ../var/usrlocal
```

可见，`/home`、`/etc`、`/root`、`/opt`、`/srv`、`/usr/local` 等传统上都有可能被用户自主频繁修改的目录全部成为了指向 `/var` 下的目录的符号链接。因此，使用和配置 Silverblue 并没有想象中那么麻烦。

### 安装软件包

一般来说，有四种安装软件包的方法。原则上应该将这四种方法看作不同的层级，并按需把软件分配到不同层级上安装使用。

1. 使用 `rpm-ostree` 直接叠加到当前系统上。这和传统 Fedora 上直接使用 `dnf` 安装软件是相当的，但是会直接修改 OSTree 版本树，和系统更新一样需要重启才能生效。而且由于 rpm-ostree 的依赖解析机制不是特别聪明，layer 的软件包有可能导致依赖解析出问题从而让你的系统无法升级。详见 [Bazzite 文档](https://docs.bazzite.gg/Installing_and_Managing_Software/rpm-ostree/)。
2. 使用 Flatpak 安装。如果你要装的是桌面软件，这一般是最推荐的方式。Flatpak 本身是独立于整个系统的，每个 App 都是相互独立、互不影响的，并且有一套强大的沙箱机制。
3. 使用 Toolbx/Distrobox 在容器内安装。如果你要装的是*发行版提供的*开发环境或者只提供 rpm/deb 包的桌面软件（点名部分国产软件），那么这是很不错的方法。
4. 在自己的家目录安装。这包含 AppImage、编程语言提供的软件包管理器（如 [rustup](https://rustup.rs)、[Cargo](https://rust-lang.org)、[pnpm](https://pnpm.io)、[uv](https://docs.astral.sh/uv/)、[SDKMAN!](https://sdkman.io/) 等）、专为无 root 权限设计的软件包管理器（如 [Homebrew](https://brew.sh/)）、官方一键安装脚本（大部分情况下是只会动你的家目录的）等。大部分情况下这其实是最推荐的方式，因为这种方法一方面和直接安装到系统中无异，都能在任何地方调用，没有容器隔离；另一方面由于全都位于你的家目录里，可以自由进出 Toolbx/Distrobox 容器，用起来也很方便。

#### 建议：如何规划层级？

这是我对软件包安装位置的建议。当然如何使用你的电脑是你自己的问题，这仅是我个人的意见，以供参考。

1. 对于需要以 root 用户运行的守护进程（如魔法上网所用的透明代理服务，对我来说是 v2rayA）、驱动或内核模块（如 FUSE）、需要深入地**和你宿主系统的集成**的软件（如 `ibus-rime`；iBus 作为 GNOME 核心组件，给它安装扩展的方法和发行版打包的偏好高度相关），或者你希望 system-wide-available 的程序（如 Bash 之外的 Shell，或命令行编辑器），放心大胆地用 `rpm-ostree` 叠加上去。
2. 对于其他命令行工具，优先考虑 Toolbx 容器。比如说 C++ 编译工具链，就可以新开一个 Toolbx 容器装进去。如果你希望它随处可用（不限于 Toolbx 容器），那么可以安装在自己的家目录。
3. 桌面应用优先考虑 Flatpak。常用软件大多有官方或第三方的 Flatpak 打包，甚至包括一些国产软件，比如 QQ、微信、腾讯会议、[网易云音乐](https://github.com/YUCLing/open-orpheus)、百度网盘等。
4. 如果没有 Flatpak，那么找找有没有官方或第三方的 AppImage。例如，ChatGPT Desktop 有很多第三方的 AppImage，比如[这个](https://github.com/mbotezatu/chatgpt-appimage)。
5. 如果连第三方的 AppImage 都没有，那么也可以开一个 Toolbx 容器把 .rpm 或 .deb 文件装进去。虽然根目录被隔离，但是容器内外的 X11、Wayland、D-Bus 等服务都是直通的。不用担心无法使用。
6. 如果你需要**临时**使用一些系统工具，而且需要直接访问到系统资源，那么我的建议是：先用 `sudo rpm-ostree usroverlay` 在 `/usr` 上创建一个临时的可写层，然后直接用 `dnf` 安装。你在此时对 `/usr` 的改动会在重启时丢失，所以不用担心它们会污染你的系统。

### 自定义启动菜单

最新版的 Silverblue 里，`rpm-ostree` 管理启动项的方法是管理位于 `/boot/loader/entries/*.conf` 的配置文件。GRUB 会在开机时加载并往菜单里动态插入。

所以可以通过在 `/boot/grub2/custom.cfg` 写入自己的自定义内容来管理启动菜单。

> [!IMPORTANT]
> 原子 Fedora 上传统的修改 GRUB 配置的方式（比如 `/etc/grub.d/40_custom`）很有可能无法工作，因为 `grub2-mkconfig` 命令无法运行。而且鉴于 OSTree 对系统的修改比较深入，手动生成全量配置文件很有可能会导致一些问题。直接修改 `custom.cfg` 是最推荐的方式。

### Guix/Nix

如果你有使用这俩的需求，可以见《[在原子 Fedora 上安装 Guix](https://enita.cn/2026/1019/840e87cb0bde/)》。

### 游戏

如果你用的是 Silverblue 或 Kinoite，可以把 base image 换成 [Bazzite](https://bazzite.gg/) 以获得开箱即用的游戏体验。

~~*我们不想做的事情让别人头疼去吧*~~

但是注意几点：

- Bazzite 删掉了 Toolbx、Htop 等常用软件，因为内置了“更好用”的替代品（Distrobox 和 Btop++）。我个人非常反感这一决策，如果你和我一样想要用他们删掉的软件包，可以运行 `rpm-ostree override replace --from repo=fedora --experimental <package>` 来安装回来。见 [ublue-os/bazzite#6140](https://github.com/ublue-os/bazzite/issues/6140)。
- Bazzite 里的 dnf 变成了一个 wrapper 脚本，但有点笨，无法检测根目录是否被解锁（as in 《在原子 Fedora 上安装 Guix》）。可以通过运行 `dnf5` 来绕过它们的蠢脚本。
- **Bazzite 是一个滚动发行版**。这意味着你的系统有可能随着自动更新从 Fedora44 更新到 Fedora45。

## 结语

wuwuwu。
