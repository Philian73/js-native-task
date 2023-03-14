// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/truncate-a-string

const truncateString = (str, num) =>
	str.length > num ? `${str.slice(0, num)}...` : str

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8))