// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/confirm-the-ending
// Не используя endsWith

// моё решение
const confirmEnding = (str, target) => new RegExp(`${target}$`).test(str)

// очевидное решение до которого я не допёр....
const confirmEnding2 = (str, target) => str.slice(str.length - target.length) === target

console.log(confirmEnding("Open sesame", "sage"))		// false
console.log(confirmEnding("Connor", "n"))					// false
console.log(confirmEnding("Bastian", "n")) 				// true
console.log(confirmEnding("Abstraction", "action"))	// true