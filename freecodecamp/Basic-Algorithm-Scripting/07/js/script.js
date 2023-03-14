// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/repeat-a-string-repeat-a-string
// Не используя .repeat()

const repeatStringNumTimes = (str, num) =>
	num > 0 ? repeatStringNumTimes(str, num - 1) + str : ""

console.log(repeatStringNumTimes("test", 3))