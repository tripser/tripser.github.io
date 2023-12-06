"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[288],{3753:function(e,t,i){i.d(t,{Z:function(){return f}});var r=i(5893),n=i(1163),a=i(1664),s=i(5697),l=i.n(s),c=i(7421),o=i(8193),d=i(5519),u=i.n(d),g=i(7265),h=i(4285);function m(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function p(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},r=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter((function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable})))),r.forEach((function(t){m(e,t,i[t])}))}return e}var x=function(e){return""===e?"No date":"".concat(new Date(e).getDate(),".").concat(new Date(e).getMonth()+1,".").concat(new Date(e).getFullYear())};function f(e){var t=e.children,i=(0,n.useRouter)(),s=(0,c.$G)(),l=s.t,d=s.i18n,m=u().find((function(e){return e.slug===i.asPath.replace("/blog/","")})),f=m.title,j=m.intro,b=m.img,v=m.published,y=m.modified,w=m.categories,k=null===w||void 0===w?void 0:w.split(", ").filter((function(e){return e})),N=u().filter((function(e){return e.lang===d.language})),_=(N[N.findIndex((function(e){return e.title===f}))+1]||N[0],N[N.findIndex((function(e){return e.title===f}))-1]||N[N.length-1],[]);return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(g.Z,p({title:"".concat(f),description:j,splash:b,itemtype:"Article"},m,{children:(0,r.jsx)("div",{"data-aos":"fade-right",children:(0,r.jsx)("article",{className:"new-stack",children:(0,r.jsx)("div",{className:"article__main article-shape",children:(0,r.jsxs)("div",{className:"container narrow",children:[(0,r.jsxs)("div",{className:"article__details",children:[(0,r.jsx)("div",{className:"article__categories",children:null===k||void 0===k?void 0:k.map((function(e){return(0,r.jsx)(a.default,{href:"/blog?".concat(e),children:(0,r.jsx)("a",{children:(0,r.jsx)("span",{itemProp:"articleSection",children:l("categories.".concat(e))})})},e)}))}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("time",{className:"article__date",itemProp:"datePublished",content:x(v),dateTime:x(v),children:[l("blog.published")," ",x(v)]}),(0,r.jsxs)("time",{className:"article__date",itemProp:"dateModified",content:x(y),dateTime:x(y),children:[l("blog.modified")," ",x(y)]})]})]}),(0,r.jsx)("div",{className:"article__content mb-10",itemProp:"articleBody",children:t}),(0,r.jsx)("div",{className:"mb-15",children:(0,r.jsx)(a.default,{href:"/blog",children:(0,r.jsxs)("a",{className:"btn",children:[(0,r.jsx)(o.FtK,{className:"mr-1"}),l("blog.back")]})})}),_.length?(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"mb-5",children:l("blog.suggested")}),(0,r.jsx)(h.Z,{data:_,className:"mb-20"})]}):null]})})})})}))})}f.propTypes={children:l().node}},3709:function(e,t,i){i.d(t,{Z:function(){return s}});var r=i(5893),n=i(5697),a=i.n(n);function s(e){var t=e.data,i=t.length%2===0;return(0,r.jsx)("div",{className:"figures ".concat(i?"figures2":""),children:t.map((function(e){return(0,r.jsxs)("figure",{children:[(0,r.jsx)("img",{src:e.src,alt:e.caption}),(0,r.jsx)("figcaption",{children:e.caption})]},e)}))})}s.propTypes={data:a().arrayOf({src:a().string,caption:a().string})}},4285:function(e,t,i){i.d(t,{Z:function(){return c}});var r=i(5893),n=i(1664),a=i(5697),s=i.n(a);function l(e){var t=e.item;return(0,r.jsx)(n.default,{href:t.link||"",children:(0,r.jsxs)("a",{title:t.title,className:"card",children:[(0,r.jsx)("div",{className:"card__img",children:(0,r.jsx)("img",{src:t.img,alt:t.title,width:"260",height:"146",loading:"lazy"})}),(0,r.jsxs)("div",{className:"card__data",children:[(0,r.jsx)("h2",{className:"card__title t-ellipsis",children:t.title}),(0,r.jsx)("p",{children:t.categories})]})]})})}function c(e){var t=e.data,i=e.className;return(0,r.jsx)("div",{className:"grid "+(i||""),children:t.map((function(e){return(0,r.jsx)(l,{item:e},e.title)}))})}l.propTypes={item:s().object},c.propTypes={data:s().array,className:s().string}},7265:function(e,t,i){i.d(t,{Z:function(){return y}});var r=i(5893),n=i(7294),a=i(1163),s=i(9008),l=i(5697),c=i.n(l),o=i(1664),d=i(7421),u=i(5434),g=[{text:"Home",link:"/#"},{text:"Blog",link:"/blog"},{text:"Contact",link:"/#contact"}];function h(e,t){if(null==e)return{};var i,r,n=function(e,t){if(null==e)return{};var i,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||(n[i]=e[i]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)i=a[r],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(n[i]=e[i])}return n}function m(e){var t=e.onClick,i=e.theme,n=h(e,["onClick","theme"]),s=(0,a.useRouter)(),l=(0,d.$G)(),c=(l.t,l.i18n);return(0,r.jsx)("header",{className:"header",children:(0,r.jsxs)("div",{className:"container",children:[g.map((function(e,t){return(0,r.jsx)(o.default,{href:e.link,children:t?(0,r.jsx)("a",{children:e.text}):(0,r.jsx)("a",{className:"logo",children:(0,r.jsx)("img",{src:"/images/logo.png",alt:"Tripser logo",title:e.text,width:"30",height:"30"})})},e.text)})),(0,r.jsxs)("div",{className:"actions",children:[(0,r.jsx)("button",{onClick:function(){var e="en"===c.language?"fr":"en";c.changeLanguage(e),window.localStorage.setItem("lang",e),s.asPath.includes("/blog/")&&s.push("/blog/".concat(n[e]))},children:c.language}),(0,r.jsx)("button",{onClick:t,className:"btn",title:"dark"==i?"Switch to light mode":"Switch to dark mode","aria-label":"dark"==i?"Switch to light mode":"Switch to dark mode",children:"dark"===i?(0,r.jsx)(u.Dq,{title:"Dark mode","aria-labelledby":"Dark mode"}):(0,r.jsx)(u.EWX,{title:"Light mode","aria-labelledby":"Light mode"})})]})]})})}m.propTypes={onClick:c().func,theme:c().string,en:c().string,fr:c().string};var p=i(7735),x=i(8193);function f(){var e=(0,a.useRouter)(),t=e.asPath.replace(/\?.*/g,"$'").split("/").filter((function(e){return e}));return"/"!==e.route?(0,r.jsx)("div",{className:"breadcrumb",children:(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsx)(o.default,{href:"/",children:"Home"})}),t.map((function(e,i){return(0,r.jsx)("li",{children:i===t.length-1?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x.rYR,{}),e.replace(/-/g," ")]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x.rYR,{}),(0,r.jsx)(o.default,{href:"/".concat(e),children:(0,r.jsx)("a",{children:e.replace(/-/g," ")})})]})},e)}))]})}):null}var j=[{link:"https://instagram.com/tripserblog/",title:"Instagram",icon:p.Pno},{link:"https://pinterest.com/tripserblog/",title:"Pinterest",icon:p.tvq},{link:"mailto:tripser.blog@gmail.com",title:"Mail",icon:p.IeF}];function b(){var e=(0,d.$G)().t;return(0,r.jsx)("footer",{id:"contact",className:"contact",children:(0,r.jsxs)("div",{className:"container","data-aos":"fade-right",children:[(0,r.jsx)(f,{}),(0,r.jsx)("p",{className:"mb-5",children:e("contact")}),(0,r.jsx)("div",{className:"mb-10",children:j.map((function(e){var t=e.icon;return(0,r.jsxs)("a",{href:e.link,target:"_blank",rel:"noopener noreferrer",className:"btn mb-4 mr-4",children:[(0,r.jsx)(t,{title:e.title,"aria-labelledby":e.title}),(0,r.jsx)("span",{className:"ml-1",children:e.title})]},e.link)}))}),(0,r.jsxs)("p",{className:"contact__copy",children:["\xa9 ",(new Date).getFullYear()," | Tripser"]})]})})}function v(e){var t=e.title,i=e.subtitle,n=e.splash;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"splash","data-aos":"fade-up",children:[(0,r.jsx)("img",{src:n,alt:t,width:"300",height:"150",itemProp:"image"}),(0,r.jsxs)("div",{className:"splash__headings",children:[(0,r.jsx)("h1",{itemProp:"headline name",children:t}),i?(0,r.jsx)("p",{children:i}):null]})]})})}function y(e){var t=e.title,i=e.subtitle,l=e.description,c=e.img,o=e.splash,d=e.url,u=e.children,g=e.itemtype,h=e.published,p=e.modified,x=e.lang,f=e.en,j=e.fr,y=(0,n.useState)(""),w=y[0],k=y[1],N=(0,a.useRouter)();(0,n.useEffect)((function(){var e=window.localStorage.getItem("theme");k(e)}),[]);var _=c?c.startsWith("http")?c:"https://tripser.github.io".concat(c):null;return(0,r.jsxs)("main",{className:w,itemScope:!!g||void 0,itemType:g?"http://schema.org/"+g:void 0,children:[(0,r.jsxs)(s.default,{children:[x?(0,r.jsx)("meta",{property:"og:locale",content:{en:"en_GB",fr:"fr_FR"}[x]},"og:locale"):null,(0,r.jsx)("title",{children:"".concat(t).concat("/"!==N.pathname?" | Tripser":"")},"title"),(0,r.jsx)("meta",{name:"description",content:l},"description"),(0,r.jsx)("meta",{property:"og:title",content:"".concat(t).concat("/"!==N.pathname?" | Tripser":"")},"og:title"),(0,r.jsx)("meta",{property:"og:description",content:l},"og:description"),(0,r.jsx)("meta",{property:"og:url",content:d||"https://tripser.github.io"},"og:url"),(0,r.jsx)("meta",{property:"og:image",content:_||"https://tripser.github.io/images/tripser.jpg"},"og:image"),(0,r.jsx)("meta",{property:"twitter:title",content:"".concat(t).concat("/"!==N.pathname?" | Tripser":"")},"twitter:title"),(0,r.jsx)("meta",{property:"twitter:description",content:l},"twitter:description"),(0,r.jsx)("meta",{property:"twitter:url",content:d||"https://tripser.github.io"},"twitter:url"),(0,r.jsx)("meta",{property:"twitter:image",content:_||"https://tripser.github.io/images/tripser.jpg"},"twitter:image"),h?(0,r.jsx)("meta",{property:"article:published_time",content:h}):null,p?(0,r.jsx)("meta",{property:"article:modified_time",content:p}):null]}),(0,r.jsx)(m,{onClick:function(){var e="light"===w?"dark":"light";window.localStorage.setItem("theme",e),k(e)},theme:w,en:f,fr:j}),(0,r.jsxs)("div",{className:"new-stack",children:[(0,r.jsx)(v,{title:t,subtitle:i,splash:o}),(0,r.jsx)("div",{className:"body",children:u})]}),(0,r.jsx)(b,{}),(0,r.jsx)("div",{id:"ie-banner",children:"Please open this website with a recent browser for the best experience. Avoid Internet Explorer at all costs."})]})}v.propTypes={title:c().string,subtitle:c().string,splash:c().string},y.propTypes={title:c().string,subtitle:c().string,description:c().string,img:c().string,splash:c().string,url:c().string,children:c().node,itemtype:c().string,published:c().string,modified:c().string,lang:c().string,en:c().string,fr:c().string}},5519:function(e){e.exports=[{slug:"weekend-au-luxembourg",title:"Un court weekend au Luxembourg",intro:"Comment passer 2 ou 3 jours au Luxembourg en d\xe9couvrant sa nature, ses ch\xe2teaux et la ville ?",img:"/images/articles/weekend-au-luxembourg.jpg",published:"2023-11-25",modified:"2023-11-30",lang:"fr",en:"weekend-in-luxembourg",fr:"",categories:"voyage, europe, hike, city-trip",link:"/blog/weekend-au-luxembourg",url:"https://tripser.github.io/blog/weekend-au-luxembourg"},{slug:"weekend-in-luxembourg",title:"A short weekend in Luxembourg",intro:"How to spend 2 or 3 days in Luxembourg discovering the nature, the castles and the city?",img:"/images/articles/weekend-in-luxembourg.jpg",published:"2023-11-15",modified:"2023-11-30",lang:"en",en:"",fr:"weekend-au-luxembourg",categories:"voyage, europe, hike, city-trip",link:"/blog/weekend-in-luxembourg",url:"https://tripser.github.io/blog/weekend-in-luxembourg"}]},1151:function(e,t,i){i.d(t,{ah:function(){return a}});var r=i(7294);const n=r.createContext({});function a(e){const t=r.useContext(n);return r.useMemo((()=>"function"===typeof e?e(t):{...t,...e}),[t,e])}}}]);