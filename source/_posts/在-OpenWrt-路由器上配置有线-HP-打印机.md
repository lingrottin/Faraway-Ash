---
title: 在 OpenWrt 路由器上配置有线 HP 打印机
date: 2022-07-09 13:51:08
tags: 
  - OpenWrt
  - HP
  - CUPS
  - 编译
  - 路由器
  - 打印机
  - 安装
  - DeskJet
  - HPLIP
  - 外设
  - 服务器
  - 运维
categories:
  - 探索
index_img: /img/indexes/openwrt.webp
excerpt: 将有线的打印机接在路由器上，释放出无线的力量。
---
# 前言
作为学生，时常有打印的需求。而我的打印机不支持无线打印，每次打印都要打开电脑显然很麻烦。在房间网关更换为带 usb 接口的路由器后，便打算配置无线打印服务器。
# 必要条件
* 一台 HP 打印机。（我的是 Hewlett-Packard Deskjet 1050）
* 一台带 usb 接口 OpenWrt 路由器。
* 一台电脑（最好有 Linux 环境）。
* 聪明的大脑。
* 灵巧的小手。
* 巧妙的上网方法。


# 编译 OpenWrt
由于 OpenWrt 项目从 LEDE17 开始就[不再提供预编译的 CUPS 软件](https://openwrt.org/docs/guide-user/services/print_server/cups.server)，到现在的最新版（21.02.3）甚至没有内置在官方源码里，所以我们需要自行编译 CUPS。
如果你不想编译，请直接跳到[使用二进制包](#使用二进制包)。编译的好处是可以把 CUPS 内置在固件镜像内，而且可以调整别的内容。
（以下内容参照 OpenWrt 官方 wiki）

## 配置编译环境
本人是在 Red Hat Enterprise Linux 9 上编译的（Fedora/CentOS 等同理），配置编译环境只用执行以下命令即可：
```bash
sudo dnf --setopt install_weak_deps=False --skip-broken install \
bash-completion bzip2 gcc gcc-c++ git make ncurses-devel patch \
rsync tar unzip wget which diffutils python2 python3 perl-base \
perl-Data-Dumper perl-File-Compare perl-File-Copy perl-FindBin \
perl-Thread-Queue
```
其他发行版的环境配置命令也可以在 [OpenWrt Wiki](https://openwrt.org/docs/guide-developer/toolchain/install-buildsystem#linux_gnu-linux_distributions) 找到。
<i><b>注意：如果你使用 Windows Subsystem for Linux 编译，请<a href="https://openwrt.org/docs/guide-developer/toolchain/wsl">删去 PATH 里的 Windows 路径</a></b></i>

## 获取源代码
使用 git 把 OpenWrt 的源代码克隆下来：
```bash
git clone https://git.openwrt.org/openwrt/openwrt.git
```
checkout 到一个稳定版（这里选择 21.02.3）
```bash
cd openwrt/
git checkout v21.02.3
# 你也可以用 git tag 看看其他可用的版本
```
获取软件包列表
```bash
./scripts/feeds update -a
./scripts/feeds install -a
```
看看有没有 CUPS 软件包可用
```bash
make menuconfig
# 记得把终端窗口放大一点
```
打开菜单之后，按下 / ，输入 libcups 寻找源码仓库内是否含 CUPS：
![寻找CUPS](/img/openwrt/openwrt-1.png)
如果找到了（就如下图），那么恭喜你，你不用配置第三方源。
![找到](/img/openwrt/openwrt-2.png)
否则，请往下看。
在寻找完成之后，<b><i>不要改动任何选项</i></b>，选择 Exit 再按下\<Enter\> 直至回到命令行。

## 添加 CUPS 源码仓库
在源码目录内，运行以下命令以添加 CUPS 仓库：
```bash
echo "src-git cups https://github.com/TheMMcOfficial/lede-cups.git" >> feeds.conf.default
```
然后更新仓库列表
```bash
./scripts/feeds update -a
./scripts/feeds install -a
```
（如果你打开这个仓库，你会发现最后更新在 2018 年。请不要担心，这不意味着编译出的 CUPS 不可用）

## 更改配置
如果你的设备不在 OpenWrt 的官方支持列表里，请直接跳到[使用二进制包](#使用二进制包)。
打开 OpenWrt 的下载仓库，定位到你的设备的目录
![路由器的后台管理界面是一个不错的参考来源](/img/openwrt/openwrt-3.png)
![找到设备](/img/openwrt/openwrt-4.png)
然后向下，定位到 config.buildinfo，复制链接
![复制链接](/img/openwrt/openwrt-5.png)
回到终端，输入以下命令以使用你设备的配置
```bash
rm -f .config ; wget < 你复制的链接> -O .config
make menuconfig
```
在菜单里 Target Profile 处选择你的设备
![选择我的设备](/img/openwrt/openwrt-6.png)
在菜单里 Target Profile 处选择你的设备
* Network(ing) -> Printing -> cups（不需要选中附加组件，且有可能编译失败）
* Library -> libcups
如果你想要把包内置在固件里的话，把包选择成 <b>[*]</b> ，否则，请选择成 <b>[M]</b>。
按下保存并退出，就可以编译了。

## 开始编译
```bash
make -j $(nproc) defconfig download clean world
```
这可能会占满你电脑的资源并花费几个小时的时间。你可以在这期间休息一下。

## 安装 CUPS
编译好之后，你应该能在以下目录找到文件
* 编译好的固件：`bin/targets/<设备平台>/<设备硬件>`
* 编译好的包：`bin/targets/<设备平台>/<设备硬件>/packages`
比如我使用联想新路由 Mini，是 Realtek MIPS 平台，采用 MT7620 固件，那么我能在 `bin/targets/ramips/mt7620` 找到固件。
* 如果你上面配置 CUPS 选择了 <b>[*]</b>，请刷入固件
* 如果你上面选择了 <b>[M]</b>，请安装包。（温馨提示：用 `ls *cups*` 可以找到名称里包含 `cups` 的文件）此时固件的刷入是可选的。

# 使用二进制包
当然，你也可以不编译，使用别人现成的包。
你可以在以下地方下载编译好的 CUPS 包：
\[<a href="https://github.com/syb999/openwrt-musl-cups">musl libc 版本</a>\] \[<a href="https://github.com/syb999/openwrt-uclibc-cups" >uClibc libc 版本</a>\]

<h2>鉴别 <code>musl</code> 和 <code>uClibc</code></h2>
ssh 进入你设备的后台，运行以下命令
```bash
ls /lib/*uClibc* -l || ls /lib/*musl* -l
```
如果你看见了类似于以下的回复，你使用的是 `musl`
```text
ls: /lib/*uClibc*: No such file or directory
lrwxrwxrwx1 root root      7 Apr 16 12:59 /lib/ld-musl-mipsel-sf.so.1 -> libc.so
```
如果你看见了类似于以下的回复，你使用的是 `uClibc`
```text
-rwxr-xr-x. 1 root root21520 Apr  3  2009 /lib/ld-uClibc-0.9.30.1.so
lrwxrwxrwx. 1 root root   21 Apr  3  2009 /lib/ld-uClibc.so.0 -> ld-uClibc-0.9.30.1.so
-rwxr-xr-x. 1 root root 182840 Apr3  2009 /lib/libuClibc++-0.2.2.so
-rw-r--r--. 1 root root 863992 Apr3  2009 /lib/libuClibc++.a
lrwxrwxrwx. 1 root root   16 Apr  3  2009 /lib/libuClibc++.so -> libuClibc++.so.0
lrwxrwxrwx. 1 root root   20 Apr  3  2009 /lib/libuClibc++.so.0 -> libuClibc++-0.2.2.so
-rw-r--r--. 1 root root 294744 Apr3  2009 /lib/libuClibc-0.9.30.1.so
```
选择合适的架构，然后上传安装。

# 配置打印机
好了之后（建议重启一下），打开浏览器，输入网址
```text
http://<路由器的 ip 地址>:631/
```
进入 CUPS 管理界面。
![管理界面](/img/openwrt/openwrt-7.png)
点击 Administration（应该会需要你输入 root 账户及密码），进入 CUPS 管理后台
![添加打印机](/img/openwrt/openwrt-8.png)
点击按钮添加打印机。
![配置1](/img/openwrt/openwrt-9.png)![配置2](/img/openwrt/openwrt-10.png)<br>
记得勾选 Share This Printer。
![驱动](/img/openwrt/openwrt-11.png)
此时需要你选择一个驱动，不要惊慌。打开[惠普 Linux 制图与打印](https://sourceforge.net/projects/hplip/files/hplip/)，选择最新版本，<b>下载 tar.gz 文件</b>。
解压，进入 ppd/hpcups 目录
![ppd/](/img/openwrt/openwrt-12.png)
![hpcups/](/img/openwrt/openwrt-13.png)
定位到你的打印机（如果打印机的 ppd 文件不在这里面，请在 hplip 包的其他地方找找。），解压出 ppd 文件
![ppd](/img/openwrt/openwrt-14.png)
并上传到 CUPS 管理界面。
![upload](/img/openwrt/openwrt-15.png)
最后选择默认设置
![default-settings](/img/openwrt/openwrt-16.png)
就配置好你的打印机了。
![done](/img/openwrt/openwrt-17.png)
最后你应该能在支持 CUPS 的系统设置里查找到你的打印机，不要忘记在本地设备上配置驱动哦！
![print](/img/openwrt/openwrt-18.png)

# 后记
配置 CUPS 的初衷是更方便地打印。可惜到毕业之后才配置好，深感哀伤。总而言之，希望这篇文章能对你提供帮助。

