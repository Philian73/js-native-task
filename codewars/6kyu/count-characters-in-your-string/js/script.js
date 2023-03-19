function count(str) {
	const test = str.split('').reduce((acc, letter, i, arr) => {
		acc[letter] = 0
		return acc
	}, {})

	for (let i = 0; i < str.length; i++) {
		if (test.hasOwnProperty(str[i])) {
			test[str[i]]++
		}
	}

	return test
}

// не моё решение :C
function test(str) {
	const obj = {}

	str.split('').forEach((letter) => obj[letter] ? obj[letter]++ : obj[letter] = 1)

	return obj
}

console.log(test('asdasdasasdasdsacxgcvbncvb'))