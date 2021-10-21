module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){"use strict";(function(t,r){var o,i=n(2);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:r;var c=Object(i.a)(o);e.a=c}).call(this,n(3),n(4)(t))},function(t,e,n){var r,o;(function(){(function(){(function(){var t=[].slice;this.ActionCable={INTERNAL:{message_types:{welcome:"welcome",ping:"ping",confirmation:"confirm_subscription",rejection:"reject_subscription"},default_mount_path:"/cable",protocols:["actioncable-v1-json","actioncable-unsupported"]},WebSocket:window.WebSocket,logger:window.console,createConsumer:function(t){var e;return null==t&&(t=null!=(e=this.getConfig("url"))?e:this.INTERNAL.default_mount_path),new i.Consumer(this.createWebSocketURL(t))},getConfig:function(t){var e;return null!=(e=document.head.querySelector("meta[name='action-cable-"+t+"']"))?e.getAttribute("content"):void 0},createWebSocketURL:function(t){var e;return t&&!/^wss?:/i.test(t)?((e=document.createElement("a")).href=t,e.href=e.href,e.protocol=e.protocol.replace("http","ws"),e.href):t},startDebugging:function(){return this.debugging=!0},stopDebugging:function(){return this.debugging=null},log:function(){var e,n;if(e=1<=arguments.length?t.call(arguments,0):[],this.debugging)return e.push(Date.now()),(n=this.logger).log.apply(n,["[ActionCable]"].concat(t.call(e)))}}}).call(this)}).call(this);var i=this.ActionCable;(function(){(function(){i.ConnectionMonitor=function(){var t,e,n;function r(t){var e,n;this.connection=t,this.visibilityDidChange=(e=this.visibilityDidChange,n=this,function(){return e.apply(n,arguments)}),this.reconnectAttempts=0}return r.pollInterval={min:3,max:30},r.staleThreshold=6,r.prototype.start=function(){if(!this.isRunning())return this.startedAt=e(),delete this.stoppedAt,this.startPolling(),document.addEventListener("visibilitychange",this.visibilityDidChange),i.log("ConnectionMonitor started. pollInterval = "+this.getPollInterval()+" ms")},r.prototype.stop=function(){if(this.isRunning())return this.stoppedAt=e(),this.stopPolling(),document.removeEventListener("visibilitychange",this.visibilityDidChange),i.log("ConnectionMonitor stopped")},r.prototype.isRunning=function(){return null!=this.startedAt&&null==this.stoppedAt},r.prototype.recordPing=function(){return this.pingedAt=e()},r.prototype.recordConnect=function(){return this.reconnectAttempts=0,this.recordPing(),delete this.disconnectedAt,i.log("ConnectionMonitor recorded connect")},r.prototype.recordDisconnect=function(){return this.disconnectedAt=e(),i.log("ConnectionMonitor recorded disconnect")},r.prototype.startPolling=function(){return this.stopPolling(),this.poll()},r.prototype.stopPolling=function(){return clearTimeout(this.pollTimeout)},r.prototype.poll=function(){return this.pollTimeout=setTimeout((t=this,function(){return t.reconnectIfStale(),t.poll()}),this.getPollInterval());var t},r.prototype.getPollInterval=function(){var e,n,r,o;return r=(o=this.constructor.pollInterval).min,n=o.max,e=5*Math.log(this.reconnectAttempts+1),Math.round(1e3*t(e,r,n))},r.prototype.reconnectIfStale=function(){if(this.connectionIsStale())return i.log("ConnectionMonitor detected stale connection. reconnectAttempts = "+this.reconnectAttempts+", pollInterval = "+this.getPollInterval()+" ms, time disconnected = "+n(this.disconnectedAt)+" s, stale threshold = "+this.constructor.staleThreshold+" s"),this.reconnectAttempts++,this.disconnectedRecently()?i.log("ConnectionMonitor skipping reopening recent disconnect"):(i.log("ConnectionMonitor reopening"),this.connection.reopen())},r.prototype.connectionIsStale=function(){var t;return n(null!=(t=this.pingedAt)?t:this.startedAt)>this.constructor.staleThreshold},r.prototype.disconnectedRecently=function(){return this.disconnectedAt&&n(this.disconnectedAt)<this.constructor.staleThreshold},r.prototype.visibilityDidChange=function(){if("visible"===document.visibilityState)return setTimeout((t=this,function(){if(t.connectionIsStale()||!t.connection.isOpen())return i.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = "+document.visibilityState),t.connection.reopen()}),200);var t},e=function(){return(new Date).getTime()},n=function(t){return(e()-t)/1e3},t=function(t,e,n){return Math.max(e,Math.min(n,t))},r}()}).call(this),function(){var t,e,n,r,o,c=[].slice,u=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};r=i.INTERNAL,e=r.message_types,n=r.protocols,o=2<=n.length?c.call(n,0,t=n.length-1):(t=0,[]),n[t++],i.Connection=function(){function t(t){var e,n;this.consumer=t,this.open=(e=this.open,n=this,function(){return e.apply(n,arguments)}),this.subscriptions=this.consumer.subscriptions,this.monitor=new i.ConnectionMonitor(this),this.disconnected=!0}return t.reopenDelay=500,t.prototype.send=function(t){return!!this.isOpen()&&(this.webSocket.send(JSON.stringify(t)),!0)},t.prototype.open=function(){return this.isActive()?(i.log("Attempted to open WebSocket, but existing socket is "+this.getState()),!1):(i.log("Opening WebSocket, current state is "+this.getState()+", subprotocols: "+n),null!=this.webSocket&&this.uninstallEventHandlers(),this.webSocket=new i.WebSocket(this.consumer.url,n),this.installEventHandlers(),this.monitor.start(),!0)},t.prototype.close=function(t){var e;if((null!=t?t:{allowReconnect:!0}).allowReconnect||this.monitor.stop(),this.isActive())return null!=(e=this.webSocket)?e.close():void 0},t.prototype.reopen=function(){var t;if(i.log("Reopening WebSocket, current state is "+this.getState()),!this.isActive())return this.open();try{return this.close()}catch(e){return t=e,i.log("Failed to reopen WebSocket",t)}finally{i.log("Reopening WebSocket in "+this.constructor.reopenDelay+"ms"),setTimeout(this.open,this.constructor.reopenDelay)}},t.prototype.getProtocol=function(){var t;return null!=(t=this.webSocket)?t.protocol:void 0},t.prototype.isOpen=function(){return this.isState("open")},t.prototype.isActive=function(){return this.isState("open","connecting")},t.prototype.isProtocolSupported=function(){var t;return t=this.getProtocol(),u.call(o,t)>=0},t.prototype.isState=function(){var t,e;return e=1<=arguments.length?c.call(arguments,0):[],t=this.getState(),u.call(e,t)>=0},t.prototype.getState=function(){var t,e;for(e in WebSocket)if(WebSocket[e]===(null!=(t=this.webSocket)?t.readyState:void 0))return e.toLowerCase();return null},t.prototype.installEventHandlers=function(){var t,e;for(t in this.events)e=this.events[t].bind(this),this.webSocket["on"+t]=e},t.prototype.uninstallEventHandlers=function(){var t;for(t in this.events)this.webSocket["on"+t]=function(){}},t.prototype.events={message:function(t){var n,r,o;if(this.isProtocolSupported())switch(n=(o=JSON.parse(t.data)).identifier,r=o.message,o.type){case e.welcome:return this.monitor.recordConnect(),this.subscriptions.reload();case e.ping:return this.monitor.recordPing();case e.confirmation:return this.subscriptions.notify(n,"connected");case e.rejection:return this.subscriptions.reject(n);default:return this.subscriptions.notify(n,"received",r)}},open:function(){if(i.log("WebSocket onopen event, using '"+this.getProtocol()+"' subprotocol"),this.disconnected=!1,!this.isProtocolSupported())return i.log("Protocol is unsupported. Stopping monitor and disconnecting."),this.close({allowReconnect:!1})},close:function(t){if(i.log("WebSocket onclose event"),!this.disconnected)return this.disconnected=!0,this.monitor.recordDisconnect(),this.subscriptions.notifyAll("disconnected",{willAttemptReconnect:this.monitor.isRunning()})},error:function(){return i.log("WebSocket onerror event")}},t}()}.call(this),function(){var t=[].slice;i.Subscriptions=function(){function e(t){this.consumer=t,this.subscriptions=[]}return e.prototype.create=function(t,e){var n,r,o;return r="object"==typeof(n=t)?n:{channel:n},o=new i.Subscription(this.consumer,r,e),this.add(o)},e.prototype.add=function(t){return this.subscriptions.push(t),this.consumer.ensureActiveConnection(),this.notify(t,"initialized"),this.sendCommand(t,"subscribe"),t},e.prototype.remove=function(t){return this.forget(t),this.findAll(t.identifier).length||this.sendCommand(t,"unsubscribe"),t},e.prototype.reject=function(t){var e,n,r,o,i;for(o=[],e=0,n=(r=this.findAll(t)).length;e<n;e++)i=r[e],this.forget(i),this.notify(i,"rejected"),o.push(i);return o},e.prototype.forget=function(t){var e;return this.subscriptions=function(){var n,r,o,i;for(i=[],n=0,r=(o=this.subscriptions).length;n<r;n++)(e=o[n])!==t&&i.push(e);return i}.call(this),t},e.prototype.findAll=function(t){var e,n,r,o,i;for(o=[],e=0,n=(r=this.subscriptions).length;e<n;e++)(i=r[e]).identifier===t&&o.push(i);return o},e.prototype.reload=function(){var t,e,n,r,o;for(r=[],t=0,e=(n=this.subscriptions).length;t<e;t++)o=n[t],r.push(this.sendCommand(o,"subscribe"));return r},e.prototype.notifyAll=function(){var e,n,r,o,i,c,u;for(n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],c=[],r=0,o=(i=this.subscriptions).length;r<o;r++)u=i[r],c.push(this.notify.apply(this,[u,n].concat(t.call(e))));return c},e.prototype.notify=function(){var e,n,r,o,i,c,u;for(c=arguments[0],n=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],i=[],r=0,o=(u="string"==typeof c?this.findAll(c):[c]).length;r<o;r++)c=u[r],i.push("function"==typeof c[n]?c[n].apply(c,e):void 0);return i},e.prototype.sendCommand=function(t,e){var n;return n=t.identifier,this.consumer.send({command:e,identifier:n})},e}()}.call(this),function(){i.Subscription=function(){var t;function e(e,n,r){this.consumer=e,null==n&&(n={}),this.identifier=JSON.stringify(n),t(this,r)}return e.prototype.perform=function(t,e){return null==e&&(e={}),e.action=t,this.send(e)},e.prototype.send=function(t){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(t)})},e.prototype.unsubscribe=function(){return this.consumer.subscriptions.remove(this)},t=function(t,e){var n,r;if(null!=e)for(n in e)r=e[n],t[n]=r;return t},e}()}.call(this),function(){i.Consumer=function(){function t(t){this.url=t,this.subscriptions=new i.Subscriptions(this),this.connection=new i.Connection(this)}return t.prototype.send=function(t){return this.connection.send(t)},t.prototype.connect=function(){return this.connection.open()},t.prototype.disconnect=function(){return this.connection.close({allowReconnect:!1})},t.prototype.ensureActiveConnection=function(){if(!this.connection.isActive())return this.connection.open()},t}()}.call(this)}).call(this),t.exports?t.exports=i:void 0===(o="function"==typeof(r=i)?r.call(e,n,e,t):r)||(t.exports=o)}).call(this)},function(t,e,n){"use strict";function r(t){var e,n=t.Symbol;return"function"==typeof n?n.observable?e=n.observable:(e=n("observable"),n.observable=e):e="@@observable",e}n.d(e,"a",(function(){return r}))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports=function(t){if(!t.webpackPolyfill){var e=Object.create(t);e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),Object.defineProperty(e,"exports",{enumerable:!0}),e.webpackPolyfill=1}return e}},function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.r(e),n.d(e,"createCableCarRoute",(function(){return _t}));var o=function(){function t(){var e,n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r={},(n="consumers")in(e=this)?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r}var e,n,o;return e=t,(n=[{key:"consumerFor",value:function(t){var e=t.webSocketURL||"default";if(!this.consumers[e]){var n=t.consumer||t.provider.createConsumer(t.webSocketURL);this.consumers[e]=n}return this.consumers[e]}},{key:"unsubscribeAll",value:function(){Object.values(this.consumers).forEach((function(t){var e,n;null==t||null===(e=t.subscriptions)||void 0===e||null===(n=e.subscriptions)||void 0===n||n.forEach((function(t){null==t||t.unsubscribe()}))}))}}])&&r(e.prototype,n),o&&r(e,o),t}(),i=n(1),c=n.n(i);function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};u(this,t),a(this,"cars",[]),a(this,"provider",void 0),a(this,"webSocketURL",null),a(this,"consumer",null),this.webSocketURL=e.webSocketURL||null,this.provider=e.provider||c.a,this.consumer=e.consumer||null}var e,n,r;return e=t,(n=[{key:"addCar",value:function(t){this.cars.push(t)}},{key:"removeCar",value:function(t){var e=this.cars.indexOf(t);e>-1&&this.cars.splice(e,1)}}])&&s(e.prototype,n),r&&s(e,r),t}();function f(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];throw Error("[Immer] minified error nr: "+t+(n.length?" "+n.map((function(t){return"'"+t+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function p(t){return!!t&&!!t[et]}function h(t){return!!t&&(function(t){if(!t||"object"!=typeof t)return!1;var e=Object.getPrototypeOf(t);return!e||e===Object.prototype}(t)||Array.isArray(t)||!!t[tt]||!!t.constructor[tt]||w(t)||O(t))}function d(t,e,n){void 0===n&&(n=!1),0===y(t)?(n?Object.keys:nt)(t).forEach((function(r){n&&"symbol"==typeof r||e(r,t[r],t)})):t.forEach((function(n,r){return e(r,n,t)}))}function y(t){var e=t[et];return e?e.i>3?e.i-4:e.i:Array.isArray(t)?1:w(t)?2:O(t)?3:0}function v(t,e){return 2===y(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function b(t,e){return 2===y(t)?t.get(e):t[e]}function g(t,e,n){var r=y(t);2===r?t.set(e,n):3===r?(t.delete(e),t.add(n)):t[e]=n}function m(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}function w(t){return G&&t instanceof Map}function O(t){return Q&&t instanceof Set}function S(t){return t.o||t.t}function P(t){if(Array.isArray(t))return Array.prototype.slice.call(t);var e=rt(t);delete e[et];for(var n=nt(e),r=0;r<n.length;r++){var o=n[r],i=e[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(e[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:t[o]})}return Object.create(Object.getPrototypeOf(t),e)}function A(t,e){return void 0===e&&(e=!1),C(t)||p(t)||!h(t)||(y(t)>1&&(t.set=t.add=t.clear=t.delete=j),Object.freeze(t),e&&d(t,(function(t,e){return A(e,!0)}),!0)),t}function j(){f(2)}function C(t){return null==t||"object"!=typeof t||Object.isFrozen(t)}function k(t){var e=ot[t];return e||f(18,t),e}function _(t,e){ot[t]||(ot[t]=e)}function E(){return q}function D(t,e){e&&(k("Patches"),t.u=[],t.s=[],t.v=e)}function R(t){x(t),t.p.forEach(T),t.p=null}function x(t){t===q&&(q=t.l)}function I(t){return q={p:[],l:q,h:t,m:!0,_:0}}function T(t){var e=t[et];0===e.i||1===e.i?e.j():e.g=!0}function M(t,e){e._=e.p.length;var n=e.p[0],r=void 0!==t&&t!==n;return e.h.O||k("ES5").S(e,t,r),r?(n[et].P&&(R(e),f(4)),h(t)&&(t=N(e,t),e.l||F(e,t)),e.u&&k("Patches").M(n[et],t,e.u,e.s)):t=N(e,n,[]),R(e),e.u&&e.v(e.u,e.s),t!==Z?t:void 0}function N(t,e,n){if(C(e))return e;var r=e[et];if(!r)return d(e,(function(o,i){return W(t,r,e,o,i,n)}),!0),e;if(r.A!==t)return e;if(!r.P)return F(t,r.t,!0),r.t;if(!r.I){r.I=!0,r.A._--;var o=4===r.i||5===r.i?r.o=P(r.k):r.o;d(3===r.i?new Set(o):o,(function(e,i){return W(t,r,o,e,i,n)})),F(t,o,!1),n&&t.u&&k("Patches").R(r,n,t.u,t.s)}return r.o}function W(t,e,n,r,o,i){if(p(o)){var c=N(t,o,i&&e&&3!==e.i&&!v(e.D,r)?i.concat(r):void 0);if(g(n,r,c),!p(c))return;t.m=!1}if(h(o)&&!C(o)){if(!t.h.N&&t._<1)return;N(t,o),e&&e.A.l||F(t,o)}}function F(t,e,n){void 0===n&&(n=!1),t.h.N&&t.m&&A(e,n)}function L(t,e){var n=t[et];return(n?S(n):t)[e]}function z(t,e){if(e in t)for(var n=Object.getPrototypeOf(t);n;){var r=Object.getOwnPropertyDescriptor(n,e);if(r)return r;n=Object.getPrototypeOf(n)}}function U(t){t.P||(t.P=!0,t.l&&U(t.l))}function J(t){t.o||(t.o=P(t.t))}function K(t,e,n){var r=w(e)?k("MapSet").T(e,n):O(e)?k("MapSet").F(e,n):t.O?function(t,e){var n=Array.isArray(t),r={i:n?1:0,A:e?e.A:E(),P:!1,I:!1,D:{},l:e,t:t,k:null,o:null,j:null,C:!1},o=r,i=it;n&&(o=[r],i=ct);var c=Proxy.revocable(o,i),u=c.revoke,s=c.proxy;return r.k=s,r.j=u,s}(e,n):k("ES5").J(e,n);return(n?n.A:E()).p.push(r),r}function X(t){return p(t)||f(22,t),function t(e){if(!h(e))return e;var n,r=e[et],o=y(e);if(r){if(!r.P&&(r.i<4||!k("ES5").K(r)))return r.t;r.I=!0,n=H(e,o),r.I=!1}else n=H(e,o);return d(n,(function(e,o){r&&b(r.t,e)===o||g(n,e,t(o))})),3===o?new Set(n):n}(t)}function H(t,e){switch(e){case 2:return new Map(t);case 3:return Array.from(t)}return P(t)}function V(){function t(t,e){var n=o[t];return n?n.enumerable=e:o[t]=n={configurable:!0,enumerable:e,get:function(){var e=this[et];return it.get(e,t)},set:function(e){var n=this[et];it.set(n,t,e)}},n}function e(t){for(var e=t.length-1;e>=0;e--){var o=t[e][et];if(!o.P)switch(o.i){case 5:r(o)&&U(o);break;case 4:n(o)&&U(o)}}}function n(t){for(var e=t.t,n=t.k,r=nt(n),o=r.length-1;o>=0;o--){var i=r[o];if(i!==et){var c=e[i];if(void 0===c&&!v(e,i))return!0;var u=n[i],s=u&&u[et];if(s?s.t!==c:!m(u,c))return!0}}var a=!!e[et];return r.length!==nt(e).length+(a?0:1)}function r(t){var e=t.k;if(e.length!==t.t.length)return!0;var n=Object.getOwnPropertyDescriptor(e,e.length-1);return!(!n||n.get)}var o={};_("ES5",{J:function(e,n){var r=Array.isArray(e),o=function(e,n){if(e){for(var r=Array(n.length),o=0;o<n.length;o++)Object.defineProperty(r,""+o,t(o,!0));return r}var i=rt(n);delete i[et];for(var c=nt(i),u=0;u<c.length;u++){var s=c[u];i[s]=t(s,e||!!i[s].enumerable)}return Object.create(Object.getPrototypeOf(n),i)}(r,e),i={i:r?5:4,A:n?n.A:E(),P:!1,I:!1,D:{},l:n,t:e,k:o,o:null,g:!1,C:!1};return Object.defineProperty(o,et,{value:i,writable:!0}),o},S:function(t,n,o){o?p(n)&&n[et].A===t&&e(t.p):(t.u&&function t(e){if(e&&"object"==typeof e){var n=e[et];if(n){var o=n.t,i=n.k,c=n.D,u=n.i;if(4===u)d(i,(function(e){e!==et&&(void 0!==o[e]||v(o,e)?c[e]||t(i[e]):(c[e]=!0,U(n)))})),d(o,(function(t){void 0!==i[t]||v(i,t)||(c[t]=!1,U(n))}));else if(5===u){if(r(n)&&(U(n),c.length=!0),i.length<o.length)for(var s=i.length;s<o.length;s++)c[s]=!1;else for(var a=o.length;a<i.length;a++)c[a]=!0;for(var l=Math.min(i.length,o.length),f=0;f<l;f++)void 0===c[f]&&t(i[f])}}}}(t.p[0]),e(t.p))},K:function(t){return 4===t.i?n(t):r(t)}})}var $,q,B="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),G="undefined"!=typeof Map,Q="undefined"!=typeof Set,Y="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,Z=B?Symbol.for("immer-nothing"):(($={})["immer-nothing"]=!0,$),tt=B?Symbol.for("immer-draftable"):"__$immer_draftable",et=B?Symbol.for("immer-state"):"__$immer_state",nt=("undefined"!=typeof Symbol&&Symbol.iterator,"undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames),rt=Object.getOwnPropertyDescriptors||function(t){var e={};return nt(t).forEach((function(n){e[n]=Object.getOwnPropertyDescriptor(t,n)})),e},ot={},it={get:function(t,e){if(e===et)return t;var n=S(t);if(!v(n,e))return function(t,e,n){var r,o=z(e,n);return o?"value"in o?o.value:null===(r=o.get)||void 0===r?void 0:r.call(t.k):void 0}(t,n,e);var r=n[e];return t.I||!h(r)?r:r===L(t.t,e)?(J(t),t.o[e]=K(t.A.h,r,t)):r},has:function(t,e){return e in S(t)},ownKeys:function(t){return Reflect.ownKeys(S(t))},set:function(t,e,n){var r=z(S(t),e);if(null==r?void 0:r.set)return r.set.call(t.k,n),!0;if(!t.P){var o=L(S(t),e),i=null==o?void 0:o[et];if(i&&i.t===n)return t.o[e]=n,t.D[e]=!1,!0;if(m(n,o)&&(void 0!==n||v(t.t,e)))return!0;J(t),U(t)}return t.o[e]=n,t.D[e]=!0,!0},deleteProperty:function(t,e){return void 0!==L(t.t,e)||e in t.t?(t.D[e]=!1,J(t),U(t)):delete t.D[e],t.o&&delete t.o[e],!0},getOwnPropertyDescriptor:function(t,e){var n=S(t),r=Reflect.getOwnPropertyDescriptor(n,e);return r?{writable:!0,configurable:1!==t.i||"length"!==e,enumerable:r.enumerable,value:n[e]}:r},defineProperty:function(){f(11)},getPrototypeOf:function(t){return Object.getPrototypeOf(t.t)},setPrototypeOf:function(){f(12)}},ct={};d(it,(function(t,e){ct[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),ct.deleteProperty=function(t,e){return it.deleteProperty.call(this,t[0],e)},ct.set=function(t,e,n){return it.set.call(this,t[0],e,n,t[0])};var ut=new(function(){function t(t){this.O=Y,this.N=!0,"boolean"==typeof(null==t?void 0:t.useProxies)&&this.setUseProxies(t.useProxies),"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this)}var e=t.prototype;return e.produce=function(t,e,n){if("function"==typeof t&&"function"!=typeof e){var r=e;e=t;var o=this;return function(t){var n=this;void 0===t&&(t=r);for(var i=arguments.length,c=Array(i>1?i-1:0),u=1;u<i;u++)c[u-1]=arguments[u];return o.produce(t,(function(t){var r;return(r=e).call.apply(r,[n,t].concat(c))}))}}var i;if("function"!=typeof e&&f(6),void 0!==n&&"function"!=typeof n&&f(7),h(t)){var c=I(this),u=K(this,t,void 0),s=!0;try{i=e(u),s=!1}finally{s?R(c):x(c)}return"undefined"!=typeof Promise&&i instanceof Promise?i.then((function(t){return D(c,n),M(t,c)}),(function(t){throw R(c),t})):(D(c,n),M(i,c))}if(!t||"object"!=typeof t){if((i=e(t))===Z)return;return void 0===i&&(i=t),this.N&&A(i,!0),i}f(21,t)},e.produceWithPatches=function(t,e){var n,r,o=this;return"function"==typeof t?function(e){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return o.produceWithPatches(e,(function(e){return t.apply(void 0,[e].concat(r))}))}:[this.produce(t,e,(function(t,e){n=t,r=e})),n,r]},e.createDraft=function(t){h(t)||f(8),p(t)&&(t=X(t));var e=I(this),n=K(this,t,void 0);return n[et].C=!0,x(e),n},e.finishDraft=function(t,e){var n=(t&&t[et]).A;return D(n,e),M(void 0,n)},e.setAutoFreeze=function(t){this.N=t},e.setUseProxies=function(t){t&&!Y&&f(20),this.O=t},e.applyPatches=function(t,e){var n;for(n=e.length-1;n>=0;n--){var r=e[n];if(0===r.path.length&&"replace"===r.op){t=r.value;break}}var o=k("Patches").$;return p(t)?o(t,e):this.produce(t,(function(t){return o(t,e.slice(n+1))}))},t}()),st=(ut.produce,ut.produceWithPatches.bind(ut),ut.setAutoFreeze.bind(ut),ut.setUseProxies.bind(ut),ut.applyPatches.bind(ut),ut.createDraft.bind(ut),ut.finishDraft.bind(ut),n(0),function(){return Math.random().toString(36).substring(7).split("").join(".")});st(),st();function at(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return 0===e.length?function(t){return t}:1===e.length?e[0]:e.reduce((function(t,e){return function(){return t(e.apply(void 0,arguments))}}))}function lt(t,e){return t===e}function ft(t,e,n){if(null===e||null===n||e.length!==n.length)return!1;for(var r=e.length,o=0;o<r;o++)if(!t(e[o],n[o]))return!1;return!0}function pt(t){var e=Array.isArray(t[0])?t[0]:t;if(!e.every((function(t){return"function"==typeof t}))){var n=e.map((function(t){return typeof t})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+n+"]")}return e}!function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r]}((function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:lt,n=null,r=null;return function(){return ft(e,n,arguments)||(r=t.apply(null,arguments)),n=arguments,r}}));function ht(t){return function(e){var n=e.dispatch,r=e.getState;return function(e){return function(o){return"function"==typeof o?o(n,r,t):e(o)}}}}var dt=ht();dt.withExtraArgument=ht;function yt(){return(yt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}"undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;function vt(t,e){function n(){if(e){var n=e.apply(void 0,arguments);if(!n)throw new Error("prepareAction did not return an object");return yt({type:t,payload:n.payload},"meta"in n&&{meta:n.meta},{},"error"in n&&{error:n.error})}return{type:t,payload:arguments.length<=0?void 0:arguments[0]}}return n.toString=function(){return""+t},n.type=t,n.match=function(e){return e.type===t},n}"undefined"!=typeof Symbol&&(Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator"))),"undefined"!=typeof Symbol&&(Symbol.asyncIterator||(Symbol.asyncIterator=Symbol("Symbol.asyncIterator")));V();var bt=function(t,e){return String(t).slice(0,e.length)===e},gt=function(t){if("string"==typeof t)return function(e){return bt(String(e.type),t)};if(Array.isArray(t))return function(e){return t.some((function(t){return"string"==typeof t?bt(String(e.type),t):t instanceof RegExp?null!=String(e.type).match(t):void 0}))};if(t instanceof RegExp)return function(e){return null!=String(e.type).match(t)};if("function"==typeof t)return function(e){return t(e)};throw new TypeError("CableCar: 'permittedActions' option is not formatted correctly (string|string[]|RegExp|function)")};function mt(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function wt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function Ot(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?wt(Object(n),!0).forEach((function(e){At(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):wt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function St(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Pt(t,e,n){return e&&St(t.prototype,e),n&&St(t,n),t}function At(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var jt=function(){function t(e,n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),At(this,"consumer",void 0),At(this,"store",void 0),At(this,"channel",void 0),At(this,"active",!1),At(this,"connected",!1),At(this,"subscription",void 0),At(this,"_options",{}),At(this,"_permittedActionFn",(function(){return!0})),At(this,"_destroyCallback",void 0),this.consumer=e,this.store=n,this.channel=String(r),this.options=o||{},this.subscription=this.init(),this._destroyCallback=i}return Pt(t,[{key:"options",get:function(){return this._options},set:function(t){void 0!==t.permittedActions?this._permittedActionFn=gt(t.permittedActions):this._permittedActionFn=gt("RAILS");var e={params:t.params||{},silent:!!t.silent,matchChannel:!!t.matchChannel};t.initialized&&(e.initialized=t.initialized),t.connected&&(e.connected=t.connected),t.disconnected&&(e.disconnected=t.disconnected),t.received&&(e.received=t.received),t.rejected&&(e.rejected=t.rejected),this._options=Object.freeze(e)}}]),Pt(t,[{key:"destroy",value:function(){var t;this.active=!1,this.connected=!1,null===(t=this.subscription)||void 0===t||t.unsubscribe(),this.subscription=null,this._destroyCallback&&(this._destroyCallback(),this._destroyCallback=void 0)}},{key:"perform",value:function(t,e){this.isReady(),this.subscription.perform(t,e)}},{key:"send",value:function(t){this.isReady(),this.subscription.send(t)}},{key:"pause",value:function(){this.active=!1}},{key:"resume",value:function(){this.active=!0}},{key:"permitsAction",value:function(t){var e=!(t.meta&&t.meta.__cablecar__);return!(this.options.matchChannel&&e&&t.meta&&t.meta.channel&&t.meta.channel!=this.channel)&&(e&&(e=this._permittedActionFn(t)),e)}},{key:"init",value:function(){var t=this,e=function(e){t.store&&!t.options.silent&&t.store.dispatch(e)},n=function(e){return vt(e,(function(){var e;return{payload:{},meta:(e={},At(e,"__cablecar__",!0),At(e,"channel",t.channel),e)}}))()};return this.consumer.subscriptions.create(Ot({channel:this.channel},this.options.params),{initialized:function(){t.active=!0,e(n("".concat("redux-cablecar","/INIT"))),t.options.initialized&&t.options.initialized()},connected:function(){t.connected=!0,e(n("".concat("redux-cablecar","/CONNECTED"))),t.options.connected&&t.options.connected()},disconnected:function(){t.connected=!1,e(n("".concat("redux-cablecar","/DISCONNECTED"))),t.options.disconnected&&t.options.disconnected()},received:function(n){var r,o=n.type,i=n.meta,c=n.payload,u=mt(n,["type","meta","payload"]),s={payload:Ot(Ot({},c),u),meta:Ot(Ot({},i),{},(r={},At(r,"__cablecar__",!0),At(r,"channel",t.channel),r)),type:o||"".concat("redux-cablecar","/RECEIVED")};e(s)},rejected:function(r){t.active=!1,t.connected=!1,e(n("".concat("redux-cablecar","/REJECTED"))),t.options.rejected?t.options.rejected():console.error("CableCar: connection rejected. (Channel: ".concat(t.channel,") ").concat(r))}})}},{key:"isReady",value:function(){if(!this.connected)throw new TypeError("CableCar channel: ".concat(this.channel," is disconnected."));if(!this.active)throw new TypeError("CableCar channel: ".concat(this.channel," is paused."))}}]),t}();function Ct(t){return function(e){return function(n){return function(r){var o=t.cars.filter((function(t){return t.active&&t.permitsAction(r)})),i=!1;return o.length&&(i=o.reduce((function(t,e){var n=r.meta;return e.connected?(e.send(r),t&&null!=n&&n.isOptimistic&&(t=!1)):((null!=n&&n.isOptimistic||null!=n&&n.isOptimisticOnFail)&&(t=!1),console.error("CableCar channel: ".concat(e.channel," Dropped action.")+(t?"":" Action passed thru middleware to Redux (optimistic)."),r)),t}),!0)),i?e.getState():n(r)}}}}var kt=new o;function _t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=new l(t),n=kt.consumerFor(e);return{createMiddleware:function(){return Ct(e)},connect:function(t,r,o){var i=new jt(n,t,r,o||{},(function(){e.removeCar(i)}));return e.addCar(i),Et(i)},allCars:function(){return e.cars.map(Et)},reset:function(){e.cars=[]}}}function Et(t){return{destroy:function(){return t.destroy()},pause:function(){return t.pause()},resume:function(){return t.resume()},perform:function(e,n){return t.perform(e,n)},send:function(e){return t.send(e)}}}"undefined"!=typeof window&&window.addEventListener("beforeunload",(function(){kt.unsubscribeAll()}))}]);