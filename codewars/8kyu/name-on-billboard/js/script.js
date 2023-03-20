// https://www.codewars.com/kata/570e8ec4127ad143660001fd/javascript

const billboard = (name, price = 30) => Math.imul(name.length, price)

// оказалось можно проще
const billboard2 = (n, price = 30) => n.length / (1 / price)

console.log(billboard("KOLYA"))
console.log(billboard2("KOLYA"))