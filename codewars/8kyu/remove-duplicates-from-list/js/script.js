// https://www.codewars.com/kata/57a5b0dfcf1fa526bb000118/javascript

const distinct = a => [...new Set(a)]

console.log(distinct([1, 1, 1, 2, 3, 3, 4, 5, 5]))