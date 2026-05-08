//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region frontend/src/dark-mode-switch.ts
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
function setDarkMode() {
	let dark_mode = false;
	switch (localStorage.getItem("dark_mode")) {
		case "dark":
			dark_mode = true;
			break;
		case "light":
			dark_mode = false;
			break;
		default: dark_mode = darkModeQuery.matches;
	}
	if (dark_mode) document.body.classList.add("dark");
	else document.body.classList.remove("dark");
}
darkModeQuery.addEventListener("change", setDarkMode);
addEventListener("storage", (event) => {
	if (event.key === "dark_mode") setDarkMode();
});
const themes = [
	"system",
	"dark",
	"light"
];
const theme_toggle = document.getElementById("theme-toggle");
document.addEventListener("theme-change", () => {
	let current_theme = localStorage.getItem("dark_mode");
	if (current_theme === null) current_theme = "system";
	const next_theme = themes[(themes.indexOf(current_theme) + 1) % themes.length];
	localStorage.setItem("dark_mode", next_theme);
	theme_toggle.setAttribute("data-selected", next_theme);
	setDarkMode();
});
document.addEventListener("DOMContentLoaded", () => {
	let current_theme = localStorage.getItem("dark_mode");
	if (current_theme === null) current_theme = "system";
	theme_toggle.setAttribute("data-selected", current_theme);
});
setDarkMode();
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/defaultAttributes.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/createElement.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const createSVGElement = ([tag, attrs, children]) => {
	const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
	Object.keys(attrs).forEach((name) => {
		element.setAttribute(name, String(attrs[name]));
	});
	if (children?.length) children.forEach((child) => {
		const childElement = createSVGElement(child);
		element.appendChild(childElement);
	});
	return element;
};
const createElement = (iconNode, customAttrs = {}) => {
	return createSVGElement([
		"svg",
		{
			...defaultAttributes,
			...customAttrs
		},
		iconNode
	]);
};
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/replaceElement.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
	attrs[attr.name] = attr.value;
	return attrs;
}, {});
const getClassNames = (attrs) => {
	if (typeof attrs === "string") return attrs;
	if (!attrs || !attrs.class) return "";
	if (attrs.class && typeof attrs.class === "string") return attrs.class.split(" ");
	if (attrs.class && Array.isArray(attrs.class)) return attrs.class;
	return "";
};
const replaceElement = (element, { nameAttr, icons, attrs }) => {
	const iconName = element.getAttribute(nameAttr);
	if (iconName == null) return;
	const iconNode = icons[toPascalCase(iconName)];
	if (!iconNode) return console.warn(`${element.outerHTML} icon name was not found in the provided icons object.`);
	const elementAttrs = getAttrs(element);
	const ariaProps = hasA11yProp(elementAttrs) ? {} : { "aria-hidden": "true" };
	const iconAttrs = {
		...defaultAttributes,
		"data-lucide": iconName,
		...ariaProps,
		...attrs,
		...elementAttrs
	};
	const elementClassNames = getClassNames(elementAttrs);
	const className = getClassNames(attrs);
	const classNames = mergeClasses("lucide", `lucide-${iconName}`, ...elementClassNames, ...className);
	if (classNames) Object.assign(iconAttrs, { class: classNames });
	const svgElement = createElement(iconNode, iconAttrs);
	return element.parentNode?.replaceChild(svgElement, element);
};
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/arrow-left.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ArrowLeft = [["path", { d: "m12 19-7-7 7-7" }], ["path", { d: "M19 12H5" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/arrow-right.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ArrowRight = [["path", { d: "M5 12h14" }], ["path", { d: "m12 5 7 7-7 7" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/calendar.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Calendar = [
	["path", { d: "M8 2v4" }],
	["path", { d: "M16 2v4" }],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2"
	}],
	["path", { d: "M3 10h18" }]
];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/chevron-left.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ChevronLeft = [["path", { d: "m15 18-6-6 6-6" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/chevron-right.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ChevronRight = [["path", { d: "m9 18 6-6-6-6" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/chevrons-left.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ChevronsLeft = [["path", { d: "m11 17-5-5 5-5" }], ["path", { d: "m18 17-5-5 5-5" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/chevrons-right.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ChevronsRight = [["path", { d: "m6 17 5-5-5-5" }], ["path", { d: "m13 17 5-5-5-5" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/clock.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Clock = [["circle", {
	cx: "12",
	cy: "12",
	r: "10"
}], ["path", { d: "M12 6v6l4 2" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/laptop.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Laptop = [["path", { d: "M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z" }], ["path", { d: "M20.054 15.987H3.946" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/link.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Link = [["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }], ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/moon.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Moon = [["path", { d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/newspaper.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Newspaper = [
	["path", { d: "M15 18h-5" }],
	["path", { d: "M18 14h-8" }],
	["path", { d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" }],
	["rect", {
		width: "8",
		height: "4",
		x: "10",
		y: "6",
		rx: "1"
	}]
];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/search.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Search = [["path", { d: "m21 21-4.34-4.34" }], ["circle", {
	cx: "11",
	cy: "11",
	r: "8"
}]];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/shapes.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Shapes = [
	["path", { d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" }],
	["rect", {
		x: "3",
		y: "14",
		width: "7",
		height: "7",
		rx: "1"
	}],
	["circle", {
		cx: "17.5",
		cy: "17.5",
		r: "3.5"
	}]
];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/icons/sun.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Sun = [
	["circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}],
	["path", { d: "M12 2v2" }],
	["path", { d: "M12 20v2" }],
	["path", { d: "m4.93 4.93 1.41 1.41" }],
	["path", { d: "m17.66 17.66 1.41 1.41" }],
	["path", { d: "M2 12h2" }],
	["path", { d: "M20 12h2" }],
	["path", { d: "m6.34 17.66-1.41 1.41" }],
	["path", { d: "m19.07 4.93-1.41 1.41" }]
];
//#endregion
//#region node_modules/.pnpm/lucide@1.14.0/node_modules/lucide/dist/esm/lucide.mjs
/**
* @license lucide v1.14.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const createIcons = ({ icons = {}, nameAttr = "data-lucide", attrs = {}, root = document, inTemplates } = {}) => {
	if (!Object.values(icons).length) throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");
	if (typeof root === "undefined") throw new Error("`createIcons()` only works in a browser environment.");
	Array.from(root.querySelectorAll(`[${nameAttr}]`)).forEach((element) => replaceElement(element, {
		nameAttr,
		icons,
		attrs
	}));
	if (inTemplates) Array.from(root.querySelectorAll("template")).forEach((template) => createIcons({
		icons,
		nameAttr,
		attrs,
		root: template.content,
		inTemplates
	}));
	if (nameAttr === "data-lucide") {
		const deprecatedElements = root.querySelectorAll("[icon-name]");
		if (deprecatedElements.length > 0) {
			console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide");
			Array.from(deprecatedElements).forEach((element) => replaceElement(element, {
				nameAttr: "icon-name",
				icons,
				attrs
			}));
		}
	}
};
//#endregion
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r$1(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r$1(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r$1(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
/**
* Concatenates two arrays faster than the array spread operator.
*/
const concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
const createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
const createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
const CLASS_PART_SEPARATOR = "-";
const EMPTY_CONFLICTS = [];
const ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
const createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
const getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
const getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
const createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
const processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
const getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
const isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
const createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
const IMPORTANT_MODIFIER = "!";
const MODIFIER_SEPARATOR = ":";
const EMPTY_MODIFIERS = [];
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
const createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
const createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
const createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
const twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
const toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value) => fractionRegex.test(value);
const isNumber$1 = (value) => !!value && !Number.isNaN(Number(value));
const isInteger = (value) => !!value && Number.isInteger(Number(value));
const isPercent = (value) => value.endsWith("%") && isNumber$1(value.slice(0, -1));
const isTshirtSize = (value) => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = (value) => shadowRegex.test(value);
const isImage = (value) => imageRegex.test(value);
const isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value) => arbitraryValueRegex.test(value);
const isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber$1);
const isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
const isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
const isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
const isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
const getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
const isLabelPosition = (label) => label === "position" || label === "percentage";
const isLabelImage = (label) => label === "image" || label === "url";
const isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
const isLabelLength = (label) => label === "length";
const isLabelNumber = (label) => label === "number";
const isLabelFamilyName = (label) => label === "family-name";
const isLabelWeight = (label) => label === "number" || label === "weight";
const isLabelShadow = (label) => label === "shadow";
const getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber$1,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber$1,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber$1,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber$1,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber$1,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber$1],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber$1,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber$1,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/width
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/height
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber$1,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber$1,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber$1,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber$1,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber$1, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber$1] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber$1] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber$1,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber$1,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber$1,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
//#endregion
//#region frontend/src/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
const TOAST_CONTAINER_ID = "__toast_container__";
function getToastContainer() {
	let container = document.getElementById(TOAST_CONTAINER_ID);
	if (!container) {
		container = document.createElement("div");
		container.id = TOAST_CONTAINER_ID;
		container.className = cn("fixed bottom-4 right-4 z-[9999] flex max-w-[calc(100vw-2rem)] flex-col gap-2 pointer-events-none");
		document.body.appendChild(container);
	}
	return container;
}
function toast(message, options) {
	const container = getToastContainer();
	const el = document.createElement("div");
	const variant = options?.variant ?? "normal";
	el.className = cn("pointer-events-auto w-80 max-w-full rounded-xl border px-4 py-3 shadow-lg", "transition-all duration-300 ease-out", "translate-y-2 opacity-0", variant === "success" ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100" : variant === "destructive" ? "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100" : "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100", options?.class);
	el.textContent = message;
	container.appendChild(el);
	requestAnimationFrame(() => {
		el.classList.remove("translate-y-2", "opacity-0");
		el.classList.add("translate-y-0", "opacity-100");
	});
	const fadeOut = () => {
		el.classList.remove("translate-y-0", "opacity-100");
		el.classList.add("translate-y-2", "opacity-0");
		const remove = () => {
			el.remove();
			if (!container.hasChildNodes()) container.remove();
		};
		el.addEventListener("transitionend", remove, { once: true });
	};
	window.setTimeout(fadeOut, 5e3);
}
//#endregion
//#region node_modules/.pnpm/glightbox@3.3.1/node_modules/glightbox/dist/js/glightbox.min.js
var require_glightbox_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).GLightbox = t();
	})(exports, (function() {
		"use strict";
		function e(e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
		}
		function t(e, t) {
			for (var i = 0; i < t.length; i++) {
				var s = t[i];
				s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, n(s.key), s);
			}
		}
		function i(e, i, n) {
			return i && t(e.prototype, i), n && t(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
		}
		function n(e) {
			var t = function(e, t) {
				if ("object" != typeof e || !e) return e;
				var i = e[Symbol.toPrimitive];
				if (void 0 !== i) {
					var n = i.call(e, t || "default");
					if ("object" != typeof n) return n;
					throw new TypeError("@@toPrimitive must return a primitive value.");
				}
				return ("string" === t ? String : Number)(e);
			}(e, "string");
			return "symbol" == typeof t ? t : t + "";
		}
		function s(e) {
			return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e;
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
			})(e);
		}
		var l = Date.now();
		function o() {
			var e = {}, t = !0, i = 0, n = arguments.length;
			"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], i++);
			for (var s = function(i) {
				for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t && "[object Object]" === Object.prototype.toString.call(i[n]) ? e[n] = o(!0, e[n], i[n]) : e[n] = i[n]);
			}; i < n; i++) {
				var l = arguments[i];
				s(l);
			}
			return e;
		}
		function r(e, t) {
			if ((E(e) || e === window || e === document) && (e = [e]), L(e) || I(e) || (e = [e]), 0 != M(e)) {
				if (L(e) && !I(e)) for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);
				else if (I(e)) {
					for (var s in e) if (P(e, s) && !1 === t.call(e[s], e[s], s, e)) break;
				}
			}
		}
		function a(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = e[l] = e[l] || [], s = {
				all: n,
				evt: null,
				found: null
			};
			return t && i && M(n) > 0 && r(n, (function(e, n) {
				if (e.eventName == t && e.fn.toString() == i.toString()) return s.found = !0, s.evt = n, !1;
			})), s;
		}
		function h(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = t.onElement, n = t.withCallback, s = t.avoidDuplicate, l = void 0 === s || s, o = t.once, h = void 0 !== o && o, d = t.useCapture, c = void 0 !== d && d, u = arguments.length > 2 ? arguments[2] : void 0, g = i || [];
			function v(e) {
				C(n) && n.call(u, e, this), h && v.destroy();
			}
			return k(g) && (g = document.querySelectorAll(g)), v.destroy = function() {
				r(g, (function(t) {
					var i = a(t, e, v);
					i.found && i.all.splice(i.evt, 1), t.removeEventListener && t.removeEventListener(e, v, c);
				}));
			}, r(g, (function(t) {
				var i = a(t, e, v);
				(t.addEventListener && l && !i.found || !l) && (t.addEventListener(e, v, c), i.all.push({
					eventName: e,
					fn: v
				}));
			})), v;
		}
		function d(e, t) {
			r(t.split(" "), (function(t) {
				return e.classList.add(t);
			}));
		}
		function c(e, t) {
			r(t.split(" "), (function(t) {
				return e.classList.remove(t);
			}));
		}
		function u(e, t) {
			return e.classList.contains(t);
		}
		function g(e, t) {
			for (; e !== document.body;) {
				if (!(e = e.parentElement)) return !1;
				if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e;
			}
		}
		function v(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
			if (!e || "" === t) return !1;
			if ("none" === t) return C(i) && i(), !1;
			var n = b(), s = t.split(" ");
			r(s, (function(t) {
				d(e, "g" + t);
			})), h(n, {
				onElement: e,
				avoidDuplicate: !1,
				once: !0,
				withCallback: function(e, t) {
					r(s, (function(e) {
						c(t, "g" + e);
					})), C(i) && i();
				}
			});
		}
		function f(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
			if ("" === t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
			e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t;
		}
		function p(e) {
			e.style.display = "block";
		}
		function m(e) {
			e.style.display = "none";
		}
		function y(e) {
			var t = document.createDocumentFragment(), i = document.createElement("div");
			for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);
			return t;
		}
		function x() {
			return {
				width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			};
		}
		function b() {
			var e, t = document.createElement("fakeelement"), i = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "animationend",
				WebkitAnimation: "webkitAnimationEnd"
			};
			for (e in i) if (void 0 !== t.style[e]) return i[e];
		}
		function S(e, t, i, n) {
			if (e()) t();
			else {
				var s;
				i || (i = 100);
				var l = setInterval((function() {
					e() && (clearInterval(l), s && clearTimeout(s), t());
				}), i);
				n && (s = setTimeout((function() {
					clearInterval(l);
				}), n));
			}
		}
		function w(e, t, i) {
			if (O(e)) console.error("Inject assets error");
			else if (C(t) && (i = t, t = !1), k(t) && t in window) C(i) && i();
			else {
				var n;
				if (-1 !== e.indexOf(".css")) {
					if ((n = document.querySelectorAll("link[href=\"" + e + "\"]")) && n.length > 0) return void (C(i) && i());
					var s = document.getElementsByTagName("head")[0], l = s.querySelectorAll("link[rel=\"stylesheet\"]"), o = document.createElement("link");
					o.rel = "stylesheet", o.type = "text/css", o.href = e, o.media = "all", l ? s.insertBefore(o, l[0]) : s.appendChild(o), C(i) && i();
					return;
				}
				if ((n = document.querySelectorAll("script[src=\"" + e + "\"]")) && n.length > 0) {
					if (C(i)) {
						if (k(t)) return S((function() {
							return void 0 !== window[t];
						}), (function() {
							i();
						})), !1;
						i();
					}
				} else {
					var r = document.createElement("script");
					r.type = "text/javascript", r.src = e, r.onload = function() {
						if (C(i)) {
							if (k(t)) return S((function() {
								return void 0 !== window[t];
							}), (function() {
								i();
							})), !1;
							i();
						}
					}, document.body.appendChild(r);
				}
			}
		}
		function T() {
			return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i);
		}
		function C(e) {
			return "function" == typeof e;
		}
		function k(e) {
			return "string" == typeof e;
		}
		function E(e) {
			return !(!e || !e.nodeType || 1 != e.nodeType);
		}
		function A(e) {
			return Array.isArray(e);
		}
		function L(e) {
			return e && e.length && isFinite(e.length);
		}
		function I(e) {
			return "object" === s(e) && null != e && !C(e) && !A(e);
		}
		function O(e) {
			return null == e;
		}
		function P(e, t) {
			return null !== e && hasOwnProperty.call(e, t);
		}
		function M(e) {
			if (I(e)) {
				if (e.keys) return e.keys().length;
				var t = 0;
				for (var i in e) P(e, i) && t++;
				return t;
			}
			return e.length;
		}
		function z(e) {
			return !isNaN(parseFloat(e)) && isFinite(e);
		}
		function X() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
			if (!t.length) return !1;
			if (1 == t.length) return t[0];
			"string" == typeof e && (e = parseInt(e));
			var i = [];
			r(t, (function(e) {
				i.push(e.getAttribute("data-taborder"));
			}));
			var n = Math.max.apply(Math, i.map((function(e) {
				return parseInt(e);
			}))), s = e < 0 ? 1 : e + 1;
			s > n && (s = "1");
			var o = i.filter((function(e) {
				return e >= parseInt(s);
			})).sort()[0];
			return document.querySelector(".gbtn[data-taborder=\"".concat(o, "\"]"));
		}
		function Y(e) {
			if (e.events.hasOwnProperty("keyboard")) return !1;
			e.events.keyboard = h("keydown", {
				onElement: window,
				withCallback: function(t, i) {
					var n = (t = t || window.event).keyCode;
					if (9 == n) {
						var s = document.querySelector(".gbtn.focused");
						if (!s) {
							var l = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
							if ("input" == l || "textarea" == l || "button" == l) return;
						}
						t.preventDefault();
						var o = document.querySelectorAll(".gbtn[data-taborder]");
						if (!o || o.length <= 0) return;
						if (!s) {
							var r = X();
							r && (r.focus(), d(r, "focused"));
							return;
						}
						var a = X(s.getAttribute("data-taborder"));
						c(s, "focused"), a && (a.focus(), d(a, "focused"));
					}
					39 == n && e.nextSlide(), 37 == n && e.prevSlide(), 27 == n && e.close();
				}
			});
		}
		var q = i((function t(i, n) {
			var s = this, l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
			if (e(this, t), this.img = i, this.slide = n, this.onclose = l, this.img.setZoomEvents) return !1;
			this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (function(e) {
				return s.dragStart(e);
			}), !1), this.img.addEventListener("mouseup", (function(e) {
				return s.dragEnd(e);
			}), !1), this.img.addEventListener("mousemove", (function(e) {
				return s.drag(e);
			}), !1), this.img.addEventListener("click", (function(e) {
				return s.slide.classList.contains("dragging-nav") ? (s.zoomOut(), !1) : s.zoomedIn ? void (s.zoomedIn && !s.dragging && s.zoomOut()) : s.zoomIn();
			}), !1), this.img.setZoomEvents = !0;
		}), [
			{
				key: "zoomIn",
				value: function() {
					var e = this.widowWidth();
					if (!(this.zoomedIn || e <= 768)) {
						var t = this.img;
						if (t.setAttribute("data-style", t.getAttribute("style")), t.style.maxWidth = t.naturalWidth + "px", t.style.maxHeight = t.naturalHeight + "px", t.naturalWidth > e) {
							var i = e / 2 - t.naturalWidth / 2;
							this.setTranslate(this.img.parentNode, i, 0);
						}
						this.slide.classList.add("zoomed"), this.zoomedIn = !0;
					}
				}
			},
			{
				key: "zoomOut",
				value: function() {
					this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose();
				}
			},
			{
				key: "dragStart",
				value: function(e) {
					e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1;
				}
			},
			{
				key: "dragEnd",
				value: function(e) {
					var t = this;
					e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout((function() {
						t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging");
					}), 100);
				}
			},
			{
				key: "drag",
				value: function(e) {
					this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY));
				}
			},
			{
				key: "onMove",
				value: function(e) {
					if (this.zoomedIn) {
						var t = e.clientX - this.img.naturalWidth / 2, i = e.clientY - this.img.naturalHeight / 2;
						this.setTranslate(this.img, t, i);
					}
				}
			},
			{
				key: "setTranslate",
				value: function(e, t, i) {
					e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)";
				}
			},
			{
				key: "widowWidth",
				value: function() {
					return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				}
			}
		]), N = i((function t() {
			var i = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			e(this, t);
			var s = n.dragEl, l = n.toleranceX, o = void 0 === l ? 40 : l, r = n.toleranceY, a = void 0 === r ? 65 : r, h = n.slide, d = void 0 === h ? null : h, c = n.instance, u = void 0 === c ? null : c;
			this.el = s, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = o, this.toleranceY = a, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = d, this.instance = u, this.el.addEventListener("mousedown", (function(e) {
				return i.dragStart(e);
			}), !1), this.el.addEventListener("mouseup", (function(e) {
				return i.dragEnd(e);
			}), !1), this.el.addEventListener("mousemove", (function(e) {
				return i.drag(e);
			}), !1);
		}), [
			{
				key: "dragStart",
				value: function(e) {
					if (this.slide.classList.contains("zoomed")) this.active = !1;
					else {
						"touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset);
						var t = e.target.nodeName.toLowerCase();
						e.target.classList.contains("nodrag") || g(e.target, ".nodrag") || -1 !== [
							"input",
							"select",
							"textarea",
							"button",
							"a"
						].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && g(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = g(e.target, ".ginner-container")));
					}
				}
			},
			{
				key: "dragEnd",
				value: function(e) {
					var t = this;
					e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout((function() {
						t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = "";
					}), 100);
				}
			},
			{
				key: "drag",
				value: function(e) {
					if (this.active) {
						e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
						var t = Math.abs(this.currentX), i = Math.abs(this.currentY);
						if (t > 0 && t >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
							this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
							var n = this.shouldChange();
							if (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n), this.instance.settings.dragAutoSnap && n) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == n && this.instance.prevSlide(), void ("left" == n && this.instance.nextSlide());
						}
						if (this.toleranceY > 0 && i > 0 && i >= t && (!this.lastDirection || "y" == this.lastDirection)) {
							this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
							var s = this.shouldClose();
							!this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), this.instance.settings.dragAutoSnap && s && this.instance.close();
							return;
						}
					}
				}
			},
			{
				key: "shouldChange",
				value: function() {
					var e = !1;
					if (Math.abs(this.currentX) >= this.toleranceX) {
						var t = this.currentX > 0 ? "right" : "left";
						("left" == t && this.slide !== this.slide.parentNode.lastChild || "right" == t && this.slide !== this.slide.parentNode.firstChild) && (e = t);
					}
					return e;
				}
			},
			{
				key: "shouldClose",
				value: function() {
					var e = !1;
					return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e;
				}
			},
			{
				key: "setTranslate",
				value: function(e, t, i) {
					var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
					e.style.transition = n ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
				}
			}
		]);
		function D(e, t, i, n) {
			var s = e.querySelector(".gslide-media"), l = new Image(), o = "gSlideTitle_" + i, r = "gSlideDesc_" + i;
			l.addEventListener("load", (function() {
				C(n) && n();
			}), !1), l.src = t.href, "" != t.sizes && "" != t.srcset && (l.sizes = t.sizes, l.srcset = t.srcset), l.alt = "", O(t.alt) || "" === t.alt || (l.alt = t.alt), "" !== t.title && l.setAttribute("aria-labelledby", o), "" !== t.description && l.setAttribute("aria-describedby", r), t.hasOwnProperty("_hasCustomWidth") && t._hasCustomWidth && (l.style.width = t.width), t.hasOwnProperty("_hasCustomHeight") && t._hasCustomHeight && (l.style.height = t.height), s.insertBefore(l, s.firstChild);
		}
		function _(e, t, i, n) {
			var s = this, l = e.querySelector(".ginner-container"), o = "gvideo" + i, r = e.querySelector(".gslide-media"), a = this.getAllPlayers();
			d(l, "gvideo-container"), r.insertBefore(y("<div class=\"gvideo-wrapper\"></div>"), r.firstChild);
			var h = e.querySelector(".gvideo-wrapper");
			w(this.settings.plyr.css, "Plyr");
			var c = t.href, u = null == t ? void 0 : t.videoProvider, g = !1;
			r.style.maxWidth = t.width, w(this.settings.plyr.js, "Plyr", (function() {
				if (!u && c.match(/vimeo\.com\/([0-9]*)/) && (u = "vimeo"), !u && (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/)) && (u = "youtube"), "local" === u || !u) {
					u = "local";
					var l = "<video id=\"" + o + "\" ";
					l += "style=\"background:#000; max-width: ".concat(t.width, ";\" "), l += "preload=\"metadata\" ", l += "x-webkit-airplay=\"allow\" ", l += "playsinline ", l += "controls ", l += "class=\"gvideo-local\">", l += "<source src=\"".concat(c, "\">"), g = y(l += "</video>");
				}
				var r = g || y("<div id=\"".concat(o, "\" data-plyr-provider=\"").concat(u, "\" data-plyr-embed-id=\"").concat(c, "\"></div>"));
				d(h, "".concat(u, "-video gvideo")), h.appendChild(r), h.setAttribute("data-id", o), h.setAttribute("data-index", i);
				var v = P(s.settings.plyr, "config") ? s.settings.plyr.config : {}, f = new Plyr("#" + o, v);
				f.on("ready", (function(e) {
					a[o] = e.detail.plyr, C(n) && n();
				})), S((function() {
					return e.querySelector("iframe") && "true" == e.querySelector("iframe").dataset.ready;
				}), (function() {
					s.resize(e);
				})), f.on("enterfullscreen", W), f.on("exitfullscreen", W);
			}));
		}
		function W(e) {
			var t = g(e.target, ".gslide-media");
			"enterfullscreen" === e.type && d(t, "fullscreen"), "exitfullscreen" === e.type && c(t, "fullscreen");
		}
		function B(e, t, i, n) {
			var s, l = this, o = e.querySelector(".gslide-media"), r = !(!P(t, "href") || !t.href) && t.href.split("#").pop().trim(), a = !(!P(t, "content") || !t.content) && t.content;
			if (a && (k(a) && (s = y("<div class=\"ginlined-content\">".concat(a, "</div>"))), E(a))) {
				"none" == a.style.display && (a.style.display = "block");
				var c = document.createElement("div");
				c.className = "ginlined-content", c.appendChild(a), s = c;
			}
			if (r) {
				var u = document.getElementById(r);
				if (!u) return !1;
				var g = u.cloneNode(!0);
				g.style.height = t.height, g.style.maxWidth = t.width, d(g, "ginlined-content"), s = g;
			}
			if (!s) return console.error("Unable to append inline slide content", t), !1;
			o.style.height = t.height, o.style.width = t.width, o.appendChild(s), this.events["inlineclose" + r] = h("click", {
				onElement: o.querySelectorAll(".gtrigger-close"),
				withCallback: function(e) {
					e.preventDefault(), l.close();
				}
			}), C(n) && n();
		}
		function H(e, t, i, n) {
			var s = e.querySelector(".gslide-media"), l = function(e) {
				var t = e.url, i = e.allow, n = e.callback, s = e.appendTo, l = document.createElement("iframe");
				return l.className = "vimeo-video gvideo", l.src = t, l.style.width = "100%", l.style.height = "100%", i && l.setAttribute("allow", i), l.onload = function() {
					l.onload = null, d(l, "node-ready"), C(n) && n();
				}, s && s.appendChild(l), l;
			}({
				url: t.href,
				callback: n
			});
			s.parentNode.style.maxWidth = t.width, s.parentNode.style.height = t.height, s.appendChild(l);
		}
		var j = i((function t() {
			var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			e(this, t), this.defaults = {
				href: "",
				sizes: "",
				srcset: "",
				title: "",
				type: "",
				videoProvider: "",
				description: "",
				alt: "",
				descPosition: "bottom",
				effect: "",
				width: "",
				height: "",
				content: !1,
				zoomable: !0,
				draggable: !0
			}, I(i) && (this.defaults = o(this.defaults, i));
		}), [
			{
				key: "sourceType",
				value: function(e) {
					var t = e;
					return null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) ? "image" : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/shorts\/([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || null !== e.match(/\.(mp4|ogg|webm|mov)/) ? "video" : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/) ? "audio" : e.indexOf("#") > -1 && "" !== t.split("#").pop().trim() ? "inline" : e.indexOf("goajax=true") > -1 ? "ajax" : "external";
				}
			},
			{
				key: "parseConfig",
				value: function(e, t) {
					var i = this, n = o({ descPosition: t.descPosition }, this.defaults);
					if (I(e) && !E(e)) {
						P(e, "type") || (P(e, "content") && e.content ? e.type = "inline" : P(e, "href") && (e.type = this.sourceType(e.href)));
						var s = o(n, e);
						return this.setSize(s, t), s;
					}
					var l = "", a = e.getAttribute("data-glightbox"), h = e.nodeName.toLowerCase();
					if ("a" === h && (l = e.href), "img" === h && (l = e.src, n.alt = e.alt), n.href = l, r(n, (function(s, l) {
						P(t, l) && "width" !== l && (n[l] = t[l]);
						var o = e.dataset[l];
						O(o) || (n[l] = i.sanitizeValue(o));
					})), n.content && (n.type = "inline"), !n.type && l && (n.type = this.sourceType(l)), O(a)) {
						if (!n.title && "a" == h) {
							var d = e.title;
							O(d) || "" === d || (n.title = d);
						}
						if (!n.title && "img" == h) {
							var c = e.alt;
							O(c) || "" === c || (n.title = c);
						}
					} else {
						var u = [];
						r(n, (function(e, t) {
							u.push(";\\s?" + t);
						})), u = u.join("\\s?:|"), "" !== a.trim() && r(n, (function(e, t) {
							var s = a, l = new RegExp("s?" + t + "s?:s?(.*?)(" + u + "s?:|$)"), o = s.match(l);
							if (o && o.length && o[1]) {
								var r = o[1].trim().replace(/;\s*$/, "");
								n[t] = i.sanitizeValue(r);
							}
						}));
					}
					if (n.description && "." === n.description.substring(0, 1)) {
						var g;
						try {
							g = document.querySelector(n.description).innerHTML;
						} catch (e) {
							if (!(e instanceof DOMException)) throw e;
						}
						g && (n.description = g);
					}
					if (!n.description) {
						var v = e.querySelector(".glightbox-desc");
						v && (n.description = v.innerHTML);
					}
					return this.setSize(n, t, e), this.slideConfig = n, n;
				}
			},
			{
				key: "setSize",
				value: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, n = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width), s = this.checkSize(t.height);
					return e.width = P(e, "width") && "" !== e.width ? this.checkSize(e.width) : n, e.height = P(e, "height") && "" !== e.height ? this.checkSize(e.height) : s, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e;
				}
			},
			{
				key: "checkSize",
				value: function(e) {
					return z(e) ? "".concat(e, "px") : e;
				}
			},
			{
				key: "sanitizeValue",
				value: function(e) {
					return "true" !== e && "false" !== e ? e : "true" === e;
				}
			}
		]), V = i((function t(i, n, s) {
			e(this, t), this.element = i, this.instance = n, this.index = s;
		}), [
			{
				key: "setContent",
				value: function() {
					var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
					if (u(t, "loaded")) return !1;
					var n = this.instance.settings, s = this.slideConfig, l = T();
					C(n.beforeSlideLoad) && n.beforeSlideLoad({
						index: this.index,
						slide: t,
						player: !1
					});
					var o = s.type, r = s.descPosition, a = t.querySelector(".gslide-media"), h = t.querySelector(".gslide-title"), c = t.querySelector(".gslide-desc"), g = t.querySelector(".gdesc-inner"), v = i, f = "gSlideTitle_" + this.index, p = "gSlideDesc_" + this.index;
					if (C(n.afterSlideLoad) && (v = function() {
						C(i) && i(), n.afterSlideLoad({
							index: e.index,
							slide: t,
							player: e.instance.getSlidePlayerInstance(e.index)
						});
					}), "" == s.title && "" == s.description ? g && g.parentNode.parentNode.removeChild(g.parentNode) : (h && "" !== s.title ? (h.id = f, h.innerHTML = s.title) : h.parentNode.removeChild(h), c && "" !== s.description ? (c.id = p, l && n.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, n.moreLength, n.moreText), c.innerHTML = s.smallDescription, this.descriptionEvents(c, s)) : c.innerHTML = s.description) : c.parentNode.removeChild(c), d(a.parentNode, "desc-".concat(r)), d(g.parentNode, "description-".concat(r))), d(a, "gslide-".concat(o)), d(t, "loaded"), "video" !== o) {
						if ("external" !== o) return "inline" === o ? (B.apply(this.instance, [
							t,
							s,
							this.index,
							v
						]), void (s.draggable && new N({
							dragEl: t.querySelector(".gslide-inline"),
							toleranceX: n.dragToleranceX,
							toleranceY: n.dragToleranceY,
							slide: t,
							instance: this.instance
						}))) : void ("image" !== o ? C(v) && v() : D(t, s, this.index, (function() {
							var i = t.querySelector("img");
							s.draggable && new N({
								dragEl: i,
								toleranceX: n.dragToleranceX,
								toleranceY: n.dragToleranceY,
								slide: t,
								instance: e.instance
							}), s.zoomable && i.naturalWidth > i.offsetWidth && (d(i, "zoomable"), new q(i, t, (function() {
								e.instance.resize();
							}))), C(v) && v();
						})));
						H.apply(this, [
							t,
							s,
							this.index,
							v
						]);
					} else _.apply(this.instance, [
						t,
						s,
						this.index,
						v
					]);
				}
			},
			{
				key: "slideShortDesc",
				value: function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], n = document.createElement("div");
					n.innerHTML = e;
					var s = n.innerText, l = i;
					if ((e = s.trim()).length <= t) return e;
					var o = e.substr(0, t - 1);
					return l ? (n = null, o + "... <a href=\"#\" class=\"desc-more\">" + i + "</a>") : o;
				}
			},
			{
				key: "descriptionEvents",
				value: function(e, t) {
					var i = this, n = e.querySelector(".desc-more");
					if (!n) return !1;
					h("click", {
						onElement: n,
						withCallback: function(e, n) {
							e.preventDefault();
							var s = document.body, l = g(n, ".gslide-desc");
							if (!l) return !1;
							l.innerHTML = t.description, d(s, "gdesc-open");
							var o = h("click", {
								onElement: [s, g(l, ".gslide-description")],
								withCallback: function(e, n) {
									"a" !== e.target.nodeName.toLowerCase() && (c(s, "gdesc-open"), d(s, "gdesc-closed"), l.innerHTML = t.smallDescription, i.descriptionEvents(l, t), setTimeout((function() {
										c(s, "gdesc-closed");
									}), 400), o.destroy());
								}
							});
						}
					});
				}
			},
			{
				key: "create",
				value: function() {
					return y(this.instance.settings.slideHTML);
				}
			},
			{
				key: "getConfig",
				value: function() {
					E(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
					var e = new j(this.instance.settings.slideExtraAttributes);
					return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig;
				}
			}
		]);
		function F(e) {
			return Math.sqrt(e.x * e.x + e.y * e.y);
		}
		function R(e, t) {
			var i = function(e, t) {
				var i = F(e) * F(t);
				if (0 === i) return 0;
				var n = function(e, t) {
					return e.x * t.x + e.y * t.y;
				}(e, t) / i;
				return n > 1 && (n = 1), Math.acos(n);
			}(e, t);
			return function(e, t) {
				return e.x * t.y - t.x * e.y;
			}(e, t) > 0 && (i *= -1), 180 * i / Math.PI;
		}
		var G = i((function t(i) {
			e(this, t), this.handlers = [], this.el = i;
		}), [
			{
				key: "add",
				value: function(e) {
					this.handlers.push(e);
				}
			},
			{
				key: "del",
				value: function(e) {
					e || (this.handlers = []);
					for (var t = this.handlers.length; t >= 0; t--) this.handlers[t] === e && this.handlers.splice(t, 1);
				}
			},
			{
				key: "dispatch",
				value: function() {
					for (var e = 0, t = this.handlers.length; e < t; e++) {
						var i = this.handlers[e];
						"function" == typeof i && i.apply(this.el, arguments);
					}
				}
			}
		]);
		function Z(e, t) {
			var i = new G(e);
			return i.add(t), i;
		}
		var U = i((function t(i, n) {
			e(this, t), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
				x: null,
				y: null
			}, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
			var s = function() {};
			this.rotate = Z(this.element, n.rotate || s), this.touchStart = Z(this.element, n.touchStart || s), this.multipointStart = Z(this.element, n.multipointStart || s), this.multipointEnd = Z(this.element, n.multipointEnd || s), this.pinch = Z(this.element, n.pinch || s), this.swipe = Z(this.element, n.swipe || s), this.tap = Z(this.element, n.tap || s), this.doubleTap = Z(this.element, n.doubleTap || s), this.longTap = Z(this.element, n.longTap || s), this.singleTap = Z(this.element, n.singleTap || s), this.pressMove = Z(this.element, n.pressMove || s), this.twoFingerPressMove = Z(this.element, n.twoFingerPressMove || s), this.touchMove = Z(this.element, n.touchMove || s), this.touchEnd = Z(this.element, n.touchEnd || s), this.touchCancel = Z(this.element, n.touchCancel || s), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
				x: null,
				y: null
			};
		}), [
			{
				key: "start",
				value: function(e) {
					if (e.touches) if (e.target && e.target.nodeName && [
						"a",
						"button",
						"input"
					].indexOf(e.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase());
					else {
						this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
						var t = this.preV;
						if (e.touches.length > 1) {
							this._cancelLongTap(), this._cancelSingleTap();
							var i = {
								x: e.touches[1].pageX - this.x1,
								y: e.touches[1].pageY - this.y1
							};
							t.x = i.x, t.y = i.y, this.pinchStartLen = F(t), this.multipointStart.dispatch(e, this.element);
						}
						this._preventTap = !1, this.longTapTimeout = setTimeout(function() {
							this.longTap.dispatch(e, this.element), this._preventTap = !0;
						}.bind(this), 750);
					}
				}
			},
			{
				key: "move",
				value: function(e) {
					if (e.touches) {
						var t = this.preV, i = e.touches.length, n = e.touches[0].pageX, s = e.touches[0].pageY;
						if (this.isDoubleTap = !1, i > 1) {
							var l = e.touches[1].pageX, o = e.touches[1].pageY, r = {
								x: e.touches[1].pageX - n,
								y: e.touches[1].pageY - s
							};
							null !== t.x && (this.pinchStartLen > 0 && (e.zoom = F(r) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = R(r, t), this.rotate.dispatch(e, this.element)), t.x = r.x, t.y = r.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (n - this.x2 + l - this.sx2) / 2, e.deltaY = (s - this.y2 + o - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = l, this.sy2 = o;
						} else {
							if (null !== this.x2) {
								e.deltaX = n - this.x2, e.deltaY = s - this.y2;
								var a = Math.abs(this.x1 - this.x2), h = Math.abs(this.y1 - this.y2);
								(a > 10 || h > 10) && (this._preventTap = !0);
							} else e.deltaX = 0, e.deltaY = 0;
							this.pressMove.dispatch(e, this.element);
						}
						this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && e.preventDefault();
					}
				}
			},
			{
				key: "end",
				value: function(e) {
					if (e.changedTouches) {
						this._cancelLongTap();
						var t = this;
						e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout((function() {
							t.swipe.dispatch(e, t.element);
						}), 0)) : (this.tapTimeout = setTimeout((function() {
							t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1);
						}), 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout((function() {
							t.singleTap.dispatch(e, t.element);
						}), 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null;
					}
				}
			},
			{
				key: "cancelAll",
				value: function() {
					this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout);
				}
			},
			{
				key: "cancel",
				value: function(e) {
					this.cancelAll(), this.touchCancel.dispatch(e, this.element);
				}
			},
			{
				key: "_cancelLongTap",
				value: function() {
					clearTimeout(this.longTapTimeout);
				}
			},
			{
				key: "_cancelSingleTap",
				value: function() {
					clearTimeout(this.singleTapTimeout);
				}
			},
			{
				key: "_swipeDirection",
				value: function(e, t, i, n) {
					return Math.abs(e - t) >= Math.abs(i - n) ? e - t > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down";
				}
			},
			{
				key: "on",
				value: function(e, t) {
					this[e] && this[e].add(t);
				}
			},
			{
				key: "off",
				value: function(e, t) {
					this[e] && this[e].del(t);
				}
			},
			{
				key: "destroy",
				value: function() {
					return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null;
				}
			}
		]);
		function $(e) {
			var t = function() {
				var e, t = document.createElement("fakeelement"), i = {
					transition: "transitionend",
					OTransition: "oTransitionEnd",
					MozTransition: "transitionend",
					WebkitTransition: "webkitTransitionEnd"
				};
				for (e in i) if (void 0 !== t.style[e]) return i[e];
			}(), i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u(e, "gslide-media") ? e : e.querySelector(".gslide-media"), s = g(n, ".ginner-container"), l = e.querySelector(".gslide-description");
			i > 769 && (n = s), d(n, "greset"), f(n, "translate3d(0, 0, 0)"), h(t, {
				onElement: n,
				once: !0,
				withCallback: function(e, t) {
					c(n, "greset");
				}
			}), n.style.opacity = "", l && (l.style.opacity = "");
		}
		function J(e) {
			if (e.events.hasOwnProperty("touch")) return !1;
			var t, i, n, s = x(), l = s.width, o = s.height, r = !1, a = null, h = null, v = null, p = !1, m = 1, y = 1, b = !1, S = !1, w = null, T = null, C = null, k = null, E = 0, A = 0, L = !1, I = !1, O = {}, P = {}, M = 0, z = 0, X = document.getElementById("glightbox-slider"), Y = document.querySelector(".goverlay"), q = new U(X, {
				touchStart: function(t) {
					if (r = !0, (u(t.targetTouches[0].target, "ginner-container") || g(t.targetTouches[0].target, ".gslide-desc") || "a" == t.targetTouches[0].target.nodeName.toLowerCase()) && (r = !1), g(t.targetTouches[0].target, ".gslide-inline") && !u(t.targetTouches[0].target.parentNode, "gslide-inline") && (r = !1), r) {
						if (P = t.targetTouches[0], O.pageX = t.targetTouches[0].pageX, O.pageY = t.targetTouches[0].pageY, M = t.targetTouches[0].clientX, z = t.targetTouches[0].clientY, a = e.activeSlide, h = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), v = null, u(h, "gslide-image") && (v = h.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (h = a.querySelector(".ginner-container")), c(Y, "greset"), t.pageX > 20 && t.pageX < window.innerWidth - 20) return;
						t.preventDefault();
					}
				},
				touchMove: function(s) {
					if (r && (P = s.targetTouches[0], !b && !S)) {
						if (n && n.offsetHeight > o) {
							var a = O.pageX - P.pageX;
							if (Math.abs(a) <= 13) return !1;
						}
						p = !0;
						var d, c = s.targetTouches[0].clientX, u = s.targetTouches[0].clientY, g = M - c, m = z - u;
						if (Math.abs(g) > Math.abs(m) ? (L = !1, I = !0) : (I = !1, L = !0), t = P.pageX - O.pageX, E = 100 * t / l, i = P.pageY - O.pageY, A = 100 * i / o, L && v && (d = 1 - Math.abs(i) / o, Y.style.opacity = d, e.settings.touchFollowAxis && (E = 0)), I && (d = 1 - Math.abs(t) / l, h.style.opacity = d, e.settings.touchFollowAxis && (A = 0)), !v) return f(h, "translate3d(".concat(E, "%, 0, 0)"));
						f(h, "translate3d(".concat(E, "%, ").concat(A, "%, 0)"));
					}
				},
				touchEnd: function() {
					if (r) {
						if (p = !1, S || b) return C = w, void (k = T);
						var t = Math.abs(parseInt(A)), i = Math.abs(parseInt(E));
						if (!(t > 29 && v)) return t < 29 && i < 25 ? (d(Y, "greset"), Y.style.opacity = 1, $(h)) : void 0;
						e.close();
					}
				},
				multipointEnd: function() {
					setTimeout((function() {
						b = !1;
					}), 50);
				},
				multipointStart: function() {
					b = !0, m = y || 1;
				},
				pinch: function(e) {
					if (!v || p) return !1;
					b = !0, v.scaleX = v.scaleY = m * e.zoom;
					var t = m * e.zoom;
					if (S = !0, t <= 1) return S = !1, t = 1, k = null, C = null, w = null, T = null, void v.setAttribute("style", "");
					t > 4.5 && (t = 4.5), v.style.transform = "scale3d(".concat(t, ", ").concat(t, ", 1)"), y = t;
				},
				pressMove: function(e) {
					if (S && !b) {
						var t = P.pageX - O.pageX, i = P.pageY - O.pageY;
						C && (t += C), k && (i += k), w = t, T = i;
						var n = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
						y && (n += " scale3d(".concat(y, ", ").concat(y, ", 1)")), f(v, n);
					}
				},
				swipe: function(t) {
					if (!S) if (b) b = !1;
					else {
						if ("Left" == t.direction) {
							if (e.index == e.elements.length - 1) return $(h);
							e.nextSlide();
						}
						if ("Right" == t.direction) {
							if (0 == e.index) return $(h);
							e.prevSlide();
						}
					}
				}
			});
			e.events.touch = q;
		}
		var K = T(), Q = null !== T() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints, ee = document.getElementsByTagName("html")[0], te = {
			selector: ".glightbox",
			elements: null,
			skin: "clean",
			theme: "clean",
			closeButton: !0,
			startAt: null,
			autoplayVideos: !0,
			autofocusVideos: !0,
			descPosition: "bottom",
			width: "900px",
			height: "506px",
			videosWidth: "960px",
			beforeSlideChange: null,
			afterSlideChange: null,
			beforeSlideLoad: null,
			afterSlideLoad: null,
			slideInserted: null,
			slideRemoved: null,
			slideExtraAttributes: null,
			onOpen: null,
			onClose: null,
			loop: !1,
			zoomable: !0,
			draggable: !0,
			dragAutoSnap: !1,
			dragToleranceX: 40,
			dragToleranceY: 65,
			preload: !0,
			oneSlidePerOpen: !1,
			touchNavigation: !0,
			touchFollowAxis: !0,
			keyboardNavigation: !0,
			closeOnOutsideClick: !0,
			plugins: !1,
			plyr: {
				css: "https://cdn.plyr.io/3.6.12/plyr.css",
				js: "https://cdn.plyr.io/3.6.12/plyr.js",
				config: {
					ratio: "16:9",
					fullscreen: {
						enabled: !0,
						iosNative: !0
					},
					youtube: {
						noCookie: !0,
						rel: 0,
						showinfo: 0,
						iv_load_policy: 3
					},
					vimeo: {
						byline: !1,
						portrait: !1,
						title: !1,
						transparent: !1
					}
				}
			},
			openEffect: "zoom",
			closeEffect: "zoom",
			slideEffect: "slide",
			moreText: "See more",
			moreLength: 60,
			cssEfects: {
				fade: {
					in: "fadeIn",
					out: "fadeOut"
				},
				zoom: {
					in: "zoomIn",
					out: "zoomOut"
				},
				slide: {
					in: "slideInRight",
					out: "slideOutLeft"
				},
				slideBack: {
					in: "slideInLeft",
					out: "slideOutRight"
				},
				none: {
					in: "none",
					out: "none"
				}
			},
			svg: {
				close: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" xml:space=\"preserve\"><g><g><path d=\"M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z\"/></g></g><g><g><path d=\"M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z\"/></g></g></svg>",
				next: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 477.175 477.175\" xml:space=\"preserve\"> <g><path d=\"M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z\"/></g></svg>",
				prev: "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 477.175 477.175\" xml:space=\"preserve\"><g><path d=\"M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z\"/></g></svg>"
			},
			slideHTML: "<div class=\"gslide\">\n    <div class=\"gslide-inner-content\">\n        <div class=\"ginner-container\">\n            <div class=\"gslide-media\">\n            </div>\n            <div class=\"gslide-description\">\n                <div class=\"gdesc-inner\">\n                    <h4 class=\"gslide-title\"></h4>\n                    <div class=\"gslide-desc\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
			lightboxHTML: "<div id=\"glightbox-body\" class=\"glightbox-container\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"false\">\n    <div class=\"gloader visible\"></div>\n    <div class=\"goverlay\"></div>\n    <div class=\"gcontainer\">\n    <div id=\"glightbox-slider\" class=\"gslider\"></div>\n    <button class=\"gclose gbtn\" aria-label=\"Close\" data-taborder=\"3\">{closeSVG}</button>\n    <button class=\"gprev gbtn\" aria-label=\"Previous\" data-taborder=\"2\">{prevSVG}</button>\n    <button class=\"gnext gbtn\" aria-label=\"Next\" data-taborder=\"1\">{nextSVG}</button>\n</div>\n</div>"
		}, ie = i((function t() {
			var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
			e(this, t), this.customOptions = i, this.settings = o(te, i), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1;
		}), [
			{
				key: "init",
				value: function() {
					var e = this, t = this.getSelector();
					t && (this.baseEvents = h("click", {
						onElement: t,
						withCallback: function(t, i) {
							t.preventDefault(), e.open(i);
						}
					})), this.elements = this.getElements();
				}
			},
			{
				key: "open",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
					if (0 === this.elements.length) return !1;
					this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
					var i = z(t) ? t : this.settings.startAt;
					if (E(e)) {
						var n = e.getAttribute("data-gallery");
						n && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, n)), O(i) && (i = this.getElementIndex(e)) < 0 && (i = 0);
					}
					z(i) || (i = 0), this.build(), v(this.overlay, "none" === this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
					var s = document.body, l = window.innerWidth - document.documentElement.clientWidth;
					if (l > 0) {
						var o = document.createElement("style");
						o.type = "text/css", o.className = "gcss-styles", o.innerText = ".gscrollbar-fixer {margin-right: ".concat(l, "px}"), document.head.appendChild(o), d(s, "gscrollbar-fixer");
					}
					d(s, "glightbox-open"), d(ee, "glightbox-open"), K && (d(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 === this.elements.length ? (d(this.prevButton, "glightbox-button-hidden"), d(this.nextButton, "glightbox-button-hidden")) : (c(this.prevButton, "glightbox-button-hidden"), c(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), C(this.settings.onOpen) && this.settings.onOpen(), Q && this.settings.touchNavigation && J(this), this.settings.keyboardNavigation && Y(this);
				}
			},
			{
				key: "openAt",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
					this.open(null, e);
				}
			},
			{
				key: "showSlide",
				value: function() {
					var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
					p(this.loader), this.index = parseInt(t);
					var n = this.slidesContainer.querySelector(".current");
					n && c(n, "current"), this.slideAnimateOut();
					var s = this.slidesContainer.querySelectorAll(".gslide")[t];
					if (u(s, "loaded")) this.slideAnimateIn(s, i), m(this.loader);
					else {
						p(this.loader);
						var l = this.elements[t], o = {
							index: this.index,
							slide: s,
							slideNode: s,
							slideConfig: l.slideConfig,
							slideIndex: this.index,
							trigger: l.node,
							player: null
						};
						this.trigger("slide_before_load", o), l.instance.setContent(s, (function() {
							m(e.loader), e.resize(), e.slideAnimateIn(s, i), e.trigger("slide_after_load", o);
						}));
					}
					this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && u(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)), this.updateNavigationClasses(), this.activeSlide = s;
				}
			},
			{
				key: "preloadSlide",
				value: function(e) {
					var t = this;
					if (e < 0 || e > this.elements.length - 1) return !1;
					if (O(this.elements[e])) return !1;
					var i = this.slidesContainer.querySelectorAll(".gslide")[e];
					if (u(i, "loaded")) return !1;
					var n = this.elements[e], s = n.type, l = {
						index: e,
						slide: i,
						slideNode: i,
						slideConfig: n.slideConfig,
						slideIndex: e,
						trigger: n.node,
						player: null
					};
					this.trigger("slide_before_load", l), "video" === s || "external" === s ? setTimeout((function() {
						n.instance.setContent(i, (function() {
							t.trigger("slide_after_load", l);
						}));
					}), 200) : n.instance.setContent(i, (function() {
						t.trigger("slide_after_load", l);
					}));
				}
			},
			{
				key: "prevSlide",
				value: function() {
					this.goToSlide(this.index - 1);
				}
			},
			{
				key: "nextSlide",
				value: function() {
					this.goToSlide(this.index + 1);
				}
			},
			{
				key: "goToSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
					if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
					e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e);
				}
			},
			{
				key: "insertSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
					t < 0 && (t = this.elements.length);
					var i = new V(e, this, t), n = i.getConfig(), s = o({}, n), l = i.create(), r = this.elements.length - 1;
					s.index = t, s.node = !1, s.instance = i, s.slideConfig = n, this.elements.splice(t, 0, s);
					var a = null, h = null;
					if (this.slidesContainer) {
						if (t > r) this.slidesContainer.appendChild(l);
						else {
							var d = this.slidesContainer.querySelectorAll(".gslide")[t];
							this.slidesContainer.insertBefore(l, d);
						}
						(this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 === this.index && 0 === t && (this.index = 1), this.updateNavigationClasses(), a = this.slidesContainer.querySelectorAll(".gslide")[t], h = this.getSlidePlayerInstance(t), s.slideNode = a;
					}
					this.trigger("slide_inserted", {
						index: t,
						slide: a,
						slideNode: a,
						slideConfig: n,
						slideIndex: t,
						trigger: null,
						player: h
					}), C(this.settings.slideInserted) && this.settings.slideInserted({
						index: t,
						slide: a,
						player: h
					});
				}
			},
			{
				key: "removeSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
					if (e < 0 || e > this.elements.length - 1) return !1;
					var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
					t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), C(this.settings.slideRemoved) && this.settings.slideRemoved(e);
				}
			},
			{
				key: "slideAnimateIn",
				value: function(e, t) {
					var i = this, n = e.querySelector(".gslide-media"), s = e.querySelector(".gslide-description"), l = {
						index: this.prevActiveSlideIndex,
						slide: this.prevActiveSlide,
						slideNode: this.prevActiveSlide,
						slideIndex: this.prevActiveSlide,
						slideConfig: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
						trigger: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
						player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
					}, o = {
						index: this.index,
						slide: this.activeSlide,
						slideNode: this.activeSlide,
						slideConfig: this.elements[this.index].slideConfig,
						slideIndex: this.index,
						trigger: this.elements[this.index].node,
						player: this.getSlidePlayerInstance(this.index)
					};
					if (n.offsetWidth > 0 && s && (m(s), s.style.display = ""), c(e, this.effectsClasses), t) v(e, this.settings.cssEfects[this.settings.openEffect].in, (function() {
						i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
							prev: l,
							current: o
						}), C(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o]);
					}));
					else {
						var r = this.settings.slideEffect, a = "none" !== r ? this.settings.cssEfects[r].in : r;
						this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slideBack.in), v(e, a, (function() {
							i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
								prev: l,
								current: o
							}), C(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o]);
						}));
					}
					setTimeout((function() {
						i.resize(e);
					}), 100), d(e, "current");
				}
			},
			{
				key: "slideAnimateOut",
				value: function() {
					if (!this.prevActiveSlide) return !1;
					var e = this.prevActiveSlide;
					c(e, this.effectsClasses), d(e, "prev");
					var t = this.settings.slideEffect, i = "none" !== t ? this.settings.cssEfects[t].out : t;
					this.slidePlayerPause(e), this.trigger("slide_before_change", {
						prev: {
							index: this.prevActiveSlideIndex,
							slide: this.prevActiveSlide,
							slideNode: this.prevActiveSlide,
							slideIndex: this.prevActiveSlideIndex,
							slideConfig: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
							trigger: O(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
							player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
						},
						current: {
							index: this.index,
							slide: this.activeSlide,
							slideNode: this.activeSlide,
							slideIndex: this.index,
							slideConfig: this.elements[this.index].slideConfig,
							trigger: this.elements[this.index].node,
							player: this.getSlidePlayerInstance(this.index)
						}
					}), C(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
						index: this.prevActiveSlideIndex,
						slide: this.prevActiveSlide,
						player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
					}, {
						index: this.index,
						slide: this.activeSlide,
						player: this.getSlidePlayerInstance(this.index)
					}]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slideBack.out), v(e, i, (function() {
						var t = e.querySelector(".ginner-container"), i = e.querySelector(".gslide-media"), n = e.querySelector(".gslide-description");
						t.style.transform = "", i.style.transform = "", c(i, "greset"), i.style.opacity = "", n && (n.style.opacity = ""), c(e, "prev");
					}));
				}
			},
			{
				key: "getAllPlayers",
				value: function() {
					return this.videoPlayers;
				}
			},
			{
				key: "getSlidePlayerInstance",
				value: function(e) {
					var t = "gvideo" + e, i = this.getAllPlayers();
					return !(!P(i, t) || !i[t]) && i[t];
				}
			},
			{
				key: "stopSlideVideo",
				value: function(e) {
					if (E(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"));
					}
					console.log("stopSlideVideo is deprecated, use slidePlayerPause");
					var i = this.getSlidePlayerInstance(e);
					i && i.playing && i.pause();
				}
			},
			{
				key: "slidePlayerPause",
				value: function(e) {
					if (E(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"));
					}
					var i = this.getSlidePlayerInstance(e);
					i && i.playing && i.pause();
				}
			},
			{
				key: "playSlideVideo",
				value: function(e) {
					if (E(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"));
					}
					console.log("playSlideVideo is deprecated, use slidePlayerPlay");
					var i = this.getSlidePlayerInstance(e);
					i && !i.playing && i.play();
				}
			},
			{
				key: "slidePlayerPlay",
				value: function(e) {
					var t;
					if (!K || null !== (t = this.settings.plyr.config) && void 0 !== t && t.muted) {
						if (E(e)) {
							var i = e.querySelector(".gvideo-wrapper");
							i && (e = i.getAttribute("data-index"));
						}
						var n = this.getSlidePlayerInstance(e);
						n && !n.playing && (n.play(), this.settings.autofocusVideos && n.elements.container.focus());
					}
				}
			},
			{
				key: "setElements",
				value: function(e) {
					var t = this;
					this.settings.elements = !1;
					var i = [];
					e && e.length && r(e, (function(e, n) {
						var s = new V(e, t, n), l = s.getConfig(), r = o({}, l);
						r.slideConfig = l, r.instance = s, r.index = n, i.push(r);
					})), this.elements = i, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (r(this.elements, (function() {
						var e = y(t.settings.slideHTML);
						t.slidesContainer.appendChild(e);
					})), this.showSlide(0, !0)));
				}
			},
			{
				key: "getElementIndex",
				value: function(e) {
					var t = !1;
					return r(this.elements, (function(i, n) {
						if (P(i, "node") && i.node == e) return t = n, !0;
					})), t;
				}
			},
			{
				key: "getElements",
				value: function() {
					var e = this, t = [];
					this.elements = this.elements ? this.elements : [], !O(this.settings.elements) && A(this.settings.elements) && this.settings.elements.length && r(this.settings.elements, (function(i, n) {
						var s = new V(i, e, n), l = s.getConfig(), r = o({}, l);
						r.node = !1, r.index = n, r.instance = s, r.slideConfig = l, t.push(r);
					}));
					var i = !1;
					return this.getSelector() && (i = document.querySelectorAll(this.getSelector())), i ? (r(i, (function(i, n) {
						var s = new V(i, e, n), l = s.getConfig(), r = o({}, l);
						r.node = i, r.index = n, r.instance = s, r.slideConfig = l, r.gallery = i.getAttribute("data-gallery"), t.push(r);
					})), t) : t;
				}
			},
			{
				key: "getGalleryElements",
				value: function(e, t) {
					return e.filter((function(e) {
						return e.gallery == t;
					}));
				}
			},
			{
				key: "getSelector",
				value: function() {
					return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector);
				}
			},
			{
				key: "getActiveSlide",
				value: function() {
					return this.slidesContainer.querySelectorAll(".gslide")[this.index];
				}
			},
			{
				key: "getActiveSlideIndex",
				value: function() {
					return this.index;
				}
			},
			{
				key: "getAnimationClasses",
				value: function() {
					var e = [];
					for (var t in this.settings.cssEfects) if (this.settings.cssEfects.hasOwnProperty(t)) {
						var i = this.settings.cssEfects[t];
						e.push("g".concat(i.in)), e.push("g".concat(i.out));
					}
					return e.join(" ");
				}
			},
			{
				key: "build",
				value: function() {
					var e = this;
					if (this.built) return !1;
					var t = document.body.childNodes, i = [];
					r(t, (function(e) {
						e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (i.push(e), e.setAttribute("aria-hidden", "true"));
					}));
					var n = P(this.settings.svg, "next") ? this.settings.svg.next : "", s = P(this.settings.svg, "prev") ? this.settings.svg.prev : "", l = P(this.settings.svg, "close") ? this.settings.svg.close : "", o = this.settings.lightboxHTML;
					o = y(o = (o = (o = o.replace(/{nextSVG}/g, n)).replace(/{prevSVG}/g, s)).replace(/{closeSVG}/g, l)), document.body.appendChild(o);
					var a = document.getElementById("glightbox-body");
					this.modal = a;
					var c = a.querySelector(".gclose");
					this.prevButton = a.querySelector(".gprev"), this.nextButton = a.querySelector(".gnext"), this.overlay = a.querySelector(".goverlay"), this.loader = a.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = i, this.events = {}, d(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && c && (this.events.close = h("click", {
						onElement: c,
						withCallback: function(t, i) {
							t.preventDefault(), e.close();
						}
					})), c && !this.settings.closeButton && c.parentNode.removeChild(c), this.nextButton && (this.events.next = h("click", {
						onElement: this.nextButton,
						withCallback: function(t, i) {
							t.preventDefault(), e.nextSlide();
						}
					})), this.prevButton && (this.events.prev = h("click", {
						onElement: this.prevButton,
						withCallback: function(t, i) {
							t.preventDefault(), e.prevSlide();
						}
					})), this.settings.closeOnOutsideClick && (this.events.outClose = h("click", {
						onElement: a,
						withCallback: function(t, i) {
							e.preventOutsideClick || u(document.body, "glightbox-mobile") || g(t.target, ".ginner-container") || g(t.target, ".gbtn") || u(t.target, "gnext") || u(t.target, "gprev") || e.close();
						}
					})), r(this.elements, (function(t, i) {
						e.slidesContainer.appendChild(t.instance.create()), t.slideNode = e.slidesContainer.querySelectorAll(".gslide")[i];
					})), Q && d(document.body, "glightbox-touch"), this.events.resize = h("resize", {
						onElement: window,
						withCallback: function() {
							e.resize();
						}
					}), this.built = !0;
				}
			},
			{
				key: "resize",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
					if ((e = e || this.activeSlide) && !u(e, "zoomed")) {
						var t = x(), i = e.querySelector(".gvideo-wrapper"), n = e.querySelector(".gslide-image"), s = this.slideDescription, l = t.width, o = t.height;
						if (l <= 768 ? d(document.body, "glightbox-mobile") : c(document.body, "glightbox-mobile"), i || n) {
							var r = !1;
							if (s && (u(s, "description-bottom") || u(s, "description-top")) && !u(s, "gabsolute") && (r = !0), n) {
								if (l <= 768) n.querySelector("img");
								else if (r) {
									var a, h, g = s.offsetHeight, v = n.querySelector("img"), f = null === (a = this.elements[this.index]) || void 0 === a ? void 0 : a.node, p = "100vh";
									f && (p = null !== (h = f.getAttribute("data-height")) && void 0 !== h ? h : p), v.setAttribute("style", "max-height: calc(".concat(p, " - ").concat(g, "px)")), s.setAttribute("style", "max-width: ".concat(v.offsetWidth, "px;"));
								}
							}
							if (i) {
								var m = P(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
								if (!m) {
									var y = i.clientWidth, b = i.clientHeight, S = y / b;
									m = "".concat(y / S, ":").concat(b / S);
								}
								var w = m.split(":"), T = this.settings.videosWidth, C = this.settings.videosWidth, k = (C = z(T) || -1 !== T.indexOf("px") ? parseInt(T) : -1 !== T.indexOf("vw") ? l * parseInt(T) / 100 : -1 !== T.indexOf("vh") ? o * parseInt(T) / 100 : -1 !== T.indexOf("%") ? l * parseInt(T) / 100 : parseInt(i.clientWidth)) / (parseInt(w[0]) / parseInt(w[1]));
								if (k = Math.floor(k), r && (o -= s.offsetHeight), C > l || k > o || o < k && l > C) {
									var E = i.offsetWidth, A = i.offsetHeight, L = o / A, I = {
										width: E * L,
										height: A * L
									};
									i.parentNode.setAttribute("style", "max-width: ".concat(I.width, "px")), r && s.setAttribute("style", "max-width: ".concat(I.width, "px;"));
								} else i.parentNode.style.maxWidth = "".concat(T), r && s.setAttribute("style", "max-width: ".concat(T, ";"));
							}
						}
					}
				}
			},
			{
				key: "reload",
				value: function() {
					this.init();
				}
			},
			{
				key: "updateNavigationClasses",
				value: function() {
					var e = this.loop();
					c(this.nextButton, "disabled"), c(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (d(this.prevButton, "disabled"), d(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || d(this.nextButton, "disabled") : d(this.prevButton, "disabled");
				}
			},
			{
				key: "loop",
				value: function() {
					var e = P(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
					return e = P(this.settings, "loop") ? this.settings.loop : e, e;
				}
			},
			{
				key: "close",
				value: function() {
					var e = this;
					if (!this.lightboxOpen) {
						if (this.events) {
							for (var t in this.events) this.events.hasOwnProperty(t) && this.events[t].destroy();
							this.events = null;
						}
						return !1;
					}
					if (this.closing) return !1;
					this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && r(this.bodyHiddenChildElms, (function(e) {
						e.removeAttribute("aria-hidden");
					})), d(this.modal, "glightbox-closing"), v(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), v(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, (function() {
						if (e.activeSlide = null, e.prevActiveSlideIndex = null, e.prevActiveSlide = null, e.built = !1, e.events) {
							for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();
							e.events = null;
						}
						var i = document.body;
						c(ee, "glightbox-open"), c(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), e.modal.parentNode.removeChild(e.modal), e.trigger("close"), C(e.settings.onClose) && e.settings.onClose();
						var n = document.querySelector(".gcss-styles");
						n && n.parentNode.removeChild(n), e.lightboxOpen = !1, e.closing = null;
					}));
				}
			},
			{
				key: "destroy",
				value: function() {
					this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
				}
			},
			{
				key: "on",
				value: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
					if (!e || !C(t)) throw new TypeError("Event name and callback must be defined");
					this.apiEvents.push({
						evt: e,
						once: i,
						callback: t
					});
				}
			},
			{
				key: "once",
				value: function(e, t) {
					this.on(e, t, !0);
				}
			},
			{
				key: "trigger",
				value: function(e) {
					var t = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = [];
					r(this.apiEvents, (function(t, s) {
						var l = t.evt, o = t.once, r = t.callback;
						l == e && (r(i), o && n.push(s));
					})), n.length && r(n, (function(e) {
						return t.apiEvents.splice(e, 1);
					}));
				}
			},
			{
				key: "clearAllEvents",
				value: function() {
					this.apiEvents.splice(0, this.apiEvents.length);
				}
			},
			{
				key: "version",
				value: function() {
					return "3.3.1";
				}
			}
		]);
		return function() {
			var t = new ie(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {});
			return t.init(), t;
		};
	}));
}));
//#endregion
//#region frontend/src/content.ts
const share_this_page = document.getElementById("share_this_page");
if (share_this_page) share_this_page.addEventListener("click", async () => {
	try {
		const link = share_this_page.getAttribute("data-share-link");
		await navigator.clipboard.writeText(link || window.location.href);
		toast("文本已成功复制到剪贴板", { variant: "success" });
	} catch (err) {
		toast(`无法复制文本: ${err}`, { variant: "destructive" });
	}
});
function injectHeadingAnchors() {
	const content = document.querySelector(".content");
	if (!content) return;
	for (const heading of content.querySelectorAll("h1, h2, h3, h4, h5, h6")) {
		const id = heading.id;
		if (!id) continue;
		if (heading.querySelector(".heading-anchor")) continue;
		const anchor = document.createElement("i");
		anchor.className = "heading-anchor";
		anchor.setAttribute("data-lucide", "link");
		anchor.setAttribute("data-target-id", id);
		anchor.setAttribute("role", "button");
		anchor.setAttribute("tabindex", "0");
		anchor.setAttribute("aria-label", `复制「${heading.textContent?.trim() ?? id}」的链接`);
		anchor.title = "复制链接";
		heading.appendChild(anchor);
	}
	createIcons({
		icons: { Link },
		attrs: { "aria-hidden": "true" }
	});
	content.addEventListener("click", async (e) => {
		const anchorEl = e.target.closest("[data-target-id]");
		if (!anchorEl) return;
		const targetId = anchorEl.getAttribute("data-target-id");
		if (!targetId) return;
		const url = `${window.location.origin}${window.location.pathname}#${targetId}`;
		try {
			await navigator.clipboard.writeText(url);
			toast("标题链接已复制到剪贴板", { variant: "success" });
		} catch (err) {
			toast(`无法复制链接: ${err}`, { variant: "destructive" });
		}
	});
}
document.addEventListener("DOMContentLoaded", injectHeadingAnchors);
const page_type = document.getElementById("page-type");
if (page_type && JSON.parse(page_type?.innerText).page_type === "content") {
	const { default: GLightbox } = await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require_glightbox_min(), 1));
	GLightbox({ selector: ".content img" });
}
//#endregion
//#region node_modules/.pnpm/overlayscrollbars@2.15.1/node_modules/overlayscrollbars/overlayscrollbars.mjs
/*!
* OverlayScrollbars
* Version: 2.15.1
*
* Copyright (c) Rene Haas | KingSora.
* https://github.com/KingSora
*
* Released under the MIT license.
*/
const createCache = (t, n) => {
	const { o, i: s, u: e } = t;
	let c = o;
	let r;
	const cacheUpdateContextual = (t, n) => {
		const o = c;
		const i = t;
		const l = n || (s ? !s(o, i) : o !== i);
		if (l || e) {
			c = i;
			r = o;
		}
		return [
			c,
			l,
			r
		];
	};
	const cacheUpdateIsolated = (t) => cacheUpdateContextual(n(c, r), t);
	const getCurrentCache = (t) => [
		c,
		!!t,
		r
	];
	return [n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache];
};
const n = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document ? window : {};
const o = Math.max;
const s = Math.min;
const e = Math.round;
const c = Math.abs;
const r = Math.sign;
const i = n.cancelAnimationFrame;
const l = n.requestAnimationFrame;
const a = n.setTimeout;
const u = n.clearTimeout;
const getApi = (t) => typeof n[t] !== "undefined" ? n[t] : void 0;
const f = getApi("MutationObserver");
const _ = getApi("IntersectionObserver");
const d = getApi("ResizeObserver");
const p = getApi("ScrollTimeline");
const isUndefined = (t) => t === void 0;
const isNull = (t) => t === null;
const isNumber = (t) => typeof t === "number";
const isString = (t) => typeof t === "string";
const isBoolean = (t) => typeof t === "boolean";
const isFunction = (t) => typeof t === "function";
const isArray = (t) => Array.isArray(t);
const isObject = (t) => typeof t === "object" && !isArray(t) && !isNull(t);
const isArrayLike = (t) => {
	const n = !!t && t.length;
	const o = isNumber(n) && n > -1 && n % 1 == 0;
	return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
};
const isPlainObject = (t) => !!t && t.constructor === Object;
const isHTMLElement = (t) => t instanceof HTMLElement;
const isElement = (t) => t instanceof Element;
function each(t, n) {
	if (isArrayLike(t)) {
		for (let o = 0; o < t.length; o++) if (n(t[o], o, t) === false) break;
	} else if (t) each(Object.keys(t), ((o) => n(t[o], o, t)));
	return t;
}
const inArray = (t, n) => t.indexOf(n) >= 0;
const concat = (t, n) => t.concat(n);
const push = (t, n, o) => {
	if (!isString(n) && isArrayLike(n)) Array.prototype.push.apply(t, n);
	else t.push(n);
	return t;
};
const from = (t) => Array.from(t || []);
const createOrKeepArray = (t) => {
	if (isArray(t)) return t;
	return !isString(t) && isArrayLike(t) ? from(t) : [t];
};
const isEmptyArray = (t) => !!t && !t.length;
const deduplicateArray = (t) => from(new Set(t));
const runEachAndClear = (t, n, o) => {
	const runFn = (t) => t ? t.apply(void 0, n || []) : true;
	each(t, runFn);
	if (!o) t.length = 0;
};
const v = "paddingTop";
const g = "paddingRight";
const h = "paddingLeft";
const b = "paddingBottom";
const y = "marginLeft";
const w = "marginRight";
const S = "marginBottom";
const m = "overflowX";
const O = "overflowY";
const C = "width";
const $ = "height";
const x = "visible";
const H = "hidden";
const E = "scroll";
const capitalizeFirstLetter = (t) => {
	const n = String(t || "");
	return n ? n[0].toUpperCase() + n.slice(1) : "";
};
const equal = (t, n, o, s) => {
	if (t && n) {
		let s = true;
		each(o, ((o) => {
			if (t[o] !== n[o]) s = false;
		}));
		return s;
	}
	return false;
};
const equalWH = (t, n) => equal(t, n, ["w", "h"]);
const equalXY = (t, n) => equal(t, n, ["x", "y"]);
const equalTRBL = (t, n) => equal(t, n, [
	"t",
	"r",
	"b",
	"l"
]);
const bind = (t, ...n) => t.bind(0, ...n);
const selfClearTimeout = (t) => {
	let n;
	const o = t ? a : l;
	const s = t ? u : i;
	return [(e) => {
		s(n);
		n = o((() => e()), isFunction(t) ? t() : t);
	}, () => s(n)];
};
const getDebouncer = (t) => {
	const n = isFunction(t) ? t() : t;
	if (isNumber(n)) {
		const t = n ? a : l;
		const o = n ? u : i;
		return (s) => {
			const e = t((() => s()), n);
			return () => {
				o(e);
			};
		};
	}
	return n && n._;
};
const debounce = (t, n) => {
	const { p: o, v: s, S: e, m: c } = n || {};
	let r;
	let i;
	let l;
	let a;
	const u = function invokeFunctionToDebounce(n) {
		if (i) i();
		if (r) r();
		a = i = r = l = void 0;
		t.apply(this, n);
	};
	const mergeParms = (t) => c && l ? c(l, t) : t;
	const flush = () => {
		if (i && l) u(mergeParms(l) || l);
	};
	const f = function debouncedFn() {
		const t = from(arguments);
		const n = getDebouncer(o);
		if (n) {
			const o = typeof e === "function" ? e() : e;
			const c = getDebouncer(s);
			const _ = mergeParms(t) || t;
			const d = u.bind(0, _);
			if (i) i();
			if (o && !a) {
				d();
				a = true;
				i = n((() => a = void 0));
			} else {
				i = n(d);
				if (c && !r) r = c(flush);
			}
			l = _;
		} else u(t);
	};
	f.O = flush;
	return f;
};
const hasOwnProperty$1 = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
const keys = (t) => t ? Object.keys(t) : [];
const assignDeep = (t, n, o, s, e, c, r) => {
	const i = [
		n,
		o,
		s,
		e,
		c,
		r
	];
	if ((typeof t !== "object" || isNull(t)) && !isFunction(t)) t = {};
	each(i, ((n) => {
		each(n, ((o, s) => {
			const e = n[s];
			if (t === e) return true;
			const c = isArray(e);
			if (e && isPlainObject(e)) {
				const n = t[s];
				let o = n;
				if (c && !isArray(n)) o = [];
				else if (!c && !isPlainObject(n)) o = {};
				t[s] = assignDeep(o, e);
			} else t[s] = c ? e.slice() : e;
		}));
	}));
	return t;
};
const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
	if (t === void 0) delete o[n];
	else if (t && isPlainObject(t)) o[n] = removeUndefinedProperties(t);
}));
const isEmptyObject = (t) => !keys(t).length;
const noop = () => {};
const capNumber = (t, n, e) => o(t, s(n, e));
const getDomTokensArray = (t) => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter(((t) => t)));
const getAttr = (t, n) => t && t.getAttribute(n);
const hasAttr = (t, n) => t && t.hasAttribute(n);
const setAttrs = (t, n, o) => {
	each(getDomTokensArray(n), ((n) => {
		if (t) t.setAttribute(n, String(o || ""));
	}));
};
const removeAttrs = (t, n) => {
	each(getDomTokensArray(n), ((n) => t && t.removeAttribute(n)));
};
const domTokenListAttr = (t, n) => {
	const o = getDomTokensArray(getAttr(t, n));
	const s = bind(setAttrs, t, n);
	const domTokenListOperation = (t, n) => {
		const s = new Set(o);
		each(getDomTokensArray(t), ((t) => {
			s[n](t);
		}));
		return from(s).join(" ");
	};
	return {
		C: (t) => s(domTokenListOperation(t, "delete")),
		$: (t) => s(domTokenListOperation(t, "add")),
		H: (t) => {
			const n = getDomTokensArray(t);
			return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
		}
	};
};
const removeAttrClass = (t, n, o) => {
	domTokenListAttr(t, n).C(o);
	return bind(addAttrClass, t, n, o);
};
const addAttrClass = (t, n, o) => {
	domTokenListAttr(t, n).$(o);
	return bind(removeAttrClass, t, n, o);
};
const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).H(o);
const createDomTokenListClass = (t) => domTokenListAttr(t, "class");
const removeClass = (t, n) => {
	createDomTokenListClass(t).C(n);
};
const addClass = (t, n) => {
	createDomTokenListClass(t).$(n);
	return bind(removeClass, t, n);
};
const find = (t, n) => {
	const o = n ? isElement(n) && n : document;
	return o ? from(o.querySelectorAll(t)) : [];
};
const findFirst = (t, n) => {
	const o = n ? isElement(n) && n : document;
	return o && o.querySelector(t);
};
const is = (t, n) => isElement(t) && t.matches(n);
const isBodyElement = (t) => is(t, "body");
const contents = (t) => t ? from(t.childNodes) : [];
const parent = (t) => t && t.parentElement;
const closest = (t, n) => isElement(t) && t.closest(n);
const getFocusedElement = (t) => document.activeElement;
const liesBetween = (t, n, o) => {
	const s = closest(t, n);
	const e = t && findFirst(o, s);
	const c = closest(e, n) === s;
	return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
};
const removeElements = (t) => {
	each(createOrKeepArray(t), ((t) => {
		const n = parent(t);
		if (t && n) n.removeChild(t);
	}));
};
const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), ((n) => {
	if (n) t.appendChild(n);
})));
let D;
const getTrustedTypePolicy = () => D;
const setTrustedTypePolicy = (t) => {
	D = t;
};
const createDiv = (t) => {
	const n = document.createElement("div");
	setAttrs(n, "class", t);
	return n;
};
const createDOM = (t) => {
	const n = createDiv();
	const o = getTrustedTypePolicy();
	const s = t.trim();
	n.innerHTML = o ? o.createHTML(s) : s;
	return each(contents(n), ((t) => removeElements(t)));
};
const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
const validFiniteNumber = (t) => {
	const n = t || 0;
	return isFinite(n) ? n : 0;
};
const parseToZeroOrNumber = (t) => validFiniteNumber(parseFloat(t || ""));
const roundCssNumber = (t) => Math.round(t * 1e4) / 1e4;
const numberToCssPx = (t) => `${roundCssNumber(validFiniteNumber(t))}px`;
function setStyles(t, n) {
	t && n && each(n, ((n, o) => {
		try {
			const s = t.style;
			const e = isNull(n) || isBoolean(n) ? "" : isNumber(n) ? numberToCssPx(n) : n;
			if (o.indexOf("--") === 0) s.setProperty(o, e);
			else s[o] = e;
		} catch (s) {}
	}));
}
function getStyles(t, o, s) {
	const e = isString(o);
	let c = e ? "" : {};
	if (t) {
		const r = n.getComputedStyle(t, s) || t.style;
		c = e ? getCSSVal(r, o) : from(o).reduce(((t, n) => {
			t[n] = getCSSVal(r, n);
			return t;
		}), c);
	}
	return c;
}
const topRightBottomLeft = (t, n, o) => {
	const s = n ? `${n}-` : "";
	const e = o ? `-${o}` : "";
	const c = `${s}top${e}`;
	const r = `${s}right${e}`;
	const i = `${s}bottom${e}`;
	const l = `${s}left${e}`;
	const a = getStyles(t, [
		c,
		r,
		i,
		l
	]);
	return {
		t: parseToZeroOrNumber(a[c]),
		r: parseToZeroOrNumber(a[r]),
		b: parseToZeroOrNumber(a[i]),
		l: parseToZeroOrNumber(a[l])
	};
};
const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;
const elementHasDimensions = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
const z = {
	w: 0,
	h: 0
};
const getElmWidthHeightProperty = (t, n) => n ? {
	w: n[`${t}Width`],
	h: n[`${t}Height`]
} : z;
const getWindowSize = (t) => getElmWidthHeightProperty("inner", t || n);
const I = bind(getElmWidthHeightProperty, "offset");
const A = bind(getElmWidthHeightProperty, "client");
const T = bind(getElmWidthHeightProperty, "scroll");
const getFractionalSize = (t) => {
	const n = parseFloat(getStyles(t, C)) || 0;
	const o = parseFloat(getStyles(t, $)) || 0;
	return {
		w: n - e(n),
		h: o - e(o)
	};
};
const getBoundingClientRect = (t) => t.getBoundingClientRect();
const hasDimensions = (t) => !!t && elementHasDimensions(t);
const domRectHasDimensions = (t) => !!(t && (t[$] || t[C]));
const domRectAppeared = (t, n) => {
	const o = domRectHasDimensions(t);
	return !domRectHasDimensions(n) && o;
};
const removeEventListener = (t, n, o, s) => {
	each(getDomTokensArray(n), ((n) => {
		if (t) t.removeEventListener(n, o, s);
	}));
};
const addEventListener$1 = (t, n, o, s) => {
	var e;
	const c = (e = s && s.D) != null ? e : true;
	const r = s && s.I || false;
	const i = s && s.A || false;
	const l = {
		passive: c,
		capture: r
	};
	return bind(runEachAndClear, getDomTokensArray(n).map(((n) => {
		const s = i ? (e) => {
			removeEventListener(t, n, s, r);
			if (o) o(e);
		} : o;
		if (t) t.addEventListener(n, s, l);
		return bind(removeEventListener, t, n, s, r);
	})));
};
const stopPropagation = (t) => t.stopPropagation();
const preventDefault = (t) => t.preventDefault();
const stopAndPrevent = (t) => stopPropagation(t) || preventDefault(t);
const scrollElementTo = (t, n) => {
	const { x: o, y: s } = isNumber(n) ? {
		x: n,
		y: n
	} : n || {};
	isNumber(o) && (t.scrollLeft = o);
	isNumber(s) && (t.scrollTop = s);
};
const getElementScroll = (t) => ({
	x: t.scrollLeft,
	y: t.scrollTop
});
const getZeroScrollCoordinates = () => ({
	T: {
		x: 0,
		y: 0
	},
	k: {
		x: 0,
		y: 0
	}
});
const sanitizeScrollCoordinates = (t, n) => {
	const { T: o, k: s } = t;
	const { w: e, h: i } = n;
	const sanitizeAxis = (t, n, o) => {
		let s = r(t) * o;
		let e = r(n) * o;
		if (s === e) {
			const o = c(t);
			const r = c(n);
			e = o > r ? 0 : e;
			s = o < r ? 0 : s;
		}
		s = s === e ? 0 : s;
		return [s + 0, e + 0];
	};
	const [l, a] = sanitizeAxis(o.x, s.x, e);
	const [u, f] = sanitizeAxis(o.y, s.y, i);
	return {
		T: {
			x: l,
			y: u
		},
		k: {
			x: a,
			y: f
		}
	};
};
const isDefaultDirectionScrollCoordinates = ({ T: t, k: n }) => {
	const getAxis = (t, n) => t === 0 && t <= n;
	return {
		x: getAxis(t.x, n.x),
		y: getAxis(t.y, n.y)
	};
};
const getScrollCoordinatesPercent = ({ T: t, k: n }, o) => {
	const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
	return {
		x: getAxis(t.x, n.x, o.x),
		y: getAxis(t.y, n.y, o.y)
	};
};
const focusElement = (t) => {
	if (t && t.focus) t.focus({
		preventScroll: true,
		focusVisible: false
	});
};
const manageListener = (t, n) => {
	each(createOrKeepArray(n), t);
};
const createEventListenerHub = (t) => {
	const n = /* @__PURE__ */ new Map();
	const removeEvent = (t, o) => {
		if (t) {
			const s = n.get(t);
			manageListener(((t) => {
				if (s) s[t ? "delete" : "clear"](t);
			}), o);
		} else {
			n.forEach(((t) => {
				t.clear();
			}));
			n.clear();
		}
	};
	const addEvent = (t, o) => {
		if (isString(t)) {
			const s = n.get(t) || /* @__PURE__ */ new Set();
			n.set(t, s);
			manageListener(((t) => {
				if (isFunction(t)) s.add(t);
			}), o);
			return bind(removeEvent, t, o);
		}
		if (isBoolean(o) && o) removeEvent();
		const s = keys(t);
		const e = [];
		each(s, ((n) => {
			const o = t[n];
			if (o) push(e, addEvent(n, o));
		}));
		return bind(runEachAndClear, e);
	};
	const triggerEvent = (t, o) => {
		each(from(n.get(t)), ((t) => {
			if (o && !isEmptyArray(o)) t.apply(0, o);
			else t();
		}));
	};
	addEvent(t || {});
	return [
		addEvent,
		removeEvent,
		triggerEvent
	];
};
const k = {};
const M = {};
const addPlugins = (t) => {
	each(t, ((t) => each(t, ((n, o) => {
		k[o] = t[o];
	}))));
};
const registerPluginModuleInstances = (t, n, o) => keys(t).map(((s) => {
	const { static: e, instance: c } = t[s];
	const [r, i, l] = o || [];
	const a = o ? c : e;
	if (a) {
		const t = o ? a(r, i, n) : a(n);
		return (l || M)[s] = t;
	}
}));
const getInstancePluginModuleInstance = (t, n) => t[n];
const getStaticPluginModuleInstance = (t) => getInstancePluginModuleInstance(M, t);
const R = "__osOptionsValidationPlugin";
const V = `data-overlayscrollbars`;
const L = "os-environment";
const P = `${L}-scrollbar-hidden`;
const U = `${V}-initialize`;
const N = "noClipping";
const q = `${V}-body`;
const B = V;
const F = "host";
const j = `${V}-viewport`;
const X = m;
const Y = O;
const W = "arrange";
const J = "measuring";
const G = "scrolling";
const K = "scrollbarHidden";
const Q = "noContent";
const Z = `${V}-padding`;
const tt = `${V}-content`;
const nt = "os-size-observer";
const ot = `${nt}-appear`;
const st = `${nt}-listener`;
`${st}`;
`${st}`;
const it = "os-trinsic-observer";
const lt = "os-theme-none";
const at = "os-scrollbar";
const ut = `${at}-rtl`;
const ft = `${at}-horizontal`;
const _t = `${at}-vertical`;
const dt = `${at}-track`;
const pt = `${at}-handle`;
const vt = `${at}-visible`;
const gt = `${at}-cornerless`;
const ht = `${at}-interaction`;
const bt = `${at}-unusable`;
const yt = `${at}-auto-hide`;
const wt = `${yt}-hidden`;
const St = `${at}-wheel`;
const mt = `${dt}-interactive`;
const Ot = `${pt}-interactive`;
const Ct = "__osSizeObserverPlugin";
const getShowNativeOverlaidScrollbars = (t, n) => {
	const { M: o } = n;
	const [s, e] = t("showNativeOverlaidScrollbars");
	return [s && o.x && o.y, e];
};
const overflowIsVisible = (t) => t.indexOf(x) === 0;
const overflowBehaviorToOverflowStyle = (t) => t.replace(`${x}-`, "");
const overflowCssValueToOverflowStyle = (t, n) => {
	if (t === "auto") return n ? E : H;
	const o = t || H;
	return [
		H,
		E,
		x
	].includes(o) ? o : H;
};
const getElementOverflowStyle = (t, n) => {
	const { overflowX: o, overflowY: s } = getStyles(t, [m, O]);
	return {
		x: overflowCssValueToOverflowStyle(o, n.x),
		y: overflowCssValueToOverflowStyle(s, n.y)
	};
};
const xt = "__osScrollbarsHidingPlugin";
const Et = "__osClickScrollPlugin";
const opsStringify = (t) => JSON.stringify(t, ((t, n) => {
	if (isFunction(n)) throw 0;
	return n;
}));
const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty$1(t, n) ? t[n] : void 0), t) : void 0;
const zt = [0, 33];
const It = [33, 99];
const At = [
	222,
	666,
	true
];
const Tt = {
	paddingAbsolute: false,
	showNativeOverlaidScrollbars: false,
	update: {
		elementEvents: [["img", "load"]],
		debounce: {
			mutation: zt,
			resize: null,
			event: It,
			env: At
		},
		attributes: null,
		ignoreMutation: null,
		flowDirectionStyles: null
	},
	overflow: {
		x: "scroll",
		y: "scroll"
	},
	scrollbars: {
		theme: "os-theme-dark",
		visibility: "auto",
		autoHide: "never",
		autoHideDelay: 1300,
		autoHideSuspend: false,
		dragScroll: true,
		clickScroll: false,
		pointers: [
			"mouse",
			"touch",
			"pen"
		]
	}
};
const getOptionsDiff = (t, n) => {
	const o = {};
	each(concat(keys(n), keys(t)), ((s) => {
		const e = t[s];
		const c = n[s];
		if (isObject(e) && isObject(c)) {
			assignDeep(o[s] = {}, getOptionsDiff(e, c));
			if (isEmptyObject(o[s])) delete o[s];
		} else if (hasOwnProperty$1(n, s) && c !== e) {
			let t = true;
			if (isArray(e) || isArray(c)) try {
				if (opsStringify(e) === opsStringify(c)) t = false;
			} catch (r) {}
			if (t) o[s] = c;
		}
	}));
	return o;
};
const createOptionCheck = (t, n, o) => (s) => [getPropByPath(t, s), o || getPropByPath(n, s) !== void 0];
let kt;
const getNonce = () => kt;
const setNonce = (t) => {
	kt = t;
};
let Mt;
const createEnvironment = () => {
	const getNativeScrollbarSize = (t, n, o) => {
		appendChildren(document.body, t);
		appendChildren(document.body, t);
		const s = A(t);
		const e = I(t);
		const c = getFractionalSize(n);
		if (o) removeElements(t);
		return {
			x: e.h - s.h + c.h,
			y: e.w - s.w + c.w
		};
	};
	const getNativeScrollbarsHiding = (t) => {
		let n = false;
		const o = addClass(t, P);
		try {
			n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
		} catch (s) {}
		o();
		return n;
	};
	const s = createDOM(`<div class="${L}"><div></div><style>${`.${L}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${L} div{width:200%;height:200%;margin:10px 0}.${P}{scrollbar-width:none!important}.${P}::-webkit-scrollbar,.${P}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`}</style></div>`)[0];
	const e = s.firstChild;
	const c = s.lastChild;
	const r = getNonce();
	if (r) c.nonce = r;
	const [i, , l] = createEventListenerHub();
	const [a, u] = createCache({
		o: getNativeScrollbarSize(s, e),
		i: equalXY
	}, bind(getNativeScrollbarSize, s, e, true));
	const [f] = u();
	const _ = getNativeScrollbarsHiding(s);
	const d = {
		x: f.x === 0,
		y: f.y === 0
	};
	const v = {
		elements: {
			host: null,
			padding: !_,
			viewport: (t) => _ && isBodyElement(t) && t,
			content: false
		},
		scrollbars: { slot: true },
		cancel: {
			nativeScrollbarsOverlaid: false,
			body: null
		}
	};
	const g = assignDeep({}, Tt);
	const h = bind(assignDeep, {}, g);
	const b = bind(assignDeep, {}, v);
	const y = {
		U: f,
		M: d,
		P: _,
		J: !!p,
		G: bind(i, "r"),
		K: b,
		Z: (t) => assignDeep(v, t) && b(),
		tt: h,
		nt: (t) => assignDeep(g, t) && h(),
		ot: assignDeep({}, v),
		st: assignDeep({}, g)
	};
	removeAttrs(s, "style");
	removeElements(s);
	addEventListener$1(n, "resize", (() => {
		l("r", []);
	}));
	if (isFunction(n.matchMedia) && !_ && (!d.x || !d.y)) {
		const addZoomListener = (t) => {
			addEventListener$1(n.matchMedia(`(resolution: ${n.devicePixelRatio}dppx)`), "change", (() => {
				t();
				addZoomListener(t);
			}), { A: true });
		};
		addZoomListener((() => {
			const [t, n] = a();
			assignDeep(y.U, t);
			l("r", [n]);
		}));
	}
	return y;
};
const getEnvironment = () => {
	if (!Mt) Mt = createEnvironment();
	return Mt;
};
const createEventContentChange = (t, n, o) => {
	let s = false;
	const e = o ? /* @__PURE__ */ new WeakMap() : false;
	const destroy = () => {
		s = true;
	};
	const updateElements = (c) => {
		if (e && o) each(o.map(((n) => {
			const [o, s] = n || [];
			return [s && o ? (c || find)(o, t) : [], s];
		})), ((o) => each(o[0], ((c) => {
			const r = o[1];
			const i = e.get(c) || [];
			if (t.contains(c) && r) {
				const t = addEventListener$1(c, r, ((o) => {
					if (s) {
						t();
						e.delete(c);
					} else n(o);
				}));
				e.set(c, push(i, t));
			} else {
				runEachAndClear(i);
				e.delete(c);
			}
		}))));
	};
	updateElements();
	return [destroy, updateElements];
};
const createDOMObserver = (t, n, o, s) => {
	let e = false;
	const { et: c, ct: r, rt: i, it: l, lt: a, ut: u } = s || {};
	const [_, d] = createEventContentChange(t, (() => e && o(true)), i);
	const p = c || [];
	const v = r || [];
	const g = concat(p, v);
	const observerCallback = (e, c) => {
		if (!isEmptyArray(c)) {
			const r = a || noop;
			const i = u || noop;
			const f = [];
			const _ = [];
			let p = false;
			let g = false;
			each(c, ((o) => {
				const { attributeName: e, target: c, type: a, oldValue: u, addedNodes: d, removedNodes: h } = o;
				const b = a === "attributes";
				const y = a === "childList";
				const w = t === c;
				const S = b && e;
				const m = S && getAttr(c, e || "");
				const O = isString(m) ? m : null;
				const C = S && u !== O;
				const $ = inArray(v, e) && C;
				if (n && (y || !w)) {
					const n = b && C;
					const a = n && l && is(c, l);
					const p = (a ? !r(c, e, u, O) : !b || n) && !i(o, !!a, t, s);
					each(d, ((t) => push(f, t)));
					each(h, ((t) => push(f, t)));
					g = g || p;
				}
				if (!n && w && C && !r(c, e, u, O)) {
					push(_, e);
					p = p || $;
				}
			}));
			d(((t) => deduplicateArray(f).reduce(((n, o) => {
				push(n, find(t, o));
				return is(o, t) ? push(n, o) : n;
			}), [])));
			if (n) {
				if (!e && g) o(false);
				return [false];
			}
			if (!isEmptyArray(_) || p) {
				const t = [deduplicateArray(_), p];
				if (!e) o.apply(0, t);
				return t;
			}
		}
	};
	const h = new f(bind(observerCallback, false));
	return [() => {
		h.observe(t, {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: g,
			subtree: n,
			childList: n,
			characterData: n
		});
		e = true;
		return () => {
			if (e) {
				_();
				h.disconnect();
				e = false;
			}
		};
	}, () => {
		if (e) return observerCallback(true, h.takeRecords());
	}];
};
let Rt = null;
const createSizeObserver = (t, n, o) => {
	const { ft: s } = o || {};
	const e = getStaticPluginModuleInstance(Ct);
	const [c] = createCache({
		o: false,
		u: true
	});
	return () => {
		const o = [];
		const i = createDOM(`<div class="${nt}"><div class="${st}"></div></div>`)[0];
		const l = i.firstChild;
		const onSizeChangedCallbackProxy = (t) => {
			const o = isArray(t) && !isEmptyArray(t);
			let s = false;
			let e = false;
			if (o) {
				const n = t[0];
				const [o, , r] = c(n.contentRect);
				const i = domRectHasDimensions(o);
				e = domRectAppeared(o, r);
				s = !e && !i;
			} else e = t === true;
			if (!s) n({
				_t: true,
				ft: e
			});
		};
		if (d) {
			if (!isBoolean(Rt)) {
				const n = new d(noop);
				n.observe(t, { get box() {
					Rt = true;
				} });
				Rt = Rt || false;
				n.disconnect();
			}
			const n = debounce(onSizeChangedCallbackProxy, {
				p: 0,
				v: 0
			});
			const resizeObserverCallback = (t) => n(t);
			const s = new d(resizeObserverCallback);
			s.observe(Rt ? t : l);
			push(o, [() => {
				s.disconnect();
			}, !Rt && appendChildren(t, i)]);
			if (Rt) {
				const n = new d(resizeObserverCallback);
				n.observe(t, { box: "border-box" });
				push(o, (() => n.disconnect()));
			}
		} else if (e) {
			const [n, c] = e(l, onSizeChangedCallbackProxy, s);
			push(o, concat([
				addClass(i, ot),
				addEventListener$1(i, "animationstart", n),
				appendChildren(t, i)
			], c));
		} else return noop;
		return bind(runEachAndClear, o);
	};
};
const createTrinsicObserver = (t, n) => {
	let o;
	const isHeightIntrinsic = (t) => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
	const s = createDiv(it);
	const [e] = createCache({ o: false });
	const triggerOnTrinsicChangedCallback = (t, o) => {
		if (t) {
			const s = e(isHeightIntrinsic(t));
			const [, c] = s;
			return c && !o && n(s) && [s];
		}
	};
	const intersectionObserverCallback = (t, n) => triggerOnTrinsicChangedCallback(n.pop(), t);
	return [() => {
		const n = [];
		if (_) {
			o = new _(bind(intersectionObserverCallback, false), { root: t });
			o.observe(s);
			push(n, (() => {
				o.disconnect();
			}));
		} else {
			const onSizeChanged = () => {
				triggerOnTrinsicChangedCallback(I(s));
			};
			push(n, createSizeObserver(s, onSizeChanged)());
			onSizeChanged();
		}
		return bind(runEachAndClear, push(n, appendChildren(t, s)));
	}, () => o && intersectionObserverCallback(true, o.takeRecords())];
};
const createObserversSetup = (t, n, o, s) => {
	let e;
	let c;
	let r;
	let i;
	let l;
	let a;
	let u;
	let f;
	const _ = `[${B}]`;
	const p = `[${j}]`;
	const v = [
		"id",
		"class",
		"style",
		"open",
		"wrap",
		"cols",
		"rows"
	];
	const { dt: g, vt: h, L: b, gt: y, ht: w, V: S, bt: m, yt: O, wt: C, St: $ } = t;
	const getDirectionIsRTL = (t) => getStyles(t, "direction") === "rtl";
	const createDebouncedObservesUpdate = () => {
		let t;
		let n;
		let o;
		const e = debounce(s, {
			p: () => t,
			v: () => n,
			S: () => o,
			m(t, n) {
				const [o] = t;
				const [s] = n;
				return [concat(keys(o), keys(s)).reduce(((t, n) => {
					t[n] = o[n] || s[n];
					return t;
				}), {})];
			}
		});
		const fn = (s, c) => {
			if (isArray(c)) {
				const [s, e, r] = c;
				t = s;
				n = e;
				o = r;
			} else if (isNumber(c)) {
				t = c;
				n = false;
				o = false;
			} else {
				t = false;
				n = false;
				o = false;
			}
			e(s);
		};
		fn.O = e.O;
		return fn;
	};
	const x = {
		Ot: false,
		B: getDirectionIsRTL(g)
	};
	const H = getEnvironment();
	const E = getStaticPluginModuleInstance(xt);
	const [D] = createCache({
		i: equalWH,
		o: {
			w: 0,
			h: 0
		}
	}, (() => {
		const s = E && E.R(t, n, x, H, o).Y;
		const c = !(m && S) && hasAttrClass(h, B, N);
		const r = !S && O(W);
		const i = r && getElementScroll(y);
		const l = i && $();
		const a = C(J, c);
		const u = r && s && s();
		const f = T(b);
		const _ = getFractionalSize(b);
		if (u) u();
		scrollElementTo(y, i);
		if (l) l();
		if (c) a();
		return {
			w: f.w + _.w,
			h: f.h + _.h
		};
	}));
	const z = createDebouncedObservesUpdate();
	const setDirection = (t) => {
		const n = getDirectionIsRTL(g);
		assignDeep(t, { Ct: f !== n });
		assignDeep(x, { B: n });
		f = n;
	};
	const onTrinsicChanged = (t, n) => {
		const [o, e] = t;
		const c = { $t: e };
		assignDeep(x, { Ot: o });
		if (!n) s(c);
		return c;
	};
	const onSizeChanged = ({ _t: t, ft: n }) => {
		const o = n ? s : z;
		const e = {
			_t: t || n,
			ft: n
		};
		setDirection(e);
		o(e, c);
	};
	const onContentMutation = (t, n) => {
		const [, o] = D();
		const s = { xt: o };
		setDirection(s);
		if (o && !n) z(s, t ? r : e);
		return s;
	};
	const onHostMutation = (t, n, o) => {
		const s = { Ht: n };
		setDirection(s);
		if (n && !o) z(s, e);
		return s;
	};
	const [I, A] = w ? createTrinsicObserver(h, onTrinsicChanged) : [];
	const k = !S && createSizeObserver(h, onSizeChanged, { ft: true });
	const [M, R] = createDOMObserver(h, false, onHostMutation, {
		ct: v,
		et: v
	});
	const V = S && d && new d(((t) => {
		const n = t[t.length - 1].contentRect;
		onSizeChanged({
			_t: true,
			ft: domRectAppeared(n, u)
		});
		u = n;
	}));
	return [
		() => {
			if (V) V.observe(h);
			const t = k && k();
			const n = I && I();
			const o = M();
			const s = H.G(((t) => {
				const [, n] = D();
				z({
					Et: t,
					xt: n,
					_t: m
				}, i);
			}));
			return () => {
				if (V) V.disconnect();
				if (t) t();
				if (n) n();
				if (a) a();
				o();
				s();
			};
		},
		({ Dt: t, zt: n, It: o }) => {
			const s = {};
			const [u] = t("update.ignoreMutation");
			const [f, d] = t("update.attributes");
			const [g, h] = t("update.elementEvents");
			const [y, m] = t("update.debounce");
			const O = h || d;
			const C = n || o;
			const ignoreMutationFromOptions = (t) => isFunction(u) && u(t);
			if (O) {
				if (l) l();
				if (a) a();
				const [t, n] = createDOMObserver(w || b, true, onContentMutation, {
					et: concat(v, f || []),
					rt: g,
					it: _,
					ut: (t, n) => {
						const { target: o, attributeName: s } = t;
						return (!n && s && !S ? liesBetween(o, _, p) : false) || !!closest(o, `.${at}`) || !!ignoreMutationFromOptions(t);
					}
				});
				a = t();
				l = n;
			}
			if (m) {
				z.O();
				if (isArray(y) || isNumber(y)) {
					e = y;
					c = false;
					r = It;
					i = At;
				} else if (isPlainObject(y)) {
					e = y.mutation;
					c = y.resize;
					r = y.event;
					i = y.env;
				} else {
					e = false;
					c = false;
					r = false;
					i = false;
				}
			}
			if (C) {
				const t = R();
				const n = A && A();
				const o = l && l();
				if (t) assignDeep(s, onHostMutation(t[0], t[1], C));
				if (n) assignDeep(s, onTrinsicChanged(n[0], C));
				if (o) assignDeep(s, onContentMutation(o[0], C));
			}
			setDirection(s);
			return s;
		},
		x
	];
};
const resolveInitialization = (t, n) => isFunction(n) ? n.apply(0, t) : n;
const staticInitializationElement = (t, n, o, s) => {
	return resolveInitialization(t, isUndefined(s) ? o : s) || n.apply(0, t);
};
const dynamicInitializationElement = (t, n, o, s) => {
	const c = resolveInitialization(t, isUndefined(s) ? o : s);
	return !!c && (isHTMLElement(c) ? c : n.apply(0, t));
};
const cancelInitialization = (t, n) => {
	const { nativeScrollbarsOverlaid: o, body: s } = n || {};
	const { M: e, P: c, K: r } = getEnvironment();
	const { nativeScrollbarsOverlaid: i, body: l } = r().cancel;
	const a = o != null ? o : i;
	const u = isUndefined(s) ? l : s;
	const f = (e.x || e.y) && a;
	const _ = t && (isNull(u) ? !c : u);
	return !!f || !!_;
};
const createScrollbarsSetupElements = (t, n, o, s) => {
	const e = "--os-viewport-percent";
	const c = "--os-scroll-percent";
	const r = "--os-scroll-direction";
	const { K: i } = getEnvironment();
	const { scrollbars: l } = i();
	const { slot: a } = l;
	const { dt: u, vt: f, L: _, At: d, gt: v, bt: g, V: h } = n;
	const { scrollbars: b } = d ? {} : t;
	const { slot: y } = b || {};
	const w = [];
	const S = [];
	const m = [];
	const O = dynamicInitializationElement([
		u,
		f,
		_
	], (() => h && g ? u : f), a, y);
	const initScrollTimeline = (t) => {
		if (p) {
			let n = null;
			let s = [];
			const e = new p({
				source: v,
				axis: t
			});
			const cancelAnimation = () => {
				if (n) n.cancel();
				n = null;
			};
			const _setScrollPercentAnimation = (c) => {
				const { Tt: r } = o;
				const i = isDefaultDirectionScrollCoordinates(r)[t];
				const l = t === "x";
				const a = [getTrasformTranslateValue(0, l), getTrasformTranslateValue(`calc(-100% + 100cq${l ? "w" : "h"})`, l)];
				const u = i ? a : a.reverse();
				if (s[0] === u[0] && s[1] === u[1]) return cancelAnimation;
				s = u;
				cancelAnimation();
				n = c.kt.animate({
					clear: ["left"],
					transform: u
				}, { timeline: e });
				return cancelAnimation;
			};
			return { Mt: _setScrollPercentAnimation };
		}
	};
	const C = {
		x: initScrollTimeline("x"),
		y: initScrollTimeline("y")
	};
	const getViewportPercent = () => {
		const { Rt: t, Vt: n } = o;
		const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
		return {
			x: getAxisValue(n.x, t.x),
			y: getAxisValue(n.y, t.y)
		};
	};
	const scrollbarStructureAddRemoveClass = (t, n, o) => {
		const s = o ? addClass : removeClass;
		each(t, ((t) => {
			s(t.Lt, n);
		}));
	};
	const scrollbarStyle = (t, n) => {
		each(t, ((t) => {
			const [o, s] = n(t);
			setStyles(o, s);
		}));
	};
	const scrollbarsAddRemoveClass = (t, n, o) => {
		const s = isBoolean(o);
		const e = s ? o : true;
		const c = s ? !o : true;
		if (e) scrollbarStructureAddRemoveClass(S, t, n);
		if (c) scrollbarStructureAddRemoveClass(m, t, n);
	};
	const refreshScrollbarsHandleLength = () => {
		const t = getViewportPercent();
		const createScrollbarStyleFn = (t) => (n) => [n.Lt, { [e]: roundCssNumber(t) + "" }];
		scrollbarStyle(S, createScrollbarStyleFn(t.x));
		scrollbarStyle(m, createScrollbarStyleFn(t.y));
	};
	const refreshScrollbarsHandleOffset = () => {
		if (!p) {
			const { Tt: t } = o;
			const n = getScrollCoordinatesPercent(t, getElementScroll(v));
			const createScrollbarStyleFn = (t) => (n) => [n.Lt, { [c]: roundCssNumber(t) + "" }];
			scrollbarStyle(S, createScrollbarStyleFn(n.x));
			scrollbarStyle(m, createScrollbarStyleFn(n.y));
		}
	};
	const refreshScrollbarsScrollCoordinates = () => {
		const { Tt: t } = o;
		const n = isDefaultDirectionScrollCoordinates(t);
		const createScrollbarStyleFn = (t) => (n) => [n.Lt, { [r]: t ? "0" : "1" }];
		scrollbarStyle(S, createScrollbarStyleFn(n.x));
		scrollbarStyle(m, createScrollbarStyleFn(n.y));
		if (p) {
			S.forEach(C.x.Mt);
			m.forEach(C.y.Mt);
		}
	};
	const refreshScrollbarsScrollbarOffset = () => {
		if (h && !g) {
			const { Rt: t, Tt: n } = o;
			const s = isDefaultDirectionScrollCoordinates(n);
			const e = getScrollCoordinatesPercent(n, getElementScroll(v));
			const styleScrollbarPosition = (n) => {
				const { Lt: o } = n;
				const c = parent(o) === _ && o;
				const getTranslateValue = (t, n, o) => {
					const s = n * t;
					return numberToCssPx(o ? s : -s);
				};
				return [c, c && { transform: getTrasformTranslateValue({
					x: getTranslateValue(e.x, t.x, s.x),
					y: getTranslateValue(e.y, t.y, s.y)
				}) }];
			};
			scrollbarStyle(S, styleScrollbarPosition);
			scrollbarStyle(m, styleScrollbarPosition);
		}
	};
	const generateScrollbarDOM = (t) => {
		const n = t ? "x" : "y";
		const e = createDiv(`${at} ${t ? ft : _t}`);
		const c = createDiv(dt);
		const r = createDiv(pt);
		const i = {
			Lt: e,
			Pt: c,
			kt: r
		};
		const l = C[n];
		push(t ? S : m, i);
		push(w, [
			appendChildren(e, c),
			appendChildren(c, r),
			bind(removeElements, e),
			l && l.Mt(i),
			s(i, scrollbarsAddRemoveClass, t)
		]);
		return i;
	};
	const $ = bind(generateScrollbarDOM, true);
	const x = bind(generateScrollbarDOM, false);
	const appendElements = () => {
		appendChildren(O, S[0].Lt);
		appendChildren(O, m[0].Lt);
		return bind(runEachAndClear, w);
	};
	$();
	x();
	return [{
		Ut: refreshScrollbarsHandleLength,
		Nt: refreshScrollbarsHandleOffset,
		qt: refreshScrollbarsScrollCoordinates,
		Bt: refreshScrollbarsScrollbarOffset,
		Ft: scrollbarsAddRemoveClass,
		jt: {
			Xt: S,
			Yt: $,
			Wt: bind(scrollbarStyle, S)
		},
		Jt: {
			Xt: m,
			Yt: x,
			Wt: bind(scrollbarStyle, m)
		}
	}, appendElements];
};
const createScrollbarsSetupEvents = (t, n, o, s, r) => (i, l, u) => {
	const { vt: f, L: _, V: d, gt: p, Gt: v, St: g } = n;
	const { Lt: h, Pt: b, kt: y } = i;
	const [w, S] = selfClearTimeout(333);
	const [m, O] = selfClearTimeout(444);
	const scrollOffsetElementScrollBy = (t) => {
		if (isFunction(p.scrollBy)) p.scrollBy({
			behavior: "smooth",
			left: t.x,
			top: t.y
		});
	};
	const createInteractiveScrollEvents = () => {
		const n = "pointerup pointercancel lostpointercapture";
		const r = `client${u ? "X" : "Y"}`;
		const i = u ? C : $;
		const l = u ? "left" : "top";
		const a = u ? "w" : "h";
		const f = u ? "x" : "y";
		const _ = [];
		return addEventListener$1(b, "pointerdown", s(((s) => {
			const d = closest(s.target, `.${pt}`) === y;
			const h = d ? y : b;
			const w = t.scrollbars;
			const S = w[d ? "dragScroll" : "clickScroll"];
			const { button: C, isPrimary: $, pointerType: x } = s;
			const { pointers: H } = w;
			if (C === 0 && $ && S && (H || []).includes(x)) {
				runEachAndClear(_);
				O();
				const t = !d && (s.shiftKey || S === "instant");
				const w = bind(getBoundingClientRect, y);
				const C = bind(getBoundingClientRect, b);
				const getHandleOffset = (t, n) => (t || w())[l] - (n || C())[l];
				const $ = e(getBoundingClientRect(p)[i]) / I(p)[a] || 1;
				const x = getElementScroll(p)[f];
				const scrollRelative = (t) => {
					scrollElementTo(p, { [f]: x + t });
				};
				const moveHandleRelative = (t) => {
					const { Rt: n } = o;
					const s = I(b)[a] - I(y)[a];
					scrollRelative(1 / $ * t / s * n[f]);
				};
				const H = s[r];
				const E = w();
				const D = C();
				const z = E[i];
				const A = getHandleOffset(E, D) + z / 2;
				const k = H - D[l] - A;
				const M = d ? 0 : k;
				const releasePointerCapture = (t) => {
					runEachAndClear(L);
					h.releasePointerCapture(t.pointerId);
				};
				const R = d || t;
				const V = g();
				const L = [
					addEventListener$1(v, n, releasePointerCapture),
					addEventListener$1(v, "selectstart", ((t) => preventDefault(t)), { D: false }),
					addEventListener$1(b, n, releasePointerCapture),
					R && addEventListener$1(b, "pointermove", ((t) => moveHandleRelative(M + t[r] - H))),
					R && (() => {
						const t = getElementScroll(p);
						V();
						const n = getElementScroll(p);
						const o = {
							x: n.x - t.x,
							y: n.y - t.y
						};
						if (c(o.x) > 3 || c(o.y) > 3) {
							g();
							scrollElementTo(p, t);
							scrollOffsetElementScrollBy(o);
							m(V);
						}
					})
				];
				h.setPointerCapture(s.pointerId);
				if (t) moveHandleRelative(k);
				else if (!d) {
					const t = getStaticPluginModuleInstance(Et);
					if (t) {
						const { Vt: n } = o;
						const s = t(scrollRelative, moveHandleRelative, bind(getHandleOffset), k, n[f], S, !!u, ((t) => {
							if (t) V();
							else push(L, V);
						}));
						push(L, s);
						push(_, bind(s, true));
					}
				}
			}
		})));
	};
	let x = true;
	return bind(runEachAndClear, [
		addEventListener$1(y, "pointermove pointerleave", s(r)),
		addEventListener$1(h, "pointerenter", s((() => {
			l(ht, true);
		}))),
		addEventListener$1(h, "pointerleave pointercancel", s((() => {
			l(ht, false);
		}))),
		addEventListener$1(h, "wheel", s(((t) => {
			const { deltaX: n, deltaY: o, deltaMode: s } = t;
			if (x && s === 0 && parent(h) === f) scrollOffsetElementScrollBy({
				x: n,
				y: o
			});
			x = false;
			l(St, true);
			w((() => {
				x = true;
				l(St);
			}));
			preventDefault(t);
		})), {
			D: false,
			I: true
		}),
		!d && addEventListener$1(h, "mousedown", s((() => {
			const t = getFocusedElement();
			if (hasAttr(t, j) || hasAttr(t, B) || t === document.body) a(bind(focusElement, _), 25);
		}))),
		addEventListener$1(h, "pointerdown", (() => {
			const t = addEventListener$1(v, "click", ((t) => {
				n();
				stopAndPrevent(t);
			}), {
				A: true,
				I: true,
				D: false
			});
			const n = addEventListener$1(v, "pointerup pointercancel", (() => {
				n();
				setTimeout(t, 150);
			}), {
				I: true,
				D: true
			});
		}), {
			I: true,
			D: true
		}),
		createInteractiveScrollEvents(),
		S,
		O
	]);
};
const createScrollbarsSetup = (t, n, o, s, e, c, r) => {
	let i;
	let l;
	let a;
	let u;
	let f;
	let _ = noop;
	let d = 0;
	const p = ["mouse", "pen"];
	const skipEventIfSleeping = (t) => (n) => {
		if (!o.Kt) t(n);
	};
	const isHoverablePointerType = (t) => p.includes(t.pointerType);
	const [v, g] = selfClearTimeout();
	const [h, b] = selfClearTimeout(100);
	const [y, w] = selfClearTimeout(50);
	const [S, m] = selfClearTimeout((() => d));
	const [O, C] = createScrollbarsSetupElements(t, c, e, createScrollbarsSetupEvents(n, c, e, skipEventIfSleeping, ((t) => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
	const { vt: $, Qt: H, bt: D } = c;
	const { Ft: z, Ut: I, Nt: A, qt: T, Bt: k } = O;
	const manageScrollbarsAutoHide = (t, n) => {
		m();
		const hide = (t) => {
			if (o.Kt) return;
			z(wt, t);
		};
		if (t) hide();
		else {
			const t = a ? !i : true;
			if (d > 0 && !n) S(bind(hide, t));
			else hide(t);
		}
	};
	const manageScrollbarsAutoHideInstantInteraction = () => {
		if (a ? !i : !u) {
			manageScrollbarsAutoHide(true);
			h((() => {
				manageScrollbarsAutoHide(false);
			}));
		}
	};
	const onHostMouseEnter = (t) => {
		if (isHoverablePointerType(t)) {
			i = true;
			if (!o.Kt && a) manageScrollbarsAutoHide(true);
		}
	};
	const onHostMouseLeave = (t) => {
		if (isHoverablePointerType(t)) {
			i = false;
			if (!o.Kt && a) manageScrollbarsAutoHide(false);
		}
	};
	const manageAutoHideSuspension = (t) => {
		z(yt, t, true);
		z(yt, t, false);
	};
	const M = [
		m,
		b,
		w,
		g,
		() => _(),
		addEventListener$1($, "pointerover", onHostMouseEnter, { A: true }),
		addEventListener$1($, "pointerenter", onHostMouseEnter),
		addEventListener$1($, "pointerleave", onHostMouseLeave),
		addEventListener$1($, "pointermove", skipEventIfSleeping(((t) => {
			if (isHoverablePointerType(t) && l) manageScrollbarsAutoHideInstantInteraction();
		}))),
		addEventListener$1(H, "scroll", skipEventIfSleeping(((t) => {
			v((() => {
				A();
				manageScrollbarsAutoHideInstantInteraction();
			}));
			r(t);
			k();
		})))
	];
	const R = getStaticPluginModuleInstance(xt);
	return [
		() => bind(runEachAndClear, push(M, C())),
		({ Dt: t, It: n, Zt: o, tn: c }) => {
			const { nn: r, sn: i, en: p, cn: v } = c || {};
			const { Ct: g, ft: h } = o || {};
			const { B: b } = s;
			const { M: w, P: S } = getEnvironment();
			const { rn: m, j: O } = e;
			const [C, $] = t("showNativeOverlaidScrollbars");
			const [M, V] = t("scrollbars.theme");
			const [L, P] = t("scrollbars.visibility");
			const [U, N] = t("scrollbars.autoHide");
			const [q, B] = t("scrollbars.autoHideSuspend");
			const [F] = t("scrollbars.autoHideDelay");
			const [j, X] = t("scrollbars.dragScroll");
			const [Y, W] = t("scrollbars.clickScroll");
			const [J, G] = t("overflow");
			const K = h && !n;
			const Q = r || i || v || g || n;
			const Z = p || P || G;
			const tt = C && w.x && w.y;
			const nt = !S && !R;
			const ot = tt || nt;
			const setScrollbarVisibility = (t, n, o) => {
				const s = t.includes(E) && (L === x || L === "auto" && n === E);
				z(vt, s, o);
				return s;
			};
			d = F;
			if ($ || nt) z(lt, ot);
			if (V) {
				z(f);
				z(M, true);
				f = M;
			}
			if (B || K) {
				manageAutoHideSuspension(!q);
				if (K && q) if (O.x || O.y) {
					_();
					y((() => {
						_ = addEventListener$1(H, E, skipEventIfSleeping(bind(manageAutoHideSuspension, true)), { A: true });
					}));
				} else manageAutoHideSuspension(true);
			}
			if (N) {
				l = U === "move";
				a = U === "leave";
				u = U === "never";
				manageScrollbarsAutoHide(u, true);
			}
			if (X) z(Ot, j);
			if (W) z(mt, !!Y);
			if (Z) {
				const t = setScrollbarVisibility(J.x, m.x, true);
				const n = setScrollbarVisibility(J.y, m.y, false);
				z(gt, !(t && n));
			}
			if (Q) {
				A();
				I();
				k();
				if (v) T();
				z(bt, !O.x, true);
				z(bt, !O.y, false);
				z(ut, b && !D);
			}
		},
		{},
		O
	];
};
const createStructureSetupElements = (t) => {
	const { K: s, P: e } = getEnvironment();
	const { elements: c } = s();
	const { padding: r, viewport: i, content: l } = c;
	const a = isHTMLElement(t);
	const u = a ? {} : t;
	const { elements: f } = u;
	const { padding: _, viewport: d, content: p } = f || {};
	const v = a ? t : u.target;
	const g = isBodyElement(v);
	const h = v.ownerDocument;
	const b = h.documentElement;
	const getDocumentWindow = () => h.defaultView || n;
	const y = bind(staticInitializationElement, [v]);
	const w = bind(dynamicInitializationElement, [v]);
	const S = bind(createDiv, "");
	const C = bind(y, S, i);
	const $ = bind(w, S, l);
	const elementHasOverflow = (t) => {
		const n = I(t);
		const o = T(t);
		const s = getStyles(t, m);
		const e = getStyles(t, O);
		return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
	};
	const x = C(d);
	const H = x === v;
	const E = H && g;
	const D = !H && $(p);
	const z = !H && x === D;
	const A = E ? b : x;
	const k = E ? A : v;
	const M = !H && w(S, r, _);
	const R = !z && D;
	const V = [
		R,
		A,
		M,
		k
	].map(((t) => isHTMLElement(t) && !parent(t) && t));
	const elementIsGenerated = (t) => t && inArray(V, t);
	const L = !elementIsGenerated(A) && elementHasOverflow(A) ? A : v;
	const P = E ? b : A;
	const X = {
		dt: v,
		vt: k,
		L: A,
		ln: M,
		ht: R,
		gt: P,
		Qt: E ? h : A,
		an: g ? b : L,
		Gt: h,
		bt: g,
		At: a,
		V: H,
		un: getDocumentWindow,
		yt: (t) => hasAttrClass(A, j, t),
		wt: (t, n) => addRemoveAttrClass(A, j, t, n),
		St: () => addRemoveAttrClass(P, j, G, true)
	};
	const { dt: Y, vt: W, ln: J, L: Q, ht: nt } = X;
	const ot = [() => {
		removeAttrs(W, [B, U]);
		removeAttrs(Y, U);
		if (g) removeAttrs(b, [U, B]);
	}];
	let st = contents([
		nt,
		Q,
		J,
		W,
		Y
	].find(((t) => t && !elementIsGenerated(t))));
	const et = E ? Y : nt || Q;
	const ct = bind(runEachAndClear, ot);
	const appendElements = () => {
		const t = getDocumentWindow();
		const n = getFocusedElement();
		const unwrap = (t) => {
			appendChildren(parent(t), contents(t));
			removeElements(t);
		};
		const prepareWrapUnwrapFocus = (t) => addEventListener$1(t, "focusin focusout focus blur", stopAndPrevent, {
			I: true,
			D: false
		});
		const o = "tabindex";
		const s = getAttr(Q, o);
		const c = prepareWrapUnwrapFocus(n);
		setAttrs(W, B, H ? "" : F);
		setAttrs(J, Z, "");
		setAttrs(Q, j, "");
		setAttrs(nt, tt, "");
		if (!H) {
			setAttrs(Q, o, s || "-1");
			if (g) setAttrs(b, q, "");
		}
		appendChildren(et, st);
		appendChildren(W, J);
		appendChildren(J || W, !H && Q);
		appendChildren(Q, nt);
		push(ot, [c, () => {
			const t = getFocusedElement();
			const n = elementIsGenerated(Q);
			const e = n && t === Q ? Y : t;
			const c = prepareWrapUnwrapFocus(e);
			removeAttrs(J, Z);
			removeAttrs(nt, tt);
			removeAttrs(Q, j);
			if (g) removeAttrs(b, q);
			if (s) setAttrs(Q, o, s);
			else removeAttrs(Q, o);
			if (elementIsGenerated(nt)) unwrap(nt);
			if (n) unwrap(Q);
			if (elementIsGenerated(J)) unwrap(J);
			focusElement(e);
			c();
		}]);
		if (e && !H) {
			addAttrClass(Q, j, K);
			push(ot, bind(removeAttrs, Q, j));
		}
		focusElement(!H && g && n === Y && t.top === t ? Q : n);
		c();
		st = 0;
		return ct;
	};
	return [
		X,
		appendElements,
		ct
	];
};
const createTrinsicUpdateSegment = ({ ht: t }) => ({ Zt: n, fn: o, It: s }) => {
	const { $t: e } = n || {};
	const { Ot: c } = o;
	if (t && (e || s)) setStyles(t, { [$]: c && "100%" });
};
const createPaddingUpdateSegment = ({ vt: t, ln: n, L: o, V: s }, e) => {
	const [c, r] = createCache({
		i: equalTRBL,
		o: topRightBottomLeft()
	}, bind(topRightBottomLeft, t, "padding", ""));
	return ({ Dt: t, Zt: i, fn: l, It: a }) => {
		let [u, f] = r(a);
		const { P: _ } = getEnvironment();
		const { _t: d, xt: p, Ct: m } = i || {};
		const { B: O } = l;
		const [$, x] = t("paddingAbsolute");
		if (d || f || a || p) [u, f] = c(a);
		const E = !s && (x || m || f);
		if (E) {
			const t = !$ || !n && !_;
			const s = u.r + u.l;
			const c = u.t + u.b;
			const r = {
				[w]: t && !O ? -s : 0,
				[S]: t ? -c : 0,
				[y]: t && O ? -s : 0,
				top: t ? -u.t : 0,
				right: t ? O ? -u.r : "auto" : 0,
				left: t ? O ? "auto" : -u.l : 0,
				[C]: t && `calc(100% + ${s}px)`
			};
			const i = {
				[v]: t ? u.t : 0,
				[g]: t ? u.r : 0,
				[b]: t ? u.b : 0,
				[h]: t ? u.l : 0
			};
			setStyles(n || o, r);
			setStyles(o, i);
			assignDeep(e, {
				ln: u,
				_n: !t,
				F: n ? i : assignDeep({}, r, i)
			});
		}
		return { dn: E };
	};
};
const createOverflowUpdateSegment = (t, s) => {
	const e = getEnvironment();
	const { vt: r, ln: i, L: a, V: u, Qt: f, gt: _, bt: d, wt: p, un: v } = t;
	const { P: g } = e;
	const h = d && u;
	const b = bind(o, 0);
	const y = {
		display: () => false,
		direction: (t) => t !== "ltr",
		flexDirection: (t) => t.endsWith("-reverse"),
		writingMode: (t) => t !== "horizontal-tb"
	};
	const w = keys(y);
	const S = {
		i: equalWH,
		o: {
			w: 0,
			h: 0
		}
	};
	const m = {
		i: equalXY,
		o: {}
	};
	const setMeasuringMode = (t) => {
		p(J, !h && t);
	};
	const getFlowDirectionStyles = () => getStyles(a, w);
	const getMeasuredScrollCoordinates = (t, n) => {
		const o = !keys(t).length;
		const s = !n && w.some(((n) => {
			const o = t[n];
			return isString(o) && y[n](o);
		}));
		if (o && !s || !hasDimensions(a)) return {
			T: {
				x: 0,
				y: 0
			},
			k: {
				x: 1,
				y: 1
			}
		};
		setMeasuringMode(true);
		const r = getElementScroll(_);
		const i = addEventListener$1(f, E, ((t) => {
			const n = getElementScroll(_);
			if (t.isTrusted && n.x === r.x && n.y === r.y) stopPropagation(t);
		}), {
			I: true,
			A: true
		});
		const u = p(Q, true);
		scrollElementTo(_, {
			x: 0,
			y: 0
		});
		u();
		const d = getElementScroll(_);
		const v = T(_);
		scrollElementTo(_, {
			x: v.w,
			y: v.h
		});
		const g = getElementScroll(_);
		const h = {
			x: g.x - d.x,
			y: g.y - d.y
		};
		scrollElementTo(_, {
			x: -v.w,
			y: -v.h
		});
		const b = getElementScroll(_);
		const S = {
			x: b.x - d.x,
			y: b.y - d.y
		};
		const m = {
			x: c(h.x) >= c(S.x) ? g.x : b.x,
			y: c(h.y) >= c(S.y) ? g.y : b.y
		};
		scrollElementTo(_, r);
		l((() => i()));
		return {
			T: d,
			k: m
		};
	};
	const getOverflowAmount = (t, o) => {
		const s = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
		const e = {
			w: b(t.w - o.w),
			h: b(t.h - o.h)
		};
		return {
			w: e.w > s ? e.w : 0,
			h: e.h > s ? e.h : 0
		};
	};
	const getViewportOverflowStyle = (t, n) => {
		const getAxisOverflowStyle = (t, n, o, s) => {
			const e = t === x ? H : overflowBehaviorToOverflowStyle(t);
			const c = overflowIsVisible(t);
			const r = overflowIsVisible(o);
			if (!n && !s) return H;
			if (c && r) return x;
			if (c) return n && s ? e : n ? x : H;
			return n ? e : r && s ? x : H;
		};
		return {
			x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
			y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
		};
	};
	const setViewportOverflowStyle = (t) => {
		const createAllOverflowStyleClassNames = (t) => [
			x,
			H,
			E
		].map(((n) => createViewportOverflowStyleClassName(overflowCssValueToOverflowStyle(n), t)));
		p(createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" "));
		p(keys(t).map(((n) => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
	};
	const [O, C] = createCache(S, bind(getFractionalSize, a));
	const [$, D] = createCache(S, bind(T, a));
	const [z, I] = createCache(S);
	const [k] = createCache(m);
	const [M, R] = createCache(S);
	const [V] = createCache(m);
	const [L] = createCache({
		i: (t, n) => equal(t, n, deduplicateArray(concat(keys(t), keys(n)))),
		o: {}
	});
	const [P, U] = createCache({
		i: (t, n) => equalXY(t.T, n.T) && equalXY(t.k, n.k),
		o: getZeroScrollCoordinates()
	});
	const q = getStaticPluginModuleInstance(xt);
	const createViewportOverflowStyleClassName = (t, n) => {
		return `${n ? X : Y}${capitalizeFirstLetter(t)}`;
	};
	return ({ Dt: n, Zt: o, fn: c, It: l }, { dn: u }) => {
		const { _t: f, Ht: _, xt: d, Ct: y, ft: w, Et: S } = o || {};
		const { X: x, Y: H, W: E } = q && q.R(t, s, c, e, n) || {};
		const [T, F] = getShowNativeOverlaidScrollbars(n, e);
		const [j, X] = n("overflow");
		const Y = overflowIsVisible(j.x);
		const W = overflowIsVisible(j.y);
		const J = f || u || d || y || S || F;
		let G = C(l);
		let Q = D(l);
		let tt = I(l);
		let nt = R(l);
		if (F && g) p(K, !T);
		if (J) {
			if (hasAttrClass(r, B, N)) setMeasuringMode(true);
			const t = H && H();
			const [n] = G = O(l);
			const [o] = Q = $(l);
			const s = A(a);
			const e = h && getWindowSize(v());
			const c = {
				w: b(o.w + n.w),
				h: b(o.h + n.h)
			};
			const i = {
				w: b((e ? e.w : s.w + b(s.w - o.w)) + n.w),
				h: b((e ? e.h : s.h + b(s.h - o.h)) + n.h)
			};
			if (t) t();
			nt = M(i);
			tt = z(getOverflowAmount(c, i), l);
		}
		const [ot, st] = nt;
		const [et, ct] = tt;
		const [rt, it] = Q;
		const [lt, at] = G;
		const [ut, ft] = k({
			x: et.w > 0,
			y: et.h > 0
		});
		const _t = Y && W && (ut.x || ut.y) || Y && ut.x && !ut.y || W && ut.y && !ut.x;
		const dt = u || y || S || at || it || st || ct || X || F || J || _ && h;
		const [pt] = n("update.flowDirectionStyles");
		const [vt, gt] = L(pt ? pt(a) : getFlowDirectionStyles(), l);
		const [bt, yt] = y || w || gt || ft || l ? P(getMeasuredScrollCoordinates(vt, !!pt), l) : U();
		let wt = getViewportOverflowStyle(ut, j);
		setMeasuringMode(false);
		if (dt) {
			setViewportOverflowStyle(wt);
			wt = getElementOverflowStyle(a, ut);
			if (E && x) {
				x(wt, rt, lt);
				setStyles(a, E(wt));
			}
		}
		const [St, mt] = V(wt);
		addRemoveAttrClass(r, B, N, _t);
		addRemoveAttrClass(i, Z, N, _t);
		assignDeep(s, {
			rn: St,
			Vt: {
				x: ot.w,
				y: ot.h
			},
			Rt: {
				x: et.w,
				y: et.h
			},
			j: ut,
			Tt: sanitizeScrollCoordinates(bt, et)
		});
		return {
			en: mt,
			nn: st,
			sn: ct,
			cn: yt || ct
		};
	};
};
const createStructureSetup = (t) => {
	const [n, o, s] = createStructureSetupElements(t);
	const e = {
		ln: {
			t: 0,
			r: 0,
			b: 0,
			l: 0
		},
		_n: false,
		F: {
			[w]: 0,
			[S]: 0,
			[y]: 0,
			[v]: 0,
			[g]: 0,
			[b]: 0,
			[h]: 0
		},
		Vt: {
			x: 0,
			y: 0
		},
		Rt: {
			x: 0,
			y: 0
		},
		rn: {
			x: H,
			y: H
		},
		j: {
			x: false,
			y: false
		},
		Tt: getZeroScrollCoordinates()
	};
	const { dt: c, gt: r, V: i, St: l } = n;
	const { P: a, M: u } = getEnvironment();
	const f = !a && (u.x || u.y);
	const _ = [
		createTrinsicUpdateSegment(n),
		createPaddingUpdateSegment(n, e),
		createOverflowUpdateSegment(n, e)
	];
	return [
		o,
		(t) => {
			const n = {};
			const s = f && getElementScroll(r);
			const e = s && l();
			each(_, ((o) => {
				assignDeep(n, o(t, n) || {});
			}));
			scrollElementTo(r, s);
			if (e) e();
			if (!i) scrollElementTo(c, 0);
			return n;
		},
		e,
		n,
		s
	];
};
const createSetups = (t, n, o, s) => {
	let e = false;
	const c = {
		Kt: false,
		pn: false
	};
	const r = createOptionCheck(n, {});
	const [i, l, a, u, f] = createStructureSetup(t);
	const [_, d, p] = createObserversSetup(u, a, r, ((t) => {
		update({}, t);
	}));
	const [v, g, , h] = createScrollbarsSetup(t, n, c, p, a, u, s);
	const updateHintsAreTruthy = (t) => keys(t).some(((n) => !!t[n]));
	const update = (t, s) => {
		const { Kt: r, pn: i } = c;
		if (i || r && e) return false;
		const { vn: a, It: u, zt: f } = t;
		const _ = a || {};
		const v = !!u || !e;
		const h = {
			Dt: createOptionCheck(n, _, v),
			vn: _,
			It: v
		};
		const b = s || d(assignDeep({}, h, { zt: f }));
		const y = l(assignDeep({}, h, {
			fn: p,
			Zt: b
		}));
		g(assignDeep({}, h, {
			Zt: b,
			tn: y
		}));
		const w = updateHintsAreTruthy(b);
		const S = updateHintsAreTruthy(y);
		const m = w || S || !isEmptyObject(_) || v;
		e = true;
		if (m) o(t, {
			Zt: b,
			tn: y
		});
		return m;
	};
	return [
		() => {
			const { an: t, gt: n, St: o } = u;
			const s = getElementScroll(t);
			const e = [
				_(),
				i(),
				v(),
				() => {
					c.pn = true;
				}
			];
			const r = o();
			scrollElementTo(n, s);
			r();
			return bind(runEachAndClear, e);
		},
		update,
		(t) => {
			const n = c.Kt;
			c.Kt = t;
			if (!t && n !== t) update({
				It: true,
				zt: true
			});
		},
		() => {
			g({
				Dt: createOptionCheck(n, {}, false),
				vn: {},
				It: false
			});
		},
		() => ({
			gn: c,
			hn: p,
			bn: a
		}),
		{
			yn: u,
			wn: h
		},
		f
	];
};
const Vt = /* @__PURE__ */ new WeakMap();
const addInstance = (t, n) => {
	Vt.set(t, n);
};
const removeInstance = (t) => {
	Vt.delete(t);
};
const getInstance = (t) => Vt.get(t);
const OverlayScrollbars = (t, n, o) => {
	const { tt: s } = getEnvironment();
	const e = isHTMLElement(t);
	const c = e ? t : t.target;
	const r = getInstance(c);
	if (n && !r) {
		const r = [];
		const i = {};
		const validateOptions = (t) => {
			const n = removeUndefinedProperties(t);
			const o = getStaticPluginModuleInstance(R);
			return o ? o(n, true) : n;
		};
		const l = assignDeep({}, s(), validateOptions(n));
		const [a, u, f] = createEventListenerHub();
		const [_, d, p] = createEventListenerHub(o);
		const triggerEvent = (t, n) => {
			p(t, n);
			f(t, n);
		};
		const [v, g, h, b, y, w, S] = createSetups(t, l, (({ vn: t, It: n }, { Zt: o, tn: s }) => {
			const { _t: e, Ct: c, $t: r, xt: i, Ht: l, ft: a } = o;
			const { nn: u, sn: f, en: _, cn: d } = s;
			triggerEvent("updated", [m, {
				updateHints: {
					sizeChanged: !!e,
					directionChanged: !!c,
					heightIntrinsicChanged: !!r,
					overflowEdgeChanged: !!u,
					overflowAmountChanged: !!f,
					overflowStyleChanged: !!_,
					scrollCoordinatesChanged: !!d,
					contentMutation: !!i,
					hostMutation: !!l,
					appear: !!a
				},
				changedOptions: t || {},
				force: !!n
			}]);
		}), ((t) => triggerEvent("scroll", [m, t])));
		const destroy = (t) => {
			const { gn: n } = y();
			const { pn: o } = n;
			if (o) return;
			removeInstance(c);
			runEachAndClear(r);
			triggerEvent("destroyed", [m, t]);
			u();
			d();
		};
		const update = (t) => g({
			It: t,
			zt: true
		});
		const m = {
			options(t, n) {
				if (t) {
					const e = getOptionsDiff(l, assignDeep(n ? s() : {}, validateOptions(t)));
					if (!isEmptyObject(e)) {
						assignDeep(l, e);
						g({ vn: e });
					}
				}
				return assignDeep({}, l);
			},
			on: _,
			off: (t, n) => {
				if (t && n) d(t, n);
			},
			state() {
				const { gn: t, hn: n, bn: o } = y();
				const { pn: s, Kt: e } = t;
				const { B: c } = n;
				const { Vt: r, Rt: i, rn: l, j: a, ln: u, _n: f, Tt: _ } = o;
				return assignDeep({}, {
					overflowEdge: r,
					overflowAmount: i,
					overflowStyle: l,
					hasOverflow: a,
					scrollCoordinates: {
						start: _.T,
						end: _.k
					},
					padding: u,
					paddingAbsolute: f,
					directionRTL: c,
					sleeping: e,
					destroyed: s
				});
			},
			elements() {
				const { dt: t, vt: n, ln: o, L: s, ht: e, gt: c, Qt: r } = w.yn;
				const { jt: i, Jt: l } = w.wn;
				const translateScrollbarStructure = (t) => {
					const { kt: n, Pt: o, Lt: s } = t;
					return {
						scrollbar: s,
						track: o,
						handle: n
					};
				};
				const translateScrollbarsSetupElement = (t) => {
					const { Xt: n, Yt: o } = t;
					return assignDeep({}, translateScrollbarStructure(n[0]), { clone: () => {
						const t = translateScrollbarStructure(o());
						b();
						return t;
					} });
				};
				return assignDeep({}, {
					target: t,
					host: n,
					padding: o || s,
					viewport: s,
					content: e || s,
					scrollOffsetElement: c,
					scrollEventElement: r,
					scrollbarHorizontal: translateScrollbarsSetupElement(i),
					scrollbarVertical: translateScrollbarsSetupElement(l)
				});
			},
			update,
			destroy: bind(destroy, false),
			sleep: h,
			plugin: (t) => i[keys(t)[0]]
		};
		push(r, [S]);
		addInstance(c, m);
		registerPluginModuleInstances(k, OverlayScrollbars, [
			m,
			a,
			i
		]);
		if (cancelInitialization(w.yn.bt, !e && t.cancel)) {
			destroy(true);
			return m;
		}
		push(r, v());
		triggerEvent("initialized", [m]);
		m.update();
		return m;
	}
	return r;
};
OverlayScrollbars.plugin = (t) => {
	const n = isArray(t);
	const o = n ? t : [t];
	const s = o.map(((t) => registerPluginModuleInstances(t, OverlayScrollbars)[0]));
	addPlugins(o);
	return n ? s : s[0];
};
OverlayScrollbars.valid = (t) => {
	const n = t && t.elements;
	const o = isFunction(n) && n();
	return isPlainObject(o) && !!getInstance(o.target);
};
OverlayScrollbars.env = () => {
	const { U: t, M: n, P: o, J: s, ot: e, st: c, K: r, Z: i, tt: l, nt: a } = getEnvironment();
	return assignDeep({}, {
		scrollbarsSize: t,
		scrollbarsOverlaid: n,
		scrollbarsHiding: o,
		scrollTimeline: s,
		staticDefaultInitialization: e,
		staticDefaultOptions: c,
		getDefaultInitialization: r,
		setDefaultInitialization: i,
		getDefaultOptions: l,
		setDefaultOptions: a
	});
};
OverlayScrollbars.nonce = setNonce;
OverlayScrollbars.trustedTypePolicy = setTrustedTypePolicy;
//#endregion
//#region frontend/src/overlay-scrollbars.ts
OverlayScrollbars(document.body, { scrollbars: {
	theme: "os-theme-custom",
	autoHide: "leave",
	autoHideDelay: 200,
	visibility: "auto",
	clickScroll: true
} });
const search_results = document.getElementById("search-results-outer");
if (search_results) OverlayScrollbars(search_results, { scrollbars: {
	theme: "os-theme-custom",
	autoHide: "leave",
	autoHideDelay: 200,
	visibility: "auto",
	clickScroll: true
} });
const initPreScrollbars = () => {
	document.querySelectorAll(".content pre").forEach((pre) => {
		OverlayScrollbars(pre, {
			scrollbars: {
				theme: "os-theme-custom",
				autoHide: "leave",
				autoHideDelay: 200,
				visibility: "auto"
			},
			overflow: {
				x: "scroll",
				y: "hidden"
			}
		});
	});
};
document.addEventListener("DOMContentLoaded", initPreScrollbars);
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/global-this.js
var require_global_this = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var check = function(it) {
		return it && it.Math === Math && it;
	};
	module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || check(typeof exports == "object" && exports) || (function() {
		return this;
	})() || Function("return this")();
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/fails.js
var require_fails = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(exec) {
		try {
			return !!exec();
		} catch (error) {
			return true;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/descriptors.js
var require_descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = !require_fails()(function() {
		return Object.defineProperty({}, 1, { get: function() {
			return 7;
		} })[1] !== 7;
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = !require_fails()(function() {
		var test = function() {}.bind();
		return typeof test != "function" || test.hasOwnProperty("prototype");
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/function-call.js
var require_function_call = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NATIVE_BIND = require_function_bind_native();
	var call = Function.prototype.call;
	module.exports = NATIVE_BIND ? call.bind(call) : function() {
		return call.apply(call, arguments);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = /* @__PURE__ */ __commonJSMin(((exports) => {
	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	exports.f = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1) ? function propertyIsEnumerable(V) {
		var descriptor = getOwnPropertyDescriptor(this, V);
		return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(bitmap, value) {
		return {
			enumerable: !(bitmap & 1),
			configurable: !(bitmap & 2),
			writable: !(bitmap & 4),
			value
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NATIVE_BIND = require_function_bind_native();
	var FunctionPrototype = Function.prototype;
	var call = FunctionPrototype.call;
	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
	module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
		return function() {
			return call.apply(fn, arguments);
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/classof-raw.js
var require_classof_raw = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var toString = uncurryThis({}.toString);
	var stringSlice = uncurryThis("".slice);
	module.exports = function(it) {
		return stringSlice(toString(it), 8, -1);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/indexed-object.js
var require_indexed_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var fails = require_fails();
	var classof = require_classof_raw();
	var $Object = Object;
	var split = uncurryThis("".split);
	module.exports = fails(function() {
		return !$Object("z").propertyIsEnumerable(0);
	}) ? function(it) {
		return classof(it) === "String" ? split(it, "") : $Object(it);
	} : $Object;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(it) {
		return it === null || it === void 0;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isNullOrUndefined = require_is_null_or_undefined();
	var $TypeError = TypeError;
	module.exports = function(it) {
		if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
		return it;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var IndexedObject = require_indexed_object();
	var requireObjectCoercible = require_require_object_coercible();
	module.exports = function(it) {
		return IndexedObject(requireObjectCoercible(it));
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-callable.js
var require_is_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var documentAll = typeof document == "object" && document.all;
	module.exports = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
		return typeof argument == "function" || argument === documentAll;
	} : function(argument) {
		return typeof argument == "function";
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-object.js
var require_is_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	module.exports = function(it) {
		return typeof it == "object" ? it !== null : isCallable(it);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/get-built-in.js
var require_get_built_in = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var isCallable = require_is_callable();
	var aFunction = function(argument) {
		return isCallable(argument) ? argument : void 0;
	};
	module.exports = function(namespace, method) {
		return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_function_uncurry_this()({}.isPrototypeOf);
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/environment-user-agent.js
var require_environment_user_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var navigator = require_global_this().navigator;
	var userAgent = navigator && navigator.userAgent;
	module.exports = userAgent ? String(userAgent) : "";
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/environment-v8-version.js
var require_environment_v8_version = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var userAgent = require_environment_user_agent();
	var process = globalThis.process;
	var Deno = globalThis.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
		match = v8.split(".");
		version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}
	if (!version && userAgent) {
		match = userAgent.match(/Edge\/(\d+)/);
		if (!match || match[1] >= 74) {
			match = userAgent.match(/Chrome\/(\d+)/);
			if (match) version = +match[1];
		}
	}
	module.exports = version;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var V8_VERSION = require_environment_v8_version();
	var fails = require_fails();
	var $String = require_global_this().String;
	module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
		var symbol = Symbol("symbol detection");
		return !$String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_symbol_constructor_detection() && !Symbol.sham && typeof Symbol.iterator == "symbol";
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-symbol.js
var require_is_symbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getBuiltIn = require_get_built_in();
	var isCallable = require_is_callable();
	var isPrototypeOf = require_object_is_prototype_of();
	var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
	var $Object = Object;
	module.exports = USE_SYMBOL_AS_UID ? function(it) {
		return typeof it == "symbol";
	} : function(it) {
		var $Symbol = getBuiltIn("Symbol");
		return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/try-to-string.js
var require_try_to_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $String = String;
	module.exports = function(argument) {
		try {
			return $String(argument);
		} catch (error) {
			return "Object";
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/a-callable.js
var require_a_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	var tryToString = require_try_to_string();
	var $TypeError = TypeError;
	module.exports = function(argument) {
		if (isCallable(argument)) return argument;
		throw new $TypeError(tryToString(argument) + " is not a function");
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/get-method.js
var require_get_method = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var aCallable = require_a_callable();
	var isNullOrUndefined = require_is_null_or_undefined();
	module.exports = function(V, P) {
		var func = V[P];
		return isNullOrUndefined(func) ? void 0 : aCallable(func);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = require_function_call();
	var isCallable = require_is_callable();
	var isObject = require_is_object();
	var $TypeError = TypeError;
	module.exports = function(input, pref) {
		var fn, val;
		if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
		if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
		throw new $TypeError("Can't convert object to primitive value");
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-pure.js
var require_is_pure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = false;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/define-global-property.js
var require_define_global_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var defineProperty = Object.defineProperty;
	module.exports = function(key, value) {
		try {
			defineProperty(globalThis, key, {
				value,
				configurable: true,
				writable: true
			});
		} catch (error) {
			globalThis[key] = value;
		}
		return value;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/shared-store.js
var require_shared_store = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var IS_PURE = require_is_pure();
	var globalThis = require_global_this();
	var defineGlobalProperty = require_define_global_property();
	var SHARED = "__core-js_shared__";
	var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
	(store.versions || (store.versions = [])).push({
		version: "3.49.0",
		mode: IS_PURE ? "pure" : "global",
		copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
		license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
		source: "https://github.com/zloirock/core-js"
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/shared.js
var require_shared = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var store = require_shared_store();
	module.exports = function(key, value) {
		return store[key] || (store[key] = value || {});
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-object.js
var require_to_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var requireObjectCoercible = require_require_object_coercible();
	var $Object = Object;
	module.exports = function(argument) {
		return $Object(requireObjectCoercible(argument));
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/has-own-property.js
var require_has_own_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var toObject = require_to_object();
	var hasOwnProperty = uncurryThis({}.hasOwnProperty);
	module.exports = Object.hasOwn || function hasOwn(it, key) {
		return hasOwnProperty(toObject(it), key);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/uid.js
var require_uid = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var id = 0;
	var postfix = Math.random();
	var toString = uncurryThis(1.1.toString);
	module.exports = function(key) {
		return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var shared = require_shared();
	var hasOwn = require_has_own_property();
	var uid = require_uid();
	var NATIVE_SYMBOL = require_symbol_constructor_detection();
	var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
	var Symbol = globalThis.Symbol;
	var WellKnownSymbolsStore = shared("wks");
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol["for"] || Symbol : Symbol && Symbol.withoutSetter || uid;
	module.exports = function(name) {
		if (!hasOwn(WellKnownSymbolsStore, name)) WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol("Symbol." + name);
		return WellKnownSymbolsStore[name];
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-primitive.js
var require_to_primitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = require_function_call();
	var isObject = require_is_object();
	var isSymbol = require_is_symbol();
	var getMethod = require_get_method();
	var ordinaryToPrimitive = require_ordinary_to_primitive();
	var wellKnownSymbol = require_well_known_symbol();
	var $TypeError = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
	module.exports = function(input, pref) {
		if (!isObject(input) || isSymbol(input)) return input;
		var exoticToPrim = getMethod(input, TO_PRIMITIVE);
		var result;
		if (exoticToPrim) {
			if (pref === void 0) pref = "default";
			result = call(exoticToPrim, input, pref);
			if (!isObject(result) || isSymbol(result)) return result;
			throw new $TypeError("Can't convert object to primitive value");
		}
		if (pref === void 0) pref = "number";
		return ordinaryToPrimitive(input, pref);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-property-key.js
var require_to_property_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toPrimitive = require_to_primitive();
	var isSymbol = require_is_symbol();
	module.exports = function(argument) {
		var key = toPrimitive(argument, "string");
		return isSymbol(key) ? key : key + "";
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/document-create-element.js
var require_document_create_element = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var isObject = require_is_object();
	var document = globalThis.document;
	var EXISTS = isObject(document) && isObject(document.createElement);
	module.exports = function(it) {
		return EXISTS ? document.createElement(it) : {};
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DESCRIPTORS = require_descriptors();
	var fails = require_fails();
	var createElement = require_document_create_element();
	module.exports = !DESCRIPTORS && !fails(function() {
		return Object.defineProperty(createElement("div"), "a", { get: function() {
			return 7;
		} }).a !== 7;
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var DESCRIPTORS = require_descriptors();
	var call = require_function_call();
	var propertyIsEnumerableModule = require_object_property_is_enumerable();
	var createPropertyDescriptor = require_create_property_descriptor();
	var toIndexedObject = require_to_indexed_object();
	var toPropertyKey = require_to_property_key();
	var hasOwn = require_has_own_property();
	var IE8_DOM_DEFINE = require_ie8_dom_define();
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
		O = toIndexedObject(O);
		P = toPropertyKey(P);
		if (IE8_DOM_DEFINE) try {
			return $getOwnPropertyDescriptor(O, P);
		} catch (error) {}
		if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DESCRIPTORS = require_descriptors();
	var fails = require_fails();
	module.exports = DESCRIPTORS && fails(function() {
		return Object.defineProperty(function() {}, "prototype", {
			value: 42,
			writable: false
		}).prototype !== 42;
	});
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/an-object.js
var require_an_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_is_object();
	var $String = String;
	var $TypeError = TypeError;
	module.exports = function(argument) {
		if (isObject(argument)) return argument;
		throw new $TypeError($String(argument) + " is not an object");
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-define-property.js
var require_object_define_property = /* @__PURE__ */ __commonJSMin(((exports) => {
	var DESCRIPTORS = require_descriptors();
	var IE8_DOM_DEFINE = require_ie8_dom_define();
	var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
	var anObject = require_an_object();
	var toPropertyKey = require_to_property_key();
	var $TypeError = TypeError;
	var $defineProperty = Object.defineProperty;
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = "enumerable";
	var CONFIGURABLE = "configurable";
	var WRITABLE = "writable";
	exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
		anObject(O);
		P = toPropertyKey(P);
		anObject(Attributes);
		if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
			var current = $getOwnPropertyDescriptor(O, P);
			if (current && current[WRITABLE]) {
				O[P] = Attributes.value;
				Attributes = {
					configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
					enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
					writable: false
				};
			}
		}
		return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
		anObject(O);
		P = toPropertyKey(P);
		anObject(Attributes);
		if (IE8_DOM_DEFINE) try {
			return $defineProperty(O, P, Attributes);
		} catch (error) {}
		if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
		if ("value" in Attributes) O[P] = Attributes.value;
		return O;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DESCRIPTORS = require_descriptors();
	var definePropertyModule = require_object_define_property();
	var createPropertyDescriptor = require_create_property_descriptor();
	module.exports = DESCRIPTORS ? function(object, key, value) {
		return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	} : function(object, key, value) {
		object[key] = value;
		return object;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/function-name.js
var require_function_name = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DESCRIPTORS = require_descriptors();
	var hasOwn = require_has_own_property();
	var FunctionPrototype = Function.prototype;
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
	var EXISTS = hasOwn(FunctionPrototype, "name");
	module.exports = {
		EXISTS,
		PROPER: EXISTS && function something() {}.name === "something",
		CONFIGURABLE: EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable)
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/inspect-source.js
var require_inspect_source = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var isCallable = require_is_callable();
	var store = require_shared_store();
	var functionToString = uncurryThis(Function.toString);
	if (!isCallable(store.inspectSource)) store.inspectSource = function(it) {
		return functionToString(it);
	};
	module.exports = store.inspectSource;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var isCallable = require_is_callable();
	var WeakMap = globalThis.WeakMap;
	module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/shared-key.js
var require_shared_key = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var shared = require_shared();
	var uid = require_uid();
	var keys = shared("keys");
	module.exports = function(key) {
		return keys[key] || (keys[key] = uid(key));
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/internal-state.js
var require_internal_state = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
	var globalThis = require_global_this();
	var isObject = require_is_object();
	var createNonEnumerableProperty = require_create_non_enumerable_property();
	var hasOwn = require_has_own_property();
	var shared = require_shared_store();
	var sharedKey = require_shared_key();
	var hiddenKeys = require_hidden_keys();
	var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
	var TypeError = globalThis.TypeError;
	var WeakMap = globalThis.WeakMap;
	var set, get, has;
	var enforce = function(it) {
		return has(it) ? get(it) : set(it, {});
	};
	var getterFor = function(TYPE) {
		return function(it) {
			var state;
			if (!isObject(it) || (state = get(it)).type !== TYPE) throw new TypeError("Incompatible receiver, " + TYPE + " required");
			return state;
		};
	};
	if (NATIVE_WEAK_MAP || shared.state) {
		var store = shared.state || (shared.state = new WeakMap());
		store.get = store.get;
		store.has = store.has;
		store.set = store.set;
		set = function(it, metadata) {
			if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
			metadata.facade = it;
			store.set(it, metadata);
			return metadata;
		};
		get = function(it) {
			return store.get(it) || {};
		};
		has = function(it) {
			return store.has(it);
		};
	} else {
		var STATE = sharedKey("state");
		hiddenKeys[STATE] = true;
		set = function(it, metadata) {
			if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
			metadata.facade = it;
			createNonEnumerableProperty(it, STATE, metadata);
			return metadata;
		};
		get = function(it) {
			return hasOwn(it, STATE) ? it[STATE] : {};
		};
		has = function(it) {
			return hasOwn(it, STATE);
		};
	}
	module.exports = {
		set,
		get,
		has,
		enforce,
		getterFor
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/make-built-in.js
var require_make_built_in = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var fails = require_fails();
	var isCallable = require_is_callable();
	var hasOwn = require_has_own_property();
	var DESCRIPTORS = require_descriptors();
	var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
	var inspectSource = require_inspect_source();
	var InternalStateModule = require_internal_state();
	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState = InternalStateModule.get;
	var $String = String;
	var defineProperty = Object.defineProperty;
	var stringSlice = uncurryThis("".slice);
	var replace = uncurryThis("".replace);
	var join = uncurryThis([].join);
	var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
		return defineProperty(function() {}, "length", { value: 8 }).length !== 8;
	});
	var TEMPLATE = String(String).split("String");
	var makeBuiltIn = module.exports = function(value, name, options) {
		if (stringSlice($String(name), 0, 7) === "Symbol(") name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
		if (options && options.getter) name = "get " + name;
		if (options && options.setter) name = "set " + name;
		if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) if (DESCRIPTORS) defineProperty(value, "name", {
			value: name,
			configurable: true
		});
		else value.name = name;
		if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) defineProperty(value, "length", { value: options.arity });
		try {
			if (options && hasOwn(options, "constructor") && options.constructor) {
				if (DESCRIPTORS) defineProperty(value, "prototype", { writable: false });
			} else if (value.prototype) value.prototype = void 0;
		} catch (error) {}
		var state = enforceInternalState(value);
		if (!hasOwn(state, "source")) state.source = join(TEMPLATE, typeof name == "string" ? name : "");
		return value;
	};
	Function.prototype.toString = makeBuiltIn(function toString() {
		return isCallable(this) && getInternalState(this).source || inspectSource(this);
	}, "toString");
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/define-built-in.js
var require_define_built_in = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	var definePropertyModule = require_object_define_property();
	var makeBuiltIn = require_make_built_in();
	var defineGlobalProperty = require_define_global_property();
	module.exports = function(O, key, value, options) {
		if (!options) options = {};
		var simple = options.enumerable;
		var name = options.name !== void 0 ? options.name : key;
		if (isCallable(value)) makeBuiltIn(value, name, options);
		if (options.global) if (simple) O[key] = value;
		else defineGlobalProperty(key, value);
		else {
			try {
				if (!options.unsafe) delete O[key];
				else if (O[key]) simple = true;
			} catch (error) {}
			if (simple) O[key] = value;
			else definePropertyModule.f(O, key, {
				value,
				enumerable: false,
				configurable: !options.nonConfigurable,
				writable: !options.nonWritable
			});
		}
		return O;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/math-trunc.js
var require_math_trunc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = Math.trunc || function trunc(x) {
		var n = +x;
		return (n > 0 ? floor : ceil)(n);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var trunc = require_math_trunc();
	module.exports = function(argument) {
		var number = +argument;
		return number !== number || number === 0 ? 0 : trunc(number);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toIntegerOrInfinity = require_to_integer_or_infinity();
	var max = Math.max;
	var min = Math.min;
	module.exports = function(index, length) {
		var integer = toIntegerOrInfinity(index);
		return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-length.js
var require_to_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toIntegerOrInfinity = require_to_integer_or_infinity();
	var min = Math.min;
	module.exports = function(argument) {
		var len = toIntegerOrInfinity(argument);
		return len > 0 ? min(len, 9007199254740991) : 0;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toLength = require_to_length();
	module.exports = function(obj) {
		return toLength(obj.length);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/array-includes.js
var require_array_includes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toIndexedObject = require_to_indexed_object();
	var toAbsoluteIndex = require_to_absolute_index();
	var lengthOfArrayLike = require_length_of_array_like();
	var createMethod = function(IS_INCLUDES) {
		return function($this, el, fromIndex) {
			var O = toIndexedObject($this);
			var length = lengthOfArrayLike(O);
			if (length === 0) return !IS_INCLUDES && -1;
			var index = toAbsoluteIndex(fromIndex, length);
			var value;
			if (IS_INCLUDES && el !== el) while (length > index) {
				value = O[index++];
				if (value !== value) return true;
			}
			else for (; length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
			return !IS_INCLUDES && -1;
		};
	};
	module.exports = {
		includes: createMethod(true),
		indexOf: createMethod(false)
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var hasOwn = require_has_own_property();
	var toIndexedObject = require_to_indexed_object();
	var indexOf = require_array_includes().indexOf;
	var hiddenKeys = require_hidden_keys();
	var push = uncurryThis([].push);
	module.exports = function(object, names) {
		var O = toIndexedObject(object);
		var i = 0;
		var result = [];
		var key;
		for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
		while (names.length > i) if (hasOwn(O, key = names[i++])) ~indexOf(result, key) || push(result, key);
		return result;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"constructor",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"toLocaleString",
		"toString",
		"valueOf"
	];
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = /* @__PURE__ */ __commonJSMin(((exports) => {
	var internalObjectKeys = require_object_keys_internal();
	var hiddenKeys = require_enum_bug_keys().concat("length", "prototype");
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
		return internalObjectKeys(O, hiddenKeys);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.f = Object.getOwnPropertySymbols;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/own-keys.js
var require_own_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getBuiltIn = require_get_built_in();
	var uncurryThis = require_function_uncurry_this();
	var getOwnPropertyNamesModule = require_object_get_own_property_names();
	var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
	var anObject = require_an_object();
	var concat = uncurryThis([].concat);
	module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
		var keys = getOwnPropertyNamesModule.f(anObject(it));
		var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
		return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasOwn = require_has_own_property();
	var ownKeys = require_own_keys();
	var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
	var definePropertyModule = require_object_define_property();
	module.exports = function(target, source, exceptions) {
		var keys = ownKeys(source);
		var defineProperty = definePropertyModule.f;
		var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/is-forced.js
var require_is_forced = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fails = require_fails();
	var isCallable = require_is_callable();
	var replacement = /#|\.prototype\./;
	var isForced = function(feature, detection) {
		var value = data[normalize(feature)];
		return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
	};
	var normalize = isForced.normalize = function(string) {
		return String(string).replace(replacement, ".").toLowerCase();
	};
	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = "N";
	var POLYFILL = isForced.POLYFILL = "P";
	module.exports = isForced;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/export.js
var require_export = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalThis = require_global_this();
	var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
	var createNonEnumerableProperty = require_create_non_enumerable_property();
	var defineBuiltIn = require_define_built_in();
	var defineGlobalProperty = require_define_global_property();
	var copyConstructorProperties = require_copy_constructor_properties();
	var isForced = require_is_forced();
	module.exports = function(options, source) {
		var TARGET = options.target;
		var GLOBAL = options.global;
		var STATIC = options.stat;
		var FORCED, target, key, targetProperty, sourceProperty, descriptor;
		if (GLOBAL) target = globalThis;
		else if (STATIC) target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
		else target = globalThis[TARGET] && globalThis[TARGET].prototype;
		if (target) for (key in source) {
			sourceProperty = source[key];
			if (options.dontCallGetSet) {
				descriptor = getOwnPropertyDescriptor(target, key);
				targetProperty = descriptor && descriptor.value;
			} else targetProperty = target[key];
			FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
			if (!FORCED && targetProperty !== void 0) {
				if (typeof sourceProperty == typeof targetProperty) continue;
				copyConstructorProperties(sourceProperty, targetProperty);
			}
			if (options.sham || targetProperty && targetProperty.sham) createNonEnumerableProperty(sourceProperty, "sham", true);
			defineBuiltIn(target, key, sourceProperty, options);
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/a-string.js
var require_a_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $TypeError = TypeError;
	module.exports = function(argument) {
		if (typeof argument == "string") return argument;
		throw new $TypeError("Argument is not a string");
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TO_STRING_TAG = require_well_known_symbol()("toStringTag");
	var test = {};
	test[TO_STRING_TAG] = "z";
	module.exports = String(test) === "[object z]";
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/classof.js
var require_classof = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
	var isCallable = require_is_callable();
	var classofRaw = require_classof_raw();
	var TO_STRING_TAG = require_well_known_symbol()("toStringTag");
	var $Object = Object;
	var CORRECT_ARGUMENTS = classofRaw(function() {
		return arguments;
	}()) === "Arguments";
	var tryGet = function(it, key) {
		try {
			return it[key];
		} catch (error) {}
	};
	module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
		var O, tag, result;
		return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable(O.callee) ? "Arguments" : result;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/to-string.js
var require_to_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var classof = require_classof();
	var $String = String;
	module.exports = function(argument) {
		if (classof(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
		return $String(argument);
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/string-repeat.js
var require_string_repeat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toIntegerOrInfinity = require_to_integer_or_infinity();
	var toString = require_to_string();
	var requireObjectCoercible = require_require_object_coercible();
	var $RangeError = RangeError;
	var floor = Math.floor;
	module.exports = function repeat(count) {
		var str = toString(requireObjectCoercible(this));
		var result = "";
		var n = toIntegerOrInfinity(count);
		if (n < 0 || n === Infinity) throw new $RangeError("Wrong number of repetitions");
		for (; n > 0; (n = floor(n / 2)) && (str += str)) if (n % 2) result += str;
		return result;
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/string-pad.js
var require_string_pad = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uncurryThis = require_function_uncurry_this();
	var toLength = require_to_length();
	var toString = require_to_string();
	var $repeat = require_string_repeat();
	var requireObjectCoercible = require_require_object_coercible();
	var repeat = uncurryThis($repeat);
	var stringSlice = uncurryThis("".slice);
	var ceil = Math.ceil;
	var createMethod = function(IS_END) {
		return function($this, maxLength, fillString) {
			var S = toString(requireObjectCoercible($this));
			var intMaxLength = toLength(maxLength);
			var stringLength = S.length;
			if (intMaxLength <= stringLength) return S;
			var fillStr = fillString === void 0 ? " " : toString(fillString);
			var fillLen, stringFiller;
			if (fillStr === "") return S;
			fillLen = intMaxLength - stringLength;
			stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
			if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
			return IS_END ? S + stringFiller : stringFiller + S;
		};
	};
	module.exports = {
		start: createMethod(false),
		end: createMethod(true)
	};
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/whitespaces.js
var require_whitespaces = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "	\n\v\f\r \xA0              　\u2028\u2029﻿";
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/modules/es.regexp.escape.js
var require_es_regexp_escape = /* @__PURE__ */ __commonJSMin((() => {
	var $ = require_export();
	var uncurryThis = require_function_uncurry_this();
	var aString = require_a_string();
	var hasOwn = require_has_own_property();
	var padStart = require_string_pad().start;
	var WHITESPACES = require_whitespaces();
	var $Array = Array;
	var $escape = RegExp.escape;
	var charAt = uncurryThis("".charAt);
	var charCodeAt = uncurryThis("".charCodeAt);
	var numberToString = uncurryThis(1.1.toString);
	var join = uncurryThis([].join);
	var FIRST_DIGIT_OR_ASCII = /^[0-9a-z]/i;
	var SYNTAX_SOLIDUS = /^[$()*+./?[\\\]^{|}]/;
	var OTHER_PUNCTUATORS_AND_WHITESPACES = RegExp("^[!\"#%&',\\-:;<=>@`~" + WHITESPACES + "]");
	var exec = uncurryThis(FIRST_DIGIT_OR_ASCII.exec);
	var ControlEscape = {
		"	": "t",
		"\n": "n",
		"\v": "v",
		"\f": "f",
		"\r": "r"
	};
	var escapeChar = function(chr) {
		var hex = numberToString(charCodeAt(chr, 0), 16);
		return hex.length < 3 ? "\\x" + padStart(hex, 2, "0") : "\\u" + padStart(hex, 4, "0");
	};
	$({
		target: "RegExp",
		stat: true,
		forced: !$escape || $escape("ab") !== "\\x61b"
	}, { escape: function escape(S) {
		aString(S);
		var length = S.length;
		var result = $Array(length);
		for (var i = 0; i < length; i++) {
			var chr = charAt(S, i);
			if (i === 0 && exec(FIRST_DIGIT_OR_ASCII, chr)) result[i] = escapeChar(chr);
			else if (hasOwn(ControlEscape, chr)) result[i] = "\\" + ControlEscape[chr];
			else if (exec(SYNTAX_SOLIDUS, chr)) result[i] = "\\" + chr;
			else if (exec(OTHER_PUNCTUATORS_AND_WHITESPACES, chr)) result[i] = escapeChar(chr);
			else {
				var charCode = charCodeAt(chr, 0);
				if ((charCode & 63488) !== 55296) result[i] = chr;
				else if (charCode >= 56320 || i + 1 >= length || (charCodeAt(S, i + 1) & 64512) !== 56320) result[i] = escapeChar(chr);
				else {
					result[i] = chr;
					result[++i] = charAt(S, i);
				}
			}
		}
		return join(result, "");
	} });
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/internals/path.js
var require_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_global_this();
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/es/regexp/escape.js
var require_escape$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	require_es_regexp_escape();
	module.exports = require_path().RegExp.escape;
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/stable/regexp/escape.js
var require_escape$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_escape$2();
}));
//#endregion
//#region node_modules/.pnpm/core-js@3.49.0/node_modules/core-js/modules/esnext.regexp.escape.js
var require_esnext_regexp_escape = /* @__PURE__ */ __commonJSMin((() => {
	require_es_regexp_escape();
}));
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parent = require_escape$1();
	require_esnext_regexp_escape();
	module.exports = parent;
})))();
let searchIndex = [];
let initDone = false;
let initPromise = null;
const overlay = document.getElementById("search-overlay");
const input = document.getElementById("search-input");
const btn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("search-results");
const resultsOuterContainer = document.getElementById("search-results-outer");
const noResultsContainer = document.getElementById("search-no-results");
function openSearch() {
	if (!overlay) return;
	overlay.setAttribute("data-shown", "");
	input?.focus();
}
function closeSearch() {
	if (!overlay) return;
	overlay.removeAttribute("data-shown");
	if (input) input.value = "";
	hideResults();
}
function hideResults() {
	if (resultsOuterContainer) resultsOuterContainer.removeAttribute("data-shown");
	if (noResultsContainer) noResultsContainer.removeAttribute("data-shown");
}
function search(query) {
	if (searchIndex.length === 0) return [];
	const words_iter = new Intl.Segmenter("zh", { granularity: "word" }).segment(query)[Symbol.iterator]();
	const words_arr = Array.from(words_iter).filter((i) => !!i.isWordLike).map((i) => i.segment);
	const regex = new RegExp(words_arr.map((i) => RegExp.escape(i)).join("|"), "gi");
	const result = [];
	for (const item of searchIndex) {
		const item_clone = structuredClone(item);
		let matches = false;
		let title = "";
		let t_offset = 0;
		const t_replacer = (match, offset, str) => {
			title += str.substring(t_offset, offset);
			title += `<span class="search-match">`;
			title += match;
			t_offset = offset + match.length;
			title += `</span>`;
			matches = true;
			return match;
		};
		item_clone.title.replaceAll(regex, t_replacer);
		if (t_offset !== item.title.length - 1) title += item.title.substring(t_offset, item.title.length);
		item_clone.title = title;
		let body = "";
		let b_offset = 0;
		const b_replacer = (match, offset, str) => {
			if (b_offset === 0) {
				if (offset - 10 > 0) body += "...";
				body += str.substring(Math.max(offset - 10, 0), offset);
			} else body += str.substring(b_offset, offset);
			body += `<span class="search-match">`;
			body += match;
			b_offset = offset + match.length;
			body += `</span>`;
			matches = true;
			return match;
		};
		item_clone.body.replaceAll(regex, b_replacer);
		if (b_offset !== item.body.length - 1) body += item.body.substring(b_offset, item.body.length);
		item_clone.body = body;
		if (matches) result.push(item_clone);
	}
	return result;
}
async function initializeSearchIndex() {
	if (initDone) return;
	if (initPromise) return initPromise;
	initPromise = (async () => {
		try {
			const resp = await fetch("/search_index.zh.json");
			if (!resp.ok) throw new Error(`Failed to fetch search index: ${resp.status}`);
			searchIndex = (await resp.json()).filter((i) => !!i.body);
			initDone = true;
		} catch (err) {
			console.error("Failed to initialize search index:", err);
		}
	})();
	return initPromise;
}
async function performSearch(query) {
	hideResults();
	if (!query.trim()) return;
	await initializeSearchIndex();
	if (searchIndex.length === 0) return;
	try {
		const results = search(query);
		if (!results.length) {
			if (noResultsContainer) noResultsContainer.setAttribute("data-shown", "");
			return;
		}
		resultsOuterContainer?.setAttribute("data-shown", "");
		renderResults(results);
	} catch (err) {
		console.error("Search error:", err);
	}
}
function renderResults(results) {
	if (!resultsContainer) return;
	resultsContainer.innerHTML = "";
	results.forEach((r, i) => {
		const isFirst = i === 0;
		const isLast = i === results.length - 1;
		const a = document.createElement("a");
		a.href = r.url;
		a.className = `search-result-item flex flex-row items-center p-4 hover:bg-muted/60 cursor-pointer transition-colors duration-200 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`;
		a.innerHTML = `
            <i data-lucide="newspaper" class="self-start mt-0.5 size-5 mr-2 shrink-0"></i>
            <div class="flex flex-col min-w-0">
                <div class="text-xl font-semibold truncate">${r.title}</div>
                  <div class="text-base text-foreground dark:font-light line-clamp-2">${r.body}</div>
            </div>
            <div class="flex-1"></div>
            <i data-lucide="arrow-right" class="ml-4 shrink-0"></i>
        `;
		resultsContainer.appendChild(a);
		if (!isLast) {
			const divider = document.createElement("div");
			divider.className = "border-b border-border";
			resultsContainer.appendChild(divider);
		}
	});
	createIcons({ icons: {
		Newspaper,
		ArrowRight
	} });
}
let debounceTimer = null;
if (input) {
	input.addEventListener("input", () => {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			performSearch(input.value);
		}, 200);
	});
	input.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeSearch();
	});
}
if (btn) btn.addEventListener("click", () => {
	if (overlay?.hasAttribute("data-shown")) closeSearch();
	else openSearch();
});
document.addEventListener("click", (e) => {
	if (!overlay?.hasAttribute("data-shown")) return;
	if (e.target === overlay) closeSearch();
});
document.addEventListener("keydown", (e) => {
	if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
		e.preventDefault();
		if (overlay?.hasAttribute("data-shown")) closeSearch();
		else openSearch();
		return;
	}
	if (e.key === "Escape" && overlay?.hasAttribute("data-shown")) {
		if (document.activeElement === input) return;
		closeSearch();
	}
});
if (document.readyState === "complete") initializeSearchIndex();
else window.addEventListener("load", initializeSearchIndex);
//#endregion
//#region frontend/src/main.ts
createIcons({ icons: {
	Sun,
	Moon,
	Laptop,
	Clock,
	Shapes,
	ChevronLeft,
	ChevronRight,
	ChevronsRight,
	ChevronsLeft,
	Calendar,
	ArrowLeft,
	ArrowRight,
	Link,
	Search,
	Newspaper
} });
//#endregion
