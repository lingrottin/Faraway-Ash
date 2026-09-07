import { unixFromShanghaiWall } from "../src/lib/dates.ts";
import { computeHexoPermalink, hexoHash } from "../src/lib/permalink.ts";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

// known fixtures from Hexo era
{
  const unix = unixFromShanghaiWall(2024, 11, 3, 23, 42, 3);
  const h = await hexoHash("记一次海淘经历", unix);
  assert(h === "821fb1a3569e", `shopping hash ${h}`);
}
{
  const unix = unixFromShanghaiWall(2025, 1, 16, 23, 32, 51);
  const h = await hexoHash("制作-Rustacean-Ferris-的毛绒玩具", unix);
  assert(h === "ddfab520c6e2", `ferris hash ${h}`);
}
{
  const unix = unixFromShanghaiWall(2025, 1, 29, 15, 59, 48);
  const h = await hexoHash("浅谈-JavaScript-中的闭包、this-和箭头函数", unix);
  assert(h === "1ded1c484818", `js hash ${h}`);
}

// date-only posts still produce stable path shape
{
  const d = new Date("2026-05-22T00:00:00+08:00");
  const p = await computeHexoPermalink("无-U-盘安装-Linux-发行版方法总结", d);
  assert(/^2026\/0522\/[0-9a-f]{12}\/$/.test(p), `shape ${p}`);
  console.log("new post sample", p);
}

console.log("permalink tests ok");
