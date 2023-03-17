// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/spinal-tap-case

// решил не сам, не хватало вонючего "Положительный просмотр вперед"
// (?=[A-Z]) который сообщает, что следующее выражение должно быть найдено
// только если после него идёт заглавная буква
const spinalCase = str => str.split(/\s|_|(?=[A-Z])/).join('-').toLowerCase()

spinalCase('This Is Spinal Tap');
console.log(spinalCase('This Is Spinal Tap'))
console.log(spinalCase('AllThe-small Things'))