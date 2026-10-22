import{i as L,S as $,a as v}from"./assets/vendor-qVKOaGj3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const f of e.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&n(f)}).observe(document,{childList:!0,subtree:!0});function t(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(s){if(s.ep)return;s.ep=!0;const e=t(s);fetch(s.href,e)}})();const m=document.querySelector(".search-form"),g=document.querySelector('input[name="searchQuery"]'),u=document.querySelector(".gallery"),d=document.querySelector(".loader");let a=null;const l=document.querySelector(".load-more");let i=1;const p=40;let y="";const h=document.querySelector(".end-message");let c=0;console.log(m);console.log(g);console.log(u);console.log(d);m.addEventListener("submit",r=>{r.preventDefault();const o=g.value.trim();o!==""&&(y=o,i=1,h.classList.add("is-hidden"),l.classList.add("is-hidden"),u.innerHTML="",d.classList.remove("is-hidden"),b(o,i).then(t=>{const n=t.hits;c=t.totalHits,n.length===0&&L.error({title:"Error",message:"Can not found any photo. Please try again another words.",position:"topRight"}),u.innerHTML=n.map(e=>`
        <li class ="gallery-item">
          <a href="${e.largeImageURL}">
          <img
          src="${e.webformatURL}"
          alt="${e.tags}"
          loading="lazy"
          />
          </a>
          <div class="image-info">
          <p><b>Likes:</b> ${e.likes}</p>
          <p><b>Views: </b>${e.views}</p>
          <p><b>Comments:</b> ${e.comments}</p>
          <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>
        `).join("");const s=i*p>=c;l.classList.toggle("is-hidden",s),h.classList.toggle("is-hidden",!s),n.length>0&&(a?a.refresh():a=new $(".gallery a"))}).catch(t=>{console.error("Hata : ",t),alert("Fotoğraflar yüklenirken bir hata oluştu.")}).finally(()=>{d.classList.add("is-hidden")}))});const w="57977373-faec9c630f955850b63d7a23e";async function b(r,o){const t=await v.get(`https://pixabay.com/api/?key=${w}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${p}`);return console.log(t.data),{hits:t.data.hits,totalHits:t.data.totalHits}}l.addEventListener("click",()=>{i+=1,d.classList.remove("is-hidden"),l.classList.add("is-hidden"),b(y,i).then(r=>{const o=r.hits;c=r.totalHits,u.insertAdjacentHTML("beforeend",o.map(t=>`
              <li class="gallery-item">
                <a href="${t.largeImageURL}">
                  <img
                    src="${t.webformatURL}"
                    alt="${t.tags}"
                    loading="lazy"
                  />
                </a>
                <div class="image-info">
                  <p><b>Likes:</b> ${t.likes}</p>
                  <p><b>Views:</b> ${t.views}</p>
                  <p><b>Comments:</b> ${t.comments}</p>
                  <p><b>Downloads:</b> ${t.downloads}</p>
                </div>
              </li>
            `).join("")),a&&a.refresh(),l.classList.toggle("is-hidden",i*p>=c),i*p>=c&&h.classList.remove("is-hidden")}).catch(r=>{console.error("Hata:",r),i-=1,alert("Fotoğraflar yüklenirken bir hata oluştu.")}).finally(()=>{d.classList.add("is-hidden")})});
//# sourceMappingURL=index.js.map
