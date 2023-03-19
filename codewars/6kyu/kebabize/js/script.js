// https://www.codewars.com/kata/57f8ff867a28db569e000c4a/javascript

// моё решение
const kebabize = str => str.replace(/[^a-z]/gi, '').split(/\d|(?=[A-Z])/).join('-').toLowerCase()

console.log(test('camelsHave3Humps'));
console.log(test('c-a-m-e-l'));
console.log(test('camelsHaveThreeHumps'));
console.log(test('hfg'));
// console.log(test('zzbaabcd'));