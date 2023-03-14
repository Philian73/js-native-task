// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/chunky-monkey

function chunkArrayInGroups(arr, size) {
	const newArr = []

	for (let i = 0; i < arr.length; i += size) {
		newArr.push(arr.slice(i, i + size))
	}

	return newArr
}

console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2))
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3));