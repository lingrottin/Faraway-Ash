---
title: 十分舒适的双系统：Fedora Linux 配置指南
date: 2025-05-24 21:39:10
tags:
  - Linux
  - GRUB
  - 配置
  - Fedora
  - 猫猫课堂
categories:
  - 烈焰
excerpt: 一则无 u 盘地在硬盘上安装 Fedora 42 的完整指南，配有无缝的双系统体验和简要的优化配置教程。
---
## 前言

受 [@RLt](https://github.com/ltfjx) 的影响（？），我终于在我的新笔记本上安装了 Fedora Linux。以下是我的配置过程。

## 安装

由于身边并没有 u 盘，我安装的方式比较特别。概述起来就是：

- 分出一个足够大（4GB 左右）的 FAT32 分区
- 将 Fedora Live CD 的内容复制进去
- 修改 `grub.cfg` 并启动 Live CD
- 安装

在试图学习我的操作前，请确认你的电脑是以 UEFI 方式启动的。[^1]

以下是详细的叙述。

### 分区 & 复制

这个过程非常容易。使用 DiskGenius 在硬盘中创建出一块空白（没有分区）的空间，然后在里面放一个大约 4GB 的 FAT32 分区即可。

> **注意**  
> 一定要给这个 FAT32 分区起一个名字！（在文件资源管理器中直接右键重命名即可，比如 `FEDORA`。）

前往 [Fedora 的官方网站](https://fedoraproject.org/workstation/download) ，下载安装 iso 文件，双击挂载，然后把里面的东西全部复制到新的分区里。

### 编辑 GRUB 配置

使用文本编辑器（比如说，记事本）打开新分区里的 GRUB 配置文件：

```cmd
REM 假定你的新分区是 G 盘
notepad.exe G:\boot\grub2\grub.cfg 
```

定位到启动菜单的配置（含有 `menuentry` 的那几行），你会看到类似这样的东西：

```grub
menuentry "Start Fedora-Workstation-Live" --class fedora --class gnu-linux --class gnu --class os {
	linux ($root)/boot/x86_64/loader/linux quiet rhgb root=live:CDLABEL=Fedora-WS-Live-42 rd.live.image
	initrd ($root)/boot/x86_64/loader/initrd
}
```

请注意第二行： 其中 `root=live:CDLABEL=Fedora-WS-Live-42` **指定了系统文件存放的地方**，如果配置错误就无法启动 Live 系统。

可以想象，这个配置文件是为标准安装过程撰写的。而且一定是刻录到 CD 中，或者用 *Fedora Media Writer* 标准地烧写到 U 盘上的标准情况——这对我们显然不适用。所以我们需要修改 GRUB 的配置文件：
<ul>
  <li>
    <details><summary>将 <code>CDLABEL=Fedora-...</code> 更改为 <code>LABEL=FEDORA</code>（其中 <i>FEDORA</i> 是那个分区的名字）</summary>
    这个更改指定了启动分区的分区标签（即名称）。注意：如果不将 <code>CDLABEL</code> 更改成 <code>LABEL</code> 的话，大概率也会出错，因为 <code>CDLABEL</code> 指定了目标分区是一个<i>光盘文件系统</i>。
    </details>
  </li>
  <li>
    <details><summary>在末尾添加 <code>rd.live.ram=1</code></summary>
    这个更改指示内核将 Live 文件系统完整地复制到硬盘中。因为 Anaconda 默认在检测分区时排除 Live CD 所在的硬盘，如果不这样做的话就无法在该硬盘上安装。</details>
  </li>
</ul>

```diff
menuentry "Start Fedora-Workstation-Live" --class fedora --class gnu-linux --class gnu --class os {
-	linux ($root)/boot/x86_64/loader/linux quiet rhgb root=live:CDLABEL=Fedora-WS-Live-42 rd.live.image
+	linux ($root)/boot/x86_64/loader/linux quiet rhgb root=live:LABEL=FEDORA rd.live.image rd.live.ram=1
	initrd ($root)/boot/x86_64/loader/initrd
}
```

> **提示**
> 如果你想让加载程序在启动时自动校验文件，可以将下面的项（`Test this media & start Fedora-Workstation-Live`）也按照同样的方式修改。

### 启动 Fedora Live

现在，你已经做好了启动的所有准备，可以启动 Fedora Linux 了。

首先，转到 [Hasleo Software](https://www.easyuefi.com/index-us.html)（或者其他任何你信得过的下载站），下载并打开 [EasyUEFI Trial](https://www.easyuefi.com/downloads/EasyUEFI_Trial.exe)，然后做三件事：

1. 添加 Fedora 的启动项。将启动文件设置为 `<Fedora 分区>\EFI\fedora\grubx64.efi`，名称随意。
2. 在启动项管理处设置一次性启动。（把鼠标悬浮在中间的小图标上来找到这个功能）
3. 重启你的电脑。

现在，你应该能看到 GRUB 的界面了。恭喜你！🎉

### 安装 Fedora

看来你已经进入了 GNOME 桌面，但别先急着安装。还记得我说了什么吗？

对，Anaconda 会**忽略 Live CD 所在硬盘**。但是我们就是在需要安装的硬盘上启动的 Live CD。怎么办呢？

#### 卸载 Live 分区

我们刚才已经通过指定 `rd.live.ram=1` 内核参数来让内核把整个 Live 系统复制到 RAM，这意味着我们可以把含有 Live 系统的分区卸载掉，这样 Anaconda 就不知道它是不是这个硬盘上的了。

所以，打开 Live 系统的终端，输入：

```bash
sudo umount /run/initramfs/live
```

如果一切顺利的话，这个命令应该能成功运行，不输出任何东西。

#### 安装 Fedora

现在，你就可以打开 Install to Hard Drive 应用来把 Fedora 安装到你的硬盘上了。

 > **提示**
 > 如果你忘记了的话，那么记得在分区时把装有 Fedora Live 的临时分区删了。

## 配置

如果你在安装后不配置一下，用起来必定是十分不爽的。下面就是我的详细配置过程。

### 必要的应用程序

##### Microsoft Edge

如果你像我一样喜欢用 msedge 的话，你可以这样安装：

```bash
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[microsoft-edge]\nname=microsoft-edge\nbaseurl=https://packages.microsoft.com/yumrepos/edge/\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/microsoft-edge.repo
sudo dnf check-update
sudo dnf install microsoft-edge-stable
```

##### 命令行美化

我们使用 [Starship](https://starship.rs/zh-cn/) 来美化命令行。但是使用前提是，你需要下载并安装一个 [Nerd Font](https://www.nerdfonts.com/)。

###### 字体安装

```bash
# 假设你的字体在 ~/下载/SomeNerdFont.ttf
sudo mkdir -p /usr/share/fonts/custom
sudo cp ~/下载/SomeNerdFont.ttf /usr/share/fonts/custom/
sudo fc-cache -fv
fc-cache -fv

# 或者，如果你想安装到用户目录
mkdir -p ~/.local/fonts
cp ~/下载/SomeNerdFont.ttf ~/.local/fonts/
fc-cache -fv
```

###### Starship 配置

```bash
curl -sS https://starship.rs/install.sh | sh # 下载安装 Starship
```

我们这里也使用 Catppuccin 预设。

```bash
starship preset catppuccin-powerline -o ~/.config/starship.toml
```

如果你感兴趣的话，可以自行编辑 Starship 的配置文件。

然后，按照 [Starship 官方文档](https://starship.rs/guide/#step-2-set-up-your-shell-to-use-starship)的说明自行配置 Shell ;)

##### PowerShell

*~~虽然我也不知道为什么 PowerShell 是“必要的应用程序”~~*

```bash
sudo dnf install https://github.com/PowerShell/PowerShell/releases/download/v7.5.1/powershell-7.5.1-1.rh.x86_64.rpm # 或者，如果你阅读这篇文章的时间已经离 2025 年 5 月很远了，建议打开 PowerShell 的 repo 手动下载最新的 release。
chsh -s /usr/bin/pwsh
sudo chsh -s /usr/bin/pwsh # 如果你想要给 root 用户也启用的话
```


然后，运行以下命令来编辑 PowerShell 的配置[^3]。

```powershell
& "gnome-text-editor" $PROFILE
```

以下是我的配置文件，仅供参考。

```powershell
# 配置 Starship 美化命令行
Invoke-Expression (&starship init powershell)

# 让 ls 带上颜色。
function ls {
    &"/usr/bin/ls" --color=auto $args
}
# 如果你更喜欢 Windows 上的 PowerShell 那样的列出文件风格，
# 可以使用下面这一行：
# Set-Alias -Name "ls" -Value "Get-ChildItems"

# 可以一键设置梯子需要的环境变量的函数
function Setup-Proxy {
    $env:http_proxy="http://127.0.0.1:20122"
    $env:https_proxy="http://127.0.0.1:20122"
}

# 配置 Ctrl+左右箭头 的快速光标移动
Set-PSReadLineKeyHandler -Chord "Ctrl+LeftArrow" -Function BackwardWord
Set-PSReadLineKeyHandler -Chord "Ctrl+RightArrow" -Function ForwardWord
# 配置 Ctrl+Backspace/Delete 的快速删除
Set-PSReadLineKeyHandler -Chord "Ctrl+Backspace" -Function BackwardDeleteWord
Set-PSReadLineKeyHandler -Chord "Ctrl+Delete" -Function DeleteWord
```

#### 互联网法术 🪄🔮🌌

个人比较喜欢歌唱之盒，而不是冲突。不过 GUI.for.歌唱之盒 不提供 Fedora 使用的 rpm 文件或 AppImage，而是给了一个装有软件的压缩包。可以下载并解压到一个你顺眼的目录，然后为它编写 .desktop 文件。具体的操作可以询问 AI，我就不过多叙述了。

#### 桌面必要配置

##### 桌面高级设置

运行以下指令安装 GNOME Tweaks

```bash
sudo dnf install gnome-tweaks
```

在应用菜单打开“优化”即可访问 GNOME 桌面的高级设置。

##### 插件安装和配置

首先运行以下插件来安装 GNOME 插件管理器：

```bash
sudo dnf install gnome-extensions-app
```

然后，打开浏览器，转到 [Chrome Web Store](https://chromewebstore.google.com/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep) 以安装 GNOME Shell Integration 插件。

最后，转到 [GNOME 插件市场](https://extensions.gnome.org/)，搜索和安装你心仪的插件。

以下是一些个人觉得必要的插件列表：

- *AppIndicator and KStatusNotifierItem Support* - 在顶栏显示应用的 tray icon
- *Blur my Shell* - 为桌面添加美丽的模糊效果
- *Dash to Dock* - 将 Dash 变成 Dock（？
- *GSConnect* - KDE Connect 的 GNOME 实现。可以用 KDE Connect 手机 app 来实现手机和电脑的无缝联合。

最后可以在插件应用中找到部分插件的配置界面。

#### 杂项

* 你可以安装 `fastfetch` 来实现一个漂亮的截图。
* 如果你需要 QQ，尽量到[官网](https://im.qq.com/linuxqq/index.shtml)下载（请下载 rpm 版），而不是应用商店。Flatpak 上的安装包不是腾讯官方维护，且会出问题（截止本文发布时，在 Flatpak 安装的 QQ 上复制内容会导致崩溃）。
* 如果你找到了一些 AppImage 格式的应用，建议使用 [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher/wiki) 来统一管理。

### 引导加载程序

如果一切顺利的话，你的电脑应该能在开机后自动显示 GRUB 的 OS 选择界面。但是一个黑色的纯文字框框不是很雅观（真的很丑！），而且让本来舒适的电脑开机过程显得很割裂。

于是我尝试配置了一个几乎无缝的方案：默认启动 Windows，如果在开机时按任意键则显示 OS 选择器，用起来十分流畅。

#### 安装 rEFInd

这样的配置过程依靠 rEFInd bootloader。你可以用如下的命令来安装到你的系统中：

```bash
sudo dnf install rEFInd rEFInd-tools
sudo refind-install --shim /boot/efi/EFI/fedora/shimx64.efi
```

> **注意**
> 这两个命令会直接把 rEFInd 安装进你的 EFI 分区（第一个下载，第二个安装）。无需禁用安全启动，因为我们使用 `--shim` 参数指定了 [shim](https://github.com/rhboot/shim) 文件的位置，此时 `refind-install` 脚本会自动为 rEFInd 配置基于 shim 的安全启动。

然后重启测试。

> **特别注意**
> 重启之后，如果你看到一个蓝色的界面，***不要慌张*** ！  
> 那是因为 shim 不认可 rEFInd 的文件，自动启动了 `MokManagent.efi`，让你配置 MOK（Machine Owner Keys，即机器所有者自己的 Secure Boot 密钥）。
> ![蓝色的界面](/img/fedora-guide/1.png)
> 按下 Enter 之后，再像它说的那样按一个键打开 MOK 管理菜单。
> ![MOK 管理菜单](/img/fedora-guide/2.png)
> 选择 `Enroll hash from disk`，然后进入 EFI 分区（通常是这个列表中的第一个），定位到 `/EFI/refind/grubx64.efi`[^2]，按下 `yes`，然后选择 `Continue`。
> ![](/img/fedora-guide/3.png)
> 最后重启，你应该就能见到 rEFInd 界面了。

#### 配置 rEFInd

rEFInd 是一个非常强大的引导加载器，但是默认的界面非常丑。这里我们使用 [Catppuccin](https://github.com/catppuccin/refind) 主题来美化。

```bash
sudo mkdir /boot/efi/EFI/refind/themes
sudo git clone https://github.com/catppuccin/refind.git /boot/efi/EFI/refind/themes/catppuccin
sudo sed -i '1iinclude themes/catppucin/mocha.conf' /boot/efi/EFI/refind/refind.conf # 请把 mocha 换成你喜欢的 flavor
```

> **提示**
> 如果使用 Catppuccin 主题的话，你也许会想要把背景色替换成黑色，不然启动 Windows 的时候会非常丑。
> ![这是一个黑色的像素点](/img/fedora-guide/background.png)
> 下载这个黑色的像素点，把它放到 `/boot/efi/EFI/refind/themes/catppuccin/assets/mocha/background.png` 即可。同样记得把 mocha 换成你使用的 flavor。

然后编辑 rEFInd 的配置文件：

```bash
sudo gnome-text-editor /boot/efi/EFI/refind/refind.conf
```

这是我的更改，你可以参考一下：

```refind
# 使用 Catppuccin 主题，你在上面已经添加过了。
include themes/catppuccin/mocha.conf

# 无超时。和通常不同，这里 0 是无穷，-1 是瞬间。
# 这样配置之后，在开机时按下任意按键能够进入系统选择器，否则就启动默认选项。
timeout -1

# 忽略 gcdx64.efi。这个文件是 GRUB 安装的另一个启动文件，
# 但实际上和 grubx64.efi 用起来并没有区别，还会让 rEFInd 显示两个 Fedora。
# 所以让它忽略。这里的 + 是保留 rEFInd 默认值的意思。
dont_scan_files +,gcdx64.efi

# 将名称中含有“Microsoft”的项设置为默认启动项。
# 用来默认启动 Windows
default_selection "Microsoft"
```

配置好之后，你应该就能获得无缝的双系统体验了。

#### GRUB 美化

我们这样配置之后并没有完全取代 rEFInd，而是使用 GRUB 作为 Linux 的启动器。所以你仍然会看到那个丑丑的黑乎乎的线框。

我们同样可以安装 [Catppuccin](https://github.com/catppuccin/grub) 主题来美化 GRUB。具体的安装步骤在仓库里有解释，这里就不再赘述了。

## 后记

![](/img/fedora-guide/4.png)


[^1]: 新电脑基本都是这样的。如果你不确定，一个比较明显的特征是：如果 Windows 开机转圈圈时显示的是你主板的 logo 而不是 Windows logo，那么一定是 UEFI 启动。
[^2]: Fedora 内置的 shim 是为 GRUB 设计的，所以 refind-install 在选用 shim 为安全引导加载器时，将 rEFInd 的文件命名为 `grubx64.efi` 以让 shim 能正确识别。
[^3]: 其实并不是传统意义上的“配置文件”。Shell 的“配置文件”称为 Profile，其实是一个脚本（一系列命令的集合），会在 Shell 每一次启动时首先执行。和一般的脚本不同，Profile 文件默认是用 source 方式执行的——即，把脚本里的命令完全放在当前上下文，并且应用脚本对当前上下文的改动（设置变量和别名等）。
