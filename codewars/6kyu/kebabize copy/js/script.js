// https://www.codewars.com/kata/57f8ff867a28db569e000c4a/javascript

const narcissistic = value => value
	.toString()
	.split('')
	.map((num, i, arr) => num ** arr.length)
	.reduce((acc, num) => acc + num, 0)
	=== value

// Не моё решение, но я был поражён :)
const narcissistic2 = value =>
	value === [...`${value}`].reduce((acc, num, i, arr) => acc + num ** arr.length, 0)

console.log(narcissistic(153))
console.log(narcissistic2(153))