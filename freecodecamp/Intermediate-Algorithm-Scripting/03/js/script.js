// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/seek-and-destroy

const destroyer = (arr, ...args) => arr.filter(el => !args.includes(el))

// не моё решение, но надо бы почитать про Array.from и arguments
function destroyer2(arr) {
	const valsToRemove = Array.from(arguments).slice(1);
	return arr.filter(function (val) {
		return !valsToRemove.includes(val);
	});
}

console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3))
console.log(destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3));
console.log(destroyer([2, 3, 2, 3], 2, 3));
console.log(destroyer2([1, 2, 3, 1, 2, 3], 2, 3))
console.log(destroyer2([1, 2, 3, 5, 1, 2, 3], 2, 3));
console.log(destroyer2([2, 3, 2, 3], 2, 3));