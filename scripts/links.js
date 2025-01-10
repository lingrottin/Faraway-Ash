"use strict";

const { JSDOM } = require("jsdom");

hexo.extend.filter.register("after_render:html", (html, locals) => {
  const makeLinkItem = (element) => {
    element.classList.add("col-lg-4", "col-md-6", "col-sm-12");
    element.innerHTML = `
    <div class="linkitem">
        <div>
            <img src="${element.getAttribute("image")}" class="linkitem-img" ></img>
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
  };
  const styles = `div.linkitem {
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
  }`;
  const document = new JSDOM(html).window.document;
  const elements = document.getElementsByTagName("fa-link-item");
  if (!elements.length) return;
  Array.from(elements).forEach(element => makeLinkItem(element));
  document.head.innerHTML += `<style>${styles}</style>`;
  console.log("[FA] 处理了链接项！");
  return document.documentElement.innerHTML;
});