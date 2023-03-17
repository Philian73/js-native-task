// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/diff-two-arrays

function diffArray(arr1, arr2) {
	return arr1
		.filter(el => !arr2.includes(el))
		.concat(arr2.filter(el => !arr1.includes(el)))
}

// Не моё решение, но очень круто, что тут обошлось всего 1 фильром...
const diffArray2 = (arr1, arr2) => arr1
	.concat(arr2)
	.filter(el => !arr1.includes(el) || !arr2.includes(el))

console.log(diffArray([1, 2, 3], [2, 3, 4]));
console.log(diffArray2([1, 2, 3], [2, 3, 4]));