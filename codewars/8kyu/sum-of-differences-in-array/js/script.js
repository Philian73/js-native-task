// https://www.codewars.com/kata/5b73fe9fb3d9776fbf00009e/javascript

const sumOfDifferences = arr => {
	return arr.sort((a, b) => b - a)
		.reduce((acc, num, i, arr) => {
			if (i === 0) return acc
			return acc + (arr[--i] - num)
		}, 0)
}

// не моё решение
const sumOfDifferences2 = arr => arr.length > 1 ? Math.max(...arr) - Math.min(...arr) : 0

console.log(sumOfDifferences([2, 1, 10]))