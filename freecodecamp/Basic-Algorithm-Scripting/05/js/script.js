// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/return-largest-numbers-in-arrays

// боже какой же я гений, как я это написал?!!
const largestOfFour = arr => arr.map(item => Math.max(...item))

// случайно написал функцию которая возвращает самое большое число )0)0)
const largestOfFour2 = arr => arr.reduce((acc, item) => Math.max(acc, ...item), 0)

console.log(largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]))