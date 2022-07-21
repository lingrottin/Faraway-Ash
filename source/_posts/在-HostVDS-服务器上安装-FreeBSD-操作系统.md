---
title: 在 HostVDS 服务器上安装 FreeBSD 操作系统
date: 2022-05-28 01:38:21
tags: 
	- FreeBSD
	- GRUB
	- HostVDS
	- Linux
	- VPS
	- 安装
	- 服务器
	- Tiny Core Linux
	- 运维
categories:
	- 星耀
index_img: /img/bsdinst/special.png
excerpt: 通常的 KVM 服务器都可以满足需求，完全不需要导入镜像便可体会 FreeBSD 操作系统的神奇力量。
---
## 前言

作为性价比超高 _（最低配置一个月仅 **0.99 美元**）_、性能超棒且**无限流量**的主机商，HostVDS 很受我的喜爱。（如果你心动了：[我的 HostVDS 邀请链接](https://hostvds.com/?affiliate_uuid=5f299a01-e696-40be-82a1-330a99685194)，捧个场呗？）

但是和大部分主机商一样，HostVDS 的管理者认识不到 FreeBSD 的好处，仅提供了包括 Arch Linux 在内的各种 Linux 镜像。虽说作为前 Arch 用户，这挺抓我的眼球，但为了让服务器更稳定，我还是决定安装 FreeBSD **操作系统**。

## 必要条件

主机商提供了**可以看到 VPS 启动界面的** VNC 连接

## 前期准备

在开始之前，我们需要对服务器的根分区完整地访问，这就需要不在根分区上加载操作系统。也就是加载一个另外的操作系统。

有两种方法可以做到：

*   在启动环节使用 GRUB 加载 copy-to-ram 的急救系统

*   基于 OpenStack 的服务商一般会提供的 Rescue 功能

### 方案 1：在启动环节使 VPS 加载急救系统

有基本 Linux 功能的、能 copy-to-ram 的发行版即可担负此重任。此处，使用 [Tiny Core Linux](http://www.tinycorelinux.net) 来作为示范。

先转到 [Tiny Core Linux 的官网](http://www.tinycorelinux.net)，下载 Core 版本即可。（不在国内的服务器，建议不要使用带 X 的版本，否则延迟会非常折磨人）

将文件上传到服务器的用户目录下，用以下命令将镜像挂载到 `/mnt`：
```bash
    mount -o loop ~/Core-current.iso /mnt
```

用 `tree` 查看一下目录结构：

![](/img/bsdinst/bsdinst-0.webp)

这么多文件，只有 core.gz、vmlinuz 和 isolinux.cfg 是我们需要的。其中

**`core.gz`** : 是 Tiny Core Linux 的根目录（同时也是 `initrd`）

**`isolinux.cfg`** : 是该镜像附带的 bootloader 的配置文件

**`vmlinuz`** : 是 Linux 内核

打开 `isolinux.cfg`，可以看见如下行：
```syslinux
    label microcore
            kernel /boot/vmlinuz
            initrd /boot/core.gz
            append loglevel=3
```

如此，我们就知道如何启动 Tiny Core Linux 了。然后将 `core.gz` 和 `vmlinuz` 放到/boot 下（最好新建一个目录）

![](/img/bsdinst/bsdinst-1.webp)

此时，打开服务器的 VNC 菜单，并在 ssh 重启 VPS。

**注意：在 VPS 上，为了增加启动速度，一般 GRUB 超时被设置成很短的时间。此时需要手动修改 `grub.cfg`，设置成一个很长的超时（比如 100）。**

进入 GRUB 界面后，先上下移动光标使倒计时解除，然后按 c 进入 GRUB 命令行。

首先先确定 ROOT 是否是服务器硬盘（通常来说，是的）：
```bash
    ls /boot
```
    

如果没有报错，那么请往下看。

使用上面获得的 isolinux 启动流程启动 Tiny Core Linux：
```grub
    ls /boot/tinycore # 确定 Tiny Core 文件位置
    linux /boot/tinycore/vmlinuz # 加载内核
    initrd /boot/tinycore/core.gz # 加载根文件系统
    boot # 启动
```
    

![](/img/bsdinst/bsdinst-2.webp)

过一会，出现一个小机器人，说明启动成功，可以开始下一步。（由于 QEMU 特性，有时候会出现像下图一样一大堆文字，不用惊慌，回车就好）

![](/img/bsdinst/bsdinst-3.webp)

### 方法 2：加载急救系统

没什么好说的。在 HostVDS 管理页面，选中实例，点击 Rescue 即可。

## 写入 mfsBSD

在进入以上系统后，我们就能拥有根分区的完全改写权了。由于过程需要访问网络，请先验证 ip 是否正确：
```bash
    ifconfig || ip address
```
    

然后把 [mfsBSD](https://mfsbsd.vx.sk/) 写入硬盘（380MB）：
```bash
    wget -O- --no-check-certificate https://mfsbsd.vx.sk/files/images/13/amd64/mfsbsd-se-13.1-RELEASE-amd64.img | dd bs=1M of=/dev/vda # 根据实际情况更改/dev/vda
```
    

**注意：你可以下载[标准版本](https://mfsbsd.vx.sk/files/images/13/amd64/mfsbsd-13.1-RELEASE-amd64.img)（98MB）以减少流量用量。**

此时输出类似于

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-5.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-5.png)

完成后（停止救援并）重启，进入 mfsBSD。但因为 mfsBSD 是 copy-to-ram，所以还不能直接投入生产，需要再次安装。

## 安装 FreeBSD 操作系统

进入基于 FreeBSD **操作系统**的 mfsBSD 引导界面，按回车直接选择 Boot Multi User：

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-6-1024x614.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-6.png)

使用 root 登录（密码：mfsroot），运行 `bsdinstall` 指令来安装。

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-7-1024x574.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-7.png)

设置主机名

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-8-1024x575.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-8.png)

选择分区

**注意：RAM 小于 2GB 的、没有 RAID 需求的 VPS 不建议使用 ZFS。**

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-9-1024x576.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-9.png)

