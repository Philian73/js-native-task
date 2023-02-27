var words = [
	["машина", "На 4 колёсах"],
	["компьютер", "Любят программисты"],
	["телефон", "То без чего не может каждый в 21-м веке"],
	["вода", "2/3 массы нашего тела состоит из неё"],
	["энергетик", "Вредно, но бодрит и вкусно"],
]
/* Генерирую случаный элемент из массива words c 2 элементами внутри
	0 - загаданное слово
	1 - подсказка к слову
*/
var randomWord = words[Math.floor(Math.random() * words.length)]
/*
Создаю пусстой массив, в последствие в котором будет столько же элементов,
сколько букв в загаданном слове
*/
var answerArr = []
// Создаю переменную, которая будет отвечать за то, сколько букв осталось угадать.
var remainingLetters = randomWord[0].length
// Создаю переменную с кол-вом попыток
var attemptsCount = 6
// Создаю пустой массив, в последствие в который будут добавляться все введённые буквы
var allUsedLetters = []

// Цикл, который создаёт в массив answerArr столько элементов, сколько букв в загаданном слове.
for (var i = 0; i < randomWord[0].length; i++) {
	answerArr[i] = "_"
}

// Цикл, который будет повторяться до тех пор, пока не угаданы все буквы слова И пока кол-во попыток > 0;
while (remainingLetters > 0 && attemptsCount) {
	var playerLetter = prompt(`Угадайте букву или нажмите "Отмена" для выхода из игры.
	Подсказка: ${randomWord[1]}.
	Текущий прогресс: ${answerArr.join(" ")}.
	Осталось попыток: ${attemptsCount}.`, "")

	if (playerLetter === null) {
		break
	} else if (playerLetter.length !== 1) {
		alert("Пожалуйста, введите ОДНУ БУКВУ!")
	} else if (!/^[а-яё]+$/i.test(playerLetter)) {
		alert("Вводить можно только русские буквы!")
	} else if (allUsedLetters.includes(playerLetter)) {
		alert(`Вы уже вводили букву "${playerLetter.toUpperCase()}".`)
	} else {
		// Создаю переменную, которая отвечает, ввёл ли игрок правильный символ. Изначально равна false
		var usedCorrectLetter = false

		// Каждая введённая буква добавляется в общий массив всех введённых букв
		allUsedLetters.push(playerLetter)

		for (var j = 0; j < randomWord[0].length; j++) {
			if (randomWord[0][j] === playerLetter.toLowerCase() && answerArr[j] === "_") {
				// уменьшаю кол-во оставшихся символов
				remainingLetters--
				//заменяю "_" в массиве answeArr на угаданную игроком букву
				answerArr[j] = playerLetter.toLowerCase()
				// игрок ввёл правильную букву, изменяю false на true, дабы в дальнейшем кол-во оставшихся попыток не убавилось
				usedCorrectLetter = true
			}
		}

		// Кол-во оставшихся попыток должно убавляться только тогда, когда usedCorrectLetter === false
		if (!usedCorrectLetter) {
			attemptsCount--
		}
	}
}

if (answerArr.join("") === randomWord[0]) {
	alert(`Молодец! Загаданное слово было: "${randomWord[0][0].toUpperCase() + randomWord[0].slice(1)}".`)
} else {
	alert(`Эх, в следующий раз :C
	Загаданное слово было: "${randomWord[0][0].toUpperCase() + randomWord[0].slice(1)}".`)
}