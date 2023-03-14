// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/find-the-longest-word-in-a-string

const findLongestWordLength = str => str
	.split(' ')
	.reduce((acc, word) => Math.max(acc, word.length), 0)

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog")) //6