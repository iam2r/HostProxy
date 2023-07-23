---
title: Proxy
emoji: 👀
colorFrom: green
colorTo: green
sdk: docker
pinned: false
---

# Cloudflare Workers

## 项目关联到 codesandbox 中，启动一个 wrangler 开发模式的服务

- 进入 codesandbox 后关联该项目，则可完成自动部署，会借助 wrangler 调用其 wrangler dev 在本地起一个可供调试的服务
- 建议在 codesandbox 中配置环境变量 UUID 值以私密化节点

## 生产部署到私人 cloudflare workers

- 借助 github actions ，在 github 项目中设置好 actions secrets 变量
  - ${{ secrets.CF_API_TOKEN }} 私人 cloudflare API_TOKEN
  - ${{ secrets.CF_ACCOUNT_ID }} 私人 cloudflare ACCOUNT_ID
  - ${{ secrets.UUID }} 服务链接时的 UUID

# API 接口

- host: http://127.0.0.1:8787
- uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3

### 获取客户端信息

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787`

#### Response

- Body

```
{"clientTcpRtt":435,"longitude":"104.05550","latitude":"30.64980","tlsCipher":"AEAD-AES256-GCM-SHA384","continent":"AS","asn":9808,"clientAcceptEncoding":"br, gzip, deflate","country":"CN","tlsClientAuth":{"certIssuerDNLegacy":"","certIssuerSKI":"","certSubjectDNRFC2253":"","certSubjectDNLegacy":"","certFingerprintSHA256":"","certNotBefore":"","certSKI":"","certSerial":"","certIssuerDN":"","certVerified":"NONE","certNotAfter":"","certSubjectDN":"","certPresented":"0","certRevoked":"0","certIssuerSerial":"","certIssuerDNRFC2253":"","certFingerprintSHA1":""},"tlsExportedAuthenticator":{"clientFinished":"f45407eb109ad5b0e67eb3a6aa48047b6e4f31c20f9e528ee53914090067ba350b01707bb15970e70a11751f8db0f17a","clientHandshake":"cbf7cf1193b3a67b2a4de4ce2d00e59e7b52672f0409a4dad08e1bfc76a177df58b871646953faf760f4d65d569d07fe","serverHandshake":"02e2983a310e5958388b47b72ecb6a4d70e651d4ba434620cf5d481ce09a51a7b7cbe0d2776dbf069416743466bf2b2f","serverFinished":"6b8668eac87cd8cdca475f3c785d7bfcd658050de399163157715032fd3c41c86ccc4709b524f5a293033e06903d0d54"},"tlsVersion":"TLSv1.3","city":"Chengdu","timezone":"Asia/Shanghai","colo":"SJC","region":"Sichuan","requestPriority":"","botManagement":{"corporateProxy":false,"verifiedBot":false,"ja3Hash":"398430069e0a8ecfbc8db0778d658d77","staticResource":false,"detectionIds":[33554808,33554652],"score":1},"clientTrustScore":1,"httpProtocol":"HTTP/1.1","regionCode":"SC","asOrganization":"China Mobile","edgeRequestKeepAliveStatus":1}
```

### 获取普通 vless 节点配置，可直接导入 v2ray 及 loon 等支持 vless 协议的网络工具

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3`

#### Response

- Body

```
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@127.0.0.1:8787:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#127.0.0.1:8787
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn-all.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn-all.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn-b100.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn-b100.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@edgetunnel.anycast.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#edgetunnel.anycast.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn.anycast.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn.anycast.eu.org
```

### 获取普通 vless 节点配置，可直接导入 v2ray 及 loon 等支持 vless 协议的网络工具,  传入自定义优选 ip

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3?proxyIPs=1.1.1.1,2.3.3.4`
- 优选 IP: https://stock.hostmonit.com/CloudFlareYes
- QUERY:

```ts
type Query = {
	proxyIPs?: string /** 传入优选ip, 返回优选ip节点，支持英文逗号隔开批量传递 */;
};
```

#### Response

- Body

```
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@127.0.0.1:8787:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#127.0.0.1:8787
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn-all.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn-all.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn-b100.xn--b6gac.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn-b100.xn--b6gac.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@edgetunnel.anycast.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#edgetunnel.anycast.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@cdn.anycast.eu.org:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#cdn.anycast.eu.org
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@1.1.1.1:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#1.1.1.1
vless://0b87fff8-ed16-4269-b53b-4aa9a01682a3@2.3.3.4:443?encryption=none&security=tls&sni=127.0.0.1:8787&fp=randomized&type=ws&host=127.0.0.1:8787&path=%2F%3Fed%3D2048#2.3.3.4


```

### 获取 clash.meta 内核的 clash 客户端的 profiles，带有默认的简易分流配置，可直接在支持切换 clash.meta 内核的 clash 客户端中进行订阅

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3?type=clash.meta`
- QUERY:

```ts
type Query = {
	type?: 'clash.meta' /** 控制是否返回clash.meta可订阅的配置 */;
};
```

#### Response

- Body

