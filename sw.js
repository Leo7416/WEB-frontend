if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>n(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(r.map((e=>d[e]||c(e)))).then((e=>(s(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"53ec13982f1044763e9eed48880b75a6"},{url:"assets/index-AqxDQSZd.css",revision:null},{url:"assets/index-kS7h8u2r.js",revision:null},{url:"index.html",revision:"f9e7d0dcaf4e519368550ea35b26578d"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"pwa-64x64.png",revision:"8e3b6792a8465509afa2bd0df4c5c64b"},{url:"pwa-192x192.png",revision:"07417f8b395e96c83d9d89e25729eff7"},{url:"pwa-512x512.png",revision:"c4204cde61450ce383afbc5bfabb1dcc"},{url:"maskable-icon-512x512.png",revision:"8f65305bb316e6d2f2610b04016ee6f8"},{url:"manifest.webmanifest",revision:"c9551071baebcb19054f137bc062bd15"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
