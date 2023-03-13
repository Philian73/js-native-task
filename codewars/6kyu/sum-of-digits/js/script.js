const digital_root = n => {
	if (n < 10) return n

	return digital_root(
		n.toString()
			.split('')
			.reduce((acc, num) => acc + +num, 0)
	)
}

/*
const digital_root = n => (n - 1) % 9 + 1
Подробнее:
1) Допустим n = 9, получается 9 - 1
2) Находим остаток деления 8 на 9, получаем 8
3) Прибавляем к получившемуся остатку 1, получается 9.
В таком случае возвращается даже тогда, когда параметром передали число-цифру
*/

console.log(digital_root(9))
console.log(digital_root(16))
console.log(digital_root(942))
console.log(digital_root(132189))
console.log(digital_root(493193))