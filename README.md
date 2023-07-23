---
title: HostProxy
emoji: 👀
colorFrom: green
colorTo: green
sdk: docker
pinned: false
---

# Cloudflare Workers

## 项目关联到 codesandbox 中，启动一个 wrangler 开发模式的服务

- 进入 codesandbox 后关联该项目，则可完成自动部署，会借助 wrangler 调用其 wrangler dev 在本地起一个可供调试的服务

## 生产部署到私人 cloudflare workers

- 借助 github actions ，在 github 项目中设置好 actions secrets 变量
  - ${{ secrets.CF_API_TOKEN }} 私人 cloudflare API_TOKEN
  - ${{ secrets.CF_ACCOUNT_ID }} 私人 cloudflare ACCOUNT_ID

## 如何动态代理

部署到cf后点击触发器 添加子域名即可
例如：
#codesandbox 开发模式版  因为未部署到cf 所以不支持优选cf的ip
https://yv7nkp-8787.csb.app/7a57dbd5-30b2-4676-92cc-0554e5a01234

#hostname后面添加.proxy.[yourhost] 就可以走该cf worker 实现 从该 worker 反向代理到原服务 
https://yv7nkp-8787.csb.app.proxy.[yourhost]/7a57dbd5-30b2-4676-92cc-0554e5a01234

