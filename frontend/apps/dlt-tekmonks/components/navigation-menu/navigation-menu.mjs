/* 
 * (C) 2019 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import {i18n} from "/framework/js/i18n.mjs";
import {session} from "/framework/js/session.mjs";
import {monkshu_component} from "/framework/js/monkshu_component.mjs";


function enableScrollIntoView(scrollInto) {
	var element = document.querySelector('page-generator').shadowRoot;
	var scrollElement = element.querySelector(scrollInto);
	scrollElement.scrollIntoView({behavior: "smooth", inline: "start"});
}

function register() {
	// convert this all into a WebComponent so we can use it
	monkshu_component.register("navigation-menu", `${APP_CONSTANTS.APP_PATH}/components/navigation-menu/navigation-menu.html`, navigation_menu);
}


const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const navigation_menu = {trueWebComponentMode, register, enableScrollIntoView}