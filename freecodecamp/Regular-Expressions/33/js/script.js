// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/remove-whitespace-from-start-and-end

let hello = "   Hello, World!  ";
let wsRegex = /^\s+(\w+,)\s(\w+!)\s+/; // Change this line
let wsRegex2 = /^\s+|\s+$/g; // Change this line
let result = hello.replace(wsRegex, ""); // Change this line

console.log(hello.match(wsRegex))

console.log(result)