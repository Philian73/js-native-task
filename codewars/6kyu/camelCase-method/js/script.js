// https://www.codewars.com/kata/587731fda577b3d1b0001196/train/javascript

// моё решение
String.prototype.camelCase = function () {
	return this != '' ? this.toUpperCase().split(' ').map(word => word[0] + word.toLowerCase().slice(1)).join('') : ''
}

console.log("hello case".camelCase());
console.log("".camelCase());