```yaml
port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info
external-controller: ':9090'
proxy-groups:
  - name: PROXY
    type: select
    proxies:
      - Vless:127.0.0.1:8787
      - DIRECT
  - name: Outsite
    type: select
    proxies:
      - PROXY
      - DIRECT
  - name: Telegram
    type: select
    proxies:
      - PROXY
      - DIRECT
  - name: Vless:127.0.0.1:8787
    type: select
    proxies:
      - 127.0.0.1:8787
      - cdn-all.xn--b6gac.eu.org
      - cdn.xn--b6gac.eu.org
      - cdn-b100.xn--b6gac.eu.org
      - edgetunnel.anycast.eu.org
      - cdn.anycast.eu.org
rules:
  - DOMAIN-SUFFIX,local,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,100.64.0.0/10,DIRECT,no-resolve
  - IP-CIDR6,::1/128,DIRECT,no-resolve
  - IP-CIDR6,fc00::/7,DIRECT,no-resolve
  - IP-CIDR6,fe80::/10,DIRECT,no-resolve
  - IP-CIDR6,fd00::/8,DIRECT,no-resolve
  - DOMAIN-SUFFIX,t.me,Telegram
  - DOMAIN-SUFFIX,tx.me,Telegram
  - DOMAIN-SUFFIX,tdesktop.com,Telegram
  - DOMAIN-SUFFIX,telegra.ph,Telegram
  - DOMAIN-SUFFIX,telegram.me,Telegram
  - DOMAIN-SUFFIX,telegram.org,Telegram
  - IP-CIDR,91.108.0.0/16,Telegram,no-resolve
  - IP-CIDR,109.239.140.0/24,Telegram,no-resolve
  - IP-CIDR,149.154.160.0/20,Telegram,no-resolve
  - IP-CIDR6,2001:67c:4e8::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23d::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23f::/48,Telegram,no-resolve
  - DOMAIN-SUFFIX,linkedin.com,PROXY
  - DOMAIN-SUFFIX,appspot.com,PROXY
  - DOMAIN-SUFFIX,blogger.com,PROXY
  - DOMAIN-SUFFIX,getoutline.org,PROXY
  - DOMAIN-SUFFIX,gvt0.com,PROXY
  - DOMAIN-SUFFIX,gvt1.com,PROXY
  - DOMAIN-SUFFIX,gvt3.com,PROXY
  - DOMAIN-SUFFIX,xn--ngstr-lra8j.com,PROXY
  - DOMAIN-KEYWORD,google,PROXY
  - DOMAIN-KEYWORD,blogspot,PROXY
  - DOMAIN-SUFFIX,onedrive.live.com,PROXY
  - DOMAIN-SUFFIX,xboxlive.com,PROXY
  - DOMAIN-SUFFIX,cdninstagram.com,PROXY
  - DOMAIN-SUFFIX,fb.com,PROXY
  - DOMAIN-SUFFIX,fb.me,PROXY
  - DOMAIN-SUFFIX,fbaddins.com,PROXY
  - DOMAIN-SUFFIX,fbcdn.net,PROXY
  - DOMAIN-SUFFIX,fbsbx.com,PROXY
  - DOMAIN-SUFFIX,fbworkmail.com,PROXY
  - DOMAIN-SUFFIX,instagram.com,PROXY
  - DOMAIN-SUFFIX,m.me,PROXY
  - DOMAIN-SUFFIX,messenger.com,PROXY
  - DOMAIN-SUFFIX,oculus.com,PROXY
  - DOMAIN-SUFFIX,oculuscdn.com,PROXY
  - DOMAIN-SUFFIX,rocksdb.org,PROXY
  - DOMAIN-SUFFIX,whatsapp.com,PROXY
  - DOMAIN-SUFFIX,whatsapp.net,PROXY
  - DOMAIN-KEYWORD,facebook,PROXY
  - IP-CIDR,3.123.36.126/32,PROXY,no-resolve
  - IP-CIDR,35.157.215.84/32,PROXY,no-resolve
  - IP-CIDR,35.157.217.255/32,PROXY,no-resolve
  - IP-CIDR,52.58.209.134/32,PROXY,no-resolve
  - IP-CIDR,54.93.124.31/32,PROXY,no-resolve
  - IP-CIDR,54.162.243.80/32,PROXY,no-resolve
  - IP-CIDR,54.173.34.141/32,PROXY,no-resolve
  - IP-CIDR,54.235.23.242/32,PROXY,no-resolve
  - IP-CIDR,169.45.248.118/32,PROXY,no-resolve
  - DOMAIN-SUFFIX,pscp.tv,PROXY
  - DOMAIN-SUFFIX,periscope.tv,PROXY
  - DOMAIN-SUFFIX,t.co,PROXY
  - DOMAIN-SUFFIX,twimg.co,PROXY
  - DOMAIN-SUFFIX,twimg.com,PROXY
  - DOMAIN-SUFFIX,twitpic.com,PROXY
  - DOMAIN-SUFFIX,vine.co,PROXY
  - DOMAIN-KEYWORD,twitter,PROXY
  - DOMAIN-SUFFIX,t.me,PROXY
  - DOMAIN-SUFFIX,tdesktop.com,PROXY
  - DOMAIN-SUFFIX,telegra.ph,PROXY
  - DOMAIN-SUFFIX,telegram.me,PROXY
  - DOMAIN-SUFFIX,telegram.org,PROXY
  - IP-CIDR,91.108.4.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.8.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.12.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.16.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.56.0/22,PROXY,no-resolve
  - IP-CIDR,149.154.160.0/20,PROXY,no-resolve
  - DOMAIN-SUFFIX,line.me,PROXY
  - DOMAIN-SUFFIX,line-apps.com,PROXY
  - DOMAIN-SUFFIX,line-scdn.net,PROXY
  - DOMAIN-SUFFIX,naver.jp,PROXY
  - IP-CIDR,103.2.30.0/23,PROXY,no-resolve
  - IP-CIDR,125.209.208.0/20,PROXY,no-resolve
  - IP-CIDR,147.92.128.0/17,PROXY,no-resolve
  - IP-CIDR,203.104.144.0/21,PROXY,no-resolve
  - DOMAIN-SUFFIX,4shared.com,PROXY
  - DOMAIN-SUFFIX,520cc.cc,PROXY
  - DOMAIN-SUFFIX,881903.com,PROXY
  - DOMAIN-SUFFIX,9cache.com,PROXY
  - DOMAIN-SUFFIX,9gag.com,PROXY
  - DOMAIN-SUFFIX,abc.com,PROXY
  - DOMAIN-SUFFIX,abc.net.au,PROXY
  - DOMAIN-SUFFIX,abebooks.com,PROXY
  - DOMAIN-SUFFIX,amazon.co.jp,PROXY
  - DOMAIN-SUFFIX,apigee.com,PROXY
  - DOMAIN-SUFFIX,apk-dl.com,PROXY
  - DOMAIN-SUFFIX,apkfind.com,PROXY
  - DOMAIN-SUFFIX,apkmirror.com,PROXY
  - DOMAIN-SUFFIX,apkmonk.com,PROXY
  - DOMAIN-SUFFIX,apkpure.com,PROXY
  - DOMAIN-SUFFIX,aptoide.com,PROXY
  - DOMAIN-SUFFIX,archive.is,PROXY
  - DOMAIN-SUFFIX,archive.org,PROXY
  - DOMAIN-SUFFIX,arte.tv,PROXY
  - DOMAIN-SUFFIX,artstation.com,PROXY
  - DOMAIN-SUFFIX,arukas.io,PROXY
  - DOMAIN-SUFFIX,ask.com,PROXY
  - DOMAIN-SUFFIX,avg.com,PROXY
  - DOMAIN-SUFFIX,avgle.com,PROXY
  - DOMAIN-SUFFIX,badoo.com,PROXY
  - DOMAIN-SUFFIX,bandwagonhost.com,PROXY
  - DOMAIN-SUFFIX,bbc.com,PROXY
  - DOMAIN-SUFFIX,behance.net,PROXY
  - DOMAIN-SUFFIX,bibox.com,PROXY
  - DOMAIN-SUFFIX,biggo.com.tw,PROXY
  - DOMAIN-SUFFIX,binance.com,PROXY
  - DOMAIN-SUFFIX,bitcointalk.org,PROXY
  - DOMAIN-SUFFIX,bitfinex.com,PROXY
  - DOMAIN-SUFFIX,bitmex.com,PROXY
  - DOMAIN-SUFFIX,bit-z.com,PROXY
  - DOMAIN-SUFFIX,bloglovin.com,PROXY
  - DOMAIN-SUFFIX,bloomberg.cn,PROXY
  - DOMAIN-SUFFIX,bloomberg.com,PROXY
  - DOMAIN-SUFFIX,blubrry.com,PROXY
  - DOMAIN-SUFFIX,book.com.tw,PROXY
  - DOMAIN-SUFFIX,booklive.jp,PROXY
  - DOMAIN-SUFFIX,books.com.tw,PROXY
  - DOMAIN-SUFFIX,boslife.net,PROXY
  - DOMAIN-SUFFIX,box.com,PROXY
  - DOMAIN-SUFFIX,businessinsider.com,PROXY
  - DOMAIN-SUFFIX,bwh1.net,PROXY
  - DOMAIN-SUFFIX,castbox.fm,PROXY
  - DOMAIN-SUFFIX,cbc.ca,PROXY
  - DOMAIN-SUFFIX,cdw.com,PROXY
  - DOMAIN-SUFFIX,change.org,PROXY
  - DOMAIN-SUFFIX,channelnewsasia.com,PROXY
  - DOMAIN-SUFFIX,ck101.com,PROXY
  - DOMAIN-SUFFIX,clarionproject.org,PROXY
  - DOMAIN-SUFFIX,clyp.it,PROXY
  - DOMAIN-SUFFIX,cna.com.tw,PROXY
  - DOMAIN-SUFFIX,comparitech.com,PROXY
  - DOMAIN-SUFFIX,conoha.jp,PROXY
  - DOMAIN-SUFFIX,crucial.com,PROXY
  - DOMAIN-SUFFIX,cts.com.tw,PROXY
  - DOMAIN-SUFFIX,cw.com.tw,PROXY
  - DOMAIN-SUFFIX,cyberctm.com,PROXY
  - DOMAIN-SUFFIX,dailymotion.com,PROXY
  - DOMAIN-SUFFIX,dailyview.tw,PROXY
  - DOMAIN-SUFFIX,daum.net,PROXY
  - DOMAIN-SUFFIX,daumcdn.net,PROXY
  - DOMAIN-SUFFIX,dcard.tw,PROXY
  - DOMAIN-SUFFIX,deepdiscount.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.com,PROXY
  - DOMAIN-SUFFIX,deviantart.com,PROXY
  - DOMAIN-SUFFIX,disconnect.me,PROXY
  - DOMAIN-SUFFIX,discordapp.com,PROXY
  - DOMAIN-SUFFIX,discordapp.net,PROXY
  - DOMAIN-SUFFIX,disqus.com,PROXY
  - DOMAIN-SUFFIX,dlercloud.com,PROXY
  - DOMAIN-SUFFIX,dns2go.com,PROXY
  - DOMAIN-SUFFIX,dowjones.com,PROXY
  - DOMAIN-SUFFIX,dropbox.com,PROXY
  - DOMAIN-SUFFIX,dropboxusercontent.com,PROXY
  - DOMAIN-SUFFIX,duckduckgo.com,PROXY
  - DOMAIN-SUFFIX,dw.com,PROXY
  - DOMAIN-SUFFIX,dynu.com,PROXY
  - DOMAIN-SUFFIX,earthcam.com,PROXY
  - DOMAIN-SUFFIX,ebookservice.tw,PROXY
  - DOMAIN-SUFFIX,economist.com,PROXY
  - DOMAIN-SUFFIX,edgecastcdn.net,PROXY
  - DOMAIN-SUFFIX,edu,PROXY
  - DOMAIN-SUFFIX,elpais.com,PROXY
  - DOMAIN-SUFFIX,enanyang.my,PROXY
  - DOMAIN-SUFFIX,encyclopedia.com,PROXY
  - DOMAIN-SUFFIX,esoir.be,PROXY
  - DOMAIN-SUFFIX,etherscan.io,PROXY
  - DOMAIN-SUFFIX,euronews.com,PROXY
  - DOMAIN-SUFFIX,evozi.com,PROXY
  - DOMAIN-SUFFIX,feedly.com,PROXY
  - DOMAIN-SUFFIX,firech.at,PROXY
  - DOMAIN-SUFFIX,flickr.com,PROXY
  - DOMAIN-SUFFIX,flitto.com,PROXY
  - DOMAIN-SUFFIX,foreignpolicy.com,PROXY
  - DOMAIN-SUFFIX,freebrowser.org,PROXY
  - DOMAIN-SUFFIX,freewechat.com,PROXY
  - DOMAIN-SUFFIX,freeweibo.com,PROXY
  - DOMAIN-SUFFIX,friday.tw,PROXY
  - DOMAIN-SUFFIX,ftchinese.com,PROXY
  - DOMAIN-SUFFIX,ftimg.net,PROXY
  - DOMAIN-SUFFIX,gate.io,PROXY
  - DOMAIN-SUFFIX,getlantern.org,PROXY
  - DOMAIN-SUFFIX,getsync.com,PROXY
  - DOMAIN-SUFFIX,globalvoices.org,PROXY
  - DOMAIN-SUFFIX,goo.ne.jp,PROXY
  - DOMAIN-SUFFIX,goodreads.com,PROXY
  - DOMAIN-SUFFIX,gov,PROXY
  - DOMAIN-SUFFIX,gov.tw,PROXY
  - DOMAIN-SUFFIX,greatfire.org,PROXY
  - DOMAIN-SUFFIX,gumroad.com,PROXY
  - DOMAIN-SUFFIX,hbg.com,PROXY
  - DOMAIN-SUFFIX,heroku.com,PROXY
  - DOMAIN-SUFFIX,hightail.com,PROXY
  - DOMAIN-SUFFIX,hk01.com,PROXY
  - DOMAIN-SUFFIX,hkbf.org,PROXY
  - DOMAIN-SUFFIX,hkbookcity.com,PROXY
  - DOMAIN-SUFFIX,hkej.com,PROXY
  - DOMAIN-SUFFIX,hket.com,PROXY
  - DOMAIN-SUFFIX,hkgolden.com,PROXY
  - DOMAIN-SUFFIX,hootsuite.com,PROXY
  - DOMAIN-SUFFIX,hudson.org,PROXY
  - DOMAIN-SUFFIX,hyread.com.tw,PROXY
  - DOMAIN-SUFFIX,ibtimes.com,PROXY
  - DOMAIN-SUFFIX,i-cable.com,PROXY
  - DOMAIN-SUFFIX,icij.org,PROXY
  - DOMAIN-SUFFIX,icoco.com,PROXY
  - DOMAIN-SUFFIX,imgur.com,PROXY
  - DOMAIN-SUFFIX,initiummall.com,PROXY
  - DOMAIN-SUFFIX,insecam.org,PROXY
  - DOMAIN-SUFFIX,ipfs.io,PROXY
  - DOMAIN-SUFFIX,issuu.com,PROXY
  - DOMAIN-SUFFIX,istockphoto.com,PROXY
  - DOMAIN-SUFFIX,japantimes.co.jp,PROXY
  - DOMAIN-SUFFIX,jiji.com,PROXY
  - DOMAIN-SUFFIX,jinx.com,PROXY
  - DOMAIN-SUFFIX,jkforum.net,PROXY
  - DOMAIN-SUFFIX,joinmastodon.org,PROXY
  - DOMAIN-SUFFIX,justmysocks.net,PROXY
  - DOMAIN-SUFFIX,justpaste.it,PROXY
  - DOMAIN-SUFFIX,kakao.com,PROXY
  - DOMAIN-SUFFIX,kakaocorp.com,PROXY
  - DOMAIN-SUFFIX,kik.com,PROXY
  - DOMAIN-SUFFIX,kobo.com,PROXY
  - DOMAIN-SUFFIX,kobobooks.com,PROXY
  - DOMAIN-SUFFIX,kodingen.com,PROXY
  - DOMAIN-SUFFIX,lemonde.fr,PROXY
  - DOMAIN-SUFFIX,lepoint.fr,PROXY
  - DOMAIN-SUFFIX,lihkg.com,PROXY
  - DOMAIN-SUFFIX,listennotes.com,PROXY
  - DOMAIN-SUFFIX,livestream.com,PROXY
  - DOMAIN-SUFFIX,logmein.com,PROXY
  - DOMAIN-SUFFIX,mail.ru,PROXY
  - DOMAIN-SUFFIX,mailchimp.com,PROXY
  - DOMAIN-SUFFIX,marc.info,PROXY
  - DOMAIN-SUFFIX,matters.news,PROXY
  - DOMAIN-SUFFIX,maying.co,PROXY
  - DOMAIN-SUFFIX,medium.com,PROXY
  - DOMAIN-SUFFIX,mega.nz,PROXY
  - DOMAIN-SUFFIX,mil,PROXY
  - DOMAIN-SUFFIX,mingpao.com,PROXY
  - DOMAIN-SUFFIX,mobile01.com,PROXY
  - DOMAIN-SUFFIX,myspace.com,PROXY
  - DOMAIN-SUFFIX,myspacecdn.com,PROXY
  - DOMAIN-SUFFIX,nanyang.com,PROXY
  - DOMAIN-SUFFIX,naver.com,PROXY
  - DOMAIN-SUFFIX,neowin.net,PROXY
  - DOMAIN-SUFFIX,newstapa.org,PROXY
  - DOMAIN-SUFFIX,nexitally.com,PROXY
  - DOMAIN-SUFFIX,nhk.or.jp,PROXY
  - DOMAIN-SUFFIX,nicovideo.jp,PROXY
  - DOMAIN-SUFFIX,nii.ac.jp,PROXY
  - DOMAIN-SUFFIX,nikkei.com,PROXY
  - DOMAIN-SUFFIX,nofile.io,PROXY
  - DOMAIN-SUFFIX,now.com,PROXY
  - DOMAIN-SUFFIX,nrk.no,PROXY
  - DOMAIN-SUFFIX,nyt.com,PROXY
  - DOMAIN-SUFFIX,nytchina.com,PROXY
  - DOMAIN-SUFFIX,nytcn.me,PROXY
  - DOMAIN-SUFFIX,nytco.com,PROXY
  - DOMAIN-SUFFIX,nytimes.com,PROXY
  - DOMAIN-SUFFIX,nytimg.com,PROXY
  - DOMAIN-SUFFIX,nytlog.com,PROXY
  - DOMAIN-SUFFIX,nytstyle.com,PROXY
  - DOMAIN-SUFFIX,ok.ru,PROXY
  - DOMAIN-SUFFIX,okex.com,PROXY
  - DOMAIN-SUFFIX,on.cc,PROXY
  - DOMAIN-SUFFIX,orientaldaily.com.my,PROXY
  - DOMAIN-SUFFIX,overcast.fm,PROXY
  - DOMAIN-SUFFIX,paltalk.com,PROXY
  - DOMAIN-SUFFIX,pao-pao.net,PROXY
  - DOMAIN-SUFFIX,parsevideo.com,PROXY
  - DOMAIN-SUFFIX,pbxes.com,PROXY
  - DOMAIN-SUFFIX,pcdvd.com.tw,PROXY
  - DOMAIN-SUFFIX,pchome.com.tw,PROXY
  - DOMAIN-SUFFIX,pcloud.com,PROXY
  - DOMAIN-SUFFIX,picacomic.com,PROXY
  - DOMAIN-SUFFIX,pinimg.com,PROXY
  - DOMAIN-SUFFIX,pixiv.net,PROXY
  - DOMAIN-SUFFIX,player.fm,PROXY
  - DOMAIN-SUFFIX,plurk.com,PROXY
  - DOMAIN-SUFFIX,po18.tw,PROXY
  - DOMAIN-SUFFIX,potato.im,PROXY
  - DOMAIN-SUFFIX,potatso.com,PROXY
  - DOMAIN-SUFFIX,prism-break.org,PROXY
  - DOMAIN-SUFFIX,proxifier.com,PROXY
  - DOMAIN-SUFFIX,pt.im,PROXY
  - DOMAIN-SUFFIX,pts.org.tw,PROXY
  - DOMAIN-SUFFIX,pubu.com.tw,PROXY
  - DOMAIN-SUFFIX,pubu.tw,PROXY
  - DOMAIN-SUFFIX,pureapk.com,PROXY
  - DOMAIN-SUFFIX,quora.com,PROXY
  - DOMAIN-SUFFIX,quoracdn.net,PROXY
  - DOMAIN-SUFFIX,rakuten.co.jp,PROXY
  - DOMAIN-SUFFIX,readingtimes.com.tw,PROXY
  - DOMAIN-SUFFIX,readmoo.com,PROXY
  - DOMAIN-SUFFIX,redbubble.com,PROXY
  - DOMAIN-SUFFIX,reddit.com,PROXY
  - DOMAIN-SUFFIX,redditmedia.com,PROXY
  - DOMAIN-SUFFIX,resilio.com,PROXY
  - DOMAIN-SUFFIX,reuters.com,PROXY
  - DOMAIN-SUFFIX,reutersmedia.net,PROXY
  - DOMAIN-SUFFIX,rfi.fr,PROXY
  - DOMAIN-SUFFIX,rixcloud.com,PROXY
  - DOMAIN-SUFFIX,roadshow.hk,PROXY
  - DOMAIN-SUFFIX,scmp.com,PROXY
  - DOMAIN-SUFFIX,scribd.com,PROXY
  - DOMAIN-SUFFIX,seatguru.com,PROXY
  - DOMAIN-SUFFIX,shadowsocks.org,PROXY
  - DOMAIN-SUFFIX,shopee.tw,PROXY
  - DOMAIN-SUFFIX,slideshare.net,PROXY
  - DOMAIN-SUFFIX,softfamous.com,PROXY
  - DOMAIN-SUFFIX,soundcloud.com,PROXY
  - DOMAIN-SUFFIX,ssrcloud.org,PROXY
  - DOMAIN-SUFFIX,startpage.com,PROXY
  - DOMAIN-SUFFIX,steamcommunity.com,PROXY
  - DOMAIN-SUFFIX,steemit.com,PROXY
  - DOMAIN-SUFFIX,steemitwallet.com,PROXY
  - DOMAIN-SUFFIX,t66y.com,PROXY
  - DOMAIN-SUFFIX,tapatalk.com,PROXY
  - DOMAIN-SUFFIX,teco-hk.org,PROXY
  - DOMAIN-SUFFIX,teco-mo.org,PROXY
  - DOMAIN-SUFFIX,teddysun.com,PROXY
  - DOMAIN-SUFFIX,textnow.me,PROXY
  - DOMAIN-SUFFIX,theguardian.com,PROXY
  - DOMAIN-SUFFIX,theinitium.com,PROXY
  - DOMAIN-SUFFIX,thetvdb.com,PROXY
  - DOMAIN-SUFFIX,tineye.com,PROXY
  - DOMAIN-SUFFIX,torproject.org,PROXY
  - DOMAIN-SUFFIX,tumblr.com,PROXY
  - DOMAIN-SUFFIX,turbobit.net,PROXY
  - DOMAIN-SUFFIX,tutanota.com,PROXY
  - DOMAIN-SUFFIX,tvboxnow.com,PROXY
  - DOMAIN-SUFFIX,udn.com,PROXY
  - DOMAIN-SUFFIX,unseen.is,PROXY
  - DOMAIN-SUFFIX,upmedia.mg,PROXY
  - DOMAIN-SUFFIX,uptodown.com,PROXY
  - DOMAIN-SUFFIX,urbandictionary.com,PROXY
  - DOMAIN-SUFFIX,ustream.tv,PROXY
  - DOMAIN-SUFFIX,uwants.com,PROXY
  - DOMAIN-SUFFIX,v2ray.com,PROXY
  - DOMAIN-SUFFIX,viber.com,PROXY
  - DOMAIN-SUFFIX,videopress.com,PROXY
  - DOMAIN-SUFFIX,vimeo.com,PROXY
  - DOMAIN-SUFFIX,voachinese.com,PROXY
  - DOMAIN-SUFFIX,voanews.com,PROXY
  - DOMAIN-SUFFIX,voxer.com,PROXY
  - DOMAIN-SUFFIX,vzw.com,PROXY
  - DOMAIN-SUFFIX,w3schools.com,PROXY
  - DOMAIN-SUFFIX,washingtonpost.com,PROXY
  - DOMAIN-SUFFIX,wattpad.com,PROXY
  - DOMAIN-SUFFIX,whoer.net,PROXY
  - DOMAIN-SUFFIX,wikimapia.org,PROXY
  - DOMAIN-SUFFIX,wikipedia.org,PROXY
  - DOMAIN-SUFFIX,wikiquote.org,PROXY
  - DOMAIN-SUFFIX,wikiwand.com,PROXY
  - DOMAIN-SUFFIX,winudf.com,PROXY
  - DOMAIN-SUFFIX,wire.com,PROXY
  - DOMAIN-SUFFIX,wordpress.com,PROXY
  - DOMAIN-SUFFIX,workflow.is,PROXY
  - DOMAIN-SUFFIX,worldcat.org,PROXY
  - DOMAIN-SUFFIX,wsj.com,PROXY
  - DOMAIN-SUFFIX,wsj.net,PROXY
  - DOMAIN-SUFFIX,xhamster.com,PROXY
  - DOMAIN-SUFFIX,xn--90wwvt03e.com,PROXY
  - DOMAIN-SUFFIX,xn--i2ru8q2qg.com,PROXY
  - DOMAIN-SUFFIX,xnxx.com,PROXY
  - DOMAIN-SUFFIX,xvideos.com,PROXY
  - DOMAIN-SUFFIX,yahoo.com,PROXY
  - DOMAIN-SUFFIX,yandex.ru,PROXY
  - DOMAIN-SUFFIX,ycombinator.com,PROXY
  - DOMAIN-SUFFIX,yesasia.com,PROXY
  - DOMAIN-SUFFIX,yes-news.com,PROXY
  - DOMAIN-SUFFIX,yomiuri.co.jp,PROXY
  - DOMAIN-SUFFIX,you-get.org,PROXY
  - DOMAIN-SUFFIX,zaobao.com,PROXY
  - DOMAIN-SUFFIX,zb.com,PROXY
  - DOMAIN-SUFFIX,zello.com,PROXY
  - DOMAIN-SUFFIX,zeronet.io,PROXY
  - DOMAIN-SUFFIX,zoom.us,PROXY
  - DOMAIN-KEYWORD,github,PROXY
  - DOMAIN-KEYWORD,jav,PROXY
  - DOMAIN-KEYWORD,pinterest,PROXY
  - DOMAIN-KEYWORD,porn,PROXY
  - DOMAIN-KEYWORD,wikileaks,PROXY
  - DOMAIN-SUFFIX,apartmentratings.com,PROXY
  - DOMAIN-SUFFIX,apartments.com,PROXY
  - DOMAIN-SUFFIX,bankmobilevibe.com,PROXY
  - DOMAIN-SUFFIX,bing.com,PROXY
  - DOMAIN-SUFFIX,booktopia.com.au,PROXY
  - DOMAIN-SUFFIX,cccat.io,PROXY
  - DOMAIN-SUFFIX,centauro.com.br,PROXY
  - DOMAIN-SUFFIX,clearsurance.com,PROXY
  - DOMAIN-SUFFIX,costco.com,PROXY
  - DOMAIN-SUFFIX,crackle.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.cn,PROXY
  - DOMAIN-SUFFIX,dish.com,PROXY
  - DOMAIN-SUFFIX,dmm.co.jp,PROXY
  - DOMAIN-SUFFIX,dmm.com,PROXY
  - DOMAIN-SUFFIX,dnvod.tv,PROXY
  - DOMAIN-SUFFIX,esurance.com,PROXY
  - DOMAIN-SUFFIX,extmatrix.com,PROXY
  - DOMAIN-SUFFIX,fastpic.ru,PROXY
  - DOMAIN-SUFFIX,flipboard.com,PROXY
  - DOMAIN-SUFFIX,fnac.be,PROXY
  - DOMAIN-SUFFIX,fnac.com,PROXY
  - DOMAIN-SUFFIX,funkyimg.com,PROXY
  - DOMAIN-SUFFIX,fxnetworks.com,PROXY
  - DOMAIN-SUFFIX,gettyimages.com,PROXY
  - DOMAIN-SUFFIX,go.com,PROXY
  - DOMAIN-SUFFIX,here.com,PROXY
  - DOMAIN-SUFFIX,jcpenney.com,PROXY
  - DOMAIN-SUFFIX,jiehua.tv,PROXY
  - DOMAIN-SUFFIX,mailfence.com,PROXY
  - DOMAIN-SUFFIX,nationwide.com,PROXY
  - DOMAIN-SUFFIX,nbc.com,PROXY
  - DOMAIN-SUFFIX,nexon.com,PROXY
  - DOMAIN-SUFFIX,nordstrom.com,PROXY
  - DOMAIN-SUFFIX,nordstromimage.com,PROXY
  - DOMAIN-SUFFIX,nordstromrack.com,PROXY
  - DOMAIN-SUFFIX,superpages.com,PROXY
  - DOMAIN-SUFFIX,target.com,PROXY
  - DOMAIN-SUFFIX,thinkgeek.com,PROXY
  - DOMAIN-SUFFIX,tracfone.com,PROXY
  - DOMAIN-SUFFIX,unity3d.com,PROXY
  - DOMAIN-SUFFIX,uploader.jp,PROXY
  - DOMAIN-SUFFIX,vevo.com,PROXY
  - DOMAIN-SUFFIX,viu.tv,PROXY
  - DOMAIN-SUFFIX,vk.com,PROXY
  - DOMAIN-SUFFIX,vsco.co,PROXY
  - DOMAIN-SUFFIX,xfinity.com,PROXY
  - DOMAIN-SUFFIX,zattoo.com,PROXY
  - DOMAIN,testflight.apple.com,PROXY
  - DOMAIN-SUFFIX,appsto.re,PROXY
  - DOMAIN,books.itunes.apple.com,PROXY
  - DOMAIN,hls.itunes.apple.com,PROXY
  - DOMAIN,apps.apple.com,PROXY
  - DOMAIN,itunes.apple.com,PROXY
  - DOMAIN,api-glb-sea.smoot.apple.com,PROXY
  - DOMAIN,lookup-api.apple.com,PROXY
  - PROCESS-NAME,LookupViewService,PROXY
  - DOMAIN,gspe1-ssl.ls.apple.com,PROXY
  - PROCESS-NAME,News,PROXY
  - DOMAIN-SUFFIX,apple.news,PROXY
  - DOMAIN,news-client.apple.com,PROXY
  - DOMAIN,news-edge.apple.com,PROXY
  - DOMAIN,news-events.apple.com,PROXY
  - DOMAIN,apple.comscoreresearch.com,PROXY
  - DOMAIN-SUFFIX,abc.xyz,PROXY
  - DOMAIN-SUFFIX,android.com,PROXY
  - DOMAIN-SUFFIX,androidify.com,PROXY
  - DOMAIN-SUFFIX,dialogflow.com,PROXY
  - DOMAIN-SUFFIX,autodraw.com,PROXY
  - DOMAIN-SUFFIX,capitalg.com,PROXY
  - DOMAIN-SUFFIX,certificate-transparency.org,PROXY
  - DOMAIN-SUFFIX,chrome.com,PROXY
  - DOMAIN-SUFFIX,chromeexperiments.com,PROXY
  - DOMAIN-SUFFIX,chromestatus.com,PROXY
  - DOMAIN-SUFFIX,chromium.org,PROXY
  - DOMAIN-SUFFIX,creativelab5.com,PROXY
  - DOMAIN-SUFFIX,debug.com,PROXY
  - DOMAIN-SUFFIX,deepmind.com,PROXY
  - DOMAIN-SUFFIX,firebaseio.com,PROXY
  - DOMAIN-SUFFIX,getmdl.io,PROXY
  - DOMAIN-SUFFIX,ggpht.com,PROXY
  - DOMAIN-SUFFIX,gmail.com,PROXY
  - DOMAIN-SUFFIX,gmodules.com,PROXY
  - DOMAIN-SUFFIX,godoc.org,PROXY
  - DOMAIN-SUFFIX,golang.org,PROXY
  - DOMAIN-SUFFIX,gstatic.com,PROXY
  - DOMAIN-SUFFIX,gv.com,PROXY
  - DOMAIN-SUFFIX,gwtproject.org,PROXY
  - DOMAIN-SUFFIX,itasoftware.com,PROXY
  - DOMAIN-SUFFIX,madewithcode.com,PROXY
  - DOMAIN-SUFFIX,material.io,PROXY
  - DOMAIN-SUFFIX,polymer-project.org,PROXY
  - DOMAIN-SUFFIX,admin.recaptcha.net,PROXY
  - DOMAIN-SUFFIX,recaptcha.net,PROXY
  - DOMAIN-SUFFIX,shattered.io,PROXY
  - DOMAIN-SUFFIX,synergyse.com,PROXY
  - DOMAIN-SUFFIX,tensorflow.org,PROXY
  - DOMAIN-SUFFIX,tfhub.dev,PROXY
  - DOMAIN-SUFFIX,tiltbrush.com,PROXY
  - DOMAIN-SUFFIX,waveprotocol.org,PROXY
  - DOMAIN-SUFFIX,waymo.com,PROXY
  - DOMAIN-SUFFIX,webmproject.org,PROXY
  - DOMAIN-SUFFIX,webrtc.org,PROXY
  - DOMAIN-SUFFIX,whatbrowser.org,PROXY
  - DOMAIN-SUFFIX,widevine.com,PROXY
  - DOMAIN-SUFFIX,x.company,PROXY
  - DOMAIN-SUFFIX,youtu.be,PROXY
  - DOMAIN-SUFFIX,yt.be,PROXY
  - DOMAIN-SUFFIX,ytimg.com,PROXY
  - DOMAIN-SUFFIX,1drv.com,PROXY
  - DOMAIN-SUFFIX,1drv.ms,PROXY
  - DOMAIN-SUFFIX,blob.core.windows.net,PROXY
  - DOMAIN-SUFFIX,livefilestore.com,PROXY
  - DOMAIN-SUFFIX,onedrive.com,PROXY
  - DOMAIN-SUFFIX,storage.live.com,PROXY
  - DOMAIN-SUFFIX,storage.msn.com,PROXY
  - DOMAIN,oneclient.sfx.ms,PROXY
  - DOMAIN-SUFFIX,0rz.tw,PROXY
  - DOMAIN-SUFFIX,4bluestones.biz,PROXY
  - DOMAIN-SUFFIX,9bis.net,PROXY
  - DOMAIN-SUFFIX,allconnected.co,PROXY
  - DOMAIN-SUFFIX,aol.com,PROXY
  - DOMAIN-SUFFIX,bcc.com.tw,PROXY
  - DOMAIN-SUFFIX,bit.ly,PROXY
  - DOMAIN-SUFFIX,bitshare.com,PROXY
  - DOMAIN-SUFFIX,blog.jp,PROXY
  - DOMAIN-SUFFIX,blogimg.jp,PROXY
  - DOMAIN-SUFFIX,blogtd.org,PROXY
  - DOMAIN-SUFFIX,broadcast.co.nz,PROXY
  - DOMAIN-SUFFIX,camfrog.com,PROXY
  - DOMAIN-SUFFIX,cfos.de,PROXY
  - DOMAIN-SUFFIX,citypopulation.de,PROXY
  - DOMAIN-SUFFIX,cloudfront.net,PROXY
  - DOMAIN-SUFFIX,ctitv.com.tw,PROXY
  - DOMAIN-SUFFIX,cuhk.edu.hk,PROXY
  - DOMAIN-SUFFIX,cusu.hk,PROXY
  - DOMAIN-SUFFIX,discord.gg,PROXY
  - DOMAIN-SUFFIX,discuss.com.hk,PROXY
  - DOMAIN-SUFFIX,dropboxapi.com,PROXY
  - DOMAIN-SUFFIX,duolingo.cn,PROXY
  - DOMAIN-SUFFIX,edditstatic.com,PROXY
  - DOMAIN-SUFFIX,flickriver.com,PROXY
  - DOMAIN-SUFFIX,focustaiwan.tw,PROXY
  - DOMAIN-SUFFIX,free.fr,PROXY
  - DOMAIN-SUFFIX,gigacircle.com,PROXY
  - DOMAIN-SUFFIX,hk-pub.com,PROXY
  - DOMAIN-SUFFIX,hosting.co.uk,PROXY
  - DOMAIN-SUFFIX,hwcdn.net,PROXY
  - DOMAIN-SUFFIX,ifixit.com,PROXY
  - DOMAIN-SUFFIX,iphone4hongkong.com,PROXY
  - DOMAIN-SUFFIX,iphonetaiwan.org,PROXY
  - DOMAIN-SUFFIX,iptvbin.com,PROXY
  - DOMAIN-SUFFIX,jtvnw.net,PROXY
  - DOMAIN-SUFFIX,linksalpha.com,PROXY
  - DOMAIN-SUFFIX,manyvids.com,PROXY
  - DOMAIN-SUFFIX,myactimes.com,PROXY
  - DOMAIN-SUFFIX,newsblur.com,PROXY
  - DOMAIN-SUFFIX,now.im,PROXY
  - DOMAIN-SUFFIX,nowe.com,PROXY
  - DOMAIN-SUFFIX,redditlist.com,PROXY
  - DOMAIN-SUFFIX,s3.amazonaws.com,PROXY
  - DOMAIN-SUFFIX,signal.org,PROXY
  - DOMAIN-SUFFIX,smartmailcloud.com,PROXY
  - DOMAIN-SUFFIX,sparknotes.com,PROXY
  - DOMAIN-SUFFIX,streetvoice.com,PROXY
  - DOMAIN-SUFFIX,supertop.co,PROXY
  - DOMAIN-SUFFIX,tv.com,PROXY
  - DOMAIN-SUFFIX,typepad.com,PROXY
  - DOMAIN-SUFFIX,udnbkk.com,PROXY
  - DOMAIN-SUFFIX,urbanairship.com,PROXY
  - DOMAIN-SUFFIX,whispersystems.org,PROXY
  - DOMAIN-SUFFIX,wikia.com,PROXY
  - DOMAIN-SUFFIX,wn.com,PROXY
  - DOMAIN-SUFFIX,wolframalpha.com,PROXY
  - DOMAIN-SUFFIX,x-art.com,PROXY
  - DOMAIN-SUFFIX,yimg.com,PROXY
  - DOMAIN,api.steampowered.com,PROXY
  - DOMAIN,store.steampowered.com,PROXY
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,fdm,DIRECT
  - PROCESS-NAME,Folx,DIRECT
  - PROCESS-NAME,NetTransport,DIRECT
  - PROCESS-NAME,Thunder,DIRECT
  - PROCESS-NAME,Transmission,DIRECT
  - PROCESS-NAME,uTorrent,DIRECT
  - PROCESS-NAME,WebTorrent,DIRECT
  - PROCESS-NAME,WebTorrent Helper,DIRECT
  - PROCESS-NAME,DownloadService,DIRECT
  - PROCESS-NAME,Weiyun,DIRECT
  - DOMAIN-KEYWORD,aria2,DIRECT
  - DOMAIN-KEYWORD,xunlei,DIRECT
  - DOMAIN-KEYWORD,yunpan,DIRECT
  - DOMAIN-KEYWORD,Thunder,DIRECT
  - DOMAIN-KEYWORD,XLLiveUD,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,Outsite
proxies:
  - name: 127.0.0.1:8787
    server: 127.0.0.1:8787
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-all.xn--b6gac.eu.org
    server: cdn-all.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.xn--b6gac.eu.org
    server: cdn.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-b100.xn--b6gac.eu.org
    server: cdn-b100.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: edgetunnel.anycast.eu.org
    server: edgetunnel.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.anycast.eu.org
    server: cdn.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
```

