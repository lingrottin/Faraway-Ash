---
title: 在 FreeBSD 操作系统下安装 iRedMail 邮箱服务器 [废弃]
date: 2022-05-28 21:52:06
tags: 
	- FreeBSD
	- Git
	- iRedMail
	- pkg
	- VPS
	- 安装
	- 服务器
	- 编译
	- 运维
categories:
	- 星耀
index_img: /img/bsdredmail/special.png
excerpt: 这篇文章没有完成且已经废弃。
---
## 前言

**—由于 HostVDS 的最小服务器只提供 10GB 的空间，无法编译完成，因此此教程废弃**—

由于愚笨大学需要自己的带 SMTP 的（用来给 WordPress 用）邮箱，因此我们在尝试 Exchange（API 太复杂）、网易免费企业邮（没探测到 MX 记录）、VK WorkMail（前身 Mail.ru 企业邮箱）（启用 SMTP 需要绑定手机）后决定自己搭建一个。

我们本来有更加便捷的 Windows 服务器可以使用，但因为腾讯云不开放 25 端口，因此我们无法使用 MailEnable。于是我开了一个新的服务器，体验过 CentOS 的复杂之后断然[转向 FreeBSD**操作系统**](https://uof.edu.kg/2022/05/28/%e5%9c%a8hostvds%e6%9c%8d%e5%8a%a1%e5%99%a8%e4%b8%8a%e5%ae%89%e8%a3%85freebsd%e6%93%8d%e4%bd%9c%e7%b3%bb%e7%bb%9f/)。

而似乎很棒的一点是，iRedMail 邮箱套件支持 FreeBSD **操作系统**。

## 准备环境

在上文安装 FreeBSD **操作系统**时我们把主机名设置成了 `mx.uof.edu.kg`，就是为这篇文章埋下的伏笔呢。（）

![](/img/bsdredmail/bsdredmail-0.webp)

根据 iRedMail 官网文档，安装 iRedMail 的所有依赖包都将会被从 FreeBSD Ports Collection 安装，因此我们要在系统上获取 Ports 树和 _内核源码树_ （注：`/usr/src` 下有文件的——即已有内核源码树的——就不用执行以下关于 git 的命令）。

先查看系统内核版本（不然会出现不兼容的奇怪问题）：
```bash
    uname -a
```
    

![](/img/bsdredmail/bsdredmail-1.webp)
```bash
    sudo portsnap fetch extract update
    # 以下是获取内核
    sudo pkg install git
    sudo git clone --depth=1 -b < 内核 branch> -o freebsd https://git.FreeBSD.org/src.git /usr/src  # 需要安装一个需要内核源码才能编译的包
```
    

安装 iRedMail 依赖的 `bash-static`，顺便将默认 Shell 更换为 GNU Bash 以及装 Vim 编辑器。
```bash
    sudo pkg install bash-static vim
    chsh -s `which bash` # 更改默认 Shell 为 bash
    sudo chsh -s `which bash`  # 也可以把 root 的顺便改了（？
```
    

确认一下自己的主机名是否是 [FQDN](https://baike.baidu.com/item/FQDN/5102541)：
```bash
    hostname -f
```
    

![](/img/bsdredmail/bsdredmail-2.webp)

如果不是的话，可以用以下命令更改：
```bash
    hostname mx.example.org # 不要用根域名的名称！
    sudo reboot # 最好重启一下
```
    

## 安装 iRedMail

转向 [iRedMail 官网](https://www.iredmail.org/download.html)，复制下载链接，打开 FreeBSD 的 ssh 窗口：
```bash
    sudo pkg install wget # FreeBSD 默认不带 wget，而 cURL 二进制文件不能跟随重定向
    wget -O- https://github.com/iredmail/iRedMail/archive/refs/tags/1.6.0.tar.gz | sudo tar -zxf-
    cd iRedMail*
    sudo bash iRedMail.sh # 开始安装
```
    

![](/img/bsdredmail/bsdredmail-3.webp) ![](/img/bsdredmail/bsdredmail-4.webp) ![](/img/bsdredmail/bsdredmail-5.webp) ![](/img/bsdredmail/bsdredmail-6.webp) ![](/img/bsdredmail/bsdredmail-7.webp) ![](/img/bsdredmail/bsdredmail-8.webp) ![](/img/bsdredmail/bsdredmail-9.webp)

在有 _TUI_（注：终端用户界面）的友好配置之后，就是漫长的编译流程。等待罢。

**注意：**_\[2022/5/28，此时刚出 FreeBSD 13.1\]_ **编译有可能在编译 nginx 时停下，这时要手动修复**`iRedMail/functions/packages-freebsd.sh`**。**

定位到 604 行左右，在 `cat` 行下面添加
```makefile
    OPTIONS_FILE_UNSET+=PCRE_ONE
    OPTIONS_FILE_SET+=PCRE_TWO
```
    

![](/img/bsdredmail/bsdredmail-10.webp)

## 参考

《[FreeBSD 下安装 iRedMail 搭建自己的邮件服务器](https://free.gd/freebsd-install-iredmail.html)》– 可乐

《[Install iRedMail on FreeBSD](https://docs.iredmail.org/install.iredmail.on.freebsd.html)》_（iRedMail 违反了 FreeBSD 基金会的法令呢）_ – iRedMail

《[FreeBSD 使用手册](https://docs.freebsd.org/en/books/handbook)》– FreeBSD 社区
