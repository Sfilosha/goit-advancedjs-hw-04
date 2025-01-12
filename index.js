import{a as h,i as n,S as L}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const w=new URLSearchParams({key:"10224742-53a1a7880f946c3462445b43a",image_type:"photo",orientation:"horizontal",safesearch:"true"});h.defaults.baseURL="https://pixabay.com/api";const y=async(o,r=1)=>(await h.get(`/?${w}&q=${o}`,{params:{page:r,per_page:15}})).data;function f(o){return o.reduce((r,e,l,t)=>r+`<li class="gallery-item">
            <a class="gallery-item-content" href="${e.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${e.webformatURL}"
                    alt="${e.tags}"
                    />
                <ul class="card-porperties">
                <li class="property-el">
                    <p class="property-title">Likes</p>
                    <p class="property-text">${e.likes}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Views</p>
                    <p class="property-text">${e.views}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Comments</p>
                    <p class="property-text">${e.comments}</p>
                </li>
                <li class="property-el">
                    <p class="property-title">Downloads</p>
                    <p class="property-text">${e.downloads}</p>
                </li>
                </ul>
            </a>
        </li>`,"")}n.settings({titleColor:"white",messageColor:"white",backgroundColor:"red",position:"topRight",maxWidth:432});const d=document.querySelector(".js-gallery"),g=document.querySelector("form"),c=document.querySelector(".loader"),i=document.querySelector(".js-load-more");let p=1,b=15,a="",m=new L(".js-gallery a",{captionsData:"alt",captionDelay:250});m.on("error.simplelightbox",function(o){console.log(o)});g.addEventListener("submit",o=>{if(o.preventDefault(),a=new FormData(g).get("search-query"),!a.trim()){alert("Please enter the search query");return}p=1,d.innerHTML="",c.removeAttribute("hidden"),y(a,p).then(e=>{if(c.setAttribute("hidden",""),console.log(),Object.keys(e.hits).length>=b)i.removeAttribute("hidden");else if(e.total===0)return n.show({message:"Sorry, there are no images matching your search query. Please try again!"}),null;return f(e.hits)}).then(e=>{d.innerHTML=e,m.refresh()}).catch(e=>{console.log(e)})});i.addEventListener("click",o=>{++p,c.removeAttribute("hidden"),i.setAttribute("hidden",""),y(a,p).then(r=>(c.setAttribute("hidden",""),Object.keys(r.hits).length<b?(i.setAttribute("hidden",""),n.settings({titleColor:"steelblue",messageColor:"steelblue",backgroundColor:"lightcyan",position:"topRight",maxWidth:432}),n.show({message:"We're sorry, but you've reached the end of search results."})):i.removeAttribute("hidden"),f(r.hits))).then(r=>{d.insertAdjacentHTML("beforeend",r);const t=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy(0,t),m.refresh()}).catch(r=>{console.log(r)})});
//# sourceMappingURL=index.js.map
