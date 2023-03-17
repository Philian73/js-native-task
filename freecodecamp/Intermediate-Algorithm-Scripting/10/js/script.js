// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sorted-union

function uniteUnique(...args) {
	const newArr = []
	for (let i = 0; i < args.length; i++) {
		newArr.push(...args[i])
	}
	return newArr.filter((el, i, arr) => arr.indexOf(el) === i)
}

// не моё решение
function uniteUnique(...args) {
	return [...new Set(args.flat())]
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]))