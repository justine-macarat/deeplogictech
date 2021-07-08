import{i18n}from"/framework/js/i18n.mjs";import{session}from"/framework/js/session.mjs";import{monkshu_component}from"/framework/js/monkshu_component.mjs";async function elementConnected(e){let t=[];try{if(e.getAttribute("file"))t=(await(await fetch(`${APP_CONSTANTS.CMS_ROOT_URL}/${e.getAttribute("file")}`)).json()).level1;else if(e.getAttribute("level")){let n=e.getAttribute("level"),l=session.get($$.MONKSHU_CONSTANTS.LANG_ID),i=await(await fetch(`${APP_CONSTANTS.API_NAV_MENU_LISTING}?q=${n}&lang=${l}`)).json();i.result&&(t=i.menu.level1)}for(const e of t)e.level2&&(e.level2[0].selected=!0)}catch(e){}let n={logo:e.getAttribute("logo"),level1:t};n.level1=e.getAttribute("massage_menu")&&"false"==e.getAttribute("massage_menu").toLowerCase()?n.level1:await massageMenu(e,n.level1,1),e.getAttribute("styleBody")&&(n.styleBody=`<style>${e.getAttribute("styleBody")}</style>`),e.getAttribute("logo_style")&&(n.logostyle=`style="${e.getAttribute("logo_style")}"`),e.id?(navigation_menu.datas||(navigation_menu.datas={}),navigation_menu.datas[e.id]=n):navigation_menu.data=n}function enableRightColumnContent(e,t){e.parentElement.parentElement.querySelectorAll(".description").forEach((e=>{e.id==t?e.classList.add("visible"):e.classList.remove("visible")}));e.parentElement.parentElement.querySelectorAll(".menubgimage").forEach((e=>{e.id==t?e.classList.add("visible"):e.classList.remove("visible")}));e.parentElement.querySelectorAll(".submenu").forEach((t=>{t===e?t.classList.add("selected"):t.classList.remove("selected")}))}function enableMenu(e){var t=e.getAttribute("data-id");const n=e.parentElement.querySelectorAll(".mitem"),l=e.parentElement.querySelectorAll(".outerlayer"),i=e.parentElement.querySelectorAll(".close-button");l.forEach((e=>{e.classList.add("outerlayer-visible"),e})),n.forEach((e=>{e.id==t?e.classList.add("mitem-visible"):e.classList.remove("mitem-visible")})),i.forEach((e=>{e.classList.remove("hidden")}))}function toggleMenu(e){const t=e.parentElement.querySelectorAll(".outerlayer-visible"),n=e.parentElement.querySelectorAll(".mitem"),l=e.parentElement.querySelectorAll(".close-button");t.forEach((e=>{e.classList.remove("outerlayer-visible"),n.forEach((e=>{e.classList.remove("mitem-visible")})),l.forEach((e=>{e.classList.add("hidden")}))}))}function closeMenu(e){const t=e.parentElement.parentElement.querySelectorAll(".mitem"),n=e.parentElement.querySelectorAll(".close-button");t.forEach((e=>{e.classList.remove("mitem-visible"),n.forEach((e=>{e.classList.add("hidden")}))}))}async function massageMenu(e,t,n){let l=await i18n.getI18NObject(session.get($$.MONKSHU_CONSTANTS.LANG_ID));const{content_post:i}=await import(`${APP_CONSTANTS.APP_PATH}/components/content-post/content-post.mjs`);let s="level"+(n+1);for(let o of t)l[o.item]?o.item=l[o.item]:(o.item.length&&(o.item=o.item.substring(0,1).toUpperCase()+o.item.substring(1)),-1!=o.item.indexOf(".")&&(o.item=o.item.substring(0,o.item.indexOf(".")))),o.description&&(o.description=await i.renderArticle(null,o.description)),o[s]&&(o.level1=`${o.item}`,o.item=`${o.item}`,o[s]=await massageMenu(e,o[s],n+1));return t}function register(){monkshu_component.register("navigation-menu",`${APP_CONSTANTS.APP_PATH}/components/navigation-menu/navigation-menu.html`,navigation_menu)}const trueWebComponentMode=!0;export const navigation_menu={trueWebComponentMode:true,register:register,elementConnected:elementConnected,enableRightColumnContent:enableRightColumnContent,enableMenu:enableMenu,toggleMenu:toggleMenu,closeMenu:closeMenu};