var ut=Object.defineProperty;var at=(r,e,t)=>e in r?ut(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var p=(r,e,t)=>(at(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();const lt=(r,e,t)=>r+(e-r)*(1-Math.cos(t*Math.PI))/2,u=document.createElement("canvas"),h=u.getContext("2d"),ht=.2,ft=10,J=()=>innerHeight<1080,j=J()?512:1024,v=J()?30:60,w=[];let Y;for(;w.length<j;){for(;w.includes(Y=Math.floor(Math.random()*j)););w.push(Y)}const k=r=>(r=r*.005%j,lt(w[Math.floor(r)],w[Math.ceil(r)],r-Math.floor(r))),H=()=>{u.width=innerWidth,u.height=innerHeight},K=[2,1,1.5,.8],pt=["#f1f1f1","#FFDCD4","#7AEFFF","#FFF385"];function dt(){const r=new OffscreenCanvas(u.width,u.height),e=r.getContext("2d");e.fillStyle="#0f336c",e.fillRect(0,0,u.width,u.height);for(let t=0;t<150;t++){const n=Math.floor(Math.random()*K.length);e.fillStyle=pt[n],e.beginPath(),e.arc(Math.floor(Math.random()*u.width),Math.floor(Math.random()*u.height),K[n],0,2*Math.PI),e.fill()}return r}function yt(r){return Object.freeze(r)}var L=function(r,e){return L=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])},L(r,e)};function m(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");L(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}function R(r){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&typeof r.length=="number")return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function O(r,e){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var n=t.call(r),o,i=[],s;try{for(;(e===void 0||e-- >0)&&!(o=n.next()).done;)i.push(o.value)}catch(c){s={error:c}}finally{try{o&&!o.done&&(t=n.return)&&t.call(n)}finally{if(s)throw s.error}}return i}function x(r,e,t){if(t||arguments.length===2)for(var n=0,o=e.length,i;n<o;n++)(i||!(n in e))&&(i||(i=Array.prototype.slice.call(e,0,n)),i[n]=e[n]);return r.concat(i||Array.prototype.slice.call(e))}function d(r){return typeof r=="function"}function Q(r){var e=function(n){Error.call(n),n.stack=new Error().stack},t=r(e);return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var I=Q(function(r){return function(t){r(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(n,o){return o+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=t}});function D(r,e){if(r){var t=r.indexOf(e);0<=t&&r.splice(t,1)}}var P=function(){function r(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return r.prototype.unsubscribe=function(){var e,t,n,o,i;if(!this.closed){this.closed=!0;var s=this._parentage;if(s)if(this._parentage=null,Array.isArray(s))try{for(var c=R(s),a=c.next();!a.done;a=c.next()){var y=a.value;y.remove(this)}}catch(f){e={error:f}}finally{try{a&&!a.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}}else s.remove(this);var S=this.initialTeardown;if(d(S))try{S()}catch(f){i=f instanceof I?f.errors:[f]}var V=this._finalizers;if(V){this._finalizers=null;try{for(var _=R(V),g=_.next();!g.done;g=_.next()){var ct=g.value;try{G(ct)}catch(f){i=i??[],f instanceof I?i=x(x([],O(i)),O(f.errors)):i.push(f)}}}catch(f){n={error:f}}finally{try{g&&!g.done&&(o=_.return)&&o.call(_)}finally{if(n)throw n.error}}}if(i)throw new I(i)}},r.prototype.add=function(e){var t;if(e&&e!==this)if(this.closed)G(e);else{if(e instanceof r){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}},r.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},r.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},r.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&D(t,e)},r.prototype.remove=function(e){var t=this._finalizers;t&&D(t,e),e instanceof r&&e._removeParent(this)},r.EMPTY=function(){var e=new r;return e.closed=!0,e}(),r}(),N=P.EMPTY;function tt(r){return r instanceof P||r&&"closed"in r&&d(r.remove)&&d(r.add)&&d(r.unsubscribe)}function G(r){d(r)?r():r.unsubscribe()}var et={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},z={setTimeout:function(r,e){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];var o=z.delegate;return o!=null&&o.setTimeout?o.setTimeout.apply(o,x([r,e],O(t))):setTimeout.apply(void 0,x([r,e],O(t)))},clearTimeout:function(r){var e=z.delegate;return((e==null?void 0:e.clearTimeout)||clearTimeout)(r)},delegate:void 0};function vt(r){z.setTimeout(function(){throw r})}function W(){}function A(r){r()}var q=function(r){m(e,r);function e(t){var n=r.call(this)||this;return n.isStopped=!1,t?(n.destination=t,tt(t)&&t.add(n)):n.destination=gt,n}return e.create=function(t,n,o){return new B(t,n,o)},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,r.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(P),bt=Function.prototype.bind;function M(r,e){return bt.call(r,e)}var St=function(){function r(e){this.partialObserver=e}return r.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(n){E(n)}},r.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(n){E(n)}else E(e)},r.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(t){E(t)}},r}(),B=function(r){m(e,r);function e(t,n,o){var i=r.call(this)||this,s;if(d(t)||!t)s={next:t??void 0,error:n??void 0,complete:o??void 0};else{var c;i&&et.useDeprecatedNextContext?(c=Object.create(t),c.unsubscribe=function(){return i.unsubscribe()},s={next:t.next&&M(t.next,c),error:t.error&&M(t.error,c),complete:t.complete&&M(t.complete,c)}):s=t}return i.destination=new St(s),i}return e}(q);function E(r){vt(r)}function mt(r){throw r}var gt={closed:!0,next:W,error:mt,complete:W},wt=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function rt(r){return r}function _t(r){return r.length===0?rt:r.length===1?r[0]:function(t){return r.reduce(function(n,o){return o(n)},t)}}var X=function(){function r(e){e&&(this._subscribe=e)}return r.prototype.lift=function(e){var t=new r;return t.source=this,t.operator=e,t},r.prototype.subscribe=function(e,t,n){var o=this,i=At(e)?e:new B(e,t,n);return A(function(){var s=o,c=s.operator,a=s.source;i.add(c?c.call(i,a):a?o._subscribe(i):o._trySubscribe(i))}),i},r.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},r.prototype.forEach=function(e,t){var n=this;return t=Z(t),new t(function(o,i){var s=new B({next:function(c){try{e(c)}catch(a){i(a),s.unsubscribe()}},error:i,complete:o});n.subscribe(s)})},r.prototype._subscribe=function(e){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(e)},r.prototype[wt]=function(){return this},r.prototype.pipe=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return _t(e)(this)},r.prototype.toPromise=function(e){var t=this;return e=Z(e),new e(function(n,o){var i;t.subscribe(function(s){return i=s},function(s){return o(s)},function(){return n(i)})})},r.create=function(e){return new r(e)},r}();function Z(r){var e;return(e=r??et.Promise)!==null&&e!==void 0?e:Promise}function Et(r){return r&&d(r.next)&&d(r.error)&&d(r.complete)}function At(r){return r&&r instanceof q||Et(r)&&tt(r)}function Ot(r){return d(r==null?void 0:r.lift)}function nt(r){return function(e){if(Ot(e))return e.lift(function(t){try{return r(t,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function ot(r,e,t,n,o){return new xt(r,e,t,n,o)}var xt=function(r){m(e,r);function e(t,n,o,i,s,c){var a=r.call(this,t)||this;return a.onFinalize=s,a.shouldUnsubscribe=c,a._next=n?function(y){try{n(y)}catch(S){t.error(S)}}:r.prototype._next,a._error=i?function(y){try{i(y)}catch(S){t.error(S)}finally{this.unsubscribe()}}:r.prototype._error,a._complete=o?function(){try{o()}catch(y){t.error(y)}finally{this.unsubscribe()}}:r.prototype._complete,a}return e.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;r.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)===null||t===void 0||t.call(this))}},e}(q),Pt=Q(function(r){return function(){r(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),it=function(r){m(e,r);function e(){var t=r.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return e.prototype.lift=function(t){var n=new $(this,this);return n.operator=t,n},e.prototype._throwIfClosed=function(){if(this.closed)throw new Pt},e.prototype.next=function(t){var n=this;A(function(){var o,i;if(n._throwIfClosed(),!n.isStopped){n.currentObservers||(n.currentObservers=Array.from(n.observers));try{for(var s=R(n.currentObservers),c=s.next();!c.done;c=s.next()){var a=c.value;a.next(t)}}catch(y){o={error:y}}finally{try{c&&!c.done&&(i=s.return)&&i.call(s)}finally{if(o)throw o.error}}}})},e.prototype.error=function(t){var n=this;A(function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=t;for(var o=n.observers;o.length;)o.shift().error(t)}})},e.prototype.complete=function(){var t=this;A(function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var n=t.observers;n.length;)n.shift().complete()}})},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(t){return this._throwIfClosed(),r.prototype._trySubscribe.call(this,t)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var n=this,o=this,i=o.hasError,s=o.isStopped,c=o.observers;return i||s?N:(this.currentObservers=null,c.push(t),new P(function(){n.currentObservers=null,D(c,t)}))},e.prototype._checkFinalizedStatuses=function(t){var n=this,o=n.hasError,i=n.thrownError,s=n.isStopped;o?t.error(i):s&&t.complete()},e.prototype.asObservable=function(){var t=new X;return t.source=this,t},e.create=function(t,n){return new $(t,n)},e}(X),$=function(r){m(e,r);function e(t,n){var o=r.call(this)||this;return o.destination=t,o.source=n,o}return e.prototype.next=function(t){var n,o;(o=(n=this.destination)===null||n===void 0?void 0:n.next)===null||o===void 0||o.call(n,t)},e.prototype.error=function(t){var n,o;(o=(n=this.destination)===null||n===void 0?void 0:n.error)===null||o===void 0||o.call(n,t)},e.prototype.complete=function(){var t,n;(n=(t=this.destination)===null||t===void 0?void 0:t.complete)===null||n===void 0||n.call(t)},e.prototype._subscribe=function(t){var n,o;return(o=(n=this.source)===null||n===void 0?void 0:n.subscribe(t))!==null&&o!==void 0?o:N},e}(it),It=function(r){m(e,r);function e(t){var n=r.call(this)||this;return n._value=t,n}return Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(t){var n=r.prototype._subscribe.call(this,t);return!n.closed&&t.next(this._value),n},e.prototype.getValue=function(){var t=this,n=t.hasError,o=t.thrownError,i=t._value;if(n)throw o;return this._throwIfClosed(),i},e.prototype.next=function(t){r.prototype.next.call(this,this._value=t)},e}(it);function Mt(r,e){return nt(function(t,n){var o=0;t.subscribe(ot(n,function(i){n.next(r.call(e,i,o++))}))})}function Tt(r,e){return e===void 0&&(e=rt),r=r??Ct,nt(function(t,n){var o,i=!0;t.subscribe(ot(n,function(s){var c=e(s);(i||!r(o,c))&&(i=!1,o=c,n.next(s))}))})}function Ct(r,e){return r===e}const st=r=>{const e=new It(r),t=e.asObservable();return{select:s=>t.pipe(Mt(c=>s(c)),Tt()),setState:s=>{e.next({...e.value,...s})},pick:s=>e.value[s]}},l=st(yt({ArrowUp:0,ArrowDown:0,ArrowLeft:0,ArrowRight:0})),b=st({playing:!0,speed:0,t:0});class Ft{constructor(e){p(this,"sky",dt());p(this,"execute",()=>{let e=b.pick("t"),t=b.pick("speed");t-=(t-(l.pick("ArrowUp")-l.pick("ArrowDown")))*.1,e+=ft*t,b.setState({t:e,speed:t}),h.drawImage(this.sky,0,0,u.width,u.height),h.fillStyle="#764015",h.beginPath(),h.moveTo(0,u.height);for(let n=0;n<u.width;n++)h.lineTo(n,u.height-k(e+n)*.3);h.lineTo(u.width,u.height),h.fill(),this.player.draw(),requestAnimationFrame(this.execute)});this.player=e}}class Ut{constructor(){p(this,"reloading",!1);p(this,"x",u.width/2);p(this,"ySpeed",0);p(this,"rSpeed",0);p(this,"rot",0);p(this,"y",0);p(this,"t",0);p(this,"img",new Image);this.img.src="rider.svg"}restart(){b.setState({playing:!0,speed:0,t:0}),this.x=u.width/2,this.rSpeed=0,this.y=0,this.reloading=!1}draw(){const e=b.pick("t"),t=b.pick("speed"),n=b.pick("playing"),o=u.height-k(e+this.x)*.3,i=u.height-k(e+5+this.x)*.3;let s=0;o-v>this.y?this.ySpeed+=ht:(this.ySpeed-=this.y-(o-v),this.y=o-v,s=1),(!n||s&&Math.abs(this.rot)>Math.PI*.5)&&(this.rSpeed=3,b.setState({playing:!1}),l.setState({ArrowUp:1}),this.x-=t,this.reloading||(setTimeout(()=>this.restart(),1e3),this.reloading=!0));const c=Math.atan2(i-v-this.y,this.x+3-this.x);this.y+=this.ySpeed,s&&n&&(this.rot-=(this.rot-c)*.9,this.rSpeed=this.rSpeed-(c-this.rot)),this.rSpeed+=(l.pick("ArrowLeft")-l.pick("ArrowRight"))*.02,this.rot-=this.rSpeed*.1,this.rot>Math.PI&&(this.rot=-Math.PI),this.rot<-Math.PI&&(this.rot=Math.PI),h.save(),h.translate(this.x,this.y),h.rotate(this.rot),h.drawImage(this.img,-v,-v,v*2,v*2),h.restore()}}const jt=async()=>{document.body.appendChild(u),onresize=H,H();const r=new Ut;return new Ft(r).execute(),r};const T=document.querySelector("#back-flip"),C=document.querySelector("#front-flip"),F=document.querySelector("#run"),U=document.querySelector("#back");T&&C&&F&&U&&(T.ontouchstart=()=>l.setState({ArrowLeft:1}),T.ontouchend=()=>l.setState({ArrowLeft:0}),C.ontouchstart=()=>l.setState({ArrowRight:1}),C.ontouchend=()=>l.setState({ArrowRight:0}),F.ontouchstart=()=>l.setState({ArrowUp:1}),F.ontouchend=()=>l.setState({ArrowUp:0}),U.ontouchstart=()=>l.setState({ArrowDown:1}),U.ontouchend=()=>l.setState({ArrowDown:0}));document.body.ondblclick=()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen({navigationUI:"hide"})};onkeydown=r=>l.setState({[r.key]:1});onkeyup=r=>l.setState({[r.key]:0});jt();
