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
//#endregion
//#region frontend/src/clarity.js
(function(c, l, a, r, i, t, y) {
	c[a] = c[a] || function() {
		(c[a].q = c[a].q || []).push(arguments);
	};
	t = l.createElement(r);
	t.async = 1;
	t.src = "https://www.clarity.ms/tag/" + i;
	y = l.getElementsByTagName(r)[0];
	y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "owq9jaxnvb");
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
const w$1 = "marginRight";
const S$1 = "marginBottom";
const m = "overflowX";
const O = "overflowY";
const C = "width";
const $ = "height";
const x = "visible";
const H$1 = "hidden";
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
const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
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
const I$1 = bind(getElmWidthHeightProperty, "offset");
const A = bind(getElmWidthHeightProperty, "client");
const T$1 = bind(getElmWidthHeightProperty, "scroll");
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
const M$1 = {};
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
		return (l || M$1)[s] = t;
	}
}));
const getInstancePluginModuleInstance = (t, n) => t[n];
const getStaticPluginModuleInstance = (t) => getInstancePluginModuleInstance(M$1, t);
const R$1 = "__osOptionsValidationPlugin";
const V$1 = `data-overlayscrollbars`;
const L = "os-environment";
const P = `${L}-scrollbar-hidden`;
const U = `${V$1}-initialize`;
const N = "noClipping";
const q = `${V$1}-body`;
const B = V$1;
const F = "host";
const j = `${V$1}-viewport`;
const X$1 = m;
const Y$1 = O;
const W$1 = "arrange";
const J = "measuring";
const G = "scrolling";
const K = "scrollbarHidden";
const Q$1 = "noContent";
const Z$1 = `${V$1}-padding`;
const tt = `${V$1}-content`;
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
	if (t === "auto") return n ? E : H$1;
	const o = t || H$1;
	return [
		H$1,
		E,
		x
	].includes(o) ? o : H$1;
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
const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
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
		} else if (hasOwnProperty(n, s) && c !== e) {
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
		const e = I$1(t);
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
				triggerOnTrinsicChangedCallback(I$1(s));
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
		const r = !S && O(W$1);
		const i = r && getElementScroll(y);
		const l = i && $();
		const a = C(J, c);
		const u = r && s && s();
		const f = T$1(b);
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
				const $ = e(getBoundingClientRect(p)[i]) / I$1(p)[a] || 1;
				const x = getElementScroll(p)[f];
				const scrollRelative = (t) => {
					scrollElementTo(p, { [f]: x + t });
				};
				const moveHandleRelative = (t) => {
					const { Rt: n } = o;
					const s = I$1(b)[a] - I$1(y)[a];
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
		const n = I$1(t);
		const o = T$1(t);
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
		setAttrs(J, Z$1, "");
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
			removeAttrs(J, Z$1);
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
				[w$1]: t && !O ? -s : 0,
				[S$1]: t ? -c : 0,
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
		const u = p(Q$1, true);
		scrollElementTo(_, {
			x: 0,
			y: 0
		});
		u();
		const d = getElementScroll(_);
		const v = T$1(_);
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
			const e = t === x ? H$1 : overflowBehaviorToOverflowStyle(t);
			const c = overflowIsVisible(t);
			const r = overflowIsVisible(o);
			if (!n && !s) return H$1;
			if (c && r) return x;
			if (c) return n && s ? e : n ? x : H$1;
			return n ? e : r && s ? x : H$1;
		};
		return {
			x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
			y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
		};
	};
	const setViewportOverflowStyle = (t) => {
		const createAllOverflowStyleClassNames = (t) => [
			x,
			H$1,
			E
		].map(((n) => createViewportOverflowStyleClassName(overflowCssValueToOverflowStyle(n), t)));
		p(createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" "));
		p(keys(t).map(((n) => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
	};
	const [O, C] = createCache(S, bind(getFractionalSize, a));
	const [$, D] = createCache(S, bind(T$1, a));
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
		return `${n ? X$1 : Y$1}${capitalizeFirstLetter(t)}`;
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
		addRemoveAttrClass(i, Z$1, N, _t);
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
			[w$1]: 0,
			[S$1]: 0,
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
			x: H$1,
			y: H$1
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
			const o = getStaticPluginModuleInstance(R$1);
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
//#region (ignored) node_modules/.pnpm/flexsearch@0.8.212/node_modules/flexsearch/dist
var require_dist = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region node_modules/.pnpm/flexsearch@0.8.212/node_modules/flexsearch/dist/flexsearch.bundle.module.min.mjs
/**!
* FlexSearch.js v0.8.212 (Bundle/Module)
* Author and Copyright: Thomas Wilkerling
* Licence: Apache-2.0
* Hosted by Nextapps GmbH
* https://github.com/nextapps-de/flexsearch
*/
var w;
function H(a, c, b) {
	const e = typeof b, d = typeof a;
	if (e !== "undefined") {
		if (d !== "undefined") {
			if (b) {
				if (d === "function" && e === d) return function(k) {
					return a(b(k));
				};
				c = a.constructor;
				if (c === b.constructor) {
					if (c === Array) return b.concat(a);
					if (c === Map) {
						var f = new Map(b);
						for (var g of a) f.set(g[0], g[1]);
						return f;
					}
					if (c === Set) {
						g = new Set(b);
						for (f of a.values()) g.add(f);
						return g;
					}
				}
			}
			return a;
		}
		return b;
	}
	return d === "undefined" ? c : a;
}
function aa(a, c) {
	return typeof a === "undefined" ? c : a;
}
function I() {
	return Object.create(null);
}
function M(a) {
	return typeof a === "string";
}
function ba(a) {
	return typeof a === "object";
}
function ca(a, c) {
	if (M(c)) a = a[c];
	else for (let b = 0; a && b < c.length; b++) a = a[c[b]];
	return a;
}
const ea = /[^\p{L}\p{N}]+/u, fa = /(\d{3})/g, ha = /(\D)(\d{3})/g, ia = /(\d{3})(\D)/g, ja = /[\u0300-\u036f]/g;
function ka(a = {}) {
	if (!this || this.constructor !== ka) return new ka(...arguments);
	if (arguments.length) for (a = 0; a < arguments.length; a++) this.assign(arguments[a]);
	else this.assign(a);
}
w = ka.prototype;
w.assign = function(a) {
	this.normalize = H(a.normalize, !0, this.normalize);
	let c = a.include, b = c || a.exclude || a.split, e;
	if (b || b === "") {
		if (typeof b === "object" && b.constructor !== RegExp) {
			let d = "";
			e = !c;
			c || (d += "\\p{Z}");
			b.letter && (d += "\\p{L}");
			b.number && (d += "\\p{N}", e = !!c);
			b.symbol && (d += "\\p{S}");
			b.punctuation && (d += "\\p{P}");
			b.control && (d += "\\p{C}");
			if (b = b.char) d += typeof b === "object" ? b.join("") : b;
			try {
				this.split = new RegExp("[" + (c ? "^" : "") + d + "]+", "u");
			} catch (f) {
				this.split = /\s+/;
			}
		} else this.split = b, e = b === !1 || "a1a".split(b).length < 2;
		this.numeric = H(a.numeric, e);
	} else {
		try {
			this.split = H(this.split, ea);
		} catch (d) {
			this.split = /\s+/;
		}
		this.numeric = H(a.numeric, H(this.numeric, !0));
	}
	this.prepare = H(a.prepare, null, this.prepare);
	this.finalize = H(a.finalize, null, this.finalize);
	b = a.filter;
	this.filter = typeof b === "function" ? b : H(b && new Set(b), null, this.filter);
	this.dedupe = H(a.dedupe, !0, this.dedupe);
	this.matcher = H((b = a.matcher) && new Map(b), null, this.matcher);
	this.mapper = H((b = a.mapper) && new Map(b), null, this.mapper);
	this.stemmer = H((b = a.stemmer) && new Map(b), null, this.stemmer);
	this.replacer = H(a.replacer, null, this.replacer);
	this.minlength = H(a.minlength, 1, this.minlength);
	this.maxlength = H(a.maxlength, 1024, this.maxlength);
	this.rtl = H(a.rtl, !1, this.rtl);
	if (this.cache = b = H(a.cache, !0, this.cache)) this.F = null, this.L = typeof b === "number" ? b : 2e5, this.B = /* @__PURE__ */ new Map(), this.D = /* @__PURE__ */ new Map(), this.I = this.H = 128;
	this.h = "";
	this.J = null;
	this.A = "";
	this.K = null;
	if (this.matcher) for (const d of this.matcher.keys()) this.h += (this.h ? "|" : "") + d;
	if (this.stemmer) for (const d of this.stemmer.keys()) this.A += (this.A ? "|" : "") + d;
	return this;
};
w.addStemmer = function(a, c) {
	this.stemmer || (this.stemmer = /* @__PURE__ */ new Map());
	this.stemmer.set(a, c);
	this.A += (this.A ? "|" : "") + a;
	this.K = null;
	this.cache && Q(this);
	return this;
};
w.addFilter = function(a) {
	typeof a === "function" ? this.filter = a : (this.filter || (this.filter = /* @__PURE__ */ new Set()), this.filter.add(a));
	this.cache && Q(this);
	return this;
};
w.addMapper = function(a, c) {
	if (typeof a === "object") return this.addReplacer(a, c);
	if (a.length > 1) return this.addMatcher(a, c);
	this.mapper || (this.mapper = /* @__PURE__ */ new Map());
	this.mapper.set(a, c);
	this.cache && Q(this);
	return this;
};
w.addMatcher = function(a, c) {
	if (typeof a === "object") return this.addReplacer(a, c);
	if (a.length < 2 && (this.dedupe || this.mapper)) return this.addMapper(a, c);
	this.matcher || (this.matcher = /* @__PURE__ */ new Map());
	this.matcher.set(a, c);
	this.h += (this.h ? "|" : "") + a;
	this.J = null;
	this.cache && Q(this);
	return this;
};
w.addReplacer = function(a, c) {
	if (typeof a === "string") return this.addMatcher(a, c);
	this.replacer || (this.replacer = []);
	this.replacer.push(a, c);
	this.cache && Q(this);
	return this;
};
w.encode = function(a, c) {
	if (this.cache && a.length <= this.H) if (this.F) {
		if (this.B.has(a)) return this.B.get(a);
	} else this.F = setTimeout(Q, 50, this);
	this.normalize && (typeof this.normalize === "function" ? a = this.normalize(a) : a = ja ? a.normalize("NFKD").replace(ja, "").toLowerCase() : a.toLowerCase());
	this.prepare && (a = this.prepare(a));
	this.numeric && a.length > 3 && (a = a.replace(ha, "$1 $2").replace(ia, "$1 $2").replace(fa, "$1 "));
	const b = !(this.dedupe || this.mapper || this.filter || this.matcher || this.stemmer || this.replacer);
	let e = [], d = I(), f, g, k = this.split || this.split === "" ? a.split(this.split) : [a];
	for (let l = 0, m, p; l < k.length; l++) if ((m = p = k[l]) && !(m.length < this.minlength || m.length > this.maxlength)) {
		if (c) {
			if (d[m]) continue;
			d[m] = 1;
		} else {
			if (f === m) continue;
			f = m;
		}
		if (b) e.push(m);
		else if (!this.filter || (typeof this.filter === "function" ? this.filter(m) : !this.filter.has(m))) {
			if (this.cache && m.length <= this.I) if (this.F) {
				var h = this.D.get(m);
				if (h || h === "") {
					h && e.push(h);
					continue;
				}
			} else this.F = setTimeout(Q, 50, this);
			if (this.stemmer) {
				this.K || (this.K = new RegExp("(?!^)(" + this.A + ")$"));
				let u;
				for (; u !== m && m.length > 2;) u = m, m = m.replace(this.K, (r) => this.stemmer.get(r));
			}
			if (m && (this.mapper || this.dedupe && m.length > 1)) {
				h = "";
				for (let u = 0, r = "", t, n; u < m.length; u++) t = m.charAt(u), t === r && this.dedupe || ((n = this.mapper && this.mapper.get(t)) || n === "" ? n === r && this.dedupe || !(r = n) || (h += n) : h += r = t);
				m = h;
			}
			this.matcher && m.length > 1 && (this.J || (this.J = new RegExp("(" + this.h + ")", "g")), m = m.replace(this.J, (u) => this.matcher.get(u)));
			if (m && this.replacer) for (h = 0; m && h < this.replacer.length; h += 2) m = m.replace(this.replacer[h], this.replacer[h + 1]);
			this.cache && p.length <= this.I && (this.D.set(p, m), this.D.size > this.L && (this.D.clear(), this.I = this.I / 1.1 | 0));
			if (m) {
				if (m !== p) if (c) {
					if (d[m]) continue;
					d[m] = 1;
				} else {
					if (g === m) continue;
					g = m;
				}
				e.push(m);
			}
		}
	}
	this.finalize && (e = this.finalize(e) || e);
	this.cache && a.length <= this.H && (this.B.set(a, e), this.B.size > this.L && (this.B.clear(), this.H = this.H / 1.1 | 0));
	return e;
};
function Q(a) {
	a.F = null;
	a.B.clear();
	a.D.clear();
}
function la(a, c, b) {
	b || (c || typeof a !== "object" ? typeof c === "object" && (b = c, c = 0) : b = a);
	b && (a = b.query || a, c = b.limit || c);
	let e = "" + (c || 0);
	b && (e += (b.offset || 0) + !!b.context + !!b.suggest + (b.resolve !== !1) + (b.resolution || this.resolution) + (b.boost || 0));
	a = ("" + a).toLowerCase();
	this.cache || (this.cache = new ma());
	let d = this.cache.get(a + e);
	if (!d) {
		const f = b && b.cache;
		f && (b.cache = !1);
		d = this.search(a, c, b);
		f && (b.cache = f);
		this.cache.set(a + e, d);
	}
	return d;
}
function ma(a) {
	this.limit = a && a !== !0 ? a : 1e3;
	this.cache = /* @__PURE__ */ new Map();
	this.h = "";
}
ma.prototype.set = function(a, c) {
	this.cache.set(this.h = a, c);
	this.cache.size > this.limit && this.cache.delete(this.cache.keys().next().value);
};
ma.prototype.get = function(a) {
	const c = this.cache.get(a);
	c && this.h !== a && (this.cache.delete(a), this.cache.set(this.h = a, c));
	return c;
};
ma.prototype.remove = function(a) {
	for (const c of this.cache) {
		const b = c[0];
		c[1].includes(a) && this.cache.delete(b);
	}
};
ma.prototype.clear = function() {
	this.cache.clear();
	this.h = "";
};
const na = {
	normalize: !1,
	numeric: !1,
	dedupe: !1
};
const oa = {};
const ra = new Map([
	["b", "p"],
	["v", "f"],
	["w", "f"],
	["z", "s"],
	["x", "s"],
	["d", "t"],
	["n", "m"],
	["c", "k"],
	["g", "k"],
	["j", "k"],
	["q", "k"],
	["i", "e"],
	["y", "e"],
	["u", "o"]
]);
const sa = new Map([
	["ae", "a"],
	["oe", "o"],
	["sh", "s"],
	["kh", "k"],
	["th", "t"],
	["ph", "f"],
	["pf", "f"]
]), ta = [
	/([^aeo])h(.)/g,
	"$1$2",
	/([aeo])h([^aeo]|$)/g,
	"$1$2",
	/(.)\1+/g,
	"$1"
];
const ua = {
	a: "",
	e: "",
	i: "",
	o: "",
	u: "",
	y: "",
	b: 1,
	f: 1,
	p: 1,
	v: 1,
	c: 2,
	g: 2,
	j: 2,
	k: 2,
	q: 2,
	s: 2,
	x: 2,
	z: 2,
	"ß": 2,
	d: 3,
	t: 3,
	l: 4,
	m: 5,
	n: 5,
	r: 6
};
var va = {
	Exact: na,
	Default: oa,
	Normalize: oa,
	LatinBalance: { mapper: ra },
	LatinAdvanced: {
		mapper: ra,
		matcher: sa,
		replacer: ta
	},
	LatinExtra: {
		mapper: ra,
		replacer: ta.concat([/(?!^)[aeo]/g, ""]),
		matcher: sa
	},
	LatinSoundex: {
		dedupe: !1,
		include: { letter: !0 },
		finalize: function(a) {
			for (let b = 0; b < a.length; b++) {
				var c = a[b];
				let e = c.charAt(0), d = ua[e];
				for (let f = 1, g; f < c.length && (g = c.charAt(f), g === "h" || g === "w" || !(g = ua[g]) || g === d || (e += g, d = g, e.length !== 4)); f++);
				a[b] = e;
			}
		}
	},
	CJK: { split: "" },
	LatinExact: na,
	LatinDefault: oa,
	LatinSimple: oa
};
function wa(a, c, b, e) {
	let d = [];
	for (let f = 0, g; f < a.index.length; f++) if (g = a.index[f], c >= g.length) c -= g.length;
	else {
		c = g[e ? "splice" : "slice"](c, b);
		const k = c.length;
		if (k && (d = d.length ? d.concat(c) : c, b -= k, e && (a.length -= k), !b)) break;
		c = 0;
	}
	return d;
}
function xa(a) {
	if (!this || this.constructor !== xa) return new xa(a);
	this.index = a ? [a] : [];
	this.length = a ? a.length : 0;
	const c = this;
	return new Proxy([], {
		get(b, e) {
			if (e === "length") return c.length;
			if (e === "push") return function(d) {
				c.index[c.index.length - 1].push(d);
				c.length++;
			};
			if (e === "pop") return function() {
				if (c.length) return c.length--, c.index[c.index.length - 1].pop();
			};
			if (e === "indexOf") return function(d) {
				let f = 0;
				for (let g = 0, k, h; g < c.index.length; g++) {
					k = c.index[g];
					h = k.indexOf(d);
					if (h >= 0) return f + h;
					f += k.length;
				}
				return -1;
			};
			if (e === "includes") return function(d) {
				for (let f = 0; f < c.index.length; f++) if (c.index[f].includes(d)) return !0;
				return !1;
			};
			if (e === "slice") return function(d, f) {
				return wa(c, d || 0, f || c.length, !1);
			};
			if (e === "splice") return function(d, f) {
				return wa(c, d || 0, f || c.length, !0);
			};
			if (e === "constructor") return Array;
			if (typeof e !== "symbol") return (b = c.index[e / 2 ** 31 | 0]) && b[e];
		},
		set(b, e, d) {
			b = e / 2 ** 31 | 0;
			(c.index[b] || (c.index[b] = []))[e] = d;
			c.length++;
			return !0;
		}
	});
}
xa.prototype.clear = function() {
	this.index.length = 0;
};
xa.prototype.push = function() {};
function R(a = 8) {
	if (!this || this.constructor !== R) return new R(a);
	this.index = I();
	this.h = [];
	this.size = 0;
	a > 32 ? (this.B = Aa, this.A = BigInt(a)) : (this.B = Ba, this.A = a);
}
R.prototype.get = function(a) {
	const c = this.index[this.B(a)];
	return c && c.get(a);
};
R.prototype.set = function(a, c) {
	var b = this.B(a);
	let e = this.index[b];
	e ? (b = e.size, e.set(a, c), (b -= e.size) && this.size++) : (this.index[b] = e = new Map([[a, c]]), this.h.push(e), this.size++);
};
function S(a = 8) {
	if (!this || this.constructor !== S) return new S(a);
	this.index = I();
	this.h = [];
	this.size = 0;
	a > 32 ? (this.B = Aa, this.A = BigInt(a)) : (this.B = Ba, this.A = a);
}
S.prototype.add = function(a) {
	var c = this.B(a);
	let b = this.index[c];
	b ? (c = b.size, b.add(a), (c -= b.size) && this.size++) : (this.index[c] = b = new Set([a]), this.h.push(b), this.size++);
};
w = R.prototype;
w.has = S.prototype.has = function(a) {
	const c = this.index[this.B(a)];
	return c && c.has(a);
};
w.delete = S.prototype.delete = function(a) {
	const c = this.index[this.B(a)];
	c && c.delete(a) && this.size--;
};
w.clear = S.prototype.clear = function() {
	this.index = I();
	this.h = [];
	this.size = 0;
};
w.values = S.prototype.values = function* () {
	for (let a = 0; a < this.h.length; a++) for (let c of this.h[a].values()) yield c;
};
w.keys = S.prototype.keys = function* () {
	for (let a = 0; a < this.h.length; a++) for (let c of this.h[a].keys()) yield c;
};
w.entries = S.prototype.entries = function* () {
	for (let a = 0; a < this.h.length; a++) for (let c of this.h[a].entries()) yield c;
};
function Ba(a) {
	let c = 2 ** this.A - 1;
	if (typeof a == "number") return a & c;
	let b = 0, e = this.A + 1;
	for (let d = 0; d < a.length; d++) b = (b * e ^ a.charCodeAt(d)) & c;
	return this.A === 32 ? b + 2 ** 31 : b;
}
function Aa(a) {
	let c = BigInt(2) ** this.A - BigInt(1);
	var b = typeof a;
	if (b === "bigint") return a & c;
	if (b === "number") return BigInt(a) & c;
	b = BigInt(0);
	let e = this.A + BigInt(1);
	for (let d = 0; d < a.length; d++) b = (b * e ^ BigInt(a.charCodeAt(d))) & c;
	return b;
}
let Ca, Da;
async function Ea(a) {
	a = a.data;
	var c = a.task;
	const b = a.id;
	let e = a.args;
	switch (c) {
		case "init":
			Da = a.options || {};
			(c = a.factory) ? (Function("return " + c)()(self), Ca = new self.FlexSearch.Index(Da), delete self.FlexSearch) : Ca = new T(Da);
			postMessage({ id: b });
			break;
		default:
			let d;
			c === "export" && (e[1] ? (e[0] = Da.export, e[2] = 0, e[3] = 1) : e = null);
			c === "import" ? e[0] && (a = await Da.import.call(Ca, e[0]), Ca.import(e[0], a)) : ((d = e && Ca[c].apply(Ca, e)) && d.then && (d = await d), d && d.await && (d = await d.await), c === "search" && d.result && (d = d.result));
			postMessage(c === "search" ? {
				id: b,
				msg: d
			} : { id: b });
	}
}
function Fa(a) {
	Ga.call(a, "add");
	Ga.call(a, "append");
	Ga.call(a, "search");
	Ga.call(a, "update");
	Ga.call(a, "remove");
	Ga.call(a, "searchCache");
}
let Ha, Ia, Ja;
function Ka() {
	Ha = Ja = 0;
}
function Ga(a) {
	this[a + "Async"] = function() {
		const c = arguments;
		var b = c[c.length - 1];
		let e;
		typeof b === "function" && (e = b, delete c[c.length - 1]);
		Ha ? Ja || (Ja = Date.now() - Ia >= this.priority * this.priority * 3) : (Ha = setTimeout(Ka, 0), Ia = Date.now());
		if (Ja) {
			const f = this;
			return new Promise((g) => {
				setTimeout(function() {
					g(f[a + "Async"].apply(f, c));
				}, 0);
			});
		}
		const d = this[a].apply(this, c);
		b = d.then ? d : new Promise((f) => f(d));
		e && b.then(e);
		return b;
	};
}
let V = 0;
function La(a = {}, c) {
	function b(k) {
		function h(l) {
			l = l.data || l;
			const m = l.id, p = m && f.h[m];
			p && (p(l.msg), delete f.h[m]);
		}
		this.worker = k;
		this.h = I();
		if (this.worker) {
			d ? this.worker.on("message", h) : this.worker.onmessage = h;
			if (a.config) return new Promise(function(l) {
				V > 1e9 && (V = 0);
				f.h[++V] = function() {
					l(f);
				};
				f.worker.postMessage({
					id: V,
					task: "init",
					factory: e,
					options: a
				});
			});
			this.priority = a.priority || 4;
			this.encoder = c || null;
			this.worker.postMessage({
				task: "init",
				factory: e,
				options: a
			});
			return this;
		}
	}
	if (!this || this.constructor !== La) return new La(a);
	let e = typeof self !== "undefined" ? self._factory : typeof window !== "undefined" ? window._factory : null;
	e && (e = e.toString());
	const d = typeof window === "undefined", f = this, g = Ma(e, d, a.worker);
	return g.then ? g.then(function(k) {
		return b.call(f, k);
	}) : b.call(this, g);
}
W("add");
W("append");
W("search");
W("update");
W("remove");
W("clear");
W("export");
W("import");
La.prototype.searchCache = la;
Fa(La.prototype);
function W(a) {
	La.prototype[a] = function() {
		const c = this, b = [].slice.call(arguments);
		var e = b[b.length - 1];
		let d;
		typeof e === "function" && (d = e, b.pop());
		e = new Promise(function(f) {
			a === "export" && typeof b[0] === "function" && (b[0] = null);
			V > 1e9 && (V = 0);
			c.h[++V] = f;
			c.worker.postMessage({
				task: a,
				id: V,
				args: b
			});
		});
		return d ? (e.then(d), this) : e;
	};
}
function Ma(a, c, b) {
	return c ? typeof module !== "undefined" ? new (require_dist())["Worker"](__dirname + "/worker/node.js") : Promise.resolve().then(() => /* @__PURE__ */ __toESM(require_dist(), 1)).then(function(worker) {
		return new worker["Worker"](import.meta.dirname + "/node/node.mjs");
	}) : a ? new window.Worker(URL.createObjectURL(new Blob(["onmessage=" + Ea.toString()], { type: "text/javascript" }))) : new window.Worker(typeof b === "string" ? b : import.meta.url.replace("/worker.js", "/worker/worker.js").replace("flexsearch.bundle.module.min.js", "module/worker/worker.js").replace("flexsearch.bundle.module.min.mjs", "module/worker/worker.js"), { type: "module" });
}
Na.prototype.add = function(a, c, b) {
	ba(a) && (c = a, a = ca(c, this.key));
	if (c && (a || a === 0)) {
		if (!b && this.reg.has(a)) return this.update(a, c);
		for (let k = 0, h; k < this.field.length; k++) {
			h = this.B[k];
			var e = this.index.get(this.field[k]);
			if (typeof h === "function") {
				var d = h(c);
				d && e.add(a, d, b, !0);
			} else if (d = h.G, !d || d(c)) h.constructor === String ? h = ["" + h] : M(h) && (h = [h]), Qa(c, h, this.D, 0, e, a, h[0], b);
		}
		if (this.tag) for (e = 0; e < this.A.length; e++) {
			var f = this.A[e];
			d = this.tag.get(this.F[e]);
			let k = I();
			if (typeof f === "function") {
				if (f = f(c), !f) continue;
			} else {
				var g = f.G;
				if (g && !g(c)) continue;
				f.constructor === String && (f = "" + f);
				f = ca(c, f);
			}
			if (d && f) {
				M(f) && (f = [f]);
				for (let h = 0, l, m; h < f.length; h++) if (l = f[h], !k[l] && (k[l] = 1, (g = d.get(l)) ? m = g : d.set(l, m = []), !b || !m.includes(a))) {
					if (m.length === 2 ** 31 - 1) {
						g = new xa(m);
						if (this.fastupdate) for (let p of this.reg.values()) p.includes(m) && (p[p.indexOf(m)] = g);
						d.set(l, m = g);
					}
					m.push(a);
					this.fastupdate && ((g = this.reg.get(a)) ? g.push(m) : this.reg.set(a, [m]));
				}
			}
		}
		if (this.store && (!b || !this.store.has(a))) {
			let k;
			if (this.h) {
				k = I();
				for (let h = 0, l; h < this.h.length; h++) {
					l = this.h[h];
					if ((b = l.G) && !b(c)) continue;
					let m;
					if (typeof l === "function") {
						m = l(c);
						if (!m) continue;
						l = [l.O];
					} else if (M(l) || l.constructor === String) {
						k[l] = c[l];
						continue;
					}
					Ra(c, k, l, 0, l[0], m);
				}
			}
			this.store.set(a, k || c);
		}
		this.worker && (this.fastupdate || this.reg.add(a));
	}
	return this;
};
function Ra(a, c, b, e, d, f) {
	a = a[d];
	if (e === b.length - 1) c[d] = f || a;
	else if (a) if (a.constructor === Array) for (c = c[d] = Array(a.length), d = 0; d < a.length; d++) Ra(a, c, b, e, d);
	else c = c[d] || (c[d] = I()), d = b[++e], Ra(a, c, b, e, d);
}
function Qa(a, c, b, e, d, f, g, k) {
	if (a = a[g]) if (e === c.length - 1) {
		if (a.constructor === Array) {
			if (b[e]) {
				for (c = 0; c < a.length; c++) d.add(f, a[c], !0, !0);
				return;
			}
			a = a.join(" ");
		}
		d.add(f, a, k, !0);
	} else if (a.constructor === Array) for (g = 0; g < a.length; g++) Qa(a, c, b, e, d, f, g, k);
	else g = c[++e], Qa(a, c, b, e, d, f, g, k);
}
function Sa(a, c, b, e) {
	if (!a.length) return a;
	if (a.length === 1) return a = a[0], a = b || a.length > c ? a.slice(b, b + c) : a, e ? Ta.call(this, a) : a;
	let d = [];
	for (let f = 0, g, k; f < a.length; f++) if ((g = a[f]) && (k = g.length)) {
		if (b) {
			if (b >= k) {
				b -= k;
				continue;
			}
			g = g.slice(b, b + c);
			k = g.length;
			b = 0;
		}
		k > c && (g = g.slice(0, c), k = c);
		if (!d.length && k >= c) return e ? Ta.call(this, g) : g;
		d.push(g);
		c -= k;
		if (!c) break;
	}
	d = d.length > 1 ? [].concat.apply([], d) : d[0];
	return e ? Ta.call(this, d) : d;
}
function Ua(a, c, b, e) {
	var d = e[0];
	if (d[0] && d[0].query) return a[c].apply(a, d);
	if (!(c !== "and" && c !== "not" || a.result.length || a.await || d.suggest)) return e.length > 1 && (d = e[e.length - 1]), (e = d.resolve) ? a.await || a.result : a;
	let f = [], g = 0, k = 0, h, l, m, p, u;
	for (c = 0; c < e.length; c++) if (d = e[c]) {
		var r = void 0;
		if (d.constructor === X) r = d.await || d.result;
		else if (d.then || d.constructor === Array) r = d;
		else {
			g = d.limit || 0;
			k = d.offset || 0;
			m = d.suggest;
			l = d.resolve;
			h = ((p = d.highlight || a.highlight) || d.enrich) && l;
			r = d.queue;
			let t = d.async || r, n = d.index, q = d.query;
			n ? a.index || (a.index = n) : n = a.index;
			if (q || d.tag) {
				const x = d.field || d.pluck;
				x && (!q || a.query && !p || (a.query = q, a.field = x, a.highlight = p), n = n.index.get(x));
				if (r && (u || a.await)) {
					u = 1;
					let v;
					const A = a.C.length, D = new Promise(function(F) {
						v = F;
					});
					(function(F, E) {
						D.h = function() {
							E.index = null;
							E.resolve = !1;
							let B = t ? F.searchAsync(E) : F.search(E);
							if (B.then) return B.then(function(z) {
								a.C[A] = z = z.result || z;
								v(z);
								return z;
							});
							B = B.result || B;
							v(B);
							return B;
						};
					})(n, Object.assign({}, d));
					a.C.push(D);
					f[c] = D;
					continue;
				} else d.resolve = !1, d.index = null, r = t ? n.searchAsync(d) : n.search(d), d.resolve = l, d.index = n;
			} else if (d.and) r = Va(d, "and", n);
			else if (d.or) r = Va(d, "or", n);
			else if (d.not) r = Va(d, "not", n);
			else if (d.xor) r = Va(d, "xor", n);
			else continue;
		}
		r.await ? (u = 1, r = r.await) : r.then ? (u = 1, r = r.then(function(t) {
			return t.result || t;
		})) : r = r.result || r;
		f[c] = r;
	}
	u && !a.await && (a.await = new Promise(function(t) {
		a.return = t;
	}));
	if (u) {
		const t = Promise.all(f).then(function(n) {
			for (let q = 0; q < a.C.length; q++) if (a.C[q] === t) {
				a.C[q] = function() {
					return b.call(a, n, g, k, h, l, m, p);
				};
				break;
			}
			Wa(a);
		});
		a.C.push(t);
	} else if (a.await) a.C.push(function() {
		return b.call(a, f, g, k, h, l, m, p);
	});
	else return b.call(a, f, g, k, h, l, m, p);
	return l ? a.await || a.result : a;
}
function Va(a, c, b) {
	a = a[c];
	const e = a[0] || a;
	e.index || (e.index = b);
	b = new X(e);
	a.length > 1 && (b = b[c].apply(b, a.slice(1)));
	return b;
}
X.prototype.or = function() {
	return Ua(this, "or", Xa, arguments);
};
function Xa(a, c, b, e, d, f, g) {
	a.length && (this.result.length && a.push(this.result), a.length < 2 ? this.result = a[0] : (this.result = Ya(a, c, b, !1, this.h), b = 0));
	d && (this.await = null);
	return d ? this.resolve(c, b, e, g) : this;
}
X.prototype.and = function() {
	return Ua(this, "and", Za, arguments);
};
function Za(a, c, b, e, d, f, g) {
	if (!f && !this.result.length) return d ? this.result : this;
	let k;
	if (a.length) if (this.result.length && a.unshift(this.result), a.length < 2) this.result = a[0];
	else {
		let h = 0;
		for (let l = 0, m, p; l < a.length; l++) if ((m = a[l]) && (p = m.length)) h < p && (h = p);
		else if (!f) {
			h = 0;
			break;
		}
		h ? (this.result = $a(a, h, c, b, f, this.h, d), k = !0) : this.result = [];
	}
	else f || (this.result = a);
	d && (this.await = null);
	return d ? this.resolve(c, b, e, g, k) : this;
}
X.prototype.xor = function() {
	return Ua(this, "xor", ab, arguments);
};
function ab(a, c, b, e, d, f, g) {
	if (a.length) if (this.result.length && a.unshift(this.result), a.length < 2) this.result = a[0];
	else {
		a: {
			f = b;
			var k = this.h;
			const h = [], l = I();
			let m = 0;
			for (let p = 0, u; p < a.length; p++) if (u = a[p]) {
				m < u.length && (m = u.length);
				for (let r = 0, t; r < u.length; r++) if (t = u[r]) for (let n = 0, q; n < t.length; n++) q = t[n], l[q] = l[q] ? 2 : 1;
			}
			for (let p = 0, u, r = 0; p < m; p++) for (let t = 0, n; t < a.length; t++) if (n = a[t]) {
				if (u = n[p]) {
					for (let q = 0, x; q < u.length; q++) if (x = u[q], l[x] === 1) if (f) f--;
					else if (d) {
						if (h.push(x), h.length === c) {
							a = h;
							break a;
						}
					} else {
						const v = p + (t ? k : 0);
						h[v] || (h[v] = []);
						h[v].push(x);
						if (++r === c) {
							a = h;
							break a;
						}
					}
				}
			}
			a = h;
		}
		this.result = a;
		k = !0;
	}
	else f || (this.result = a);
	d && (this.await = null);
	return d ? this.resolve(c, b, e, g, k) : this;
}
X.prototype.not = function() {
	return Ua(this, "not", bb, arguments);
};
function bb(a, c, b, e, d, f, g) {
	if (!f && !this.result.length) return d ? this.result : this;
	if (a.length && this.result.length) {
		a: {
			f = b;
			var k = [];
			a = new Set(a.flat().flat());
			for (let h = 0, l, m = 0; h < this.result.length; h++) if (l = this.result[h]) {
				for (let p = 0, u; p < l.length; p++) if (u = l[p], !a.has(u)) {
					if (f) f--;
					else if (d) {
						if (k.push(u), k.length === c) {
							a = k;
							break a;
						}
					} else if (k[h] || (k[h] = []), k[h].push(u), ++m === c) {
						a = k;
						break a;
					}
				}
			}
			a = k;
		}
		this.result = a;
		k = !0;
	}
	d && (this.await = null);
	return d ? this.resolve(c, b, e, g, k) : this;
}
function cb(a, c, b, e, d) {
	let f, g, k;
	typeof d === "string" ? (f = d, d = "") : f = d.template;
	g = f.indexOf("$1");
	k = f.substring(g + 2);
	g = f.substring(0, g);
	let h = d && d.boundary, l = !d || d.clip !== !1, m = d && d.merge && k && g && new RegExp(k + " " + g, "g");
	d = d && d.ellipsis;
	var p = 0;
	if (typeof d === "object") {
		var u = d.template;
		p = u.length - 2;
		d = d.pattern;
	}
	typeof d !== "string" && (d = d === !1 ? "" : "...");
	p && (d = u.replace("$1", d));
	u = d.length - p;
	let r, t;
	typeof h === "object" && (r = h.before, r === 0 && (r = -1), t = h.after, t === 0 && (t = -1), h = h.total || 9e5);
	p = /* @__PURE__ */ new Map();
	for (let Oa = 0, da, db, pa; Oa < c.length; Oa++) {
		let qa;
		if (e) qa = c, pa = e;
		else {
			var n = c[Oa];
			pa = n.field;
			if (!pa) continue;
			qa = n.result;
		}
		db = b.get(pa);
		da = db.encoder;
		n = p.get(da);
		typeof n !== "string" && (n = da.encode(a), p.set(da, n));
		for (let ya = 0; ya < qa.length; ya++) {
			var q = qa[ya].doc;
			if (!q) continue;
			q = ca(q, pa);
			if (!q) continue;
			var x = q.trim().split(/\s+/);
			if (!x.length) continue;
			q = "";
			var v = [];
			let za = [];
			var A = -1, D = -1, F = 0;
			for (var E = 0; E < x.length; E++) {
				var B = x[E], z = da.encode(B);
				z = z.length > 1 ? z.join(" ") : z[0];
				let y;
				if (z && B) {
					var C = B.length, J = (da.split ? B.replace(da.split, "") : B).length - z.length, G = "", N = 0;
					for (var O = 0; O < n.length; O++) {
						var P = n[O];
						if (P) {
							var L = P.length;
							L += J < 0 ? 0 : J;
							N && L <= N || (P = z.indexOf(P), P > -1 && (G = (P ? B.substring(0, P) : "") + g + B.substring(P, P + L) + k + (P + L < C ? B.substring(P + L) : ""), N = L, y = !0));
						}
					}
					G && (h && (A < 0 && (A = q.length + (q ? 1 : 0)), D = q.length + (q ? 1 : 0) + G.length, F += C, za.push(v.length), v.push({ match: G })), q += (q ? " " : "") + G);
				}
				if (!y) B = x[E], q += (q ? " " : "") + B, h && v.push({ text: B });
				else if (h && F >= h) break;
			}
			F = za.length * (f.length - 2);
			if (r || t || h && q.length - F > h) if (F = h + F - u * 2, E = D - A, r > 0 && (E += r), t > 0 && (E += t), E <= F) x = r ? A - (r > 0 ? r : 0) : A - ((F - E) / 2 | 0), v = t ? D + (t > 0 ? t : 0) : x + F, l || (x > 0 && q.charAt(x) !== " " && q.charAt(x - 1) !== " " && (x = q.indexOf(" ", x), x < 0 && (x = 0)), v < q.length && q.charAt(v - 1) !== " " && q.charAt(v) !== " " && (v = q.lastIndexOf(" ", v), v < D ? v = D : ++v)), q = (x ? d : "") + q.substring(x, v) + (v < q.length ? d : "");
			else {
				D = [];
				A = {};
				F = {};
				E = {};
				B = {};
				z = {};
				G = J = C = 0;
				for (O = N = 1;;) {
					var U = void 0;
					for (let y = 0, K; y < za.length; y++) {
						K = za[y];
						if (G) if (J !== G) {
							if (E[y + 1]) continue;
							K += G;
							if (A[K]) {
								C -= u;
								F[y + 1] = 1;
								E[y + 1] = 1;
								continue;
							}
							if (K >= v.length - 1) {
								if (K >= v.length) {
									E[y + 1] = 1;
									K >= x.length && (F[y + 1] = 1);
									continue;
								}
								C -= u;
							}
							q = v[K].text;
							if (L = t && z[y]) if (L > 0) {
								if (q.length > L) if (E[y + 1] = 1, l) q = q.substring(0, L);
								else continue;
								(L -= q.length) || (L = -1);
								z[y] = L;
							} else {
								E[y + 1] = 1;
								continue;
							}
							if (C + q.length + 1 <= h) q = " " + q, D[y] += q;
							else if (l) U = h - C - 1, U > 0 && (q = " " + q.substring(0, U), D[y] += q), E[y + 1] = 1;
							else {
								E[y + 1] = 1;
								continue;
							}
						} else {
							if (E[y]) continue;
							K -= J;
							if (A[K]) {
								C -= u;
								E[y] = 1;
								F[y] = 1;
								continue;
							}
							if (K <= 0) {
								if (K < 0) {
									E[y] = 1;
									F[y] = 1;
									continue;
								}
								C -= u;
							}
							q = v[K].text;
							if (L = r && B[y]) if (L > 0) {
								if (q.length > L) if (E[y] = 1, l) q = q.substring(q.length - L);
								else continue;
								(L -= q.length) || (L = -1);
								B[y] = L;
							} else {
								E[y] = 1;
								continue;
							}
							if (C + q.length + 1 <= h) q += " ", D[y] = q + D[y];
							else if (l) U = q.length + 1 - (h - C), U >= 0 && U < q.length && (q = q.substring(U) + " ", D[y] = q + D[y]), E[y] = 1;
							else {
								E[y] = 1;
								continue;
							}
						}
						else {
							q = v[K].match;
							r && (B[y] = r);
							t && (z[y] = t);
							y && C++;
							let Pa;
							K ? !y && u && (C += u) : (F[y] = 1, E[y] = 1);
							K >= x.length - 1 ? Pa = 1 : K < v.length - 1 && v[K + 1].match ? Pa = 1 : u && (C += u);
							C -= f.length - 2;
							if (!y || C + q.length <= h) D[y] = q;
							else {
								U = N = O = F[y] = 0;
								break;
							}
							Pa && (F[y + 1] = 1, E[y + 1] = 1);
						}
						C += q.length;
						U = A[K] = 1;
					}
					if (U) J === G ? G++ : J++;
					else {
						J === G ? N = 0 : O = 0;
						if (!N && !O) break;
						N ? (J++, G = J) : G++;
					}
				}
				q = "";
				for (let y = 0, K; y < D.length; y++) K = (F[y] ? y ? " " : "" : (y && !d ? " " : "") + d) + D[y], q += K;
				d && !F[D.length] && (q += d);
			}
			m && (q = q.replace(m, " "));
			qa[ya].highlight = q;
		}
		if (e) break;
	}
	return c;
}
function X(a, c) {
	if (!this || this.constructor !== X) return new X(a, c);
	let b = 0, e, d, f, g, k, h;
	if (a && a.index) {
		const l = a;
		c = l.index;
		b = l.boost || 0;
		if (d = l.query) {
			f = l.field || l.pluck;
			g = l.highlight;
			const m = l.resolve;
			a = l.async || l.queue;
			l.resolve = !1;
			l.index = null;
			a = a ? c.searchAsync(l) : c.search(l);
			l.resolve = m;
			l.index = c;
			a = a.result || a;
		} else a = [];
	}
	if (a && a.then) {
		const l = this;
		a = a.then(function(m) {
			l.C[0] = l.result = m.result || m;
			Wa(l);
		});
		e = [a];
		a = [];
		k = new Promise(function(m) {
			h = m;
		});
	}
	this.index = c || null;
	this.result = a || [];
	this.h = b;
	this.C = e || [];
	this.await = k || null;
	this.return = h || null;
	this.highlight = g || null;
	this.query = d || "";
	this.field = f || "";
}
w = X.prototype;
w.limit = function(a) {
	if (this.await) {
		const c = this;
		this.C.push(function() {
			return c.limit(a).result;
		});
	} else if (this.result.length) {
		const c = [];
		for (let b = 0, e; b < this.result.length; b++) if (e = this.result[b]) if (e.length <= a) {
			if (c[b] = e, a -= e.length, !a) break;
		} else {
			c[b] = e.slice(0, a);
			break;
		}
		this.result = c;
	}
	return this;
};
w.offset = function(a) {
	if (this.await) {
		const c = this;
		this.C.push(function() {
			return c.offset(a).result;
		});
	} else if (this.result.length) {
		const c = [];
		for (let b = 0, e; b < this.result.length; b++) if (e = this.result[b]) e.length <= a ? a -= e.length : (c[b] = e.slice(a), a = 0);
		this.result = c;
	}
	return this;
};
w.boost = function(a) {
	if (this.await) {
		const c = this;
		this.C.push(function() {
			return c.boost(a).result;
		});
	} else this.h += a;
	return this;
};
function Wa(a, c) {
	let b = a.result;
	var e = a.await;
	a.await = null;
	for (let d = 0, f; d < a.C.length; d++) if (f = a.C[d]) {
		if (typeof f === "function") b = f(), a.C[d] = b = b.result || b, d--;
		else if (f.h) b = f.h(), a.C[d] = b = b.result || b, d--;
		else if (f.then) return a.await = e;
	}
	e = a.return;
	a.C = [];
	a.return = null;
	c || e(b);
	return b;
}
w.resolve = function(a, c, b, e, d) {
	let f = this.await ? Wa(this, !0) : this.result;
	if (f.then) {
		const g = this;
		return f.then(function() {
			return g.resolve(a, c, b, e, d);
		});
	}
	f.length && (typeof a === "object" ? (e = a.highlight || this.highlight, b = !!e || a.enrich, c = a.offset, a = a.limit) : (e = e || this.highlight, b = !!e || b), f = d ? b ? Ta.call(this.index, f) : f : Sa.call(this.index, f, a || 100, c, b));
	return this.finalize(f, e);
};
w.finalize = function(a, c) {
	if (a.then) {
		const e = this;
		return a.then(function(d) {
			return e.finalize(d, c);
		});
	}
	c && a.length && this.query && (a = cb(this.query, a, this.index.index, this.field, c));
	const b = this.return;
	this.highlight = this.index = this.result = this.C = this.await = this.return = null;
	this.query = this.field = "";
	b && b(a);
	return a;
};
function $a(a, c, b, e, d, f, g) {
	const k = a.length;
	let h = [], l, m;
	l = I();
	for (let p = 0, u, r, t, n; p < c; p++) for (let q = 0; q < k; q++) if (t = a[q], p < t.length && (u = t[p])) for (let x = 0; x < u.length; x++) {
		r = u[x];
		(m = l[r]) ? l[r]++ : (m = 0, l[r] = 1);
		n = h[m] || (h[m] = []);
		if (!g) {
			let v = p + (q || !d ? 0 : f || 0);
			n = n[v] || (n[v] = []);
		}
		n.push(r);
		if (g && b && m === k - 1 && n.length - e === b) return e ? n.slice(e) : n;
	}
	if (a = h.length) if (d) h = h.length > 1 ? Ya(h, b, e, g, f) : (h = h[0]) && b && h.length > b || e ? h.slice(e, b + e) : h;
	else {
		if (a < k) return [];
		h = h[a - 1];
		if (b || e) if (g) {
			if (h.length > b || e) h = h.slice(e, b + e);
		} else {
			d = [];
			for (let p = 0, u; p < h.length; p++) if (u = h[p]) if (e && u.length > e) e -= u.length;
			else {
				if (b && u.length > b || e) u = u.slice(e, b + e), b -= u.length, e && (e -= u.length);
				d.push(u);
				if (!b) break;
			}
			h = d;
		}
	}
	return h;
}
function Ya(a, c, b, e, d) {
	const f = [], g = I();
	let k;
	var h = a.length;
	let l;
	if (e) {
		for (d = h - 1; d >= 0; d--) if (l = (e = a[d]) && e.length) {
			for (h = 0; h < l; h++) if (k = e[h], !g[k]) {
				if (g[k] = 1, b) b--;
				else if (f.push(k), f.length === c) return f;
			}
		}
	} else for (let m = h - 1, p, u = 0; m >= 0; m--) {
		p = a[m];
		for (let r = 0; r < p.length; r++) if (l = (e = p[r]) && e.length) {
			for (let t = 0; t < l; t++) if (k = e[t], !g[k]) if (g[k] = 1, b) b--;
			else {
				let n = (r + (m < h - 1 ? d || 0 : 0)) / (m + 1) | 0;
				(f[n] || (f[n] = [])).push(k);
				if (++u === c) return f;
			}
		}
	}
	return f;
}
function eb(a, c, b, e, d) {
	const f = I(), g = [];
	for (let k = 0, h; k < c.length; k++) {
		h = c[k];
		for (let l = 0; l < h.length; l++) f[h[l]] = 1;
	}
	if (d) {
		for (let k = 0, h; k < a.length; k++) if (h = a[k], f[h]) {
			if (e) e--;
			else if (g.push(h), f[h] = 0, b && --b === 0) break;
		}
	} else for (let k = 0, h, l; k < a.result.length; k++) for (h = a.result[k], c = 0; c < h.length; c++) l = h[c], f[l] && ((g[k] || (g[k] = [])).push(l), f[l] = 0);
	return g;
}
Na.prototype.search = function(a, c, b, e) {
	b || (!c && ba(a) ? (b = a, a = "") : ba(c) && (b = c, c = 0));
	let d = [];
	var f = [];
	let g;
	let k, h, l, m, p;
	let u = 0, r = !0, t;
	if (b) {
		b.constructor === Array && (b = { index: b });
		a = b.query || a;
		g = b.pluck;
		k = b.merge;
		l = b.boost;
		p = g || b.field || (p = b.index) && (p.index ? null : p);
		var n = this.tag && b.tag;
		h = b.suggest;
		r = b.resolve !== !1;
		m = b.cache;
		t = r && this.store && b.highlight;
		var q = !!t || r && this.store && b.enrich;
		c = b.limit || c;
		var x = b.offset || 0;
		c || (c = r ? 100 : 0);
		if (n && (!this.db || !e)) {
			n.constructor !== Array && (n = [n]);
			var v = [];
			for (let B = 0, z; B < n.length; B++) if (z = n[B], z.field && z.tag) {
				var A = z.tag;
				if (A.constructor === Array) for (var D = 0; D < A.length; D++) v.push(z.field, A[D]);
				else v.push(z.field, A);
			} else {
				A = Object.keys(z);
				for (let C = 0, J, G; C < A.length; C++) if (J = A[C], G = z[J], G.constructor === Array) for (D = 0; D < G.length; D++) v.push(J, G[D]);
				else v.push(J, G);
			}
			n = v;
			if (!a) {
				f = [];
				if (v.length) for (n = 0; n < v.length; n += 2) {
					if (this.db) {
						e = this.index.get(v[n]);
						if (!e) continue;
						f.push(e = e.db.tag(v[n + 1], c, x, q));
					} else e = fb.call(this, v[n], v[n + 1], c, x, q);
					d.push(r ? {
						field: v[n],
						tag: v[n + 1],
						result: e
					} : [e]);
				}
				if (f.length) {
					const B = this;
					return Promise.all(f).then(function(z) {
						for (let C = 0; C < z.length; C++) r ? d[C].result = z[C] : d[C] = z[C];
						return r ? d : new X(d.length > 1 ? $a(d, 1, 0, 0, h, l) : d[0], B);
					});
				}
				return r ? d : new X(d.length > 1 ? $a(d, 1, 0, 0, h, l) : d[0], this);
			}
		}
		r || g || !(p = p || this.field) || (M(p) ? g = p : (p.constructor === Array && p.length === 1 && (p = p[0]), g = p.field || p.index));
		p && p.constructor !== Array && (p = [p]);
	}
	p || (p = this.field);
	let F;
	v = (this.worker || this.db) && !e && [];
	for (let B = 0, z, C, J; B < p.length; B++) {
		C = p[B];
		if (this.db && this.tag && !this.B[B]) continue;
		let G;
		M(C) || (G = C, C = G.field, a = G.query || a, c = aa(G.limit, c), x = aa(G.offset, x), h = aa(G.suggest, h), t = r && this.store && aa(G.highlight, t), q = !!t || r && this.store && aa(G.enrich, q), m = aa(G.cache, m));
		if (e) z = e[B];
		else {
			A = G || b || {};
			D = A.enrich;
			var E = this.index.get(C);
			n && (this.db && (A.tag = n, A.field = p, F = E.db.support_tag_search), !F && D && (A.enrich = !1), F || (A.limit = 0, A.offset = 0));
			z = m ? E.searchCache(a, n && !F ? 0 : c, A) : E.search(a, n && !F ? 0 : c, A);
			n && !F && (A.limit = c, A.offset = x);
			D && (A.enrich = D);
			if (v) {
				v[B] = z;
				continue;
			}
		}
		J = (z = z.result || z) && z.length;
		if (n && J) {
			A = [];
			D = 0;
			if (this.db && e) {
				if (!F) for (E = p.length; E < e.length; E++) {
					let N = e[E];
					if (N && N.length) D++, A.push(N);
					else if (!h) return r ? d : new X(d, this);
				}
			} else for (let N = 0, O, P; N < n.length; N += 2) {
				O = this.tag.get(n[N]);
				if (!O) if (h) continue;
				else return r ? d : new X(d, this);
				if ((O = O && O.get(n[N + 1])) && O.length) D++, A.push(O);
				else if (!h) return r ? d : new X(d, this);
			}
			if (D) {
				z = eb(z, A, c, x, r);
				J = z.length;
				if (!J && !h) return r ? z : new X(z, this);
				D--;
			}
		}
		if (J) f[u] = C, d.push(z), u++;
		else if (p.length === 1) return r ? d : new X(d, this);
	}
	if (v) {
		if (this.db && n && n.length && !F) for (q = 0; q < n.length; q += 2) {
			f = this.index.get(n[q]);
			if (!f) if (h) continue;
			else return r ? d : new X(d, this);
			v.push(f.db.tag(n[q + 1], c, x, !1));
		}
		const B = this;
		return Promise.all(v).then(function(z) {
			b && (b.resolve = r);
			z.length && (z = B.search(a, c, b, z));
			return z;
		});
	}
	if (!u) return r ? d : new X(d, this);
	if (g && (!q || !this.store)) return d = d[0], r ? d : new X(d, this);
	v = [];
	for (x = 0; x < f.length; x++) {
		n = d[x];
		q && n.length && typeof n[0].doc === "undefined" && (this.db ? v.push(n = this.index.get(this.field[0]).db.enrich(n)) : n = Ta.call(this, n));
		if (g) return r ? t ? cb(a, n, this.index, g, t) : n : new X(n, this);
		d[x] = {
			field: f[x],
			result: n
		};
	}
	if (q && this.db && v.length) {
		const B = this;
		return Promise.all(v).then(function(z) {
			for (let C = 0; C < z.length; C++) d[C].result = z[C];
			t && (d = cb(a, d, B.index, g, t));
			return k ? gb(d) : d;
		});
	}
	t && (d = cb(a, d, this.index, g, t));
	return k ? gb(d) : d;
};
function gb(a) {
	const c = [], b = I(), e = I();
	for (let d = 0, f, g, k, h, l, m, p; d < a.length; d++) {
		f = a[d];
		g = f.field;
		k = f.result;
		for (let u = 0; u < k.length; u++) if (l = k[u], typeof l !== "object" ? l = { id: h = l } : h = l.id, (m = b[h]) ? m.push(g) : (l.field = b[h] = [g], c.push(l)), p = l.highlight) m = e[h], m || (e[h] = m = {}, l.highlight = m), m[g] = p;
	}
	return c;
}
function fb(a, c, b, e, d) {
	a = this.tag.get(a);
	if (!a) return [];
	a = a.get(c);
	if (!a) return [];
	c = a.length - e;
	if (c > 0) {
		if (b && c > b || e) a = a.slice(e, e + b);
		d && (a = Ta.call(this, a));
	}
	return a;
}
function Ta(a) {
	if (!this || !this.store) return a;
	if (this.db) return this.index.get(this.field[0]).db.enrich(a);
	const c = Array(a.length);
	for (let b = 0, e; b < a.length; b++) e = a[b], c[b] = {
		id: e,
		doc: this.store.get(e)
	};
	return c;
}
function Na(a) {
	if (!this || this.constructor !== Na) return new Na(a);
	const c = a.document || a.doc || a;
	let b, e;
	this.B = [];
	this.field = [];
	this.D = [];
	this.key = (b = c.key || c.id) && hb(b, this.D) || "id";
	(e = a.keystore || 0) && (this.keystore = e);
	this.fastupdate = !!a.fastupdate;
	this.reg = !this.fastupdate || a.worker || a.db ? e ? new S(e) : /* @__PURE__ */ new Set() : e ? new R(e) : /* @__PURE__ */ new Map();
	this.h = (b = c.store || null) && b && b !== !0 && [];
	this.store = b ? e ? new R(e) : /* @__PURE__ */ new Map() : null;
	this.cache = (b = a.cache || null) && new ma(b);
	a.cache = !1;
	this.worker = a.worker || !1;
	this.priority = a.priority || 4;
	this.index = ib.call(this, a, c);
	this.tag = null;
	if (b = c.tag) {
		if (typeof b === "string" && (b = [b]), b.length) {
			this.tag = /* @__PURE__ */ new Map();
			this.A = [];
			this.F = [];
			for (let d = 0, f, g; d < b.length; d++) {
				f = b[d];
				g = f.field || f;
				if (!g) throw Error("The tag field from the document descriptor is undefined.");
				f.custom ? this.A[d] = f.custom : (this.A[d] = hb(g, this.D), f.filter && (typeof this.A[d] === "string" && (this.A[d] = new String(this.A[d])), this.A[d].G = f.filter));
				this.F[d] = g;
				this.tag.set(g, /* @__PURE__ */ new Map());
			}
		}
	}
	if (this.worker) {
		this.fastupdate = !1;
		a = [];
		for (const d of this.index.values()) d.then && a.push(d);
		if (a.length) {
			const d = this;
			return Promise.all(a).then(function(f) {
				let g = 0;
				for (const k of d.index.entries()) {
					const h = k[0];
					let l = k[1];
					l.then && (l = f[g], d.index.set(h, l), g++);
				}
				return d;
			});
		}
	} else a.db && (this.fastupdate = !1, this.mount(a.db));
}
w = Na.prototype;
w.mount = function(a) {
	let c = this.field;
	if (this.tag) for (let f = 0, g; f < this.F.length; f++) {
		g = this.F[f];
		var b = void 0;
		this.index.set(g, b = new T({}, this.reg));
		c === this.field && (c = c.slice(0));
		c.push(g);
		b.tag = this.tag.get(g);
	}
	b = [];
	const e = {
		db: a.db,
		type: a.type,
		fastupdate: a.fastupdate
	};
	for (let f = 0, g, k; f < c.length; f++) {
		e.field = k = c[f];
		g = this.index.get(k);
		const h = new a.constructor(a.id, e);
		h.id = a.id;
		b[f] = h.mount(g);
		g.document = !0;
		f ? g.bypass = !0 : g.store = this.store;
	}
	const d = this;
	return this.db = Promise.all(b).then(function() {
		d.db = !0;
	});
};
w.commit = async function() {
	const a = [];
	for (const c of this.index.values()) a.push(c.commit());
	await Promise.all(a);
	this.reg.clear();
};
w.destroy = function() {
	const a = [];
	for (const c of this.index.values()) a.push(c.destroy());
	return Promise.all(a);
};
function ib(a, c) {
	const b = /* @__PURE__ */ new Map();
	let e = c.index || c.field || c;
	M(e) && (e = [e]);
	for (let f = 0, g, k; f < e.length; f++) {
		g = e[f];
		M(g) || (k = g, g = g.field);
		k = ba(k) ? Object.assign({}, a, k) : a;
		if (this.worker) {
			var d = void 0;
			d = (d = k.encoder) && d.encode ? d : new ka(typeof d === "string" ? va[d] : d || {});
			d = new La(k, d);
			b.set(g, d);
		}
		this.worker || b.set(g, new T(k, this.reg));
		k.custom ? this.B[f] = k.custom : (this.B[f] = hb(g, this.D), k.filter && (typeof this.B[f] === "string" && (this.B[f] = new String(this.B[f])), this.B[f].G = k.filter));
		this.field[f] = g;
	}
	if (this.h) {
		a = c.store;
		M(a) && (a = [a]);
		for (let f = 0, g, k; f < a.length; f++) g = a[f], k = g.field || g, g.custom ? (this.h[f] = g.custom, g.custom.O = k) : (this.h[f] = hb(k, this.D), g.filter && (typeof this.h[f] === "string" && (this.h[f] = new String(this.h[f])), this.h[f].G = g.filter));
	}
	return b;
}
function hb(a, c) {
	const b = a.split(":");
	let e = 0;
	for (let d = 0; d < b.length; d++) a = b[d], a[a.length - 1] === "]" && (a = a.substring(0, a.length - 2)) && (c[e] = !0), a && (b[e++] = a);
	e < b.length && (b.length = e);
	return e > 1 ? b : b[0];
}
w.append = function(a, c) {
	return this.add(a, c, !0);
};
w.update = function(a, c) {
	return this.remove(a).add(a, c);
};
w.remove = function(a) {
	ba(a) && (a = ca(a, this.key));
	for (var c of this.index.values()) c.remove(a, !0);
	if (this.reg.has(a)) {
		if (this.tag && !this.fastupdate) for (let b of this.tag.values()) for (let e of b) {
			c = e[0];
			const d = e[1], f = d.indexOf(a);
			f > -1 && (d.length > 1 ? d.splice(f, 1) : b.delete(c));
		}
		this.store && this.store.delete(a);
		this.reg.delete(a);
	}
	this.cache && this.cache.remove(a);
	return this;
};
w.clear = function() {
	const a = [];
	for (const c of this.index.values()) {
		const b = c.clear();
		b.then && a.push(b);
	}
	if (this.tag) for (const c of this.tag.values()) c.clear();
	this.store && this.store.clear();
	this.cache && this.cache.clear();
	return a.length ? Promise.all(a) : this;
};
w.contain = function(a) {
	return this.db ? this.index.get(this.field[0]).db.has(a) : this.reg.has(a);
};
w.cleanup = function() {
	for (const a of this.index.values()) a.cleanup();
	return this;
};
w.get = function(a) {
	return this.db ? this.index.get(this.field[0]).db.enrich(a).then(function(c) {
		return c[0] && c[0].doc || null;
	}) : this.store.get(a) || null;
};
w.set = function(a, c) {
	typeof a === "object" && (c = a, a = ca(c, this.key));
	this.store.set(a, c);
	return this;
};
w.searchCache = la;
w.export = jb;
w.import = kb;
Fa(Na.prototype);
function lb(a, c = 0) {
	let b = [], e = [];
	c && (c = 25e4 / c * 5e3 | 0);
	for (const d of a.entries()) e.push(d), e.length === c && (b.push(e), e = []);
	e.length && b.push(e);
	return b;
}
function mb(a, c) {
	c || (c = /* @__PURE__ */ new Map());
	for (let b = 0, e; b < a.length; b++) e = a[b], c.set(e[0], e[1]);
	return c;
}
function nb(a, c = 0) {
	let b = [], e = [];
	c && (c = 25e4 / c * 1e3 | 0);
	for (const d of a.entries()) e.push([d[0], lb(d[1])[0] || []]), e.length === c && (b.push(e), e = []);
	e.length && b.push(e);
	return b;
}
function ob(a, c) {
	c || (c = /* @__PURE__ */ new Map());
	for (let b = 0, e, d; b < a.length; b++) e = a[b], d = c.get(e[0]), c.set(e[0], mb(e[1], d));
	return c;
}
function pb(a) {
	let c = [], b = [];
	for (const e of a.keys()) b.push(e), b.length === 25e4 && (c.push(b), b = []);
	b.length && c.push(b);
	return c;
}
function qb(a, c) {
	c || (c = /* @__PURE__ */ new Set());
	for (let b = 0; b < a.length; b++) c.add(a[b]);
	return c;
}
function rb(a, c, b, e, d, f, g = 0) {
	const k = e && e.constructor === Array;
	var h = k ? e.shift() : e;
	if (!h) return this.export(a, c, d, f + 1);
	if ((h = a((c ? c + "." : "") + (g + 1) + "." + b, JSON.stringify(h))) && h.then) {
		const l = this;
		return h.then(function() {
			return rb.call(l, a, c, b, k ? e : null, d, f, g + 1);
		});
	}
	return rb.call(this, a, c, b, k ? e : null, d, f, g + 1);
}
function jb(a, c, b = 0, e = 0) {
	if (b < this.field.length) {
		const g = this.field[b];
		if ((c = this.index.get(g).export(a, g, b, e = 1)) && c.then) {
			const k = this;
			return c.then(function() {
				return k.export(a, g, b + 1);
			});
		}
		return this.export(a, g, b + 1);
	}
	let d, f;
	switch (e) {
		case 0:
			d = "reg";
			f = pb(this.reg);
			c = null;
			break;
		case 1:
			d = "tag";
			f = this.tag && nb(this.tag, this.reg.size);
			c = null;
			break;
		case 2:
			d = "doc";
			f = this.store && lb(this.store);
			c = null;
			break;
		default: return;
	}
	return rb.call(this, a, c, d, f || null, b, e);
}
function kb(a, c) {
	var b = a.split(".");
	b[b.length - 1] === "json" && b.pop();
	const e = b.length > 2 ? b[0] : "";
	b = b.length > 2 ? b[2] : b[1];
	if (this.worker && e) return this.index.get(e).import(a);
	if (c) {
		typeof c === "string" && (c = JSON.parse(c));
		if (e) return this.index.get(e).import(b, c);
		switch (b) {
			case "reg":
				this.fastupdate = !1;
				this.reg = qb(c, this.reg);
				for (let d = 0, f; d < this.field.length; d++) f = this.index.get(this.field[d]), f.fastupdate = !1, f.reg = this.reg;
				if (this.worker) {
					c = [];
					for (const d of this.index.values()) c.push(d.import(a));
					return Promise.all(c);
				}
				break;
			case "tag":
				this.tag = ob(c, this.tag);
				break;
			case "doc": this.store = mb(c, this.store);
		}
	}
}
function sb(a, c) {
	let b = "";
	for (const e of a.entries()) {
		a = e[0];
		const d = e[1];
		let f = "";
		for (let g = 0, k; g < d.length; g++) {
			k = d[g] || [""];
			let h = "";
			for (let l = 0; l < k.length; l++) h += (h ? "," : "") + (c === "string" ? "\"" + k[l] + "\"" : k[l]);
			h = "[" + h + "]";
			f += (f ? "," : "") + h;
		}
		f = "[\"" + a + "\",[" + f + "]]";
		b += (b ? "," : "") + f;
	}
	return b;
}
T.prototype.remove = function(a, c) {
	const b = this.reg.size && (this.fastupdate ? this.reg.get(a) : this.reg.has(a));
	if (b) {
		if (this.fastupdate) {
			for (let e = 0, d, f; e < b.length; e++) if ((d = b[e]) && (f = d.length)) if (d[f - 1] === a) d.pop();
			else {
				const g = d.indexOf(a);
				g >= 0 && d.splice(g, 1);
			}
		} else tb(this.map, a), this.depth && tb(this.ctx, a);
		c || this.reg.delete(a);
	}
	this.db && (this.commit_task.push({ del: a }), this.M && ub(this));
	this.cache && this.cache.remove(a);
	return this;
};
function tb(a, c) {
	let b = 0;
	var e = typeof c === "undefined";
	if (a.constructor === Array) {
		for (let d = 0, f, g, k; d < a.length; d++) if ((f = a[d]) && f.length) {
			if (e) return 1;
			g = f.indexOf(c);
			if (g >= 0) {
				if (f.length > 1) return f.splice(g, 1), 1;
				delete a[d];
				if (b) return 1;
				k = 1;
			} else {
				if (k) return 1;
				b++;
			}
		}
	} else for (let d of a.entries()) e = d[0], tb(d[1], c) ? b++ : a.delete(e);
	return b;
}
const vb = {
	memory: { resolution: 1 },
	performance: {
		resolution: 3,
		fastupdate: !0,
		context: {
			depth: 1,
			resolution: 1
		}
	},
	match: { tokenize: "forward" },
	score: {
		resolution: 9,
		context: {
			depth: 2,
			resolution: 3
		}
	}
};
T.prototype.add = function(a, c, b, e) {
	if (c && (a || a === 0)) {
		if (!e && !b && this.reg.has(a)) return this.update(a, c);
		e = this.depth;
		c = this.encoder.encode(c, !e);
		const l = c.length;
		if (l) {
			const m = I(), p = I(), u = this.resolution;
			for (let r = 0; r < l; r++) {
				let t = c[this.rtl ? l - 1 - r : r];
				var d = t.length;
				if (d && (e || !p[t])) {
					var f = this.score ? this.score(c, t, r, null, 0) : wb(u, l, r), g = "";
					switch (this.tokenize) {
						case "tolerant":
							Y(this, p, t, f, a, b);
							if (d > 2) {
								for (let n = 1, q, x, v, A; n < d - 1; n++) q = t.charAt(n), x = t.charAt(n + 1), v = t.substring(0, n) + x, A = t.substring(n + 2), g = v + q + A, Y(this, p, g, f, a, b), g = v + A, Y(this, p, g, f, a, b);
								Y(this, p, t.substring(0, t.length - 1), f, a, b);
							}
							break;
						case "full": if (d > 2) {
							for (let n = 0, q; n < d; n++) for (f = d; f > n; f--) {
								g = t.substring(n, f);
								q = this.rtl ? d - 1 - n : n;
								var k = this.score ? this.score(c, t, r, g, q) : wb(u, l, r, d, q);
								Y(this, p, g, k, a, b);
							}
							break;
						}
						case "bidirectional":
						case "reverse": if (d > 1) {
							for (k = d - 1; k > 0; k--) {
								g = t[this.rtl ? d - 1 - k : k] + g;
								var h = this.score ? this.score(c, t, r, g, k) : wb(u, l, r, d, k);
								Y(this, p, g, h, a, b);
							}
							g = "";
						}
						case "forward": if (d > 1) {
							for (k = 0; k < d; k++) g += t[this.rtl ? d - 1 - k : k], Y(this, p, g, f, a, b);
							break;
						}
						default: if (Y(this, p, t, f, a, b), e && l > 1 && r < l - 1) for (d = this.N, g = t, f = Math.min(e + 1, this.rtl ? r + 1 : l - r), k = 1; k < f; k++) {
							t = c[this.rtl ? l - 1 - r - k : r + k];
							h = this.bidirectional && t > g;
							const n = this.score ? this.score(c, g, r, t, k - 1) : wb(d + (l / 2 > d ? 0 : 1), l, r, f - 1, k - 1);
							Y(this, m, h ? g : t, n, a, b, h ? t : g);
						}
					}
				}
			}
			this.fastupdate || this.reg.add(a);
		}
	}
	this.db && (this.commit_task.push(b ? { ins: a } : { del: a }), this.M && ub(this));
	return this;
};
function Y(a, c, b, e, d, f, g) {
	let k, h;
	if (!(k = c[b]) || g && !k[g]) {
		g ? (c = k || (c[b] = I()), c[g] = 1, h = a.ctx, (k = h.get(g)) ? h = k : h.set(g, h = a.keystore ? new R(a.keystore) : /* @__PURE__ */ new Map())) : (h = a.map, c[b] = 1);
		(k = h.get(b)) ? h = k : h.set(b, h = k = []);
		if (f) {
			for (let l = 0, m; l < k.length; l++) if ((m = k[l]) && m.includes(d)) {
				if (l <= e) return;
				m.splice(m.indexOf(d), 1);
				a.fastupdate && (c = a.reg.get(d)) && c.splice(c.indexOf(m), 1);
				break;
			}
		}
		h = h[e] || (h[e] = []);
		h.push(d);
		if (h.length === 2 ** 31 - 1) {
			c = new xa(h);
			if (a.fastupdate) for (let l of a.reg.values()) l.includes(h) && (l[l.indexOf(h)] = c);
			k[e] = h = c;
		}
		a.fastupdate && ((e = a.reg.get(d)) ? e.push(h) : a.reg.set(d, [h]));
	}
}
function wb(a, c, b, e, d) {
	return b && a > 1 ? c + (e || 0) <= a ? b + (d || 0) : (a - 1) / (c + (e || 0)) * (b + (d || 0)) + 1 | 0 : 0;
}
T.prototype.search = function(a, c, b) {
	b || (c || typeof a !== "object" ? typeof c === "object" && (b = c, c = 0) : (b = a, a = ""));
	if (b && b.cache) return b.cache = !1, a = this.searchCache(a, c, b), b.cache = !0, a;
	let e = [], d, f, g, k = 0, h, l, m, p, u;
	b && (a = b.query || a, c = b.limit || c, k = b.offset || 0, f = b.context, g = b.suggest, u = (h = b.resolve) && b.enrich, m = b.boost, p = b.resolution, l = this.db && b.tag);
	typeof h === "undefined" && (h = this.resolve);
	f = this.depth && f !== !1;
	let r = this.encoder.encode(a, !f);
	d = r.length;
	c = c || (h ? 100 : 0);
	if (d === 1) return xb.call(this, r[0], "", c, k, h, u, l);
	if (d === 2 && f && !g) return xb.call(this, r[1], r[0], c, k, h, u, l);
	let t = I(), n = 0, q;
	f && (q = r[0], n = 1);
	p || p === 0 || (p = q ? this.N : this.resolution);
	if (this.db) {
		if (this.db.search && (b = this.db.search(this, r, c, k, g, h, u, l), b !== !1)) return b;
		const x = this;
		return async function() {
			for (let v, A; n < d; n++) {
				if ((A = r[n]) && !t[A]) {
					t[A] = 1;
					v = await yb(x, A, q, 0, 0, !1, !1);
					if (v = zb(v, e, g, p)) {
						e = v;
						break;
					}
					q && (g && v && e.length || (q = A));
				}
				g && q && n === d - 1 && !e.length && (p = x.resolution, q = "", n = -1, t = I());
			}
			return Ab(e, p, c, k, g, m, h);
		}();
	}
	for (let x, v; n < d; n++) {
		if ((v = r[n]) && !t[v]) {
			t[v] = 1;
			x = yb(this, v, q, 0, 0, !1, !1);
			if (x = zb(x, e, g, p)) {
				e = x;
				break;
			}
			q && (g && x && e.length || (q = v));
		}
		g && q && n === d - 1 && !e.length && (p = this.resolution, q = "", n = -1, t = I());
	}
	return Ab(e, p, c, k, g, m, h);
};
function Ab(a, c, b, e, d, f, g) {
	let k = a.length, h = a;
	if (k > 1) h = $a(a, c, b, e, d, f, g);
	else if (k === 1) return g ? Sa.call(null, a[0], b, e) : new X(a[0], this);
	return g ? h : new X(h, this);
}
function xb(a, c, b, e, d, f, g) {
	a = yb(this, a, c, b, e, d, f, g);
	return this.db ? a.then(function(k) {
		return d ? k || [] : new X(k, this);
	}) : a && a.length ? d ? Sa.call(this, a, b, e) : new X(a, this) : d ? [] : new X([], this);
}
function zb(a, c, b, e) {
	let d = [];
	if (a && a.length) {
		if (a.length <= e) {
			c.push(a);
			return;
		}
		for (let f = 0, g; f < e; f++) if (g = a[f]) d[f] = g;
		if (d.length) {
			c.push(d);
			return;
		}
	}
	if (!b) return d;
}
function yb(a, c, b, e, d, f, g, k) {
	let h;
	b && (h = a.bidirectional && c > b) && (h = b, b = c, c = h);
	if (a.db) return a.db.get(c, b, e, d, f, g, k);
	a = b ? (a = a.ctx.get(b)) && a.get(c) : a.map.get(c);
	return a;
}
function T(a, c) {
	if (!this || this.constructor !== T) return new T(a);
	if (a) {
		var b = M(a) ? a : a.preset;
		b && (a = Object.assign({}, vb[b], a));
	} else a = {};
	b = a.context;
	const e = b === !0 ? { depth: 1 } : b || {}, d = M(a.encoder) ? va[a.encoder] : a.encode || a.encoder || {};
	this.encoder = d.encode ? d : typeof d === "object" ? new ka(d) : { encode: d };
	this.resolution = a.resolution || 9;
	this.tokenize = b = (b = a.tokenize) && b !== "default" && b !== "exact" && b || "strict";
	this.depth = b === "strict" && e.depth || 0;
	this.bidirectional = e.bidirectional !== !1;
	this.fastupdate = !!a.fastupdate;
	this.score = a.score || null;
	(b = a.keystore || 0) && (this.keystore = b);
	this.map = b ? new R(b) : /* @__PURE__ */ new Map();
	this.ctx = b ? new R(b) : /* @__PURE__ */ new Map();
	this.reg = c || (this.fastupdate ? b ? new R(b) : /* @__PURE__ */ new Map() : b ? new S(b) : /* @__PURE__ */ new Set());
	this.N = e.resolution || 3;
	this.rtl = d.rtl || a.rtl || !1;
	this.cache = (b = a.cache || null) && new ma(b);
	this.resolve = a.resolve !== !1;
	if (b = a.db) this.db = this.mount(b);
	this.M = a.commit !== !1;
	this.commit_task = [];
	this.commit_timer = null;
	this.priority = a.priority || 4;
}
w = T.prototype;
w.mount = function(a) {
	this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
	return a.mount(this);
};
w.commit = function() {
	this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
	return this.db.commit(this);
};
w.destroy = function() {
	this.commit_timer && (clearTimeout(this.commit_timer), this.commit_timer = null);
	return this.db.destroy();
};
function ub(a) {
	a.commit_timer || (a.commit_timer = setTimeout(function() {
		a.commit_timer = null;
		a.db.commit(a);
	}, 1));
}
w.clear = function() {
	this.map.clear();
	this.ctx.clear();
	this.reg.clear();
	this.cache && this.cache.clear();
	return this.db ? (this.commit_timer && clearTimeout(this.commit_timer), this.commit_timer = null, this.commit_task = [], this.db.clear()) : this;
};
w.append = function(a, c) {
	return this.add(a, c, !0);
};
w.contain = function(a) {
	return this.db ? this.db.has(a) : this.reg.has(a);
};
w.update = function(a, c) {
	const b = this, e = this.remove(a);
	return e && e.then ? e.then(() => b.add(a, c)) : this.add(a, c);
};
w.cleanup = function() {
	if (!this.fastupdate) return this;
	tb(this.map);
	this.depth && tb(this.ctx);
	return this;
};
w.searchCache = la;
w.export = function(a, c, b = 0, e = 0) {
	let d, f;
	switch (e) {
		case 0:
			d = "reg";
			f = pb(this.reg);
			break;
		case 1:
			d = "cfg";
			f = null;
			break;
		case 2:
			d = "map";
			f = lb(this.map, this.reg.size);
			break;
		case 3:
			d = "ctx";
			f = nb(this.ctx, this.reg.size);
			break;
		default: return;
	}
	return rb.call(this, a, c, d, f, b, e);
};
w.import = function(a, c) {
	if (c) switch (typeof c === "string" && (c = JSON.parse(c)), a = a.split("."), a[a.length - 1] === "json" && a.pop(), a.length === 3 && a.shift(), a = a.length > 1 ? a[1] : a[0], a) {
		case "reg":
			this.fastupdate = !1;
			this.reg = qb(c, this.reg);
			break;
		case "map":
			this.map = mb(c, this.map);
			break;
		case "ctx": this.ctx = ob(c, this.ctx);
	}
};
w.serialize = function(a = !0) {
	let c = "", b = "", e = "";
	if (this.reg.size) {
		let f;
		for (var d of this.reg.keys()) f || (f = typeof d), c += (c ? "," : "") + (f === "string" ? "\"" + d + "\"" : d);
		c = "index.reg=new Set([" + c + "]);";
		b = sb(this.map, f);
		b = "index.map=new Map([" + b + "]);";
		for (const g of this.ctx.entries()) {
			d = g[0];
			let k = sb(g[1], f);
			k = "new Map([" + k + "])";
			k = "[\"" + d + "\"," + k + "]";
			e += (e ? "," : "") + k;
		}
		e = "index.ctx=new Map([" + e + "]);";
	}
	return a ? "function inject(index){" + c + b + e + "}" : c + b + e;
};
Fa(T.prototype);
const Bb = typeof window !== "undefined" && (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), Cb = [
	"map",
	"ctx",
	"tag",
	"reg",
	"cfg"
], Db = I();
function Eb(a, c = {}) {
	if (!this || this.constructor !== Eb) return new Eb(a, c);
	typeof a === "object" && (c = a, a = a.name);
	a || console.info("Default storage space was used, because a name was not passed.");
	this.id = "flexsearch" + (a ? ":" + a.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "");
	this.field = c.field ? c.field.toLowerCase().replace(/[^a-z0-9_\-]/g, "") : "";
	this.type = c.type;
	this.fastupdate = this.support_tag_search = !1;
	this.db = null;
	this.h = {};
}
w = Eb.prototype;
w.mount = function(a) {
	if (a.index) return a.mount(this);
	a.db = this;
	return this.open();
};
w.open = function() {
	if (this.db) return this.db;
	let a = this;
	navigator.storage && navigator.storage.persist && navigator.storage.persist();
	Db[a.id] || (Db[a.id] = []);
	Db[a.id].push(a.field);
	const c = Bb.open(a.id, 1);
	c.onupgradeneeded = function() {
		const b = a.db = this.result;
		for (let e = 0, d; e < Cb.length; e++) {
			d = Cb[e];
			for (let f = 0, g; f < Db[a.id].length; f++) g = Db[a.id][f], b.objectStoreNames.contains(d + (d !== "reg" ? g ? ":" + g : "" : "")) || b.createObjectStore(d + (d !== "reg" ? g ? ":" + g : "" : ""));
		}
	};
	return a.db = Z(c, function(b) {
		a.db = b;
		a.db.onversionchange = function() {
			a.close();
		};
	});
};
w.close = function() {
	this.db && this.db.close();
	this.db = null;
};
w.destroy = function() {
	return Z(Bb.deleteDatabase(this.id));
};
w.clear = function() {
	const a = [];
	for (let b = 0, e; b < Cb.length; b++) {
		e = Cb[b];
		for (let d = 0, f; d < Db[this.id].length; d++) f = Db[this.id][d], a.push(e + (e !== "reg" ? f ? ":" + f : "" : ""));
	}
	const c = this.db.transaction(a, "readwrite");
	for (let b = 0; b < a.length; b++) c.objectStore(a[b]).clear();
	return Z(c);
};
w.get = function(a, c, b = 0, e = 0, d = !0, f = !1) {
	a = this.db.transaction((c ? "ctx" : "map") + (this.field ? ":" + this.field : ""), "readonly").objectStore((c ? "ctx" : "map") + (this.field ? ":" + this.field : "")).get(c ? c + ":" + a : a);
	const g = this;
	return Z(a).then(function(k) {
		let h = [];
		if (!k || !k.length) return h;
		if (d) {
			if (!b && !e && k.length === 1) return k[0];
			for (let l = 0, m; l < k.length; l++) if ((m = k[l]) && m.length) {
				if (e >= m.length) {
					e -= m.length;
					continue;
				}
				const p = b ? e + Math.min(m.length - e, b) : m.length;
				for (let u = e; u < p; u++) h.push(m[u]);
				e = 0;
				if (h.length === b) break;
			}
			return f ? g.enrich(h) : h;
		}
		return k;
	});
};
w.tag = function(a, c = 0, b = 0, e = !1) {
	a = this.db.transaction("tag" + (this.field ? ":" + this.field : ""), "readonly").objectStore("tag" + (this.field ? ":" + this.field : "")).get(a);
	const d = this;
	return Z(a).then(function(f) {
		if (!f || !f.length || b >= f.length) return [];
		if (!c && !b) return f;
		f = f.slice(b, b + c);
		return e ? d.enrich(f) : f;
	});
};
w.enrich = function(a) {
	typeof a !== "object" && (a = [a]);
	const c = this.db.transaction("reg", "readonly").objectStore("reg"), b = [];
	for (let e = 0; e < a.length; e++) b[e] = Z(c.get(a[e]));
	return Promise.all(b).then(function(e) {
		for (let d = 0; d < e.length; d++) e[d] = {
			id: a[d],
			doc: e[d] ? JSON.parse(e[d]) : null
		};
		return e;
	});
};
w.has = function(a) {
	a = this.db.transaction("reg", "readonly").objectStore("reg").getKey(a);
	return Z(a).then(function(c) {
		return !!c;
	});
};
w.search = null;
w.info = function() {};
w.transaction = function(a, c, b) {
	a += a !== "reg" ? this.field ? ":" + this.field : "" : "";
	let e = this.h[a + ":" + c];
	if (e) return b.call(this, e);
	let d = this.db.transaction(a, c);
	this.h[a + ":" + c] = e = d.objectStore(a);
	const f = b.call(this, e);
	this.h[a + ":" + c] = null;
	return Z(d).finally(function() {
		return f;
	});
};
w.commit = async function(a) {
	let c = a.commit_task, b = [];
	a.commit_task = [];
	for (let e = 0, d; e < c.length; e++) d = c[e], d.del && b.push(d.del);
	b.length && await this.remove(b);
	a.reg.size && (await this.transaction("map", "readwrite", function(e) {
		for (const d of a.map) {
			const f = d[0], g = d[1];
			g.length && (e.get(f).onsuccess = function() {
				let k = this.result;
				var h;
				if (k && k.length) {
					const l = Math.max(k.length, g.length);
					for (let m = 0, p, u; m < l; m++) if ((u = g[m]) && u.length) {
						if ((p = k[m]) && p.length) for (h = 0; h < u.length; h++) p.push(u[h]);
						else k[m] = u;
						h = 1;
					}
				} else k = g, h = 1;
				h && e.put(k, f);
			});
		}
	}), await this.transaction("ctx", "readwrite", function(e) {
		for (const d of a.ctx) {
			const f = d[0], g = d[1];
			for (const k of g) {
				const h = k[0], l = k[1];
				l.length && (e.get(f + ":" + h).onsuccess = function() {
					let m = this.result;
					var p;
					if (m && m.length) {
						const u = Math.max(m.length, l.length);
						for (let r = 0, t, n; r < u; r++) if ((n = l[r]) && n.length) {
							if ((t = m[r]) && t.length) for (p = 0; p < n.length; p++) t.push(n[p]);
							else m[r] = n;
							p = 1;
						}
					} else m = l, p = 1;
					p && e.put(m, f + ":" + h);
				});
			}
		}
	}), a.store ? await this.transaction("reg", "readwrite", function(e) {
		for (const d of a.store) {
			const f = d[0], g = d[1];
			e.put(typeof g === "object" ? JSON.stringify(g) : 1, f);
		}
	}) : a.bypass || await this.transaction("reg", "readwrite", function(e) {
		for (const d of a.reg.keys()) e.put(1, d);
	}), a.tag && await this.transaction("tag", "readwrite", function(e) {
		for (const d of a.tag) {
			const f = d[0], g = d[1];
			g.length && (e.get(f).onsuccess = function() {
				let k = this.result;
				k = k && k.length ? k.concat(g) : g;
				e.put(k, f);
			});
		}
	}), a.map.clear(), a.ctx.clear(), a.tag && a.tag.clear(), a.store && a.store.clear(), a.document || a.reg.clear());
};
function Fb(a, c, b) {
	const e = a.value;
	let d, f = 0;
	for (let g = 0, k; g < e.length; g++) {
		if (k = b ? e : e[g]) {
			for (let h = 0, l, m; h < c.length; h++) if (m = c[h], l = k.indexOf(m), l >= 0) if (d = 1, k.length > 1) k.splice(l, 1);
			else {
				e[g] = [];
				break;
			}
			f += k.length;
		}
		if (b) break;
	}
	f ? d && a.update(e) : a.delete();
	a.continue();
}
w.remove = function(a) {
	typeof a !== "object" && (a = [a]);
	return Promise.all([
		this.transaction("map", "readwrite", function(c) {
			c.openCursor().onsuccess = function() {
				const b = this.result;
				b && Fb(b, a);
			};
		}),
		this.transaction("ctx", "readwrite", function(c) {
			c.openCursor().onsuccess = function() {
				const b = this.result;
				b && Fb(b, a);
			};
		}),
		this.transaction("tag", "readwrite", function(c) {
			c.openCursor().onsuccess = function() {
				const b = this.result;
				b && Fb(b, a, !0);
			};
		}),
		this.transaction("reg", "readwrite", function(c) {
			for (let b = 0; b < a.length; b++) c.delete(a[b]);
		})
	]);
};
function Z(a, c) {
	return new Promise((b, e) => {
		a.onsuccess = a.oncomplete = function() {
			c && c(this.result);
			c = null;
			b(this.result);
		};
		a.onerror = a.onblocked = e;
		a = null;
	});
}
const Document = Na;
//#endregion
//#region frontend/src/search.ts
let searchIndex = null;
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
async function initializeFlexSearch() {
	if (initDone) return;
	if (initPromise) return initPromise;
	initPromise = (async () => {
		try {
			const resp = await fetch("/search_index.zh.json");
			if (!resp.ok) throw new Error(`Failed to fetch search index: ${resp.status}`);
			const pages = await resp.json();
			searchIndex = new Document({
				document: {
					id: "url",
					index: ["title", "body"],
					store: [
						"title",
						"body",
						"url"
					]
				},
				encoder: "CJK",
				tokenize: "full",
				resolution: 9
			});
			for (const page of pages) searchIndex.add(page);
			initDone = true;
		} catch (err) {
			console.error("Failed to initialize FlexSearch:", err);
		}
	})();
	return initPromise;
}
async function performSearch(query) {
	hideResults();
	if (!query.trim()) return;
	await initializeFlexSearch();
	if (!searchIndex) return;
	try {
		const rawResults = searchIndex.search(query, {
			limit: 10,
			enrich: true
		});
		const seen = /* @__PURE__ */ new Map();
		for (const fieldResult of rawResults) {
			for (const item of fieldResult.result) {
				if (!seen.has(item.id) && item.doc) seen.set(item.id, item.doc);
				if (seen.size >= 10) break;
			}
			if (seen.size >= 10) break;
		}
		const results = Array.from(seen.values());
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
		const snip = r.description || r.body?.slice(0, 100) || "";
		const isFirst = i === 0;
		const isLast = i === results.length - 1;
		const a = document.createElement("a");
		a.href = r.url;
		a.className = `flex flex-row items-center p-4 hover:bg-muted/60 cursor-pointer transition-colors duration-200 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`;
		a.innerHTML = `
            <i data-lucide="newspaper" class="self-start -mt-0.5 size-8 mr-4"></i>
            <div class="flex flex-col min-w-0">
                <div class="text-xl font-semibold truncate">${escapeHtml(r.title)}</div>
                  ${snip ? `<div class="text-base text-foreground line-clamp-2">${escapeHtml(snip)}</div>` : ""}
            </div>
            <div class="flex-1"></div>
            <i data-lucide="arrow-right" class="size-10 flex-shrink-0"></i>
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
function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
if (document.readyState === "complete") initializeFlexSearch();
else window.addEventListener("load", initializeFlexSearch);
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
