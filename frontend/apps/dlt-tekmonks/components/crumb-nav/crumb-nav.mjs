import{i18n}from"/framework/js/i18n.mjs";import{util}from"/framework/js/util.mjs";import{router}from"/framework/js/router.mjs";import{session}from"/framework/js/session.mjs";import{monkshu_component}from"/framework/js/monkshu_component.mjs";async function elementConnected(e){let t=[],r=util.parseBoolean(e.getAttribute("filterDottedDirs")),s=e.getAttribute("level"),n=session.get($$.MONKSHU_CONSTANTS.LANG_ID);try{let i=await(await fetch(`${APP_CONSTANTS.API_NAV_MENU_LISTING}?q=${s}&lang=${n}`)).json();if(i.result)for(let e of i.menu.level1)(r&&-1==e.item.indexOf(".")||!r)&&t.push(e);for(let r of t)r.link=router.encodeURL(util.replaceURLParamValue(session.get($$.MONKSHU_CONSTANTS.PAGE_URL),e.getAttribute("level_name"),`${s}/${r.item}`))}catch(e){}let i=[{item:await i18n.get("back",session.get($$.MONKSHU_CONSTANTS.LANG_ID)),id:"back_crumb",link:"javascript:history.back()"}];i.push(...t),t=i,t=e.getAttribute("massage_menu")&&"false"==e.getAttribute("massage_menu").toLowerCase()?t:await massageMenu(t);let o={crumbs:t};e.getAttribute("styleBody")&&(o.styleBody=`<style>${e.getAttribute("styleBody")}</style>`),e.id?(crumb_nav.datas||(crumb_nav.datas={}),crumb_nav.datas[e.id]=o):crumb_nav.data=o}async function massageMenu(e){let t=await i18n.getI18NObject(session.get($$.MONKSHU_CONSTANTS.LANG_ID));for(let r of e)t[r.item]?r.item=t[r.item]:(r.item.length&&(r.item=r.item.substring(0,1).toUpperCase()+r.item.substring(1)),-1!=r.item.indexOf(".")&&(r.item=r.item.substring(0,r.item.indexOf("."))));return e}function register(){monkshu_component.register("crumb-nav",`${APP_CONSTANTS.APP_PATH}/components/crumb-nav/crumb-nav.html`,crumb_nav)}const trueWebComponentMode=!0;export const crumb_nav={trueWebComponentMode:true,register:register,elementConnected:elementConnected};