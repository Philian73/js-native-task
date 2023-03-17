// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/pig-latin

// все еще рот шатал регулярных выражений...
// почти сам, но нет
function translatePigLatin(str) {
	return str
		.replace(/^[aeiou]\w*/, "$&way")
		.replace(/(^[^aeiou]+)(\w*)/, "$2$1ay");
}

console.log(translatePigLatin("california"));
console.log(translatePigLatin("algorithm"));
console.log(translatePigLatin("rhythm"));