---
title: 给 WSL2 编译一个 Linux 6 内核
date: 2023-07-31 19:38:44
tags: 
  - WSL
  - Arch Linux
  - Linux
  - 内核
  - 编译
index_img: /img/wsl2-linux6/special.webp
excerpt: 给 WSL2 手动编译一个 Linux 6 内核，凭借人类高质量编译过程，获得全新的 Linux 体验。
---
![neofetch 输出](/img/wsl2-linux6/special.webp)
## 前言
就是图个新鲜。由于网上很少有在 Arch Linux 下编译 Linux 内核的教程，故写。

## 前提条件
- 聪明的大脑
- 灵巧的双手
- WSL2

## 准备工作
### 安装 WSL
打开命令行，运行
```powershell
wsl.exe --install --no-distribution
```
重启之后继续运行（你可能需要安装 WSL2 内核）  
```powershell
wsl.exe --set-default-version 2
```
最后前往 [ArchWSL](https://github.com/yuk7/ArchWSL/releases) 下载并安装 ArchWSL。

### 安装软件包
配置好 ArchWSL 后，在 WSL 终端运行
```bash
sudo pacman -Syu base-devel flex bison pahole openssl libelf bc wget python
```

### 获取源代码
打开 [kernel.org](https://kernel.org/)，找一找最新的 Linux 稳定版内核源码，下载并解压。  
例如：
```bash
cd ~
wget -O- https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.4.7.tar.xz | tar -xJf-
cd linux-6.4.7/
```
![建议选最新的 stable 内核](/img/wsl2-linux6/kernel_org.webp)

### 获取 WSL 内核配置
WSL 2 的内核源码被托管到 [GitHub 仓库](https://github.com/microsoft/WSL2-Linux-Kernel)，其中的编译配置文件是我们需要的，同时也和（应该是）大部分 Linux 内核变种兼容。  
将这个文件下载到 `Microsoft` 文件夹里：
```bash
mkdir Microsoft
wget -O Microsoft/config-wsl https://github.com/microsoft/WSL2-Linux-Kernel/raw/linux-msft-wsl-6.1.y/arch/x86/configs/config-wsl
```

## 开始编译
### 修改配置文件
这里主要是自定义版本号。我们需要修改的有 `Makefile` 和 `config-wsl`。  
直接在 WSL 终端里执行：
```bash
notepad.exe Makefile
notepad.exe Microsoft/config-wsl
```
![EXTRAVERSION 编辑器: Kate](/img/wsl2-linux6/extraversion.webp)  
![LOCALVERSION 编辑器: Kate](/img/wsl2-linux6/localversion.webp)  
PS. 版本号是这样的格式：
```text
6.4.6[EXTRAVERSION][LOCALVERSION]
```

### 开始编译
按照 [GitHub 仓库](https://github.com/microsoft/WSL2-Linux-Kernel)的说明，运行 `make KCONFIG_CONFIG=Microsoft/config-wsl` 即可开始编译。  
不过为了加快速度，最好用 `-j` 指定多线程（一般是核心数 × 2）。  
由于仓库里的配置文件和目前内核的配置项会有一些出入，对于缺失的配置项会在编译前询问，一路回车应用默认值就好。（我们可以用 yes 来自动回车）  
于是，运行
```bash
yes "\n" | make -j8 KCONFIG_CONFIG=Microsoft/config-wsl
```
等待片刻（大约 20min）后看到这一行文字
```
Kernel: arch/x86/boot/bzImage is ready
```
就可以了。  
![编译完成](/img/wsl2-linux6/compile_done.webp)

## 替换 WSL 内核
不建议直接替换内核文件。微软提供了一种[优雅的方法](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#configuration-setting-for-wslconfig)来替换 WSL 内核。

### 撰写配置文件
Win+R 打开“运行”，执行
```cmd
notepad.exe %USERPROFILE%\.wslconfig
```
输入这些文字
```ini
[wsl2]
# 在这里指定内核的位置，格式是 Windows 路径。注意路径里的反斜杠要出现两个。
kernel=C:\\temp\\wslKernel
```
![编辑配置文件 编辑器: Kate](/img/wsl2-linux6/wslconfig.webp)
保存之后，把刚才生成的 `bzImage` 文件放到上面指定的位置。例如：
```bash
cp arch/x86/boot/bzImage /mnt/c/temp/wslkernel
```

### 重启 WSL
```powershell
wsl.exe --shutdown
```
再次打开一个 WSL 实例，如果出现命令行且没有报错，证明你编译出的内核是可用的。

## 完毕
```bash
uname -r
```
![uname -r 的输出](/img/wsl2-linux6/uname-r.webp)  
享受你 WSL 上的 Linux 6 吧！

## References
- [如何让WSL2使用自己编译的内核](https://zhuanlan.zhihu.com/p/324530180)