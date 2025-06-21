(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},8273:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>c,pages:()=>d,routeModule:()=>f,tree:()=>u}),r(7352),r(5866),r(82);var o=r(3191),n=r(8716),s=r(7922),i=r.n(s),l=r(5231),a={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(a[e]=()=>l[e]);r.d(t,a);let u=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,82)),"C:\\Git\\Portfolio\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],d=[],c="/_not-found/page",m={require:r,loadChunk:()=>Promise.resolve()},f=new o.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},8942:(e,t,r)=>{Promise.resolve().then(r.bind(r,6553))},6238:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},6553:(e,t,r)=>{"use strict";r.d(t,{F:()=>l,ThemeProvider:()=>i});var o=r(326),n=r(7577);let s=(0,n.createContext)(void 0),i=({children:e})=>{let[t,r]=(0,n.useState)("light");return(0,n.useEffect)(()=>{let e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;r(e||(t?"dark":"light"))},[]),(0,n.useEffect)(()=>{let e=window.document.documentElement;e.classList.remove("light","dark"),e.classList.add(t),localStorage.setItem("theme",t)},[t]),o.jsx(s.Provider,{value:{theme:t,toggleTheme:()=>{r(e=>"light"===e?"dark":"light")}},children:e})},l=()=>{let e=(0,n.useContext)(s);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}},82:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u,metadata:()=>a});var o=r(9510),n=r(4672),s=r.n(n),i=r(8570);let l=(0,i.createProxy)(String.raw`C:\Git\Portfolio\context\ThemeContext.tsx#ThemeProvider`);(0,i.createProxy)(String.raw`C:\Git\Portfolio\context\ThemeContext.tsx#useTheme`),r(7272);let a={title:"Sparsh Majumdar | Cybersecurity & Development",description:"Portfolio of Sparsh Majumdar - Cybersecurity Specialist & Full Stack Developer"};function u({children:e}){return(0,o.jsxs)("html",{lang:"en",suppressHydrationWarning:!0,className:"scroll-smooth",children:[(0,o.jsxs)("head",{children:[o.jsx("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),o.jsx("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"})]}),(0,o.jsxs)("body",{className:`${s().className} antialiased matrix-bg`,children:[o.jsx("div",{id:"custom-cursor",className:"custom-cursor"}),o.jsx(l,{children:o.jsx("div",{className:"relative",children:e})}),o.jsx("script",{dangerouslySetInnerHTML:{__html:`
            document.addEventListener('DOMContentLoaded', function() {
              const cursor = document.getElementById('custom-cursor');
              let mouseX = 0;
              let mouseY = 0;
              
              document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.left = mouseX - 10 + 'px';
                cursor.style.top = mouseY - 10 + 'px';
              });
              
              document.addEventListener('mouseenter', function() {
                cursor.style.opacity = '1';
              });
              
              document.addEventListener('mouseleave', function() {
                cursor.style.opacity = '0';
              });
              
              // Add hover effect for interactive elements
              const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
              interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                  cursor.classList.add('hover');
                });
                element.addEventListener('mouseleave', function() {
                  cursor.classList.remove('hover');
                });
              });
            });
          `}})]})]})}},6399:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return n},notFound:function(){return o}});let r="NEXT_NOT_FOUND";function o(){let e=Error(r);throw e.digest=r,e}function n(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7352:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{PARALLEL_ROUTE_DEFAULT_PATH:function(){return n},default:function(){return s}});let o=r(6399),n="next/dist/client/components/parallel-route-default.js";function s(){(0,o.notFound)()}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[5],()=>r(8273));module.exports=o})();