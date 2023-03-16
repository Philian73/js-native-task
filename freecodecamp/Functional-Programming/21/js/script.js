// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/functional-programming/apply-functional-programming-to-convert-strings-to-url-slugs


// Оказывается, replace нельзя было использовать :D
const urlSlug = title => title.toLowerCase().replace(/\b\W{1,}\b/g, '-').trim()

const urlSlug2 = title => title
	.toLowerCase()
	.trim()
	.split(/\s+/)
	.join('-')

const urlSlug3 = title => title
	.split(/\s+/)
	.filter(word => word)
	.join('-')
	.toLowerCase()

console.log(urlSlug("A Mind Needs Books Like A Sword Needs A Whetstone"));
console.log(urlSlug(" Winter Is  Coming"))
console.log(urlSlug(" Winter Is  Coming asd.        "))
console.log(urlSlug(" Java-COOL "))

console.log(urlSlug2("A Mind Needs Books Like A Sword Needs A Whetstone"));
console.log(urlSlug2(" Winter Is  Coming"))
console.log(urlSlug2(" Winter Is  Coming asd.        "))
console.log(urlSlug2(" Java-COOL "))

console.log(urlSlug3("A Mind Needs Books Like A Sword Needs A Whetstone"));
console.log(urlSlug3(" Winter Is  Coming"))
console.log(urlSlug3(" Winter Is  Coming asd.        "))
console.log(urlSlug3(" Java-COOL "))