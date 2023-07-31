---
title: 友情链接
date: 2023-07-31 23:36:08
---
<div class="row">
    <link-item url="https://akyuu.cn" image="/img/links/yoiyami.webp" title="Yoiyami" desc="RLt 的网站。"></link-item>
    <link-item url="https://blog.rosmontis.tech/" image="/img/links/rosmontis.webp" title="UrsusFeline" desc="UOF 的校花。"></link-item>
</div>

<style>
  div.linkitem {
    height: 4em;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  img.linkitem-img {
    height: 3em;
    margin-right:0.5em;
  }
  div.linkitem-txt {
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
  }
  span.linkitem-title {
    font-weight: 700;
    font-family: "Red Hat Display", "sans-serif";
    font-size: 1.3em;
  }
</style>
<script>
    'use strict';
    (function(){
        let makeLinkItem=(element)=>{
            element.classList.add("col-lg-4", "col-md-6", "col-sm-12");
            element.innerHTML=`
            <div class="linkitem">
                <div>
                    <i-mg src="${element.getAttribute("image")}" class="linkitem-img" ></img>
                </div>
                <a href="${element.getAttribute("url")}">
                    <div class="linkitem-txt">
                        <div>
                            <span class="linkitem-title">${element.getAttribute("title")}</span>
                        </div>
                        <div><span>${element.getAttribute("desc")}</span></div>
                    </div>
                </a>
             </div>`;
            return;
        }
        Array
            .from(document.getElementsByTagName("link-item"))
            .forEach((element)=>makeLinkItem(element));
        Array
            .from(document.getElementsByTagName("i-mg"))
            .forEach((element)=>{
                element.outerHTML=element.outerHTML.replace("i-mg", "img");
            }); 
        // 这样做是为了规避 Fluid 侵入式的懒加载机制修改上面字符串里的内容
        
    })();
</script>
