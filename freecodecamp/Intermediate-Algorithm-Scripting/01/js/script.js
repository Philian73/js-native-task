// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-numbers-in-a-range

const sumAll = arr => {
	const [first, last] = [...arr].sort((a, b) => a - b)
	let result = 0

	for (let i = first; i <= last; i++) {
		result += i
	}

	return result
}

const sumAll2 = arr => {
	const [first, last] = [...arr].sort((a, b) => a - b)
	return first !== last
		? first + sumAll2([first + 1, last])
		: first
}

console.log(sumAll([4, 1]))
console.log(sumAll([10, 5]))
console.log(sumAll2([4, 1]))
console.log(sumAll2([10, 5]))