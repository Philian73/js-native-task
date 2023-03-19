var firstName = { A: 'Alpha', B: 'Beta', C: 'Cache' }
var surname = { A: 'Analogue', B: 'Bomb', C: 'Catalyst' }

function aliasGen(name, last) {
	const firstLetterName = name[0].toUpperCase()
	const firstLetterLastName = last[0].toUpperCase()

	if (firstName.hasOwnProperty(firstLetterName)) {
		name = firstName[firstLetterName]
	}
	if (surname.hasOwnProperty(firstLetterLastName)) {
		last = surname[firstLetterLastName]
	}
	if (/^[0-9]+/.test(name) || /^[0-9]+/.test(last)) {
		return 'Your name must start with a letter from A - Z.'
	}

	return name + ' ' + last
}

// Не моё решения, но они очень крутые
function aliasGen2() {
	let fName = firstName[arguments[0][0].toUpperCase()]
	let sName = surname[arguments[1][0].toUpperCase()]
	return fName && sName ? `${fName} ${sName}` : `Your name must start with a letter from A - Z.`
}

const initialCap = (str) => str[0].toUpperCase();
const isValidName = (name) => /^[a-z]/i.test(name);
const aliasGen3 = (fName, lName) => {
	return (isValidName(fName) && isValidName(lName))
		? `${firstName[initialCap(fName)]} ${surname[initialCap(lName)]}`
		: 'Your name must start with a letter from A - Z.';
}


console.log(aliasGen("7393424", "Anumbha"))
console.log(aliasGen("Mike", "Millington"))
console.log(aliasGen("Bertolt", "Millington"))
console.log(aliasGen("Anumbha", "7393424"))
console.log(aliasGen("Anumbha", "Benedict"))
console.log(aliasGen("ybk4j", "kfbgw"))

// console.log(aliasGen2("7393424", "Anumbha"))
// console.log(aliasGen2("Mike", "Millington"))
// console.log(aliasGen2("Bertolt", "Millington"))
// console.log(aliasGen2("Anumbha", "7393424"))
// console.log(aliasGen2("Anumbha", "Benedict"))