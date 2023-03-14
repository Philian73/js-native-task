// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/finders-keepers

const findElement = (arr, func) => arr.find(func)

console.log(findElement([1, 2, 3, 4], num => num % 2 === 0)) // 2