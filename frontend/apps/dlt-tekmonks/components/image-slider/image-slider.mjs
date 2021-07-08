import{util}from"/framework/js/util.mjs";import{session}from"/framework/js/session.mjs";import{monkshu_component}from"/framework/js/monkshu_component.mjs";async function elementConnected(t){let e;t.getAttribute("styleBody")&&(e=`<style>${t.getAttribute("styleBody")}</style>`),t.id?(image_slider.datas||(image_slider.datas={}),image_slider.datas[t.id]={styleBody:e}):image_slider.data={styleBody:e}}async function elementRendered(t){let e=t.getAttribute("path"),s=await(await fetch(`${APP_CONSTANTS.API_CMS_DIR_CONTENTS}?q=${e}`)).json();if(!s.result)return;let o=t.shadowRoot.querySelector("div#container");t.getAttribute("style")&&(o.style=t.getAttribute("style"));let l=t=>fetch(t).then((t=>{if(!t.ok)throw"FetchError";return t})),i=s.files,r=async function(t){let s=null,o=null;try{s=await(await l(`${APP_CONSTANTS.CMS_ROOT_URL}/${e}/${t}/${t}.${session.get($$.MONKSHU_CONSTANTS.LANG_ID)}.md`)).text(),o=!0}catch(t){}if(!s)try{s=await(await l(`${APP_CONSTANTS.CMS_ROOT_URL}/${e}/${t}/${t}.html`)).text(),o=!1}catch(t){}return{img:`${APP_CONSTANTS.CMS_ROOT_URL}/${e}/${t}/${t}`,caption:s,isMD:o}};for(let[t,e]of i.entries())i[t]=await r(e);styleDots(t,i.length),await setImages(t,i),styleSliderArrows(t,i.length),runAnimation(t,i.length,t.getAttribute("pause")||5e3)}function styleDots(t,e){if(1!=e){if(t.getAttribute("dot_style")){let e=util.getCSSRule(t.shadowRoot,".nav-dots .nav-dot").style.cssText;util.getCSSRule(t.shadowRoot,".nav-dots .nav-dot").style.cssText=e+t.getAttribute("dot_style")}if(t.getAttribute("selected_dot_style")){let e=util.getCSSRule(t.shadowRoot,".nav-dots .nav-dot:hover").style.cssText;util.getCSSRule(t.shadowRoot,".nav-dots .nav-dot:hover").style.cssText=e+t.getAttribute("selected_dot_style"),util.getCSSRule(t.shadowRoot,".nav-dot-selected").style.cssText=e+t.getAttribute("selected_dot_style")+" !important"}}else t.shadowRoot.querySelector("div#slider .nav-dots").style.visibility="hidden"}async function setImages(t,e){let s=e.length,o=t.shadowRoot.querySelector("div#slider figure");o.style.width=100*s+"%";let l=t.shadowRoot.querySelector("div#slider li");const{content_post:i}=await import(`${APP_CONSTANTS.APP_PATH}/components/content-post/content-post.mjs`);for(const[r,n]of e.entries()){let e=document.createElement("div");e.className="relative";let a=document.createElement("img");if(a.src=n.img,a.style.width=100/s+"%",a.style.cssText+=t.getAttribute("style"),e.appendChild(a),n.caption){let s=document.createElement("article");s.classList.add("caption"),s.innerHTML=n.isMD?await i.renderArticle(null,n.caption):n.caption,s.style.cssText+=t.getAttribute("caption_style")?t.getAttribute("caption_style"):"",e.appendChild(s)}o.appendChild(e);let d=document.createElement("label");d.className="nav-dot",d.id=`dot-${r}`,d.onclick=e=>{o.style.left=-1*r*100+"%",makeNavDotSelected(t,r,s)},l.appendChild(d)}makeNavDotSelected(t,0,s)}function styleSliderArrows(t,e){if(1==e)return t.shadowRoot.querySelector(".left-arrow").style.visibility="hidden",void(t.shadowRoot.querySelector(".right-arrow").style.visibility="hidden");let s=t.shadowRoot.querySelector("div#slider figure");if(t.getAttribute("chevron_style")){let e=util.getCSSRule(t.shadowRoot,".left-arrow").style.cssText;util.getCSSRule(t.shadowRoot,".left-arrow").style.cssText=e+t.getAttribute("chevron_style"),e=util.getCSSRule(t.shadowRoot,".right-arrow").style.cssText,util.getCSSRule(t.shadowRoot,".right-arrow").style.cssText=e+t.getAttribute("chevron_style")}t.shadowRoot.querySelector(".left-arrow").onclick=o=>{let l=s.style.left?s.style.left.substring(0,s.style.left.length-1):0;l=0==l?-1*(e-1)*100:parseInt(l)+100,s.style.left=`${l}%`,makeNavDotSelected(t,-1*l/100,e)},t.shadowRoot.querySelector(".right-arrow").onclick=o=>{let l=s.style.left?s.style.left.substring(0,s.style.left.length-1):0;l=l-100==-1*e*100?0:l-100,s.style.left=`${l}%`,makeNavDotSelected(t,-1*l/100,e)}}function runAnimation(t,e,s){let o=t.shadowRoot.querySelector("div#slider figure");setInterval((s=>{o.style.transition||(o.style.transition=`all ${(t.getAttribute("transition")||1e3)/1e3}s ease-in-out`);let l=o.style.left?o.style.left.substring(0,o.style.left.length-1):0;l=l-100==-1*e*100?0:l-100,o.style.left=`${l}%`,makeNavDotSelected(t,-1*l/100,e)}),s)}function makeNavDotSelected(t,e,s){for(let o=0;o<s;o++){let s=t.shadowRoot.querySelector(`#dot-${o}`);o==e?s.classList.add("nav-dot-selected"):s.classList.remove("nav-dot-selected")}}function register(){monkshu_component.register("image-slider",`${APP_CONSTANTS.APP_PATH}/components/image-slider/image-slider.html`,image_slider)}const trueWebComponentMode=!0;export const image_slider={trueWebComponentMode:true,register:register,setImages:setImages,elementConnected:elementConnected,elementRendered:elementRendered};