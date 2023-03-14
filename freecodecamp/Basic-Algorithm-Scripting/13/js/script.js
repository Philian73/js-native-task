// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/falsy-bouncer

const bouncer = arr => arr.filter(item => {
	if (item != false && item != undefined) return item
})

// Не моё решение...
const bouncer2 = arr => arr.filter(Boolean)

console.log(bouncer([7, "ate", "", false, 9]))
console.log(bouncer([false, null, 0, NaN, undefined, ""]))
console.log(bouncer(["a", "b", "c"]))