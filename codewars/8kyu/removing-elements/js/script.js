// https://www.codewars.com/kata/5769b3802ae6f8e4890009d2

const test = arr => arr.filter((_, i) => !(i % 2))

console.log(test(["Keep", "Remove", "Keep", "Remove", "Keep"]))