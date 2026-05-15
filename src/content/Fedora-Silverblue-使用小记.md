+++
title = "Fedora Silverblue 使用小记"
 date = 2026-05-12
description = "记录在 Fedora Silverblue 上通过 rpm-ostree 替换 ffmpeg-free 为完整 ffmpeg 的过程，轻量级的系统配置备忘。"
+++

## 前言

自我[上次那篇关于 Fedora 的文章](/2025/0524/a9a82b4fc5f0/)，已经过了大约一年的时间。这期间我完成了高考，进入了大学，拥有了更多时间做自己喜欢的事情。

这就包括了在电脑上安装 Fedora Silverblue。嘻嘻嘻嘻。

### 介绍

Fedora Silverblue 是一个原子化的操作系统。这里的“原子化”取的是量子世界中能量“不连续”的语义，指的是将系统的变化拆解成一个个可追踪、不连续的“状态”，不同状态间没有过渡态，切换状态要么完全成功，要么完全失败。可见将原子化的概念放在操作系统上——特别是对于桌面 Linux 这种迅猛发展，时常有软件包更新的操作系统上——的好处是相当明显的。

考虑一下，如果你在 Windows 更新时突然关闭了电脑，这一定会带来灾难性的后果。不过，在原子化操作系统上就不存在这样的顾虑：系统更新要么成功，要么就彻底失败（失败的后果是系统回退到更新前的状态），不存在“更新到一半失败了”的情况。

Fedora 的原子系列系统是基于 [OSTree](https://github.com/ostreedev/ostree) 和 rpm-ostree 构建的。

相信聪明的读者应该可以发现，“原子化”的思想有点类似版本管理软件——虽然版本管理中不强调“不存在中间态”，但每个版本所代表的状态是固定的，这正好和原子化的“状态固定”思想所契合。因此，OSTree 就参考 Git 版本管理软件的思想，构建了一个“操作系统的 Git”。

rpm-ostree 则是基于 libostree 和 RPM 构建的一个用 OSTree 管理红帽系 OS 的工具，用来管理红帽系原子操作系统的文件系统。

### 好处

- **没有中间状态**。这一点在上面已经大概陈述过了：系统更新要么成功，要么什么都没有改变。
- **状态可回滚**。OSTree 有能力保留当前和上一次两个系统状态。要是系统真的崩溃了或是你不喜欢更新的内容，则随时可以回滚到上一个系统状态。这里还支持固定某一个特定的系统状态，永久保留。
- **系统目录只读**[^1]。这意味着你的系统不会被随便哪来的病毒或你自己手贱（`sudo rm -rf /*`）弄崩坏。

[^1]: 严格来说，“原子化”并不强调系统只读。也有“原子化但系统可写”的发行版，如 NixOS（NixOS 并不标榜自己“原子化”，但它是符合定义的）。但至少对于基于 OSTree 的原子发行版而言，[系统必须是只读的](https://github.com/ostreedev/ostree#:~:text=It%27s%20unlike%20git%20in%20that%20it%20%22checks%20out%22%20the%20files%20via%20hardlinks%2C%20and%20they%20thus%20need%20to%20be%20immutable%20to%20prevent%20corruption)。

### 坏处

- **和传统不同**。很多运维知识在原子操作系统上都会失效。
- **系统目录只读**。这在为你的用机安全保驾护航的同时也有可能是个负担。

但我认为和它带来的好处比起来是利大于弊的。

## 术语

下面是这篇文章会提到的名词列表。为避免混乱，先在此处澄清。

Fedora Atomic
: 指 Fedora Atomic Desktops（见下）、Fedora CoreOS 和 Fedora IoT。这这些 Fedora 变体都是基于 `rpm-ostree` 构建的原子化操作系统。注意，虽然这个词在 Fedora 官方文档中有提及，但这不是官方术语。

Fedora Atomic Desktops
: 指 Fedora 原子化变体中**面向桌面用户**的几个，即 Fedora Silverblue (GNOME), Fedora Kinoite (KDE Plasma), Fedora Sway Atomic, Fedora Budgie Atomic 和 Fedora COSMIC Atomic。这些变体间除了桌面环境和预装的桌面软件（如 GDM for Silverblue 和 SDDM for Kinoite）之外并没有什么区别。

OSTree, libostree
: 一个用来管理原子化文件系统的库。

rpm-ostree
: 用 RPM 管理软件包、OSTree 管理文件系统的程序。用官方语言来说：“镜像/软件包的混合管理系统”。

Toolbx, Toolbox[^2]
: 一个基于容器化技术（主要是 Buildah 和 Podman）打造的“开发容器”方案，[主要目的是在原子化系统里提供可变根目录](https://github.com/containers/toolbox/commit/c6b5a4836fe63601#:~:text=this%20project%20was%20specifically%0Aincubated%20to%20make%20it%20easier%20to%20hack%20on%20Fedora%20Silverblue)。其主打特点是，在容器内也能无缝和主机交互，容器内的电脑设备、用户和权限以及家目录和主机都是共通的。

[^2]: Toolbox 是它的旧称。尽管在很多地方（如 `toolbox` 二进制文件）仍在使用 Toolbox 这一名字，该项目本身已经改名成了 Toolbx。见[官方陈述](https://github.com/containers/toolbox#:~:text=Toolbx%20was%20previously%20known%20as%20Toolbox%2C%20and%20even%20before%20that%20as%20Fedora%20Toolbox.%20Work%20is%20in%20progress%20to%20update%20the%20name%20to%20Toolbx%20in%20various%20places.%20Thus%20this%20Git%20repository%20and%20the%20binary%20are%20still%20toolbox%20and%20the%20package%20may%20still%20be%20toolbox%20on%20various%20systems)。

Flatpak
: 一个基于容器化技术和 OSTree 构建的桌面应用包管理器，具有完善的沙箱隔离机制和“一次打包、到处运行”的特点。和臭名昭著的 Snap 类似，但是比 Snap 更节省空间、性能更好、更自由。

部署（Deployment）
: 在这里的语境下，指文件系统的一个“状态”，即一个可启动的“系统快照”。这非常类似于 Git 的提交（Commit），只是 OSTree 不把它叫作“提交”这个名字而已。

## 安装

我仍然没有买 U 盘。具体安装方法见[上一篇文章](/2025/0524/a9a82b4fc5f0/#an-zhuang)。

## 使用

由于原子化的特点，当你在 Fedora Atomic Desktops[^3] 上工作时，只读的根目录可能会让你很难随意修改，`rpm-ostree` 在安装新的软件包——或称为进行一次部署（deployment）——后，要重启之后才能生效[^4]，这些有可能让你感觉到非常不便。

[^3]: 三个单词太难打了。由于我说的这些基本上都是 Fedora 原子桌面的共性，从此处开始下文统称 Silverblue。
[^4]: 虽然 rpm-ostree 支持热加载（`-A --apply-live`）新的部署，但有很多限制且可能出问题，因此一般来说不推荐使用这个功能；就算临时需要，使用了这个功能，也应该在一定时间后重启。

但是我要说——不便就对了！

## 结语

To Be Done.

<!--
after RPMFusion,

ffmpeg can be installed:

https://rpmfusion.org/Howto/Multimedia

```bash
sudo rpm-ostree install dnf -A
dnf download ffmpeg # 从 RPMFusion 下载 ffmpeg RPM
sudo rpm-ostree override replace --remove=ffmpeg-free ./ffmpeg-7.1.2-7.fc43.x86_64.rpm
```
-->
