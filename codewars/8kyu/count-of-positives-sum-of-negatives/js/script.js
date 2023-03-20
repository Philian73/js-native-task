// https://www.codewars.com/kata/576bb71bbbcf0951d5000044/solutions/javascript

const countPositivesSumNegatives = input => {
	return input && input.length ? input.reduce((acc, num) => {
		if (num < 0) acc[1] += num
		else if (num > 0) acc[0]++

		return acc
	}, [0, 0])
		: []
}

console.log(countPositivesSumNegatives([0, 2, 3, 0, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14]));