// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/javascript

const mas = [2, 4, 0, 100, 4, 11, 2602, 36]
const mas2 = [160, 3, 1719, 19, 11, 13, -21]

const findOutlier = integers => {
	const arr = integers.filter(num => num % 2)
	return arr.length > 1 ? integers.find(num => num % 2 == 0) : arr[0]
}

console.log(test(mas))
console.log(test(mas2))