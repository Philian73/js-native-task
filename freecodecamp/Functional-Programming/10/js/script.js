// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/functional-programming/implement-the-filter-method-on-a-prototype

Array.prototype.myFilter = function (callback) {
	const newArray = [];
	// Only change code below this line
	this.forEach((el, i, arr) => {
		if (callback(el, i, arr)) newArray.push(el)
	})
	// Only change code above this line
	return newArray;
};

console.log([1, 2, 3].myFilter(num => num > 1))