### 传入一个远程 clash.meta 的 profiles 地址，给其添加多个 vless 节点，并添加一个包含上述节点的策略组，若新加的节点或策略组名在原配置中存在，会用时间戳拼接保证原配置不被覆盖

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3?type=clash.meta&profiles=http%3A%2F%2F127.0.0.1%3A8787%2F0b87fff8-ed16-4269-b53b-4aa9a01682a3%3Ftype%3Dclash.meta`
- profiles 参数传入 encode 后的远程订阅即可
- 在线 url encode https://www.urlencoder.org
- QUERY:

```ts
type Query = {
	type?: 'clash.meta' /** 控制是否返回clash.meta可订阅的配置 */;
	profiles?: string /** 需要进行包装的clash.meta的进行urlencode后的配置地址，将用传入的远程配置为模板，只添加新的vless节点及策略组 */;
};
```

#### Response

- Body

```yaml
port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info
external-controller: ':9090'
proxy-groups:
  - name: Vless:127.0.0.1:8787:1689259352655
    type: select
    proxies:
      - 127.0.0.1:8787:1689259352655
      - cdn-all.xn--b6gac.eu.org:1689259352655
      - cdn.xn--b6gac.eu.org:1689259352655
      - cdn-b100.xn--b6gac.eu.org:1689259352655
      - edgetunnel.anycast.eu.org:1689259352655
      - cdn.anycast.eu.org:1689259352655
  - name: Vless:127.0.0.1:8787
    type: select
    proxies:
      - 127.0.0.1:8787
      - cdn-all.xn--b6gac.eu.org
      - cdn.xn--b6gac.eu.org
      - cdn-b100.xn--b6gac.eu.org
      - edgetunnel.anycast.eu.org
      - cdn.anycast.eu.org
  - name: PROXY
    type: select
    proxies:
      - Vless:127.0.0.1:8787
      - DIRECT
  - name: Outsite
    type: select
    proxies:
      - PROXY
      - DIRECT
  - name: Telegram
    type: select
    proxies:
      - PROXY
      - DIRECT
