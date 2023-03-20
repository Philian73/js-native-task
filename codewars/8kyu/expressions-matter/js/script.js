// https://www.codewars.com/kata/5ae62fcf252e66d44d00008e

const expressionMatter = (a, b, c) => {
	const z1 = (a + b) * c
	const z2 = a * b * c
	const z3 = a * b + c
	const z4 = a * (b + c)
	const z5 = a + b * c
	const z6 = a + b + c

	return Math.max(z1, z2, z3, z4, z5, z6)
}

console.log(expressionMatter(7, 9, 1))