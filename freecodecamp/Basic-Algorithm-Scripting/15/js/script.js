// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/mutations

function mutation(arr) {
	const str = arr[0].toLowerCase()
	const subStr = arr[1].toLowerCase()

	for (let i = 0; i < subStr.length; i++) {
		if (!str.includes(subStr[i])) return false
	}

	return true
}

// Не моё решение...
function mutation2(arr) {
	const regex = new RegExp(`[^${arr[0]}]`, 'i')
	return !regex.test(arr[1])
}

// также не моё решение
function mutation3(arr) {
	const [str, subStr] = arr.map(s => s.toLowerCase())
	return [...subStr].every(char => str.includes(char))
}

console.log(mutation(["hello", "hey"]))
console.log(mutation(["hello", "Hello"]))
console.log(mutation(["Mary", "Army"]))
console.log(mutation(["floor", "for"]))