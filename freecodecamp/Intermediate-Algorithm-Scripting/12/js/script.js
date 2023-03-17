// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-odd-fibonacci-numbers

// Плохое конечно, не оптимизированное, но решение моё
function sumFibs(num) {
	const newArr = [0, 1]

	for (let i = 1; i <= num; i++) {
		if ((i === newArr.at(-1) + newArr.at(-2))) {
			newArr.push(i)
		}
	}

	return newArr.reduce((acc, num) => {
		if (num % 2) acc += num
		return acc
	}, 0)
}

console.log(sumFibs(2132132232));