+++
title = "Fedora Silverblue 使用小记"
# date = 2026-01-11
description = "记录在 Fedora Silverblue 上通过 rpm-ostree 替换 ffmpeg-free 为完整 ffmpeg 的过程，轻量级的系统配置备忘。"
+++
after RPMFusion,

ffmpeg can be installed:

https://rpmfusion.org/Howto/Multimedia

```bash
sudo rpm-ostree install dnf -A
dnf download ffmpeg # 从 RPMFusion 下载 ffmpeg RPM
sudo rpm-ostree override replace --remove=ffmpeg-free ./ffmpeg-7.1.2-7.fc43.x86_64.rpm
```
