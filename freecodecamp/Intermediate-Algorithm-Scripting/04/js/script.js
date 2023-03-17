// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/wherefore-art-thou

// очень сложно.... решил с подсказками
function whatIsInAName(collection, source) {
	return collection.filter(obj => {
		for (let key in source) {
			if (source[key] !== obj[key] && source.hasOwnProperty(key)) {
				return false
			}
		}
		return true
	})
}

console.log(whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));