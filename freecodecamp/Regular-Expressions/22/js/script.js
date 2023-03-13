// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/restrict-possible-usernames

// let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i
let userCheck = /^[a-z](\d\d+|[a-z]+\d*)$/i
console.log(userCheck.test("AA")) // true
console.log(userCheck.test("ASS")) // true
console.log(userCheck.test("A5555555")) // true
console.log(userCheck.test("Aasdsa")) // true
console.log(userCheck.test("Aasdsa123")) // true
console.log(userCheck.test("as12sd21")) // false
console.log(userCheck.test("A1")) // false