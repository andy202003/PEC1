parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Nwn9":[function(require,module,exports) {
var t=document.querySelector(".banner"),e=document.querySelectorAll(".slider"),r=document.querySelector(".previous"),i=document.querySelector(".next"),o=document.querySelector(".links"),n=o.getElementsByTagName("a"),a=t.getAttribute("data-height"),u=t.getAttribute("data-width"),l=t.getAttribute("data-slide-speed"),c=t.getAttribute("data-autoslide"),g=i.getAttribute("data-next-cursor"),s=r.getAttribute("data-previous-cursor"),h=n.length,d=1,p=d+1,f=h,y=3,m=t.querySelector("img:nth-of-type("+d+")"),v=t.querySelector("img:nth-of-type("+p+")"),b=t.querySelector("img:nth-of-type("+f+")"),q=t.querySelector("img:nth-of-type("+y+")");function x(t,e){if(e.length>1)for(var r=0;r<e.length;r++)Object.assign(e[r].style,t);else Object.assign(e.style,t)}document.body.style.margin="0",x({width:u,height:a+"px",margin:"0 auto",position:"relative"},t),x({position:"absolute",width:"50%",height:a+"px",top:"0"},[r,i]),x({cursor:h<=1?"default":s?"url("+s+"), auto":"w-resize",width:"50%",left:"0"},r),x({cursor:h<=1?"default":g?"url("+g+"), auto":"e-resize",right:"0"},i),x({"text-align":"center",position:"relative",top:"400px",left:"0",right:"0",margin:"auto",cursor:"default",width:30*n.length+"px"},o);for(var S=0;S<e.length;S++)x({width:u,height:a+"px",margin:"0 auto"},e[S]),x({position:"absolute",opacity:"0","object-fit":"cover"},e[S]);for(S=0;S<n.length;S++)x({color:"#000",display:"inline-block","text-decoration":"none",background:"#FFF","border-radius":"50%",height:"15px",width:"15px",margin:"10px 5px",transition:"all 0.5s"},n[S]);!function(){function e(t,e,r){x({transition:"opacity "+e+"ms",opacity:r},t)}function o(){for(var t=0;t<n.length;t++){var e=n[t].getAttribute("href");x({opacity:d==e?.8:.4},n[t])}}function a(){o(),p=d+1,f=d-1,d==h&&(p=1),1==d&&(f=h),m=t.querySelector("img:nth-of-type("+d+")"),v=t.querySelector("img:nth-of-type("+p+")"),b=t.querySelector("img:nth-of-type("+f+")"),q=t.querySelector("img:nth-of-type("+y+")")}function u(){clearInterval(w),w=setInterval(g,c)}function g(){var t=document.createEvent("HTMLEvents");t.initEvent("click",1,0),i.dispatchEvent(t)}for(var s=0;s<n.length;s++)n[s].onclick=function(){return u(),y=parseInt(this.getAttribute("href")),q=t.querySelector("img:nth-of-type("+y+")"),randomImgFade(),d=y,a(),!1};for(var S=[r,i],A=0;A<S.length;A++)h>1&&(S[A].onclick=function(t){"next"==t.target.getAttribute("class")?(e(m,l,0),e(v,l,1),d=p):(previousImgFade(),d=f),u(),a()});if(o(),e(m,l,1),h>1)var w=setInterval(g,c)}();
},{}]},{},["Nwn9"], null)
//# sourceMappingURL=/slider.3b56147f.js.map