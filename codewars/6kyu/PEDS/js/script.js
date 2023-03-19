// https://www.codewars.com/kata/59290e641a640c53d000002c

// моё решение

function test(a, b) {
	const arr = new Array()

	while (a <= b) {
		if (a % 2 === 0 && Number.isInteger(Math.sqrt(a))) {
			let isEven = true
			const str = a.toString()
			for (let i = 0; i < str.length; i++) {
				if (str.charAt(i) % 2 !== 0) {
					isEven = false
					break
				}
			}
			if (isEven) {
				arr.push(a)
			}
		}
		a++
	}

	return arr
}

// сдался и подсмотрел....

function evenDigitSquares(a, b) {
	const result = [];
	for (let i = Math.ceil(Math.sqrt(a)); i * i <= b; i++) {
		const str = String(i * i);
		if (str.split('').every(digit => digit % 2 === 0)) {
			result.push(i * i);
		}
	}
	return result;
}

console.log(evenDigitSquares(100, 1000));