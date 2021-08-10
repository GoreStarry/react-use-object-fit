"use strict";var t=require("react");function e(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==r)return;var n,i,o=[],u=!0,a=!1;try{for(r=r.call(t);!(u=(n=r.next()).done)&&(o.push(n.value),!e||o.length!==e);u=!0);}catch(t){a=!0,i=t}finally{try{u||null==r.return||r.return()}finally{if(a)throw i}}return o}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}module.exports=function(r){var n=r.type,i=r.imgUrl,o=r.container,u=o.ref,a=o.dom,c=o.width,l=o.height,f=e(t.useState({width:0,height:0,offsetX:0,offsetY:0,imgWidth:0,imgHeight:0,imgRatio:0,containerWidth:0,containerHeight:0}),2),h=f[0],d=f[1],s=t.useRef(),g=t.useRef(),m=e(t.useState({width:0,height:0}),2),v=m[0],w=m[1],y=t.useCallback((function(){var t,e,r=(null==u?void 0:u.current)||a,i=c||(null==r?void 0:r.clientWidth),o=l||(null==r?void 0:r.clientHeight),f=i/o,h=v.width,s=v.height,g=h/s,m=0,w=0;if("cover"===n)g>=f?(m=(i-(t=h*(o/s)))/2,e=o):(t=i,w=(o-(e=s*(i/h)))/2);else if("contain"===n){if(g>=f)t=i,w=(o-(e=s*(i/h)))/2;else e=o,m=(i-(t=h*(o/s)))/2}d({width:t,height:e,imgRatio:g,offsetX:m,offsetY:w,imgWidth:h,imgHeight:s,containerWidth:i,containerHeight:o})}),[n,u,a,c,l,v]);return t.useEffect((function(){if(g.current){y();var t=(null==u?void 0:u.current)||a;return s.current&&window.removeEventListener("resize",s.current),window&&t&&window.addEventListener("resize",y),s.current=y,function(){window.removeEventListener("resize",s.current)}}}),[y]),t.useEffect((function(){if(i){g.current=!1;var t=document.createElement("img");t.addEventListener("load",(function(t){g.current=!0;var e=t.target,r=e.naturalWidth,n=e.naturalHeight;w({width:r,height:n})})),t.src=i}}),[i]),h};
//# sourceMappingURL=index.js.map
