var words = [
	["машина", "На 4 колёсах"],
	["компьютер", "Любят программисты"],
	["телефон", "То без чего не может каждый в 21-м веке"],
	["вода", "2/3 массы нашего тела состоит из неё"],
	["энергетик", "Вредно, но бодрит и вкусно"],
]
var randomWord = words[Math.floor(Math.random() * words.length)]
var answerArr = []
var remainingLetters = randomWord[0].length
var attemptsCount = 6
var allUsedLetters = []

for (var i = 0; i < randomWord[0].length; i++) {
	answerArr[i] = "_"
}

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
		var usedCorrectLetter = false

		allUsedLetters.push(playerLetter)

		for (var j = 0; j < randomWord[0].length; j++) {
			if (randomWord[0][j] === playerLetter.toLowerCase() && answerArr[j] === "_") {
				remainingLetters--
				answerArr[j] = playerLetter.toLowerCase()
				usedCorrectLetter = true
			}
		}

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