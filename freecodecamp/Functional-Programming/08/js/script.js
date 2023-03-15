// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/functional-programming/implement-map-on-a-prototype

Array.prototype.myMap = function (callback) {
	const newArray = []

	for (let i = 0; i < this.length; i++) {
		newArray.push(callback(this[i], i, this))
	}

	return newArray;
}

// также моя реализация, но уже с forEach
Array.prototype.myMap2 = function (callback) {
	const newArray = []

	this.forEach((el, i, arr) => newArray.push(callback(el, i, arr)))

	return newArray
}

const test = [1, 2, 3]
const test2 = test.myMap(el => el * 2)
const test3 = test.myMap2(el => el * 2)
console.log(test2)
console.log(test3)