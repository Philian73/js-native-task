//* TASK #2 ==================================================================
function areArraysSame(arr1, arr2) {
	// Если длина массивов разная, досрочный выход с возвращением false
	if (arr1.length !== arr2.length) {
		return false
	}

	/*
	Цикл, который проверяет, сходится ли каждый элемент 
	массива arr1 c arr2, если нет - досрочный выход из функции
	и возвращение false
	*/
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false
	}

	// По умолчанию возвращает true
	return true
}

//* TASK #3 ==================================================================
// Загаданное слово
var randomWord = pickRandomWord()
// Итоговый массив
var answerArr = setupAnswerArr(randomWord)
// Сколько букв осталось угадать
var remainingLetters = randomWord[0].length
// Кол-во попыток
var attemptsCount = 6
// Все введённые игроком буквы
var allUsedLetters = []

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

/**
 * Обновляет answerArr согласно ответу игрока (playerLetter)
 * @date 2/28/2023 - 1:26:12 AM
 *
 * @param {String} playerLetter - Введенная игроком буква
 * @param {[]} randomWord - Случайно загаданный массив со словом и подсказкой к нему
 * @param {[]} answerArr - Итоговый массив
 * @returns {number} Возвращает число, обозначающее, сколько раз буква playerLetter
 * встречается в слове
 */
function updateGameState(playerLetter, randomWord, answerArr) {
	// Изначально угаданных букв 0
	var usedCorrectLetter = 0

	// Пушим все введённые игроком буквы в массив
	allUsedLetters.push(playerLetter)

	for (var i = 0; i < randomWord[0].length; i++) {
		if (randomWord[0][i] === playerLetter && answerArr[i] === "_") {
			// заменяем "_" на введённую игроком букву
			answerArr[i] = playerLetter
			// Буква угадана, меняем значение
			usedCorrectLetter++
		}
	}

	// Если буква не была угадана, уменьшаем кол-во попыток
	if (usedCorrectLetter === 0) {
		attemptsCount--
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
