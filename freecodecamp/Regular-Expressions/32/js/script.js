// https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/use-capture-groups-to-search-and-replace

let str = "one two three";
let fixRegex = /(\w+)\s(\w+)\s(\w+)/; // вхождение
let replaceText = "$3 $2 $1"; // меняем слова местами
let result = str.replace(fixRegex, replaceText);