rules:
  - DOMAIN-SUFFIX,local,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,100.64.0.0/10,DIRECT,no-resolve
  - IP-CIDR6,::1/128,DIRECT,no-resolve
  - IP-CIDR6,fc00::/7,DIRECT,no-resolve
  - IP-CIDR6,fe80::/10,DIRECT,no-resolve
  - IP-CIDR6,fd00::/8,DIRECT,no-resolve
  - DOMAIN-SUFFIX,t.me,Telegram
  - DOMAIN-SUFFIX,tx.me,Telegram
  - DOMAIN-SUFFIX,tdesktop.com,Telegram
  - DOMAIN-SUFFIX,telegra.ph,Telegram
  - DOMAIN-SUFFIX,telegram.me,Telegram
  - DOMAIN-SUFFIX,telegram.org,Telegram
  - IP-CIDR,91.108.0.0/16,Telegram,no-resolve
  - IP-CIDR,109.239.140.0/24,Telegram,no-resolve
  - IP-CIDR,149.154.160.0/20,Telegram,no-resolve
  - IP-CIDR6,2001:67c:4e8::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23d::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23f::/48,Telegram,no-resolve
  - DOMAIN-SUFFIX,linkedin.com,PROXY
  - DOMAIN-SUFFIX,appspot.com,PROXY
  - DOMAIN-SUFFIX,blogger.com,PROXY
  - DOMAIN-SUFFIX,getoutline.org,PROXY
  - DOMAIN-SUFFIX,gvt0.com,PROXY
  - DOMAIN-SUFFIX,gvt1.com,PROXY
  - DOMAIN-SUFFIX,gvt3.com,PROXY
  - DOMAIN-SUFFIX,xn--ngstr-lra8j.com,PROXY
  - DOMAIN-KEYWORD,google,PROXY
  - DOMAIN-KEYWORD,blogspot,PROXY
  - DOMAIN-SUFFIX,onedrive.live.com,PROXY
  - DOMAIN-SUFFIX,xboxlive.com,PROXY
  - DOMAIN-SUFFIX,cdninstagram.com,PROXY
  - DOMAIN-SUFFIX,fb.com,PROXY
  - DOMAIN-SUFFIX,fb.me,PROXY
  - DOMAIN-SUFFIX,fbaddins.com,PROXY
  - DOMAIN-SUFFIX,fbcdn.net,PROXY
  - DOMAIN-SUFFIX,fbsbx.com,PROXY
  - DOMAIN-SUFFIX,fbworkmail.com,PROXY
  - DOMAIN-SUFFIX,instagram.com,PROXY
  - DOMAIN-SUFFIX,m.me,PROXY
  - DOMAIN-SUFFIX,messenger.com,PROXY
  - DOMAIN-SUFFIX,oculus.com,PROXY
  - DOMAIN-SUFFIX,oculuscdn.com,PROXY
  - DOMAIN-SUFFIX,rocksdb.org,PROXY
  - DOMAIN-SUFFIX,whatsapp.com,PROXY
  - DOMAIN-SUFFIX,whatsapp.net,PROXY
  - DOMAIN-KEYWORD,facebook,PROXY
  - IP-CIDR,3.123.36.126/32,PROXY,no-resolve
  - IP-CIDR,35.157.215.84/32,PROXY,no-resolve
  - IP-CIDR,35.157.217.255/32,PROXY,no-resolve
  - IP-CIDR,52.58.209.134/32,PROXY,no-resolve
  - IP-CIDR,54.93.124.31/32,PROXY,no-resolve
  - IP-CIDR,54.162.243.80/32,PROXY,no-resolve
  - IP-CIDR,54.173.34.141/32,PROXY,no-resolve
  - IP-CIDR,54.235.23.242/32,PROXY,no-resolve
  - IP-CIDR,169.45.248.118/32,PROXY,no-resolve
  - DOMAIN-SUFFIX,pscp.tv,PROXY
  - DOMAIN-SUFFIX,periscope.tv,PROXY
  - DOMAIN-SUFFIX,t.co,PROXY
  - DOMAIN-SUFFIX,twimg.co,PROXY
  - DOMAIN-SUFFIX,twimg.com,PROXY
  - DOMAIN-SUFFIX,twitpic.com,PROXY
  - DOMAIN-SUFFIX,vine.co,PROXY
  - DOMAIN-KEYWORD,twitter,PROXY
  - DOMAIN-SUFFIX,t.me,PROXY
  - DOMAIN-SUFFIX,tdesktop.com,PROXY
  - DOMAIN-SUFFIX,telegra.ph,PROXY
  - DOMAIN-SUFFIX,telegram.me,PROXY
  - DOMAIN-SUFFIX,telegram.org,PROXY
  - IP-CIDR,91.108.4.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.8.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.12.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.16.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.56.0/22,PROXY,no-resolve
  - IP-CIDR,149.154.160.0/20,PROXY,no-resolve
  - DOMAIN-SUFFIX,line.me,PROXY
  - DOMAIN-SUFFIX,line-apps.com,PROXY
  - DOMAIN-SUFFIX,line-scdn.net,PROXY
  - DOMAIN-SUFFIX,naver.jp,PROXY
  - IP-CIDR,103.2.30.0/23,PROXY,no-resolve
  - IP-CIDR,125.209.208.0/20,PROXY,no-resolve
  - IP-CIDR,147.92.128.0/17,PROXY,no-resolve
  - IP-CIDR,203.104.144.0/21,PROXY,no-resolve
  - DOMAIN-SUFFIX,4shared.com,PROXY
  - DOMAIN-SUFFIX,520cc.cc,PROXY
  - DOMAIN-SUFFIX,881903.com,PROXY
  - DOMAIN-SUFFIX,9cache.com,PROXY
  - DOMAIN-SUFFIX,9gag.com,PROXY
  - DOMAIN-SUFFIX,abc.com,PROXY
  - DOMAIN-SUFFIX,abc.net.au,PROXY
  - DOMAIN-SUFFIX,abebooks.com,PROXY
  - DOMAIN-SUFFIX,amazon.co.jp,PROXY
  - DOMAIN-SUFFIX,apigee.com,PROXY
  - DOMAIN-SUFFIX,apk-dl.com,PROXY
  - DOMAIN-SUFFIX,apkfind.com,PROXY
  - DOMAIN-SUFFIX,apkmirror.com,PROXY
  - DOMAIN-SUFFIX,apkmonk.com,PROXY
  - DOMAIN-SUFFIX,apkpure.com,PROXY
  - DOMAIN-SUFFIX,aptoide.com,PROXY
  - DOMAIN-SUFFIX,archive.is,PROXY
  - DOMAIN-SUFFIX,archive.org,PROXY
  - DOMAIN-SUFFIX,arte.tv,PROXY
  - DOMAIN-SUFFIX,artstation.com,PROXY
  - DOMAIN-SUFFIX,arukas.io,PROXY
  - DOMAIN-SUFFIX,ask.com,PROXY
  - DOMAIN-SUFFIX,avg.com,PROXY
  - DOMAIN-SUFFIX,avgle.com,PROXY
  - DOMAIN-SUFFIX,badoo.com,PROXY
  - DOMAIN-SUFFIX,bandwagonhost.com,PROXY
  - DOMAIN-SUFFIX,bbc.com,PROXY
  - DOMAIN-SUFFIX,behance.net,PROXY
  - DOMAIN-SUFFIX,bibox.com,PROXY
  - DOMAIN-SUFFIX,biggo.com.tw,PROXY
  - DOMAIN-SUFFIX,binance.com,PROXY
  - DOMAIN-SUFFIX,bitcointalk.org,PROXY
  - DOMAIN-SUFFIX,bitfinex.com,PROXY
  - DOMAIN-SUFFIX,bitmex.com,PROXY
  - DOMAIN-SUFFIX,bit-z.com,PROXY
  - DOMAIN-SUFFIX,bloglovin.com,PROXY
  - DOMAIN-SUFFIX,bloomberg.cn,PROXY
  - DOMAIN-SUFFIX,bloomberg.com,PROXY
  - DOMAIN-SUFFIX,blubrry.com,PROXY
  - DOMAIN-SUFFIX,book.com.tw,PROXY
  - DOMAIN-SUFFIX,booklive.jp,PROXY
  - DOMAIN-SUFFIX,books.com.tw,PROXY
  - DOMAIN-SUFFIX,boslife.net,PROXY
  - DOMAIN-SUFFIX,box.com,PROXY
  - DOMAIN-SUFFIX,businessinsider.com,PROXY
  - DOMAIN-SUFFIX,bwh1.net,PROXY
  - DOMAIN-SUFFIX,castbox.fm,PROXY
  - DOMAIN-SUFFIX,cbc.ca,PROXY
  - DOMAIN-SUFFIX,cdw.com,PROXY
  - DOMAIN-SUFFIX,change.org,PROXY
  - DOMAIN-SUFFIX,channelnewsasia.com,PROXY
  - DOMAIN-SUFFIX,ck101.com,PROXY
  - DOMAIN-SUFFIX,clarionproject.org,PROXY
  - DOMAIN-SUFFIX,clyp.it,PROXY
  - DOMAIN-SUFFIX,cna.com.tw,PROXY
  - DOMAIN-SUFFIX,comparitech.com,PROXY
  - DOMAIN-SUFFIX,conoha.jp,PROXY
  - DOMAIN-SUFFIX,crucial.com,PROXY
  - DOMAIN-SUFFIX,cts.com.tw,PROXY
  - DOMAIN-SUFFIX,cw.com.tw,PROXY
  - DOMAIN-SUFFIX,cyberctm.com,PROXY
  - DOMAIN-SUFFIX,dailymotion.com,PROXY
  - DOMAIN-SUFFIX,dailyview.tw,PROXY
  - DOMAIN-SUFFIX,daum.net,PROXY
  - DOMAIN-SUFFIX,daumcdn.net,PROXY
  - DOMAIN-SUFFIX,dcard.tw,PROXY
  - DOMAIN-SUFFIX,deepdiscount.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.com,PROXY
  - DOMAIN-SUFFIX,deviantart.com,PROXY
  - DOMAIN-SUFFIX,disconnect.me,PROXY
  - DOMAIN-SUFFIX,discordapp.com,PROXY
  - DOMAIN-SUFFIX,discordapp.net,PROXY
  - DOMAIN-SUFFIX,disqus.com,PROXY
  - DOMAIN-SUFFIX,dlercloud.com,PROXY
  - DOMAIN-SUFFIX,dns2go.com,PROXY
  - DOMAIN-SUFFIX,dowjones.com,PROXY
  - DOMAIN-SUFFIX,dropbox.com,PROXY
  - DOMAIN-SUFFIX,dropboxusercontent.com,PROXY
  - DOMAIN-SUFFIX,duckduckgo.com,PROXY
  - DOMAIN-SUFFIX,dw.com,PROXY
  - DOMAIN-SUFFIX,dynu.com,PROXY
  - DOMAIN-SUFFIX,earthcam.com,PROXY
  - DOMAIN-SUFFIX,ebookservice.tw,PROXY
  - DOMAIN-SUFFIX,economist.com,PROXY
  - DOMAIN-SUFFIX,edgecastcdn.net,PROXY
  - DOMAIN-SUFFIX,edu,PROXY
  - DOMAIN-SUFFIX,elpais.com,PROXY
  - DOMAIN-SUFFIX,enanyang.my,PROXY
  - DOMAIN-SUFFIX,encyclopedia.com,PROXY
  - DOMAIN-SUFFIX,esoir.be,PROXY
  - DOMAIN-SUFFIX,etherscan.io,PROXY
  - DOMAIN-SUFFIX,euronews.com,PROXY
  - DOMAIN-SUFFIX,evozi.com,PROXY
  - DOMAIN-SUFFIX,feedly.com,PROXY
  - DOMAIN-SUFFIX,firech.at,PROXY
  - DOMAIN-SUFFIX,flickr.com,PROXY
  - DOMAIN-SUFFIX,flitto.com,PROXY
  - DOMAIN-SUFFIX,foreignpolicy.com,PROXY
  - DOMAIN-SUFFIX,freebrowser.org,PROXY
  - DOMAIN-SUFFIX,freewechat.com,PROXY
  - DOMAIN-SUFFIX,freeweibo.com,PROXY
  - DOMAIN-SUFFIX,friday.tw,PROXY
  - DOMAIN-SUFFIX,ftchinese.com,PROXY
  - DOMAIN-SUFFIX,ftimg.net,PROXY
  - DOMAIN-SUFFIX,gate.io,PROXY
  - DOMAIN-SUFFIX,getlantern.org,PROXY
  - DOMAIN-SUFFIX,getsync.com,PROXY
  - DOMAIN-SUFFIX,globalvoices.org,PROXY
  - DOMAIN-SUFFIX,goo.ne.jp,PROXY
  - DOMAIN-SUFFIX,goodreads.com,PROXY
  - DOMAIN-SUFFIX,gov,PROXY
  - DOMAIN-SUFFIX,gov.tw,PROXY
  - DOMAIN-SUFFIX,greatfire.org,PROXY
  - DOMAIN-SUFFIX,gumroad.com,PROXY
  - DOMAIN-SUFFIX,hbg.com,PROXY
  - DOMAIN-SUFFIX,heroku.com,PROXY
  - DOMAIN-SUFFIX,hightail.com,PROXY
  - DOMAIN-SUFFIX,hk01.com,PROXY
  - DOMAIN-SUFFIX,hkbf.org,PROXY
  - DOMAIN-SUFFIX,hkbookcity.com,PROXY
  - DOMAIN-SUFFIX,hkej.com,PROXY
  - DOMAIN-SUFFIX,hket.com,PROXY
  - DOMAIN-SUFFIX,hkgolden.com,PROXY
  - DOMAIN-SUFFIX,hootsuite.com,PROXY
  - DOMAIN-SUFFIX,hudson.org,PROXY
  - DOMAIN-SUFFIX,hyread.com.tw,PROXY
  - DOMAIN-SUFFIX,ibtimes.com,PROXY
  - DOMAIN-SUFFIX,i-cable.com,PROXY
  - DOMAIN-SUFFIX,icij.org,PROXY
  - DOMAIN-SUFFIX,icoco.com,PROXY
  - DOMAIN-SUFFIX,imgur.com,PROXY
  - DOMAIN-SUFFIX,initiummall.com,PROXY
  - DOMAIN-SUFFIX,insecam.org,PROXY
  - DOMAIN-SUFFIX,ipfs.io,PROXY
  - DOMAIN-SUFFIX,issuu.com,PROXY
  - DOMAIN-SUFFIX,istockphoto.com,PROXY
  - DOMAIN-SUFFIX,japantimes.co.jp,PROXY
  - DOMAIN-SUFFIX,jiji.com,PROXY
  - DOMAIN-SUFFIX,jinx.com,PROXY
  - DOMAIN-SUFFIX,jkforum.net,PROXY
  - DOMAIN-SUFFIX,joinmastodon.org,PROXY
  - DOMAIN-SUFFIX,justmysocks.net,PROXY
  - DOMAIN-SUFFIX,justpaste.it,PROXY
  - DOMAIN-SUFFIX,kakao.com,PROXY
  - DOMAIN-SUFFIX,kakaocorp.com,PROXY
  - DOMAIN-SUFFIX,kik.com,PROXY
  - DOMAIN-SUFFIX,kobo.com,PROXY
  - DOMAIN-SUFFIX,kobobooks.com,PROXY
  - DOMAIN-SUFFIX,kodingen.com,PROXY
  - DOMAIN-SUFFIX,lemonde.fr,PROXY
  - DOMAIN-SUFFIX,lepoint.fr,PROXY
  - DOMAIN-SUFFIX,lihkg.com,PROXY
  - DOMAIN-SUFFIX,listennotes.com,PROXY
  - DOMAIN-SUFFIX,livestream.com,PROXY
  - DOMAIN-SUFFIX,logmein.com,PROXY
  - DOMAIN-SUFFIX,mail.ru,PROXY
  - DOMAIN-SUFFIX,mailchimp.com,PROXY
  - DOMAIN-SUFFIX,marc.info,PROXY
  - DOMAIN-SUFFIX,matters.news,PROXY
  - DOMAIN-SUFFIX,maying.co,PROXY
  - DOMAIN-SUFFIX,medium.com,PROXY
  - DOMAIN-SUFFIX,mega.nz,PROXY
  - DOMAIN-SUFFIX,mil,PROXY
  - DOMAIN-SUFFIX,mingpao.com,PROXY
  - DOMAIN-SUFFIX,mobile01.com,PROXY
  - DOMAIN-SUFFIX,myspace.com,PROXY
  - DOMAIN-SUFFIX,myspacecdn.com,PROXY
  - DOMAIN-SUFFIX,nanyang.com,PROXY
  - DOMAIN-SUFFIX,naver.com,PROXY
  - DOMAIN-SUFFIX,neowin.net,PROXY
  - DOMAIN-SUFFIX,newstapa.org,PROXY
  - DOMAIN-SUFFIX,nexitally.com,PROXY
  - DOMAIN-SUFFIX,nhk.or.jp,PROXY
  - DOMAIN-SUFFIX,nicovideo.jp,PROXY
  - DOMAIN-SUFFIX,nii.ac.jp,PROXY
  - DOMAIN-SUFFIX,nikkei.com,PROXY
  - DOMAIN-SUFFIX,nofile.io,PROXY
  - DOMAIN-SUFFIX,now.com,PROXY
  - DOMAIN-SUFFIX,nrk.no,PROXY
  - DOMAIN-SUFFIX,nyt.com,PROXY
  - DOMAIN-SUFFIX,nytchina.com,PROXY
  - DOMAIN-SUFFIX,nytcn.me,PROXY
  - DOMAIN-SUFFIX,nytco.com,PROXY
  - DOMAIN-SUFFIX,nytimes.com,PROXY
  - DOMAIN-SUFFIX,nytimg.com,PROXY
  - DOMAIN-SUFFIX,nytlog.com,PROXY
  - DOMAIN-SUFFIX,nytstyle.com,PROXY
  - DOMAIN-SUFFIX,ok.ru,PROXY
  - DOMAIN-SUFFIX,okex.com,PROXY
  - DOMAIN-SUFFIX,on.cc,PROXY
  - DOMAIN-SUFFIX,orientaldaily.com.my,PROXY
  - DOMAIN-SUFFIX,overcast.fm,PROXY
  - DOMAIN-SUFFIX,paltalk.com,PROXY
  - DOMAIN-SUFFIX,pao-pao.net,PROXY
  - DOMAIN-SUFFIX,parsevideo.com,PROXY
  - DOMAIN-SUFFIX,pbxes.com,PROXY
  - DOMAIN-SUFFIX,pcdvd.com.tw,PROXY
  - DOMAIN-SUFFIX,pchome.com.tw,PROXY
  - DOMAIN-SUFFIX,pcloud.com,PROXY
  - DOMAIN-SUFFIX,picacomic.com,PROXY
  - DOMAIN-SUFFIX,pinimg.com,PROXY
  - DOMAIN-SUFFIX,pixiv.net,PROXY
  - DOMAIN-SUFFIX,player.fm,PROXY
  - DOMAIN-SUFFIX,plurk.com,PROXY
  - DOMAIN-SUFFIX,po18.tw,PROXY
  - DOMAIN-SUFFIX,potato.im,PROXY
  - DOMAIN-SUFFIX,potatso.com,PROXY
  - DOMAIN-SUFFIX,prism-break.org,PROXY
  - DOMAIN-SUFFIX,proxifier.com,PROXY
  - DOMAIN-SUFFIX,pt.im,PROXY
  - DOMAIN-SUFFIX,pts.org.tw,PROXY
  - DOMAIN-SUFFIX,pubu.com.tw,PROXY
  - DOMAIN-SUFFIX,pubu.tw,PROXY
  - DOMAIN-SUFFIX,pureapk.com,PROXY
  - DOMAIN-SUFFIX,quora.com,PROXY
  - DOMAIN-SUFFIX,quoracdn.net,PROXY
  - DOMAIN-SUFFIX,rakuten.co.jp,PROXY
  - DOMAIN-SUFFIX,readingtimes.com.tw,PROXY
  - DOMAIN-SUFFIX,readmoo.com,PROXY
  - DOMAIN-SUFFIX,redbubble.com,PROXY
  - DOMAIN-SUFFIX,reddit.com,PROXY
  - DOMAIN-SUFFIX,redditmedia.com,PROXY
  - DOMAIN-SUFFIX,resilio.com,PROXY
  - DOMAIN-SUFFIX,reuters.com,PROXY
  - DOMAIN-SUFFIX,reutersmedia.net,PROXY
  - DOMAIN-SUFFIX,rfi.fr,PROXY
  - DOMAIN-SUFFIX,rixcloud.com,PROXY
  - DOMAIN-SUFFIX,roadshow.hk,PROXY
  - DOMAIN-SUFFIX,scmp.com,PROXY
  - DOMAIN-SUFFIX,scribd.com,PROXY
  - DOMAIN-SUFFIX,seatguru.com,PROXY
  - DOMAIN-SUFFIX,shadowsocks.org,PROXY
  - DOMAIN-SUFFIX,shopee.tw,PROXY
  - DOMAIN-SUFFIX,slideshare.net,PROXY
  - DOMAIN-SUFFIX,softfamous.com,PROXY
  - DOMAIN-SUFFIX,soundcloud.com,PROXY
  - DOMAIN-SUFFIX,ssrcloud.org,PROXY
  - DOMAIN-SUFFIX,startpage.com,PROXY
  - DOMAIN-SUFFIX,steamcommunity.com,PROXY
  - DOMAIN-SUFFIX,steemit.com,PROXY
  - DOMAIN-SUFFIX,steemitwallet.com,PROXY
  - DOMAIN-SUFFIX,t66y.com,PROXY
  - DOMAIN-SUFFIX,tapatalk.com,PROXY
  - DOMAIN-SUFFIX,teco-hk.org,PROXY
  - DOMAIN-SUFFIX,teco-mo.org,PROXY
  - DOMAIN-SUFFIX,teddysun.com,PROXY
  - DOMAIN-SUFFIX,textnow.me,PROXY
  - DOMAIN-SUFFIX,theguardian.com,PROXY
  - DOMAIN-SUFFIX,theinitium.com,PROXY
  - DOMAIN-SUFFIX,thetvdb.com,PROXY
  - DOMAIN-SUFFIX,tineye.com,PROXY
  - DOMAIN-SUFFIX,torproject.org,PROXY
  - DOMAIN-SUFFIX,tumblr.com,PROXY
  - DOMAIN-SUFFIX,turbobit.net,PROXY
  - DOMAIN-SUFFIX,tutanota.com,PROXY
  - DOMAIN-SUFFIX,tvboxnow.com,PROXY
  - DOMAIN-SUFFIX,udn.com,PROXY
  - DOMAIN-SUFFIX,unseen.is,PROXY
  - DOMAIN-SUFFIX,upmedia.mg,PROXY
  - DOMAIN-SUFFIX,uptodown.com,PROXY
  - DOMAIN-SUFFIX,urbandictionary.com,PROXY
  - DOMAIN-SUFFIX,ustream.tv,PROXY
  - DOMAIN-SUFFIX,uwants.com,PROXY
  - DOMAIN-SUFFIX,v2ray.com,PROXY
  - DOMAIN-SUFFIX,viber.com,PROXY
  - DOMAIN-SUFFIX,videopress.com,PROXY
  - DOMAIN-SUFFIX,vimeo.com,PROXY
  - DOMAIN-SUFFIX,voachinese.com,PROXY
  - DOMAIN-SUFFIX,voanews.com,PROXY
  - DOMAIN-SUFFIX,voxer.com,PROXY
  - DOMAIN-SUFFIX,vzw.com,PROXY
  - DOMAIN-SUFFIX,w3schools.com,PROXY
  - DOMAIN-SUFFIX,washingtonpost.com,PROXY
  - DOMAIN-SUFFIX,wattpad.com,PROXY
  - DOMAIN-SUFFIX,whoer.net,PROXY
  - DOMAIN-SUFFIX,wikimapia.org,PROXY
  - DOMAIN-SUFFIX,wikipedia.org,PROXY
  - DOMAIN-SUFFIX,wikiquote.org,PROXY
  - DOMAIN-SUFFIX,wikiwand.com,PROXY
  - DOMAIN-SUFFIX,winudf.com,PROXY
  - DOMAIN-SUFFIX,wire.com,PROXY
  - DOMAIN-SUFFIX,wordpress.com,PROXY
  - DOMAIN-SUFFIX,workflow.is,PROXY
  - DOMAIN-SUFFIX,worldcat.org,PROXY
  - DOMAIN-SUFFIX,wsj.com,PROXY
  - DOMAIN-SUFFIX,wsj.net,PROXY
  - DOMAIN-SUFFIX,xhamster.com,PROXY
  - DOMAIN-SUFFIX,xn--90wwvt03e.com,PROXY
  - DOMAIN-SUFFIX,xn--i2ru8q2qg.com,PROXY
  - DOMAIN-SUFFIX,xnxx.com,PROXY
  - DOMAIN-SUFFIX,xvideos.com,PROXY
  - DOMAIN-SUFFIX,yahoo.com,PROXY
  - DOMAIN-SUFFIX,yandex.ru,PROXY
  - DOMAIN-SUFFIX,ycombinator.com,PROXY
  - DOMAIN-SUFFIX,yesasia.com,PROXY
  - DOMAIN-SUFFIX,yes-news.com,PROXY
  - DOMAIN-SUFFIX,yomiuri.co.jp,PROXY
  - DOMAIN-SUFFIX,you-get.org,PROXY
  - DOMAIN-SUFFIX,zaobao.com,PROXY
  - DOMAIN-SUFFIX,zb.com,PROXY
  - DOMAIN-SUFFIX,zello.com,PROXY
  - DOMAIN-SUFFIX,zeronet.io,PROXY
  - DOMAIN-SUFFIX,zoom.us,PROXY
  - DOMAIN-KEYWORD,github,PROXY
  - DOMAIN-KEYWORD,jav,PROXY
  - DOMAIN-KEYWORD,pinterest,PROXY
  - DOMAIN-KEYWORD,porn,PROXY
  - DOMAIN-KEYWORD,wikileaks,PROXY
  - DOMAIN-SUFFIX,apartmentratings.com,PROXY
  - DOMAIN-SUFFIX,apartments.com,PROXY
  - DOMAIN-SUFFIX,bankmobilevibe.com,PROXY
  - DOMAIN-SUFFIX,bing.com,PROXY
  - DOMAIN-SUFFIX,booktopia.com.au,PROXY
  - DOMAIN-SUFFIX,cccat.io,PROXY
  - DOMAIN-SUFFIX,centauro.com.br,PROXY
  - DOMAIN-SUFFIX,clearsurance.com,PROXY
  - DOMAIN-SUFFIX,costco.com,PROXY
  - DOMAIN-SUFFIX,crackle.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.cn,PROXY
  - DOMAIN-SUFFIX,dish.com,PROXY
  - DOMAIN-SUFFIX,dmm.co.jp,PROXY
  - DOMAIN-SUFFIX,dmm.com,PROXY
  - DOMAIN-SUFFIX,dnvod.tv,PROXY
  - DOMAIN-SUFFIX,esurance.com,PROXY
  - DOMAIN-SUFFIX,extmatrix.com,PROXY
  - DOMAIN-SUFFIX,fastpic.ru,PROXY
  - DOMAIN-SUFFIX,flipboard.com,PROXY
  - DOMAIN-SUFFIX,fnac.be,PROXY
  - DOMAIN-SUFFIX,fnac.com,PROXY
  - DOMAIN-SUFFIX,funkyimg.com,PROXY
  - DOMAIN-SUFFIX,fxnetworks.com,PROXY
  - DOMAIN-SUFFIX,gettyimages.com,PROXY
  - DOMAIN-SUFFIX,go.com,PROXY
  - DOMAIN-SUFFIX,here.com,PROXY
  - DOMAIN-SUFFIX,jcpenney.com,PROXY
  - DOMAIN-SUFFIX,jiehua.tv,PROXY
  - DOMAIN-SUFFIX,mailfence.com,PROXY
  - DOMAIN-SUFFIX,nationwide.com,PROXY
  - DOMAIN-SUFFIX,nbc.com,PROXY
  - DOMAIN-SUFFIX,nexon.com,PROXY
  - DOMAIN-SUFFIX,nordstrom.com,PROXY
  - DOMAIN-SUFFIX,nordstromimage.com,PROXY
  - DOMAIN-SUFFIX,nordstromrack.com,PROXY
  - DOMAIN-SUFFIX,superpages.com,PROXY
  - DOMAIN-SUFFIX,target.com,PROXY
  - DOMAIN-SUFFIX,thinkgeek.com,PROXY
  - DOMAIN-SUFFIX,tracfone.com,PROXY
  - DOMAIN-SUFFIX,unity3d.com,PROXY
  - DOMAIN-SUFFIX,uploader.jp,PROXY
  - DOMAIN-SUFFIX,vevo.com,PROXY
  - DOMAIN-SUFFIX,viu.tv,PROXY
  - DOMAIN-SUFFIX,vk.com,PROXY
  - DOMAIN-SUFFIX,vsco.co,PROXY
  - DOMAIN-SUFFIX,xfinity.com,PROXY
  - DOMAIN-SUFFIX,zattoo.com,PROXY
  - DOMAIN,testflight.apple.com,PROXY
  - DOMAIN-SUFFIX,appsto.re,PROXY
  - DOMAIN,books.itunes.apple.com,PROXY
  - DOMAIN,hls.itunes.apple.com,PROXY
  - DOMAIN,apps.apple.com,PROXY
  - DOMAIN,itunes.apple.com,PROXY
  - DOMAIN,api-glb-sea.smoot.apple.com,PROXY
  - DOMAIN,lookup-api.apple.com,PROXY
  - PROCESS-NAME,LookupViewService,PROXY
  - DOMAIN,gspe1-ssl.ls.apple.com,PROXY
  - PROCESS-NAME,News,PROXY
  - DOMAIN-SUFFIX,apple.news,PROXY
  - DOMAIN,news-client.apple.com,PROXY
  - DOMAIN,news-edge.apple.com,PROXY
  - DOMAIN,news-events.apple.com,PROXY
  - DOMAIN,apple.comscoreresearch.com,PROXY
  - DOMAIN-SUFFIX,abc.xyz,PROXY
  - DOMAIN-SUFFIX,android.com,PROXY
  - DOMAIN-SUFFIX,androidify.com,PROXY
  - DOMAIN-SUFFIX,dialogflow.com,PROXY
  - DOMAIN-SUFFIX,autodraw.com,PROXY
  - DOMAIN-SUFFIX,capitalg.com,PROXY
  - DOMAIN-SUFFIX,certificate-transparency.org,PROXY
  - DOMAIN-SUFFIX,chrome.com,PROXY
  - DOMAIN-SUFFIX,chromeexperiments.com,PROXY
  - DOMAIN-SUFFIX,chromestatus.com,PROXY
  - DOMAIN-SUFFIX,chromium.org,PROXY
  - DOMAIN-SUFFIX,creativelab5.com,PROXY
  - DOMAIN-SUFFIX,debug.com,PROXY
  - DOMAIN-SUFFIX,deepmind.com,PROXY
  - DOMAIN-SUFFIX,firebaseio.com,PROXY
  - DOMAIN-SUFFIX,getmdl.io,PROXY
  - DOMAIN-SUFFIX,ggpht.com,PROXY
  - DOMAIN-SUFFIX,gmail.com,PROXY
  - DOMAIN-SUFFIX,gmodules.com,PROXY
  - DOMAIN-SUFFIX,godoc.org,PROXY
  - DOMAIN-SUFFIX,golang.org,PROXY
  - DOMAIN-SUFFIX,gstatic.com,PROXY
  - DOMAIN-SUFFIX,gv.com,PROXY
  - DOMAIN-SUFFIX,gwtproject.org,PROXY
  - DOMAIN-SUFFIX,itasoftware.com,PROXY
  - DOMAIN-SUFFIX,madewithcode.com,PROXY
  - DOMAIN-SUFFIX,material.io,PROXY
  - DOMAIN-SUFFIX,polymer-project.org,PROXY
  - DOMAIN-SUFFIX,admin.recaptcha.net,PROXY
  - DOMAIN-SUFFIX,recaptcha.net,PROXY
  - DOMAIN-SUFFIX,shattered.io,PROXY
  - DOMAIN-SUFFIX,synergyse.com,PROXY
  - DOMAIN-SUFFIX,tensorflow.org,PROXY
  - DOMAIN-SUFFIX,tfhub.dev,PROXY
  - DOMAIN-SUFFIX,tiltbrush.com,PROXY
  - DOMAIN-SUFFIX,waveprotocol.org,PROXY
  - DOMAIN-SUFFIX,waymo.com,PROXY
  - DOMAIN-SUFFIX,webmproject.org,PROXY
  - DOMAIN-SUFFIX,webrtc.org,PROXY
  - DOMAIN-SUFFIX,whatbrowser.org,PROXY
  - DOMAIN-SUFFIX,widevine.com,PROXY
  - DOMAIN-SUFFIX,x.company,PROXY
  - DOMAIN-SUFFIX,youtu.be,PROXY
  - DOMAIN-SUFFIX,yt.be,PROXY
  - DOMAIN-SUFFIX,ytimg.com,PROXY
  - DOMAIN-SUFFIX,1drv.com,PROXY
  - DOMAIN-SUFFIX,1drv.ms,PROXY
  - DOMAIN-SUFFIX,blob.core.windows.net,PROXY
  - DOMAIN-SUFFIX,livefilestore.com,PROXY
  - DOMAIN-SUFFIX,onedrive.com,PROXY
  - DOMAIN-SUFFIX,storage.live.com,PROXY
  - DOMAIN-SUFFIX,storage.msn.com,PROXY
  - DOMAIN,oneclient.sfx.ms,PROXY
  - DOMAIN-SUFFIX,0rz.tw,PROXY
  - DOMAIN-SUFFIX,4bluestones.biz,PROXY
  - DOMAIN-SUFFIX,9bis.net,PROXY
  - DOMAIN-SUFFIX,allconnected.co,PROXY
  - DOMAIN-SUFFIX,aol.com,PROXY
  - DOMAIN-SUFFIX,bcc.com.tw,PROXY
  - DOMAIN-SUFFIX,bit.ly,PROXY
  - DOMAIN-SUFFIX,bitshare.com,PROXY
  - DOMAIN-SUFFIX,blog.jp,PROXY
  - DOMAIN-SUFFIX,blogimg.jp,PROXY
  - DOMAIN-SUFFIX,blogtd.org,PROXY
  - DOMAIN-SUFFIX,broadcast.co.nz,PROXY
  - DOMAIN-SUFFIX,camfrog.com,PROXY
  - DOMAIN-SUFFIX,cfos.de,PROXY
  - DOMAIN-SUFFIX,citypopulation.de,PROXY
  - DOMAIN-SUFFIX,cloudfront.net,PROXY
  - DOMAIN-SUFFIX,ctitv.com.tw,PROXY
  - DOMAIN-SUFFIX,cuhk.edu.hk,PROXY
  - DOMAIN-SUFFIX,cusu.hk,PROXY
  - DOMAIN-SUFFIX,discord.gg,PROXY
  - DOMAIN-SUFFIX,discuss.com.hk,PROXY
  - DOMAIN-SUFFIX,dropboxapi.com,PROXY
  - DOMAIN-SUFFIX,duolingo.cn,PROXY
  - DOMAIN-SUFFIX,edditstatic.com,PROXY
  - DOMAIN-SUFFIX,flickriver.com,PROXY
  - DOMAIN-SUFFIX,focustaiwan.tw,PROXY
  - DOMAIN-SUFFIX,free.fr,PROXY
  - DOMAIN-SUFFIX,gigacircle.com,PROXY
  - DOMAIN-SUFFIX,hk-pub.com,PROXY
  - DOMAIN-SUFFIX,hosting.co.uk,PROXY
  - DOMAIN-SUFFIX,hwcdn.net,PROXY
  - DOMAIN-SUFFIX,ifixit.com,PROXY
  - DOMAIN-SUFFIX,iphone4hongkong.com,PROXY
  - DOMAIN-SUFFIX,iphonetaiwan.org,PROXY
  - DOMAIN-SUFFIX,iptvbin.com,PROXY
  - DOMAIN-SUFFIX,jtvnw.net,PROXY
  - DOMAIN-SUFFIX,linksalpha.com,PROXY
  - DOMAIN-SUFFIX,manyvids.com,PROXY
  - DOMAIN-SUFFIX,myactimes.com,PROXY
  - DOMAIN-SUFFIX,newsblur.com,PROXY
  - DOMAIN-SUFFIX,now.im,PROXY
  - DOMAIN-SUFFIX,nowe.com,PROXY
  - DOMAIN-SUFFIX,redditlist.com,PROXY
  - DOMAIN-SUFFIX,s3.amazonaws.com,PROXY
  - DOMAIN-SUFFIX,signal.org,PROXY
  - DOMAIN-SUFFIX,smartmailcloud.com,PROXY
  - DOMAIN-SUFFIX,sparknotes.com,PROXY
  - DOMAIN-SUFFIX,streetvoice.com,PROXY
  - DOMAIN-SUFFIX,supertop.co,PROXY
  - DOMAIN-SUFFIX,tv.com,PROXY
  - DOMAIN-SUFFIX,typepad.com,PROXY
  - DOMAIN-SUFFIX,udnbkk.com,PROXY
  - DOMAIN-SUFFIX,urbanairship.com,PROXY
  - DOMAIN-SUFFIX,whispersystems.org,PROXY
  - DOMAIN-SUFFIX,wikia.com,PROXY
  - DOMAIN-SUFFIX,wn.com,PROXY
  - DOMAIN-SUFFIX,wolframalpha.com,PROXY
  - DOMAIN-SUFFIX,x-art.com,PROXY
  - DOMAIN-SUFFIX,yimg.com,PROXY
  - DOMAIN,api.steampowered.com,PROXY
  - DOMAIN,store.steampowered.com,PROXY
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,fdm,DIRECT
  - PROCESS-NAME,Folx,DIRECT
  - PROCESS-NAME,NetTransport,DIRECT
  - PROCESS-NAME,Thunder,DIRECT
  - PROCESS-NAME,Transmission,DIRECT
  - PROCESS-NAME,uTorrent,DIRECT
  - PROCESS-NAME,WebTorrent,DIRECT
  - PROCESS-NAME,WebTorrent Helper,DIRECT
  - PROCESS-NAME,DownloadService,DIRECT
  - PROCESS-NAME,Weiyun,DIRECT
  - DOMAIN-KEYWORD,aria2,DIRECT
  - DOMAIN-KEYWORD,xunlei,DIRECT
  - DOMAIN-KEYWORD,yunpan,DIRECT
  - DOMAIN-KEYWORD,Thunder,DIRECT
  - DOMAIN-KEYWORD,XLLiveUD,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,Outsite