分区

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-10-1024x586.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-10.png)

分区表

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-11-1024x566.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-11.png)

选择最近的镜像，作为 HostVDS 用户，当然是选择俄罗斯

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-12-1024x578.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-12.png)

安装中

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-13-1024x576.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-13.png)

创建 root 用户

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-14-1024x580.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-14.png)

选择时区

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-15-1024x577.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-15.png)

附加组件

**注意：添加用户时，请把用户添加进 wheel 组**

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-16-1024x573.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-16.png)

完成安装  

最后使用 `reboot` 重启，配置 FreeBSD **操作系统**。

## 配置新的 FreeBSD 操作系统

先任意运行一个 pkg 指令（比如安装 vim），下载 pkg 二进制文件：

![](https://uof.edu.kg/wp-content/uploads/2022/05/image-17.png)](https://uof.edu.kg/wp-content/uploads/2022/05/image-17.png)

### 配置 ssh

编辑 sshd 配置文件：
```bash
    vim /etc/ssh/sshd_config
```
    

#### 重启 sshd
```bash
    service sshd restart
```
    

#### 配置 sudo
```bash
    pkg install sudo
    EDITOR=vim visudo #反注释"%wheel ALL=ALL(ALL) ALL"
```
    

最后别忘记在本地终端测试 ssh 设置。

![](/img/bsdinst/bsdinst-4.webp)

## 后记

写博客耗费了很长时间呢（）只是想记录下来有意义的东西罢。这样一想倒是能开心很多，也不大可惜了。最终的成果还是满意的——无论是 FreeBSD **操作系统**，还是这篇文章。不过 FreeBSD **操作系统**虽稳定却也难配置。大抵是为了折腾而折腾罢。

## 参考资料

《[在不支持 BSD 的 VPS 上安装 BSD 系统](https://www.freekai.net/archives/1)》- FreeKai
