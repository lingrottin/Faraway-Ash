---
title: 给 Fluid 添加 banner 视差效果
date: 2022-07-24 21:53:10
tags:
    - Fluid
    - 前端
    - Hexo
    - 视差
    - jQuery
    - 主题
    - 配置
categories:
    - 星耀
banner_img_parallax:
    - source: /img/parallax-post/black.webp
      size: '100%'
    - source: /img/parallax-post/quote.webp
      size: '99%'
    - source: /img/parallax-post/parallax-pink.webp
      size: '90%'
    - source: /img/parallax-post/parallax-blue.webp
      size: '80%'
index_img: /img/indexes/parallax-post.webp
excerpt: 给 Fluid 自己加了 parallax 效果，这是一些解释。
---
# 前言
由于好友在他的博客 [Evershifting Fountain](https://akyuu.cn) 中添加了酷炫但很简陋的视差效果，我<s>于心不忍</s>找到了个 jQuery 的 Parallax 库对 Fluid 实现了更强大的视差效果。

# 感谢
本文用来实现 Parallax 的库是由 Stephen Band 开发的 [jQuery.Parallax](https://github.com/stephband/jparallax)，向他致谢。  
原理是让图层中心与鼠标中心关于 banner 中心形成位似。

# Demo
[本站](/)，以及本页头图。

# 使用
把你使用的 `Fluid` 主题替换成 [Fluid-ling](https://github.com/lingrottin/hexo-theme-fluid-ling) 即可。  
不要忘记改配置喔。

# 对 config.yml 的更改
为了让我们的 Parallax 实现能自定义，我改了一下配置。  

1. 把 `banner.parallax` （Fluid 自带的滚动 parallax）更名为 `banner.parallax_scrolling`
2. 在 `banner` 下添加如下配置：
   ```yaml
    # 视差效果的配置入口
    parallax:

        # 是否启用视差效果
        enable: true

        # 在指定页面开启，不填则在所有页面开启
        # 这个和 typed.js 是一样的
        scope: []

        # 视差图层（仅在首页起效果）
        # 应该是个数组
        # 文章要配置单独的哦
        images:

            # 图源
            - source: '/img/default.png'

                # 图层大小
                # 100%则必须指定 yparallax 和 xparallax 才会移动
                # 这是由于 jParallax 的特性
                size: '120%'

                # 允许垂直移动的最大距离，auto 或为空则根据图像大小自动计算
                # 自动计算的当然是 jParallax
                # 我只不过做了微小的工作
                yparallax: '20%'

                # 允许水平移动的最大距离，auto 或为空则根据图像大小自动计算
                xparallax: '20%'

            - source: '/img/default_l2.png'
                size: '90%'
                yparallax: 'auto'
                xparallax: 'auto'
   ```

# 配置
你可以在 `_config.fluid.yml` 的 `banner.parallax` 部分配置。
## `enable`
布尔值。
## `scope`
字符串数组。这里和 Fluid 自带的对打字机的设置是一样的，包括匹配逻辑。参照官方文档。
## `images`
对象数组，你加多少个图层都可以。  
请注意：在后面的图层显示起来会在更上面。
### `source`
图像的路径，相对于 `source/` 或你自己配置的类似文件夹。
### `size`
百分比值，指定图像的大小。这也同时影响视差的效果。  
`auto` 的原理是 `最大 parallax 值` = `size` - `100%` ，因此：  
* `size < 100%` 的图像实现 parallax 的效果类似于跟着鼠标走；  
* `size > 100%` 的图像实现 parallax 的效果则类似于逃离鼠标。  
  
—— 当然，如果你配置了单独的 `yparallax` 和 `xparallax`，那么当我没说这些。  
| 注意 | 如果 `size = 100%` ，那么你**必须**配置单独的 `yparallax` 和 `xparallax` |
|:----:|:--------------|

### `yparallax`
定义水平方向上的移动。  
#### 可接受的值
（四选一）
* 布尔值
* 小数
* 以引号括起来的百分比
* 'npx'
#### 解释
* 这个选项如果不是布尔值或 0 ，则定义了图层可以跟随鼠标的最大移动距离。
* 距离的计算是此数值 × 图像大小。
* 设置成 `true`|`false` 来启用或禁用此方向上的移动。
* 设置成 `0`|`0%` 也可以禁用此方向上的移动。
* 有数值的正常值是 `0~1`（`0%~100%`），图层和鼠标在 banner 中心两边。
* 设置成 负数（包括负小数和负百分比值）则会让图层和鼠标在 banner 中心的同侧。
* 设置成 `< -1` | `> 1`（`< -100` | `> 100%`）则会使图层边缘在 banner 内出现。

### `xparallax`
定义垂直方向上的移动。  
可接受的值和作用都和 `yparallax` 一样。

# 在页面内定义单独的 parallax 图层
你只需要在页面头部的 yaml 部分添加如下选项：
```yaml
banner_img_parallax:
  - source: /foo/bar/baz.webp
    size: 100%
    # and more...
```
是的，`banner_img_parallax` 和 `config.fluid.yml` 中的 `banner.parallax.images` 是一模一样的。