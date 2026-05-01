---
title: Fedora Silverblue 使用小记
date: 2026-01-11 00:46:56
tags:
---

after RPMFusion,

ffmpeg can be installed:

https://rpmfusion.org/Howto/Multimedia

```bash
sudo rpm-ostree install dnf -A
dnf download ffmpeg # 从 RPMFusion 下载 ffmpeg RPM
sudo rpm-ostree override replace --remove=ffmpeg-free ./ffmpeg-7.1.2-7.fc43.x86_64.rpm
```
