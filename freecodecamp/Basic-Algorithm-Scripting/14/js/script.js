// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/where-do-i-belong

const getIndexToIns = (arr, num) => arr.filter(item => item < num).length

// не моё решение
const getIndexToIns2 = (arr, num) => arr.sort((a, b) => a - b).findIndex(n => num <= n)

console.log(getIndexToIns([40, 60], 50))
console.log(getIndexToIns([10, 20, 30, 40, 50], 30))
console.log(getIndexToIns([70, 10, 20, 30, 40, 50], 30))