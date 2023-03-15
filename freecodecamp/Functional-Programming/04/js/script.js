// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/functional-programming/refactor-global-variables-out-of-functions

// The global variable
const bookList = ["The Hound of the Baskervilles", "On The Electrodynamics of Moving Bodies", "Philosophiæ Naturalis Principia Mathematica", "Disquisitiones Arithmeticae"];

// Change code below this line
const add = (bookList, bookName) => [...bookList, bookName]
// Change code above this line

// Change code below this line
const remove = (bookList, bookName) => bookList.filter(book => book != bookName)
// Change code above this line

console.log(add(bookList, 'test book'))
console.log(remove(bookList, 'On The Electrodynamics of Moving Bodies'));