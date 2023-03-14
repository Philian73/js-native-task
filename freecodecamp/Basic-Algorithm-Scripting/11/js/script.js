// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/title-case-a-sentence

const titleCase = str => str
	.split(' ')
	.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
	.join(' ')

// не моё решение
const titleCase2 = str => str
	.toLowerCase()
	.replace(/(^|\s)\S/g, L => L.toUpperCase())

console.log(titleCase('HERE IS MY HANDLE HERE IS MY SPOUT'))