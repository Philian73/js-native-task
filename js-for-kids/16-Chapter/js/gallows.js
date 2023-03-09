// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")
// присваиваем ширину холста в переменную
var canvasWidth = canvas.width
// присваиваем высоту холста в переменную
var canvasHeight = canvas.height
// задаём размер одной ячейки
var blockSize = 4
// размер шрифта на холсте
var canvasFont = canvasHeight / 20

// генерируем случайное слово
randomWord = pickRandomWord()
// массив в котором "_" столько, скольков букв в загаданном слове
var answerArr = setupAnswerArr(randomWord)
// кол-во оставшихся букв которые нужно угадать
var remainingLetters = randomWord[0].length
// кол-во попыток
var attemptsCount = 6
// пустой массив, в последствие в котором будут
// все введённые игроком буквы
var allUsedLetters = []

// рисую рамку вокруг холста
drawBorder()

while (remainingLetters > 0 && attemptsCount) {
	var playerLetter = getPlayerLetter()

	if (playerLetter === null) {
		break
	} else if (playerLetter.length !== 1) {
		alert("Пожалуйста, введите ОДНУ БУКВУ!")
	} else if (!/^[а-яё]+$/i.test(playerLetter)) {
		alert("Вводить можно только русские буквы!")
	} else if (allUsedLetters.includes(playerLetter.toLowerCase())) {
		alert(`Вы уже вводили букву "${playerLetter.toUpperCase()}".`)
	} else {
		// Кол-во открытых букв
		var correctPlayerLetter = updateGameState(playerLetter.toLowerCase(), randomWord, answerArr)
		remainingLetters -= correctPlayerLetter;

	}
}

showAnswerAndCongratulatePlayer(answerArr)



/**
 * Возвращает случайно выбранный массив, состоящий из:
 * - 0 - Загаданное слово
 * - 1 - Подсказка к нему
 * @date 2/28/2023 - 1:18:56 AM
 *
 * @returns {[]} 
 */
function pickRandomWord() {
	var words = [
		["машина", "На 4 колёсах"],
		["компьютер", "Любят программисты"],
		["телефон", "То без чего не может каждый в 21-м веке"],
		["вода", "2/3 массы нашего тела состоит из неё"],
		["энергетик", "Вредно, но бодрит и вкусно"],
	]

	return words[Math.floor(Math.random() * words.length)]
}

/**
 * Возвращает итоговый массив для заданного слова, в этом массиве 
 * изначально "_" столько, сколько букв в загаданном слове
 * @date 2/28/2023 - 1:20:59 AM
 *
 * @param {[]} randomWord - в качестве аргумента принимает случайный массив с загаданным
 * словом и подсказкой к нему.
 * @returns {[]}
 */
function setupAnswerArr(randomWord) {
	var answerArr = []

	for (var i = 0; i < randomWord[0].length; i++) {
		answerArr[i] = "_"
		ctx.fillRect((i + 1) * 39, canvasHeight - 50, 30, 4)
	}

	return answerArr
}

/**
 * Запрашивает ответ игрока с помощью prompt, а также выводит инфу:
 * - Подсказка
 * - Текущий прогресс
 * - Сколько осталось попыток
 * @date 2/28/2023 - 1:24:34 AM
 *
 * @returns {String} Возвращает букву, введённую игроком.
 */
function getPlayerLetter() {
	return prompt(`Угадайте букву или нажмите "Отмена" для выхода из игры.
	Подсказка: ${randomWord[1]}.
	Текущий прогресс: ${answerArr.join(" ")}.
	Осталось попыток: ${attemptsCount}.`)
}

function updateGameState(playerLetter, randomWord, answerArr) {
	// Изначально угаданных букв 0
	var usedCorrectLetter = 0

	// Пушим все введённые игроком буквы в массив
	allUsedLetters.push(playerLetter)
	// рисуем все введеные буквы (зачеркнутыми)
	drawUsedLetters()

	for (var i = 0; i < randomWord[0].length; i++) {
		if (randomWord[0][i] === playerLetter && answerArr[i] === "_") {
			// заменяем "_" на введённую игроком букву
			answerArr[i] = playerLetter
			// рисуем букву на холсте над прочерком
			drawCorrectLetter(randomWord[0][i], i)
			// Буква угадана, меняем значение
			usedCorrectLetter++
		}
	}

	// Если буква не была угадана
	if (!usedCorrectLetter) {
		// уменьшаем кол-во попыток
		attemptsCount--
		// рисуем часть тела
		drawHuman(attemptsCount)
	}

	return usedCorrectLetter
}

