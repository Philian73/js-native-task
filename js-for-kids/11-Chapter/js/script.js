// Находим картинку с id="map" и присваиваем в переменную
var map = $('#map')
// Нажодим кнопку "Режим админа"
var admin = $("#admin")
// Находим ширину картинки и присваиваем в переменную
var width = map[0].clientWidth
// Находим высоту картинки и присваиваем в переменную
var height = map[0].clientHeight
// Изначальное кол-во кликов по карте
var clicks = 0
// Изначальное кол-во попыток
var attemptsCount = 20
// Запоминаем кол-во попыток, именно из этой переменной мы будем вычитать в дальнейшем
var thisAt = attemptsCount

// Случайная позиция клада
var target = {
	x: getRandomNumber(width),
	y: getRandomNumber(height),
}

// выводим текст в виде кол-во попыток attemptsCount
$("#attempts").text(attemptsCount)

// Добавляем обработчик кликов элементу img
map.click(function (e) {
	// получаем расстояние от места клика до клада
	var distance = getDistance(e, target)
	// преобразуем это расстояние в подсказку
	var distanceHint = getDistanceHint(distance)

	// увеличиваем кол-во кликов с каждым нажатием
	clicks++
	//Вычитаем кол-во попыток
	thisAt--
	// обновляем информацию о кол-ве попыток в html
	$("#attempts").text(thisAt)

	// Если клик был достаточно близко, сообщаем игроку о том, что он победил
	if (distance < 8) {
		alert(`Клад найден! Кликов сделано: ${clicks}`)
		startGame()
	} else if (!thisAt) {
		alert("Конце игры! Кликай на карту и снова испытай свою удачу)")
		startGame()
	} else {
		// иначе записываем в элемент #distance подсказку
		$("#distance").text(distanceHint)
	}
})

admin.click(function () {
	// Выводим сообщение
	alert("Место где закопан клад теперь показывается на карте!")
	// Добавляем span с id test
	$("#game").append('<span id="test"></span>')
	// Находим span с id test
	var test = document.querySelector("#test")
	// Добавляем ему стиль left с x позицией клада
	test.style.left = target.x + "px"
	// Добавляем ему стиль top с y позицией клада
	test.style.top = target.y + "px"
	// Делаем span видимым
	test.style.display = "inline-block"
	// После нажатия на кнопку делаем её неактивной
	admin[0].disabled = true
})



/**
 * Запускает игру. Обнуляет кол-во кликов, задает новую позицию кладу и т.п.
 * @date 02.03.2023 - 14:35:43
 */
function startGame() {
	// Возвращаем кол-во попыток на изначальное, указанное в attemptsCount
	thisAt = attemptsCount
	// Обновляем текст на изначальное кол-во попыток
	$("#attempts").text(attemptsCount)
	// Обновляем текст подсказки
	$("#distance").text("Тыкни")
	// Обнуляем кол-во кликов
	clicks = 0;
	// Задаём новую позицию кладу
	target.x = getRandomNumber(width)
	target.y = getRandomNumber(height)
	// Отключаем неактивность у кнопки "Режим админа"
	admin[0].disabled = false

	// Если кнопка была нажата и был показан ответ, удалить ответ
	if ($("#test")) {
		$("#test").remove()
	}
}

/**
 * Функция генерирует случайное число от 0 до size (не включая его)
 * @date 01.03.2023 - 16:45:21
 *
 * @param {Number} size
 * @returns {Number}
 */
function getRandomNumber(size) {
	return Math.floor(Math.random() * size)
}

/**
 * Вычисляет расстояние от клика (e) до клада (target)
 * @date 01.03.2023 - 21:05:20
 *
 * @param {{}} e
 * @param {{}} target
 * @returns {Number} возвращает квадратный корень гиппотинузы
 */
function getDistance(e, target) {
	var diffX = e.offsetX - target.x
	var diffY = e.offsetY - target.y

	return Math.sqrt((diffX * diffX) + (diffY * diffY))
}

/**
 * Получаем строку подсказки для расстояния
 * @date 01.03.2023 - 21:08:01
 *
 * @param {Number} distance в качестве аргумента принимает функцию возвращенное значение getDistance
 * @returns {("Обожжёшься!" | "Очень горячо" | "Горячо" | "Тепло" | "Холодно" | "Очень холодно" | "Замёрзнешь!")}
 */
function getDistanceHint(distance) {
	switch (true) {
		case (distance < 16):
			return "Обожжёшься!"
		case (distance < 32):
			return "Очень горячо"
		case (distance < 64):
			return "Горячо"
		case (distance < 128):
			return "Тепло"
		case (distance < 256):
			return "Холодно"
		case (distance < 360):
			return "Очень холодно"
		case (distance < 512):
			return "Очень-очень холодно!"
		default:
			return "Замёрзнешь!"
	}
}