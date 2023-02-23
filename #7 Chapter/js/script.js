var words = [
	["машина", "На 4 колёсах"],
	["компьютер", "Любят программисты"],
	["телефон", "То без чего не может каждый в 21-м веке"],
	["анал", "То что Даша даст мне"],
	["энергетик", "Вредно, но бодрит и вкусно"],
]
var randomWord = words[Math.floor(Math.random() * words.length)]
var answerArr = []
var remainingLetters = randomWord[0].length
var attemptsCount = 6
var userCorrectLetters = []

for (var i = 0; i < randomWord[0].length; i++) {
	answerArr[i] = "_"
}

while (remainingLetters > 0 && attemptsCount > 0) {
	var playerLetter = prompt(`Угадайте букву или нажмите "Отмена" для выхода из игры.
	Подсказка: ${randomWord[1]}
	Текущий прогресс: ${answerArr.join(" ")}
	Осталось попыток: ${attemptsCount}`, "")
	if (playerLetter === null) {
		break;
	} else if (playerLetter.length !== 1) {
		alert("Пожалуйста, введите одну БУКВУ.")
	} else if (userCorrectLetters.includes(playerLetter.toLowerCase())) {
		alert("Вы уже вводили эту букву. Попробуйте другую.")
	} else {
		userCorrectLetters.push(playerLetter.toLowerCase())
		var correctGuess = false;
		for (var j = 0; j < randomWord[0].length; j++) {
			if (randomWord[0][j] === playerLetter.toLowerCase() && answerArr[j] === "_") {
				answerArr[j] = playerLetter.toLowerCase()
				remainingLetters--;
				correctGuess = true;
			}
		}
		if (!correctGuess) {
			attemptsCount--;
		}
	}
}

if ((answerArr.join("")) === randomWord[0]) {
	alert(`Молодец! Ты отгадал слово "${randomWord[0][0].toUpperCase() + randomWord[0].slice(1)}".`)
} else {
	alert(`Эх, в следующий раз :C
	Загаданное слово было: "${randomWord[0][0].toUpperCase() + randomWord[0].slice(1)}".`)
}