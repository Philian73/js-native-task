// https://www.codewars.com/kata/514b92a657cdc65150000006/train/javascript

function solution(num) {
	if (num <= 3) return 0

	const arr = []

	for (let i = 3; i < num; i++) {
		if ((i % 3) == 0 || (i % 5) == 0) {
			arr.push(i)
		}
	}

	return arr.reduce((acc, num) => acc + num)
}

// не моё решение, но оно явно лучше
const solution2 = num => {
	let sum = 0;

	for (let i = 1; i < num; i++) {
		if (i % 3 == 0 || i % 5 == 0) {
			sum += i
		}
	}

	return sum
}

console.log(solution(10))
console.log(solution2(10))