proxies:
  - name: 127.0.0.1:8787:1689259352655
    server: 127.0.0.1:8787
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-all.xn--b6gac.eu.org:1689259352655
    server: cdn-all.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.xn--b6gac.eu.org:1689259352655
    server: cdn.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-b100.xn--b6gac.eu.org:1689259352655
    server: cdn-b100.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: edgetunnel.anycast.eu.org:1689259352655
    server: edgetunnel.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.anycast.eu.org:1689259352655
    server: cdn.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: 127.0.0.1:8787
    server: 127.0.0.1:8787
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-all.xn--b6gac.eu.org
    server: cdn-all.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.xn--b6gac.eu.org
    server: cdn.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-b100.xn--b6gac.eu.org
    server: cdn-b100.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: edgetunnel.anycast.eu.org
    server: edgetunnel.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.anycast.eu.org
    server: cdn.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
```

### 传入一个远程 clash.meta 的 profiles 地址，给其添加多个 vless 节点，并添加一个包含上述节点的策略组，  并将该策略组放入指定的策略组

#### Request

- Method: **GET**
- URL: `http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3?type=clash.meta&profiles=http%3A%2F%2F127.0.0.1%3A8787%2F0b87fff8-ed16-4269-b53b-4aa9a01682a3%3Ftype%3Dclash.meta&needAddVlessProxyGroupsName=PROXY,Outsite`
- 自动添加到其他所有策略组:`http://127.0.0.1:8787/0b87fff8-ed16-4269-b53b-4aa9a01682a3?type=clash.meta&profiles=http%3A%2F%2F127.0.0.1%3A8787%2F0b87fff8-ed16-4269-b53b-4aa9a01682a3%3Ftype%3Dclash.meta&needAddVlessProxyGroupsName=allProxyGroups`
- QUERY:

```ts
type Query = {
	type?: 'clash.meta' /** 控制是否返回clash.meta可订阅的配置 */;
	profiles?: string /** 需要进行包装的clash.meta的进行urlencode后的配置地址，将用传入的远程配置为模板，只添加新的vless节点及策略组 */;
	needAddVlessProxyGroupsName?: string /** 需要添加新策略组（包含vless节点的策略组）的profiles参数的配置中存在的策略组名 支持英文逗号隔开批量传递 */;
};
```

#### Response

- Body

```yaml
port: 7890
socks-port: 7891
allow-lan: true
mode: Rule
log-level: info
external-controller: ':9090'
proxy-groups:
  - name: Vless:127.0.0.1:8787:1689256655865
    type: select
    proxies:
      - 127.0.0.1:8787:1689256655865
      - cdn-all.xn--b6gac.eu.org:1689256655865
      - cdn.xn--b6gac.eu.org:1689256655865
      - cdn-b100.xn--b6gac.eu.org:1689256655865
      - edgetunnel.anycast.eu.org:1689256655865
      - cdn.anycast.eu.org:1689256655865
  - name: Vless:127.0.0.1:8787
    type: select
    proxies:
      - 127.0.0.1:8787
      - cdn-all.xn--b6gac.eu.org
      - cdn.xn--b6gac.eu.org
      - cdn-b100.xn--b6gac.eu.org
      - edgetunnel.anycast.eu.org
      - cdn.anycast.eu.org
  - name: PROXY
    type: select
    proxies:
      - Vless:127.0.0.1:8787:1689256655865
      - Vless:127.0.0.1:8787
      - DIRECT
  - name: Outsite
    type: select
    proxies:
      - Vless:127.0.0.1:8787:1689256655865
      - PROXY
      - DIRECT
  - name: Telegram
    type: select
    proxies:
      - PROXY
      - DIRECT
rules:
  - DOMAIN-SUFFIX,local,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
  - IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
  - IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
  - IP-CIDR,100.64.0.0/10,DIRECT,no-resolve
  - IP-CIDR6,::1/128,DIRECT,no-resolve
  - IP-CIDR6,fc00::/7,DIRECT,no-resolve
  - IP-CIDR6,fe80::/10,DIRECT,no-resolve
  - IP-CIDR6,fd00::/8,DIRECT,no-resolve
  - DOMAIN-SUFFIX,t.me,Telegram
  - DOMAIN-SUFFIX,tx.me,Telegram
  - DOMAIN-SUFFIX,tdesktop.com,Telegram
  - DOMAIN-SUFFIX,telegra.ph,Telegram
  - DOMAIN-SUFFIX,telegram.me,Telegram
  - DOMAIN-SUFFIX,telegram.org,Telegram
  - IP-CIDR,91.108.0.0/16,Telegram,no-resolve
  - IP-CIDR,109.239.140.0/24,Telegram,no-resolve
  - IP-CIDR,149.154.160.0/20,Telegram,no-resolve
  - IP-CIDR6,2001:67c:4e8::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23d::/48,Telegram,no-resolve
  - IP-CIDR6,2001:b28:f23f::/48,Telegram,no-resolve
  - DOMAIN-SUFFIX,linkedin.com,PROXY
  - DOMAIN-SUFFIX,appspot.com,PROXY
  - DOMAIN-SUFFIX,blogger.com,PROXY
  - DOMAIN-SUFFIX,getoutline.org,PROXY
  - DOMAIN-SUFFIX,gvt0.com,PROXY
  - DOMAIN-SUFFIX,gvt1.com,PROXY
  - DOMAIN-SUFFIX,gvt3.com,PROXY
  - DOMAIN-SUFFIX,xn--ngstr-lra8j.com,PROXY
  - DOMAIN-KEYWORD,google,PROXY
  - DOMAIN-KEYWORD,blogspot,PROXY
  - DOMAIN-SUFFIX,onedrive.live.com,PROXY
  - DOMAIN-SUFFIX,xboxlive.com,PROXY
  - DOMAIN-SUFFIX,cdninstagram.com,PROXY
  - DOMAIN-SUFFIX,fb.com,PROXY
  - DOMAIN-SUFFIX,fb.me,PROXY
  - DOMAIN-SUFFIX,fbaddins.com,PROXY
  - DOMAIN-SUFFIX,fbcdn.net,PROXY
  - DOMAIN-SUFFIX,fbsbx.com,PROXY
  - DOMAIN-SUFFIX,fbworkmail.com,PROXY
  - DOMAIN-SUFFIX,instagram.com,PROXY
  - DOMAIN-SUFFIX,m.me,PROXY
  - DOMAIN-SUFFIX,messenger.com,PROXY
  - DOMAIN-SUFFIX,oculus.com,PROXY
  - DOMAIN-SUFFIX,oculuscdn.com,PROXY
  - DOMAIN-SUFFIX,rocksdb.org,PROXY
  - DOMAIN-SUFFIX,whatsapp.com,PROXY
  - DOMAIN-SUFFIX,whatsapp.net,PROXY
  - DOMAIN-KEYWORD,facebook,PROXY
  - IP-CIDR,3.123.36.126/32,PROXY,no-resolve
  - IP-CIDR,35.157.215.84/32,PROXY,no-resolve
  - IP-CIDR,35.157.217.255/32,PROXY,no-resolve
  - IP-CIDR,52.58.209.134/32,PROXY,no-resolve
  - IP-CIDR,54.93.124.31/32,PROXY,no-resolve
  - IP-CIDR,54.162.243.80/32,PROXY,no-resolve
  - IP-CIDR,54.173.34.141/32,PROXY,no-resolve
  - IP-CIDR,54.235.23.242/32,PROXY,no-resolve
  - IP-CIDR,169.45.248.118/32,PROXY,no-resolve
  - DOMAIN-SUFFIX,pscp.tv,PROXY
  - DOMAIN-SUFFIX,periscope.tv,PROXY
  - DOMAIN-SUFFIX,t.co,PROXY
  - DOMAIN-SUFFIX,twimg.co,PROXY
  - DOMAIN-SUFFIX,twimg.com,PROXY
  - DOMAIN-SUFFIX,twitpic.com,PROXY
  - DOMAIN-SUFFIX,vine.co,PROXY
  - DOMAIN-KEYWORD,twitter,PROXY
  - DOMAIN-SUFFIX,t.me,PROXY
  - DOMAIN-SUFFIX,tdesktop.com,PROXY
  - DOMAIN-SUFFIX,telegra.ph,PROXY
  - DOMAIN-SUFFIX,telegram.me,PROXY
  - DOMAIN-SUFFIX,telegram.org,PROXY
  - IP-CIDR,91.108.4.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.8.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.12.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.16.0/22,PROXY,no-resolve
  - IP-CIDR,91.108.56.0/22,PROXY,no-resolve
  - IP-CIDR,149.154.160.0/20,PROXY,no-resolve
  - DOMAIN-SUFFIX,line.me,PROXY
  - DOMAIN-SUFFIX,line-apps.com,PROXY
  - DOMAIN-SUFFIX,line-scdn.net,PROXY
  - DOMAIN-SUFFIX,naver.jp,PROXY
  - IP-CIDR,103.2.30.0/23,PROXY,no-resolve
  - IP-CIDR,125.209.208.0/20,PROXY,no-resolve
  - IP-CIDR,147.92.128.0/17,PROXY,no-resolve
  - IP-CIDR,203.104.144.0/21,PROXY,no-resolve
  - DOMAIN-SUFFIX,4shared.com,PROXY
  - DOMAIN-SUFFIX,520cc.cc,PROXY
  - DOMAIN-SUFFIX,881903.com,PROXY
  - DOMAIN-SUFFIX,9cache.com,PROXY
  - DOMAIN-SUFFIX,9gag.com,PROXY
  - DOMAIN-SUFFIX,abc.com,PROXY
  - DOMAIN-SUFFIX,abc.net.au,PROXY
  - DOMAIN-SUFFIX,abebooks.com,PROXY
  - DOMAIN-SUFFIX,amazon.co.jp,PROXY
  - DOMAIN-SUFFIX,apigee.com,PROXY
  - DOMAIN-SUFFIX,apk-dl.com,PROXY
  - DOMAIN-SUFFIX,apkfind.com,PROXY
  - DOMAIN-SUFFIX,apkmirror.com,PROXY
  - DOMAIN-SUFFIX,apkmonk.com,PROXY
  - DOMAIN-SUFFIX,apkpure.com,PROXY
  - DOMAIN-SUFFIX,aptoide.com,PROXY
  - DOMAIN-SUFFIX,archive.is,PROXY
  - DOMAIN-SUFFIX,archive.org,PROXY
  - DOMAIN-SUFFIX,arte.tv,PROXY
  - DOMAIN-SUFFIX,artstation.com,PROXY
  - DOMAIN-SUFFIX,arukas.io,PROXY
  - DOMAIN-SUFFIX,ask.com,PROXY
  - DOMAIN-SUFFIX,avg.com,PROXY
  - DOMAIN-SUFFIX,avgle.com,PROXY
  - DOMAIN-SUFFIX,badoo.com,PROXY
  - DOMAIN-SUFFIX,bandwagonhost.com,PROXY
  - DOMAIN-SUFFIX,bbc.com,PROXY
  - DOMAIN-SUFFIX,behance.net,PROXY
  - DOMAIN-SUFFIX,bibox.com,PROXY
  - DOMAIN-SUFFIX,biggo.com.tw,PROXY
  - DOMAIN-SUFFIX,binance.com,PROXY
  - DOMAIN-SUFFIX,bitcointalk.org,PROXY
  - DOMAIN-SUFFIX,bitfinex.com,PROXY
  - DOMAIN-SUFFIX,bitmex.com,PROXY
  - DOMAIN-SUFFIX,bit-z.com,PROXY
  - DOMAIN-SUFFIX,bloglovin.com,PROXY
  - DOMAIN-SUFFIX,bloomberg.cn,PROXY
  - DOMAIN-SUFFIX,bloomberg.com,PROXY
  - DOMAIN-SUFFIX,blubrry.com,PROXY
  - DOMAIN-SUFFIX,book.com.tw,PROXY
  - DOMAIN-SUFFIX,booklive.jp,PROXY
  - DOMAIN-SUFFIX,books.com.tw,PROXY
  - DOMAIN-SUFFIX,boslife.net,PROXY
  - DOMAIN-SUFFIX,box.com,PROXY
  - DOMAIN-SUFFIX,businessinsider.com,PROXY
  - DOMAIN-SUFFIX,bwh1.net,PROXY
  - DOMAIN-SUFFIX,castbox.fm,PROXY
  - DOMAIN-SUFFIX,cbc.ca,PROXY
  - DOMAIN-SUFFIX,cdw.com,PROXY
  - DOMAIN-SUFFIX,change.org,PROXY
  - DOMAIN-SUFFIX,channelnewsasia.com,PROXY
  - DOMAIN-SUFFIX,ck101.com,PROXY
  - DOMAIN-SUFFIX,clarionproject.org,PROXY
  - DOMAIN-SUFFIX,clyp.it,PROXY
  - DOMAIN-SUFFIX,cna.com.tw,PROXY
  - DOMAIN-SUFFIX,comparitech.com,PROXY
  - DOMAIN-SUFFIX,conoha.jp,PROXY
  - DOMAIN-SUFFIX,crucial.com,PROXY
  - DOMAIN-SUFFIX,cts.com.tw,PROXY
  - DOMAIN-SUFFIX,cw.com.tw,PROXY
  - DOMAIN-SUFFIX,cyberctm.com,PROXY
  - DOMAIN-SUFFIX,dailymotion.com,PROXY
  - DOMAIN-SUFFIX,dailyview.tw,PROXY
  - DOMAIN-SUFFIX,daum.net,PROXY
  - DOMAIN-SUFFIX,daumcdn.net,PROXY
  - DOMAIN-SUFFIX,dcard.tw,PROXY
  - DOMAIN-SUFFIX,deepdiscount.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.com,PROXY
  - DOMAIN-SUFFIX,deviantart.com,PROXY
  - DOMAIN-SUFFIX,disconnect.me,PROXY
  - DOMAIN-SUFFIX,discordapp.com,PROXY
  - DOMAIN-SUFFIX,discordapp.net,PROXY
  - DOMAIN-SUFFIX,disqus.com,PROXY
  - DOMAIN-SUFFIX,dlercloud.com,PROXY
  - DOMAIN-SUFFIX,dns2go.com,PROXY
  - DOMAIN-SUFFIX,dowjones.com,PROXY
  - DOMAIN-SUFFIX,dropbox.com,PROXY
  - DOMAIN-SUFFIX,dropboxusercontent.com,PROXY
  - DOMAIN-SUFFIX,duckduckgo.com,PROXY
  - DOMAIN-SUFFIX,dw.com,PROXY
  - DOMAIN-SUFFIX,dynu.com,PROXY
  - DOMAIN-SUFFIX,earthcam.com,PROXY
  - DOMAIN-SUFFIX,ebookservice.tw,PROXY
  - DOMAIN-SUFFIX,economist.com,PROXY
  - DOMAIN-SUFFIX,edgecastcdn.net,PROXY
  - DOMAIN-SUFFIX,edu,PROXY
  - DOMAIN-SUFFIX,elpais.com,PROXY
  - DOMAIN-SUFFIX,enanyang.my,PROXY
  - DOMAIN-SUFFIX,encyclopedia.com,PROXY
  - DOMAIN-SUFFIX,esoir.be,PROXY
  - DOMAIN-SUFFIX,etherscan.io,PROXY
  - DOMAIN-SUFFIX,euronews.com,PROXY
  - DOMAIN-SUFFIX,evozi.com,PROXY
  - DOMAIN-SUFFIX,feedly.com,PROXY
  - DOMAIN-SUFFIX,firech.at,PROXY
  - DOMAIN-SUFFIX,flickr.com,PROXY
  - DOMAIN-SUFFIX,flitto.com,PROXY
  - DOMAIN-SUFFIX,foreignpolicy.com,PROXY
  - DOMAIN-SUFFIX,freebrowser.org,PROXY
  - DOMAIN-SUFFIX,freewechat.com,PROXY
  - DOMAIN-SUFFIX,freeweibo.com,PROXY
  - DOMAIN-SUFFIX,friday.tw,PROXY
  - DOMAIN-SUFFIX,ftchinese.com,PROXY
  - DOMAIN-SUFFIX,ftimg.net,PROXY
  - DOMAIN-SUFFIX,gate.io,PROXY
  - DOMAIN-SUFFIX,getlantern.org,PROXY
  - DOMAIN-SUFFIX,getsync.com,PROXY
  - DOMAIN-SUFFIX,globalvoices.org,PROXY
  - DOMAIN-SUFFIX,goo.ne.jp,PROXY
  - DOMAIN-SUFFIX,goodreads.com,PROXY
  - DOMAIN-SUFFIX,gov,PROXY
  - DOMAIN-SUFFIX,gov.tw,PROXY
  - DOMAIN-SUFFIX,greatfire.org,PROXY
  - DOMAIN-SUFFIX,gumroad.com,PROXY
  - DOMAIN-SUFFIX,hbg.com,PROXY
  - DOMAIN-SUFFIX,heroku.com,PROXY
  - DOMAIN-SUFFIX,hightail.com,PROXY
  - DOMAIN-SUFFIX,hk01.com,PROXY
  - DOMAIN-SUFFIX,hkbf.org,PROXY
  - DOMAIN-SUFFIX,hkbookcity.com,PROXY
  - DOMAIN-SUFFIX,hkej.com,PROXY
  - DOMAIN-SUFFIX,hket.com,PROXY
  - DOMAIN-SUFFIX,hkgolden.com,PROXY
  - DOMAIN-SUFFIX,hootsuite.com,PROXY
  - DOMAIN-SUFFIX,hudson.org,PROXY
  - DOMAIN-SUFFIX,hyread.com.tw,PROXY
  - DOMAIN-SUFFIX,ibtimes.com,PROXY
  - DOMAIN-SUFFIX,i-cable.com,PROXY
  - DOMAIN-SUFFIX,icij.org,PROXY
  - DOMAIN-SUFFIX,icoco.com,PROXY
  - DOMAIN-SUFFIX,imgur.com,PROXY
  - DOMAIN-SUFFIX,initiummall.com,PROXY
  - DOMAIN-SUFFIX,insecam.org,PROXY
  - DOMAIN-SUFFIX,ipfs.io,PROXY
  - DOMAIN-SUFFIX,issuu.com,PROXY
  - DOMAIN-SUFFIX,istockphoto.com,PROXY
  - DOMAIN-SUFFIX,japantimes.co.jp,PROXY
  - DOMAIN-SUFFIX,jiji.com,PROXY
  - DOMAIN-SUFFIX,jinx.com,PROXY
  - DOMAIN-SUFFIX,jkforum.net,PROXY
  - DOMAIN-SUFFIX,joinmastodon.org,PROXY
  - DOMAIN-SUFFIX,justmysocks.net,PROXY
  - DOMAIN-SUFFIX,justpaste.it,PROXY
  - DOMAIN-SUFFIX,kakao.com,PROXY
  - DOMAIN-SUFFIX,kakaocorp.com,PROXY
  - DOMAIN-SUFFIX,kik.com,PROXY
  - DOMAIN-SUFFIX,kobo.com,PROXY
  - DOMAIN-SUFFIX,kobobooks.com,PROXY
  - DOMAIN-SUFFIX,kodingen.com,PROXY
  - DOMAIN-SUFFIX,lemonde.fr,PROXY
  - DOMAIN-SUFFIX,lepoint.fr,PROXY
  - DOMAIN-SUFFIX,lihkg.com,PROXY
  - DOMAIN-SUFFIX,listennotes.com,PROXY
  - DOMAIN-SUFFIX,livestream.com,PROXY
  - DOMAIN-SUFFIX,logmein.com,PROXY
  - DOMAIN-SUFFIX,mail.ru,PROXY
  - DOMAIN-SUFFIX,mailchimp.com,PROXY
  - DOMAIN-SUFFIX,marc.info,PROXY
  - DOMAIN-SUFFIX,matters.news,PROXY
  - DOMAIN-SUFFIX,maying.co,PROXY
  - DOMAIN-SUFFIX,medium.com,PROXY
  - DOMAIN-SUFFIX,mega.nz,PROXY
  - DOMAIN-SUFFIX,mil,PROXY
  - DOMAIN-SUFFIX,mingpao.com,PROXY
  - DOMAIN-SUFFIX,mobile01.com,PROXY
  - DOMAIN-SUFFIX,myspace.com,PROXY
  - DOMAIN-SUFFIX,myspacecdn.com,PROXY
  - DOMAIN-SUFFIX,nanyang.com,PROXY
  - DOMAIN-SUFFIX,naver.com,PROXY
  - DOMAIN-SUFFIX,neowin.net,PROXY
  - DOMAIN-SUFFIX,newstapa.org,PROXY
  - DOMAIN-SUFFIX,nexitally.com,PROXY
  - DOMAIN-SUFFIX,nhk.or.jp,PROXY
  - DOMAIN-SUFFIX,nicovideo.jp,PROXY
  - DOMAIN-SUFFIX,nii.ac.jp,PROXY
  - DOMAIN-SUFFIX,nikkei.com,PROXY
  - DOMAIN-SUFFIX,nofile.io,PROXY
  - DOMAIN-SUFFIX,now.com,PROXY
  - DOMAIN-SUFFIX,nrk.no,PROXY
  - DOMAIN-SUFFIX,nyt.com,PROXY
  - DOMAIN-SUFFIX,nytchina.com,PROXY
  - DOMAIN-SUFFIX,nytcn.me,PROXY
  - DOMAIN-SUFFIX,nytco.com,PROXY
  - DOMAIN-SUFFIX,nytimes.com,PROXY
  - DOMAIN-SUFFIX,nytimg.com,PROXY
  - DOMAIN-SUFFIX,nytlog.com,PROXY
  - DOMAIN-SUFFIX,nytstyle.com,PROXY
  - DOMAIN-SUFFIX,ok.ru,PROXY
  - DOMAIN-SUFFIX,okex.com,PROXY
  - DOMAIN-SUFFIX,on.cc,PROXY
  - DOMAIN-SUFFIX,orientaldaily.com.my,PROXY
  - DOMAIN-SUFFIX,overcast.fm,PROXY
  - DOMAIN-SUFFIX,paltalk.com,PROXY
  - DOMAIN-SUFFIX,pao-pao.net,PROXY
  - DOMAIN-SUFFIX,parsevideo.com,PROXY
  - DOMAIN-SUFFIX,pbxes.com,PROXY
  - DOMAIN-SUFFIX,pcdvd.com.tw,PROXY
  - DOMAIN-SUFFIX,pchome.com.tw,PROXY
  - DOMAIN-SUFFIX,pcloud.com,PROXY
  - DOMAIN-SUFFIX,picacomic.com,PROXY
  - DOMAIN-SUFFIX,pinimg.com,PROXY
  - DOMAIN-SUFFIX,pixiv.net,PROXY
  - DOMAIN-SUFFIX,player.fm,PROXY
  - DOMAIN-SUFFIX,plurk.com,PROXY
  - DOMAIN-SUFFIX,po18.tw,PROXY
  - DOMAIN-SUFFIX,potato.im,PROXY
  - DOMAIN-SUFFIX,potatso.com,PROXY
  - DOMAIN-SUFFIX,prism-break.org,PROXY
  - DOMAIN-SUFFIX,proxifier.com,PROXY
  - DOMAIN-SUFFIX,pt.im,PROXY
  - DOMAIN-SUFFIX,pts.org.tw,PROXY
  - DOMAIN-SUFFIX,pubu.com.tw,PROXY
  - DOMAIN-SUFFIX,pubu.tw,PROXY
  - DOMAIN-SUFFIX,pureapk.com,PROXY
  - DOMAIN-SUFFIX,quora.com,PROXY
  - DOMAIN-SUFFIX,quoracdn.net,PROXY
  - DOMAIN-SUFFIX,rakuten.co.jp,PROXY
  - DOMAIN-SUFFIX,readingtimes.com.tw,PROXY
  - DOMAIN-SUFFIX,readmoo.com,PROXY
  - DOMAIN-SUFFIX,redbubble.com,PROXY
  - DOMAIN-SUFFIX,reddit.com,PROXY
  - DOMAIN-SUFFIX,redditmedia.com,PROXY
  - DOMAIN-SUFFIX,resilio.com,PROXY
  - DOMAIN-SUFFIX,reuters.com,PROXY
  - DOMAIN-SUFFIX,reutersmedia.net,PROXY
  - DOMAIN-SUFFIX,rfi.fr,PROXY
  - DOMAIN-SUFFIX,rixcloud.com,PROXY
  - DOMAIN-SUFFIX,roadshow.hk,PROXY
  - DOMAIN-SUFFIX,scmp.com,PROXY
  - DOMAIN-SUFFIX,scribd.com,PROXY
  - DOMAIN-SUFFIX,seatguru.com,PROXY
  - DOMAIN-SUFFIX,shadowsocks.org,PROXY
  - DOMAIN-SUFFIX,shopee.tw,PROXY
  - DOMAIN-SUFFIX,slideshare.net,PROXY
  - DOMAIN-SUFFIX,softfamous.com,PROXY
  - DOMAIN-SUFFIX,soundcloud.com,PROXY
  - DOMAIN-SUFFIX,ssrcloud.org,PROXY
  - DOMAIN-SUFFIX,startpage.com,PROXY
  - DOMAIN-SUFFIX,steamcommunity.com,PROXY
  - DOMAIN-SUFFIX,steemit.com,PROXY
  - DOMAIN-SUFFIX,steemitwallet.com,PROXY
  - DOMAIN-SUFFIX,t66y.com,PROXY
  - DOMAIN-SUFFIX,tapatalk.com,PROXY
  - DOMAIN-SUFFIX,teco-hk.org,PROXY
  - DOMAIN-SUFFIX,teco-mo.org,PROXY
  - DOMAIN-SUFFIX,teddysun.com,PROXY
  - DOMAIN-SUFFIX,textnow.me,PROXY
  - DOMAIN-SUFFIX,theguardian.com,PROXY
  - DOMAIN-SUFFIX,theinitium.com,PROXY
  - DOMAIN-SUFFIX,thetvdb.com,PROXY
  - DOMAIN-SUFFIX,tineye.com,PROXY
  - DOMAIN-SUFFIX,torproject.org,PROXY
  - DOMAIN-SUFFIX,tumblr.com,PROXY
  - DOMAIN-SUFFIX,turbobit.net,PROXY
  - DOMAIN-SUFFIX,tutanota.com,PROXY
  - DOMAIN-SUFFIX,tvboxnow.com,PROXY
  - DOMAIN-SUFFIX,udn.com,PROXY
  - DOMAIN-SUFFIX,unseen.is,PROXY
  - DOMAIN-SUFFIX,upmedia.mg,PROXY
  - DOMAIN-SUFFIX,uptodown.com,PROXY
  - DOMAIN-SUFFIX,urbandictionary.com,PROXY
  - DOMAIN-SUFFIX,ustream.tv,PROXY
  - DOMAIN-SUFFIX,uwants.com,PROXY
  - DOMAIN-SUFFIX,v2ray.com,PROXY
  - DOMAIN-SUFFIX,viber.com,PROXY
  - DOMAIN-SUFFIX,videopress.com,PROXY
  - DOMAIN-SUFFIX,vimeo.com,PROXY
  - DOMAIN-SUFFIX,voachinese.com,PROXY
  - DOMAIN-SUFFIX,voanews.com,PROXY
  - DOMAIN-SUFFIX,voxer.com,PROXY
  - DOMAIN-SUFFIX,vzw.com,PROXY
  - DOMAIN-SUFFIX,w3schools.com,PROXY
  - DOMAIN-SUFFIX,washingtonpost.com,PROXY
  - DOMAIN-SUFFIX,wattpad.com,PROXY
  - DOMAIN-SUFFIX,whoer.net,PROXY
  - DOMAIN-SUFFIX,wikimapia.org,PROXY
  - DOMAIN-SUFFIX,wikipedia.org,PROXY
  - DOMAIN-SUFFIX,wikiquote.org,PROXY
  - DOMAIN-SUFFIX,wikiwand.com,PROXY
  - DOMAIN-SUFFIX,winudf.com,PROXY
  - DOMAIN-SUFFIX,wire.com,PROXY
  - DOMAIN-SUFFIX,wordpress.com,PROXY
  - DOMAIN-SUFFIX,workflow.is,PROXY
  - DOMAIN-SUFFIX,worldcat.org,PROXY
  - DOMAIN-SUFFIX,wsj.com,PROXY
  - DOMAIN-SUFFIX,wsj.net,PROXY
  - DOMAIN-SUFFIX,xhamster.com,PROXY
  - DOMAIN-SUFFIX,xn--90wwvt03e.com,PROXY
  - DOMAIN-SUFFIX,xn--i2ru8q2qg.com,PROXY
  - DOMAIN-SUFFIX,xnxx.com,PROXY
  - DOMAIN-SUFFIX,xvideos.com,PROXY
  - DOMAIN-SUFFIX,yahoo.com,PROXY
  - DOMAIN-SUFFIX,yandex.ru,PROXY
  - DOMAIN-SUFFIX,ycombinator.com,PROXY
  - DOMAIN-SUFFIX,yesasia.com,PROXY
  - DOMAIN-SUFFIX,yes-news.com,PROXY
  - DOMAIN-SUFFIX,yomiuri.co.jp,PROXY
  - DOMAIN-SUFFIX,you-get.org,PROXY
  - DOMAIN-SUFFIX,zaobao.com,PROXY
  - DOMAIN-SUFFIX,zb.com,PROXY
  - DOMAIN-SUFFIX,zello.com,PROXY
  - DOMAIN-SUFFIX,zeronet.io,PROXY
  - DOMAIN-SUFFIX,zoom.us,PROXY
  - DOMAIN-KEYWORD,github,PROXY
  - DOMAIN-KEYWORD,jav,PROXY
  - DOMAIN-KEYWORD,pinterest,PROXY
  - DOMAIN-KEYWORD,porn,PROXY
  - DOMAIN-KEYWORD,wikileaks,PROXY
  - DOMAIN-SUFFIX,apartmentratings.com,PROXY
  - DOMAIN-SUFFIX,apartments.com,PROXY
  - DOMAIN-SUFFIX,bankmobilevibe.com,PROXY
  - DOMAIN-SUFFIX,bing.com,PROXY
  - DOMAIN-SUFFIX,booktopia.com.au,PROXY
  - DOMAIN-SUFFIX,cccat.io,PROXY
  - DOMAIN-SUFFIX,centauro.com.br,PROXY
  - DOMAIN-SUFFIX,clearsurance.com,PROXY
  - DOMAIN-SUFFIX,costco.com,PROXY
  - DOMAIN-SUFFIX,crackle.com,PROXY
  - DOMAIN-SUFFIX,depositphotos.cn,PROXY
  - DOMAIN-SUFFIX,dish.com,PROXY
  - DOMAIN-SUFFIX,dmm.co.jp,PROXY
  - DOMAIN-SUFFIX,dmm.com,PROXY
  - DOMAIN-SUFFIX,dnvod.tv,PROXY
  - DOMAIN-SUFFIX,esurance.com,PROXY
  - DOMAIN-SUFFIX,extmatrix.com,PROXY
  - DOMAIN-SUFFIX,fastpic.ru,PROXY
  - DOMAIN-SUFFIX,flipboard.com,PROXY
  - DOMAIN-SUFFIX,fnac.be,PROXY
  - DOMAIN-SUFFIX,fnac.com,PROXY
  - DOMAIN-SUFFIX,funkyimg.com,PROXY
  - DOMAIN-SUFFIX,fxnetworks.com,PROXY
  - DOMAIN-SUFFIX,gettyimages.com,PROXY
  - DOMAIN-SUFFIX,go.com,PROXY
  - DOMAIN-SUFFIX,here.com,PROXY
  - DOMAIN-SUFFIX,jcpenney.com,PROXY
  - DOMAIN-SUFFIX,jiehua.tv,PROXY
  - DOMAIN-SUFFIX,mailfence.com,PROXY
  - DOMAIN-SUFFIX,nationwide.com,PROXY
  - DOMAIN-SUFFIX,nbc.com,PROXY
  - DOMAIN-SUFFIX,nexon.com,PROXY
  - DOMAIN-SUFFIX,nordstrom.com,PROXY
  - DOMAIN-SUFFIX,nordstromimage.com,PROXY
  - DOMAIN-SUFFIX,nordstromrack.com,PROXY
  - DOMAIN-SUFFIX,superpages.com,PROXY
  - DOMAIN-SUFFIX,target.com,PROXY
  - DOMAIN-SUFFIX,thinkgeek.com,PROXY
  - DOMAIN-SUFFIX,tracfone.com,PROXY
  - DOMAIN-SUFFIX,unity3d.com,PROXY
  - DOMAIN-SUFFIX,uploader.jp,PROXY
  - DOMAIN-SUFFIX,vevo.com,PROXY
  - DOMAIN-SUFFIX,viu.tv,PROXY
  - DOMAIN-SUFFIX,vk.com,PROXY
  - DOMAIN-SUFFIX,vsco.co,PROXY
  - DOMAIN-SUFFIX,xfinity.com,PROXY
  - DOMAIN-SUFFIX,zattoo.com,PROXY
  - DOMAIN,testflight.apple.com,PROXY
  - DOMAIN-SUFFIX,appsto.re,PROXY
  - DOMAIN,books.itunes.apple.com,PROXY
  - DOMAIN,hls.itunes.apple.com,PROXY
  - DOMAIN,apps.apple.com,PROXY
  - DOMAIN,itunes.apple.com,PROXY
  - DOMAIN,api-glb-sea.smoot.apple.com,PROXY
  - DOMAIN,lookup-api.apple.com,PROXY
  - PROCESS-NAME,LookupViewService,PROXY
  - DOMAIN,gspe1-ssl.ls.apple.com,PROXY
  - PROCESS-NAME,News,PROXY
  - DOMAIN-SUFFIX,apple.news,PROXY
  - DOMAIN,news-client.apple.com,PROXY
  - DOMAIN,news-edge.apple.com,PROXY
  - DOMAIN,news-events.apple.com,PROXY
  - DOMAIN,apple.comscoreresearch.com,PROXY
  - DOMAIN-SUFFIX,abc.xyz,PROXY
  - DOMAIN-SUFFIX,android.com,PROXY
  - DOMAIN-SUFFIX,androidify.com,PROXY
  - DOMAIN-SUFFIX,dialogflow.com,PROXY
  - DOMAIN-SUFFIX,autodraw.com,PROXY
  - DOMAIN-SUFFIX,capitalg.com,PROXY
  - DOMAIN-SUFFIX,certificate-transparency.org,PROXY
  - DOMAIN-SUFFIX,chrome.com,PROXY
  - DOMAIN-SUFFIX,chromeexperiments.com,PROXY
  - DOMAIN-SUFFIX,chromestatus.com,PROXY
  - DOMAIN-SUFFIX,chromium.org,PROXY
  - DOMAIN-SUFFIX,creativelab5.com,PROXY
  - DOMAIN-SUFFIX,debug.com,PROXY
  - DOMAIN-SUFFIX,deepmind.com,PROXY
  - DOMAIN-SUFFIX,firebaseio.com,PROXY
  - DOMAIN-SUFFIX,getmdl.io,PROXY
  - DOMAIN-SUFFIX,ggpht.com,PROXY
  - DOMAIN-SUFFIX,gmail.com,PROXY
  - DOMAIN-SUFFIX,gmodules.com,PROXY
  - DOMAIN-SUFFIX,godoc.org,PROXY
  - DOMAIN-SUFFIX,golang.org,PROXY
  - DOMAIN-SUFFIX,gstatic.com,PROXY
  - DOMAIN-SUFFIX,gv.com,PROXY
  - DOMAIN-SUFFIX,gwtproject.org,PROXY
  - DOMAIN-SUFFIX,itasoftware.com,PROXY
  - DOMAIN-SUFFIX,madewithcode.com,PROXY
  - DOMAIN-SUFFIX,material.io,PROXY
  - DOMAIN-SUFFIX,polymer-project.org,PROXY
  - DOMAIN-SUFFIX,admin.recaptcha.net,PROXY
  - DOMAIN-SUFFIX,recaptcha.net,PROXY
  - DOMAIN-SUFFIX,shattered.io,PROXY
  - DOMAIN-SUFFIX,synergyse.com,PROXY
  - DOMAIN-SUFFIX,tensorflow.org,PROXY
  - DOMAIN-SUFFIX,tfhub.dev,PROXY
  - DOMAIN-SUFFIX,tiltbrush.com,PROXY
  - DOMAIN-SUFFIX,waveprotocol.org,PROXY
  - DOMAIN-SUFFIX,waymo.com,PROXY
  - DOMAIN-SUFFIX,webmproject.org,PROXY
  - DOMAIN-SUFFIX,webrtc.org,PROXY
  - DOMAIN-SUFFIX,whatbrowser.org,PROXY
  - DOMAIN-SUFFIX,widevine.com,PROXY
  - DOMAIN-SUFFIX,x.company,PROXY
  - DOMAIN-SUFFIX,youtu.be,PROXY
  - DOMAIN-SUFFIX,yt.be,PROXY
  - DOMAIN-SUFFIX,ytimg.com,PROXY
  - DOMAIN-SUFFIX,1drv.com,PROXY
  - DOMAIN-SUFFIX,1drv.ms,PROXY
  - DOMAIN-SUFFIX,blob.core.windows.net,PROXY
  - DOMAIN-SUFFIX,livefilestore.com,PROXY
  - DOMAIN-SUFFIX,onedrive.com,PROXY
  - DOMAIN-SUFFIX,storage.live.com,PROXY
  - DOMAIN-SUFFIX,storage.msn.com,PROXY
  - DOMAIN,oneclient.sfx.ms,PROXY
  - DOMAIN-SUFFIX,0rz.tw,PROXY
  - DOMAIN-SUFFIX,4bluestones.biz,PROXY
  - DOMAIN-SUFFIX,9bis.net,PROXY
  - DOMAIN-SUFFIX,allconnected.co,PROXY
  - DOMAIN-SUFFIX,aol.com,PROXY
  - DOMAIN-SUFFIX,bcc.com.tw,PROXY
  - DOMAIN-SUFFIX,bit.ly,PROXY
  - DOMAIN-SUFFIX,bitshare.com,PROXY
  - DOMAIN-SUFFIX,blog.jp,PROXY
  - DOMAIN-SUFFIX,blogimg.jp,PROXY
  - DOMAIN-SUFFIX,blogtd.org,PROXY
  - DOMAIN-SUFFIX,broadcast.co.nz,PROXY
  - DOMAIN-SUFFIX,camfrog.com,PROXY
  - DOMAIN-SUFFIX,cfos.de,PROXY
  - DOMAIN-SUFFIX,citypopulation.de,PROXY
  - DOMAIN-SUFFIX,cloudfront.net,PROXY
  - DOMAIN-SUFFIX,ctitv.com.tw,PROXY
  - DOMAIN-SUFFIX,cuhk.edu.hk,PROXY
  - DOMAIN-SUFFIX,cusu.hk,PROXY
  - DOMAIN-SUFFIX,discord.gg,PROXY
  - DOMAIN-SUFFIX,discuss.com.hk,PROXY
  - DOMAIN-SUFFIX,dropboxapi.com,PROXY
  - DOMAIN-SUFFIX,duolingo.cn,PROXY
  - DOMAIN-SUFFIX,edditstatic.com,PROXY
  - DOMAIN-SUFFIX,flickriver.com,PROXY
  - DOMAIN-SUFFIX,focustaiwan.tw,PROXY
  - DOMAIN-SUFFIX,free.fr,PROXY
  - DOMAIN-SUFFIX,gigacircle.com,PROXY
  - DOMAIN-SUFFIX,hk-pub.com,PROXY
  - DOMAIN-SUFFIX,hosting.co.uk,PROXY
  - DOMAIN-SUFFIX,hwcdn.net,PROXY
  - DOMAIN-SUFFIX,ifixit.com,PROXY
  - DOMAIN-SUFFIX,iphone4hongkong.com,PROXY
  - DOMAIN-SUFFIX,iphonetaiwan.org,PROXY
  - DOMAIN-SUFFIX,iptvbin.com,PROXY
  - DOMAIN-SUFFIX,jtvnw.net,PROXY
  - DOMAIN-SUFFIX,linksalpha.com,PROXY
  - DOMAIN-SUFFIX,manyvids.com,PROXY
  - DOMAIN-SUFFIX,myactimes.com,PROXY
  - DOMAIN-SUFFIX,newsblur.com,PROXY
  - DOMAIN-SUFFIX,now.im,PROXY
  - DOMAIN-SUFFIX,nowe.com,PROXY
  - DOMAIN-SUFFIX,redditlist.com,PROXY
  - DOMAIN-SUFFIX,s3.amazonaws.com,PROXY
  - DOMAIN-SUFFIX,signal.org,PROXY
  - DOMAIN-SUFFIX,smartmailcloud.com,PROXY
  - DOMAIN-SUFFIX,sparknotes.com,PROXY
  - DOMAIN-SUFFIX,streetvoice.com,PROXY
  - DOMAIN-SUFFIX,supertop.co,PROXY
  - DOMAIN-SUFFIX,tv.com,PROXY
  - DOMAIN-SUFFIX,typepad.com,PROXY
  - DOMAIN-SUFFIX,udnbkk.com,PROXY
  - DOMAIN-SUFFIX,urbanairship.com,PROXY
  - DOMAIN-SUFFIX,whispersystems.org,PROXY
  - DOMAIN-SUFFIX,wikia.com,PROXY
  - DOMAIN-SUFFIX,wn.com,PROXY
  - DOMAIN-SUFFIX,wolframalpha.com,PROXY
  - DOMAIN-SUFFIX,x-art.com,PROXY
  - DOMAIN-SUFFIX,yimg.com,PROXY
  - DOMAIN,api.steampowered.com,PROXY
  - DOMAIN,store.steampowered.com,PROXY
  - PROCESS-NAME,aria2c,DIRECT
  - PROCESS-NAME,fdm,DIRECT
  - PROCESS-NAME,Folx,DIRECT
  - PROCESS-NAME,NetTransport,DIRECT
  - PROCESS-NAME,Thunder,DIRECT
  - PROCESS-NAME,Transmission,DIRECT
  - PROCESS-NAME,uTorrent,DIRECT
  - PROCESS-NAME,WebTorrent,DIRECT
  - PROCESS-NAME,WebTorrent Helper,DIRECT
  - PROCESS-NAME,DownloadService,DIRECT
  - PROCESS-NAME,Weiyun,DIRECT
  - DOMAIN-KEYWORD,aria2,DIRECT
  - DOMAIN-KEYWORD,xunlei,DIRECT
  - DOMAIN-KEYWORD,yunpan,DIRECT
  - DOMAIN-KEYWORD,Thunder,DIRECT
  - DOMAIN-KEYWORD,XLLiveUD,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,Outsite
proxies:
  - name: 127.0.0.1:8787:1689256655865
    server: 127.0.0.1:8787
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-all.xn--b6gac.eu.org:1689256655865
    server: cdn-all.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.xn--b6gac.eu.org:1689256655865
    server: cdn.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-b100.xn--b6gac.eu.org:1689256655865
    server: cdn-b100.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: edgetunnel.anycast.eu.org:1689256655865
    server: edgetunnel.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.anycast.eu.org:1689256655865
    server: cdn.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: 127.0.0.1:8787
    server: 127.0.0.1:8787
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-all.xn--b6gac.eu.org
    server: cdn-all.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.xn--b6gac.eu.org
    server: cdn.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn-b100.xn--b6gac.eu.org
    server: cdn-b100.xn--b6gac.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: edgetunnel.anycast.eu.org
    server: edgetunnel.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
  - name: cdn.anycast.eu.org
    server: cdn.anycast.eu.org
    type: vless
    port: 443
    uuid: 0b87fff8-ed16-4269-b53b-4aa9a01682a3
    network: ws
    tls: true
    udp: false
    sni: 127.0.0.1:8787
    client-fingerprint: chrome
    ws-opts:
      path: /?ed=2048
      headers:
        host: 127.0.0.1:8787
```
