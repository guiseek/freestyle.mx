var q=Object.defineProperty;var O=(t,o,s)=>o in t?q(t,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[o]=s;var l=(t,o,s)=>(O(t,typeof o!="symbol"?o+"":o,s),s);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const h of e)if(h.type==="childList")for(const p of h.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function s(e){const h={};return e.integrity&&(h.integrity=e.integrity),e.referrerPolicy&&(h.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?h.credentials="include":e.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function d(e){if(e.ep)return;e.ep=!0;const h=s(e);fetch(e.href,h)}})();const P=()=>innerHeight<800,i=document.createElement("canvas"),n=i.getContext("2d"),c=P()?25:50,r={ArrowUp:0,ArrowDown:0,ArrowLeft:0,ArrowRight:0},a=[],A=P()?512:1024;let f=0,u=0,m=!0,L=!1,I;for(;a.length<A;){for(;a.includes(I=Math.floor(Math.random()*A)););a.push(I)}const b=t=>()=>{t.width=innerWidth,t.height=innerHeight},T=b(i);document.body.appendChild(i);onresize=b(i);T();const R=(t,o,s)=>t+(o-t)*(1-Math.cos(s*Math.PI))/2,M=t=>(t=t*.005%A,R(a[Math.floor(t)],a[Math.ceil(t)],t-Math.floor(t)));class U{constructor(){l(this,"ySpeed",0);l(this,"rSpeed",0);l(this,"x",i.width/2);l(this,"y",0);l(this,"rot",0);l(this,"img",new Image);this.img.src="viniktm.png"}draw(){const o=i.height-M(f+this.x)*.25,s=i.height-M(f+5+this.x)*.25;let d=0;o-c>this.y?this.ySpeed+=.08:(this.ySpeed-=this.y-(o-c),this.y=o-c,d=1),(!m||d&&Math.abs(this.rot)>Math.PI*.5)&&(m=!1,this.rSpeed=3,r.ArrowUp=1,this.x-=u*5,L||setTimeout(()=>{L=!0,console.log("reload"),location.reload()},P()?1500:3e3));const e=Math.atan2(s-c-this.y,this.x+3-this.x);this.y+=this.ySpeed,d&&m&&(this.rot-=(this.rot-e)*.9,this.rSpeed=this.rSpeed-(e-this.rot)),this.rSpeed+=(r.ArrowLeft-r.ArrowRight)*.02,this.rot-=this.rSpeed*.1,this.rot>Math.PI&&(this.rot=-Math.PI),this.rot<-Math.PI&&(this.rot=Math.PI),n.save(),n.translate(this.x,this.y),n.rotate(this.rot),n.drawImage(this.img,-c,-c,c*2,c*2),n.restore()}}const x=new U;function v(){u-=(u-(r.ArrowUp-r.ArrowDown))*.1,f+=10*u,n.fillStyle="#8ee5ff",n.fillRect(0,0,i.width,i.height),n.fillStyle="#f97f2d",n.beginPath(),n.moveTo(0,i.height);for(var t=0;t<i.width;t++)n.lineTo(t,i.height-M(f+t)*.25);n.lineTo(i.width,i.height),n.fill(),x.draw(),requestAnimationFrame(v)}const g=document.querySelector("main #left .top"),y=document.querySelector("main #left .bottom"),w=document.querySelector("main #right .top"),S=document.querySelector("main #right .bottom");g&&y&&w&&S&&(g.ontouchstart=()=>{const t=r;t.ArrowLeft=1},g.ontouchend=()=>{const t=r;t.ArrowLeft=0},y.ontouchstart=()=>{const t=r;t.ArrowDown=1},y.ontouchend=()=>{const t=r;t.ArrowDown=0},w.ontouchstart=()=>{const t=r;t.ArrowRight=1},w.ontouchend=()=>{const t=r;t.ArrowRight=0},S.ontouchstart=()=>{const t=r;t.ArrowUp=1},S.ontouchend=()=>{const t=r;t.ArrowUp=0});onkeydown=t=>r[t.key]=1;onkeyup=t=>r[t.key]=0;v();
