// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/reuse-patterns-using-capture-groups

let repeatNum = "42 42 42";
/*
1)^ - в начале строки должно быть число не менее 1 символа
2)"пробел" - после этого числа должен быть пробел
3)\1 - повторяю это же число
4)"пробел" - после этого числа также должен быть пробел
5)\1 - снова объявляю это же число
6)$ - объявляю конец строки. Дальнейшее сверять не будем
*/
let reRegex = /^(\d+) \1 \1$/; //
let result = reRegex.test(repeatNum);

console.log("100 100 100".match(reRegex)) // []
console.log("42 42 42".match(reRegex)) 	// []
console.log("42 42 42 42".match(reRegex)) // null
console.log("42 42".match(reRegex))			// null
console.log("42".match(reRegex))				// null