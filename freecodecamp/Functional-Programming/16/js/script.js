// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/functional-programming/use-higher-order-functions-map-filter-or-reduce-to-solve-a-complex-problem
const squareList = arr => arr
	.filter(num => Number.isInteger(num) && num > 0)
	.map(num => num ** 2)


// Cам написал также и через .reduce
// Какая из этих функций лучше?
// кстати, сначала я использовал push, но так изменялся
// сам аккумулятор, переписал на concat. Это уже более
// по функциональнуому программированию, не так ли?)
const squareList2 = arr => {
	return arr.reduce((acc, num) => {
		return Number.isInteger(num) && num > 0
			? acc.concat(num ** 2)
			: acc
	}, []);
};

const squaredIntegers = squareList([-3, 4.8, 5, 3, -3.2]);
const squaredIntegers2 = squareList2([-3, 4.8, 5, 3, -3.2]);
console.log(squaredIntegers);
console.log(squaredIntegers2);