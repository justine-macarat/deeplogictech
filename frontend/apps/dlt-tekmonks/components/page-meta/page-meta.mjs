import{monkshu_component}from"/framework/js/monkshu_component.mjs";function register(){monkshu_component.register("page-meta",null,page_meta)}async function elementRendered(e){const t=e.getAttribute("files").split(",");for(const e of t){const t=await fetch(e);if(t.ok){const e=await t.text();document.head.innerHTML+=e}}}const trueWebComponentMode=!0;export const page_meta={trueWebComponentMode:true,register:register,elementRendered:elementRendered};