/**
 * Возвращает строку с заглавной буквы.
 * @date 2/28/2023 - 1:48:47 AM
 *
 * @param {String} word В качестве аргумента принимает любую строку, первым
 * символом которой является буква.
 * @returns {String}
 */
function capitalizeFirstLetter(word) {
	return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

/**
 * С помощью alert показывает игроку отгаданное слово, и если слово
 * было угадано - поздравляет с победой.
 * @date 2/28/2023 - 1:35:05 AM
 *
 * @param {[]} answerArr - Принимает итоговый массив
 */
function showAnswerAndCongratulatePlayer(answerArr) {
	if (answerArr.join("") === randomWord[0]) {
		alert(`Молодец! Загаданное слово было: "${capitalizeFirstLetter(randomWord[0])}".`)
	} else {
		alert(`Эх, в следующий раз :C
		Загаданное слово было: "${capitalizeFirstLetter(randomWord[0])}".`)
	}
}

/**
 * Рисует части человека в зависимости от кол-ва попыток
 * @date 3/6/2023 - 4:33:24 PM
 *
 * @param {*} attemptsCount в качестве аргумента принимает кол-во оставшихся попыток.
 * Чем меньше попыток - тем больше частей тела нарисует.
 */
function drawHuman(attemptsCount) {
	// Толщина линий
	ctx.lineWidth = 4
	// Начинаем путь
	ctx.beginPath()
	switch (attemptsCount) {
		case 5:
			// рисуем голову при кол-ве попыток: 5
			ctx.strokeRect(20, 20, 20, 20)
			break
		case 4:
			// Рисуем туловище при кол-ве попыток: 4
			ctx.moveTo(30, 40)
			ctx.lineTo(30, 80)
			break
		case 3:
			// Рисуем левую ногу при кол-ве попыток: 3
			ctx.moveTo(30, 80)
			ctx.lineTo(10, 110)
			break
		case 2:
			// Рисуем правую ногу при кол-ве попыток: 2
			ctx.moveTo(30, 80)
			ctx.lineTo(50, 110)
			break
		case 1:
			// Рисуем правую руку при кол-ве попыток: 1
			ctx.moveTo(30, 60)
			ctx.lineTo(50, 50)
			break
		case 0:
			// Рисуем левую руку, когда игра окончена и попыток: 0
			ctx.moveTo(30, 60)
			ctx.lineTo(10, 50)
			break
	}
	// Запускаем рисовалку
	ctx.stroke()
}

/**
 * Рисует границу вокруг холста, равную 1 ячейке
 * - по умолчанию [blockSize=10]
 * @date 09.03.2023 - 23:57:39
 */
function drawBorder() {
	// рисуем границу толщиной в 1 "ячейку"
	ctx.fillRect(0, 0, canvasWidth, blockSize)
	ctx.fillRect(0, canvasHeight - blockSize, canvasWidth, blockSize)
	ctx.fillRect(0, blockSize, blockSize, canvasHeight - blockSize)
	ctx.fillRect(canvasWidth - blockSize, blockSize, blockSize, canvasHeight - blockSize)
}

/**
 * Рисует правильную букву на её место
 * @date 10.03.2023 - 01:04:49
 */
function drawCorrectLetter(letter, i) {
	ctx.font = `${canvasFont * 1.5}px Courier`
	ctx.fillText(`${letter.toUpperCase()}`, ((i + 1) * 40), canvasHeight - 60)
}

/**
 * Показывает на холсте введённую зачёркнутую букву
 * @date 10.03.2023 - 01:03:17
 */
function drawUsedLetters() {
	for (var i = 0; i < allUsedLetters.length; i++) {
		ctx.font = `${canvasFont * 1.5}px Courier`
		ctx.fillText(`${allUsedLetters[i].toUpperCase()}`, canvasWidth - 60, (i + 1) * 25)
		ctx.moveTo(canvasWidth - 40, (i * 25) + 15)
		ctx.lineTo(canvasWidth - 60, (i * 25) + 15)
		ctx.stroke()
	}
}