// Находим картинку с id="map" и присваиваем в переменную
var map = $('#map')
// Находим ширину картинки и присваиваем в переменную
var width = map[0].clientWidth
// Находим высоту картинки и присваиваем в переменную
var height = map[0].clientHeight
// Изначальное кол-во кликов по карте
var clicks = 0

// Создаём объект, который содержит случайные координаты X и Y
var target = {
	x: getRandomNumber(width),
	y: getRandomNumber(height),
}

// Создаём обработчик кликов
map.click(function (e) {
	var distance = getDistance(e, target)
	var distanceHint = getDistanceHint(distance)

	clicks++

	if (distance < 8) {
		alert(`Клад найден! Кликов сделано: ${clicks}`)
	} else {
		$("#distance").text(distanceHint)
	}
})



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
 * Вычисляет расстояние между e(клик) и target по гиппотинузе
 * @date 01.03.2023 - 21:05:20
 *
 * @param {*} e
 * @param {*} target
 * @returns {*}
 */
function getDistance(e, target) {
	var diffX = e.offsetX - target.x
	var diffY = e.offsetY - target.y

	return Math.sqrt((diffX * diffX) + (diffY * diffY))
}

/**
 * Отображаем подсказку, насколько близко кликнул игрок по отношению к "кладу"
 * @date 01.03.2023 - 21:08:01
 *
 * @param {Number} distance в качестве аргумента принимает функцию возвращенное значение getDistance
 * @returns {("Обожжёшься!" | "Очень горячо" | "Горячо" | "Тепло" | "Холодно" | "Очень холодно" | "Замёрзнешь!")}
 */
function getDistanceHint(distance) {
	switch (true) {
		case (distance < 10):
			return "Обожжёшься!"
		case (distance < 20):
			return "Очень горячо"
		case (distance < 40):
			return "Горячо"
		case (distance < 80):
			return "Тепло"
		case (distance < 160):
			return "Холодно"
		case (distance < 320):
			return "Очень холодно"
		default:
			return "Замёрзнешь!"
	}
}