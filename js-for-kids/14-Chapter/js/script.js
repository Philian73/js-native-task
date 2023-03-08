// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")
// получаем ширину холста
var width = canvas.width
// получаем высоту холста
var height = canvas.height

var x = width / 2
var y = height / 2

setInterval(function () {
	ctx.clearRect(0, 0, width, height)

	drawBee(x, y)
	x = update(x)
	y = update(y)

	ctx.strokeRect(0, 0, width, height)
}, 30)



/**
 * Рисует полную окружность
 * @date 07.03.2023 - 22:19:30
 *
 * @param {Number} x координаты по горизонтали
 * @param {Number} y координаты по вертикали
 * @param {Number} radius радиус окружности
 * @param {Boolean} fillCircle 
 * **true** - заполнить
 * / **false** - не заполнять
 */
function drawCircle(x, y, radius, fillCircle) {
	// начинаем путь
	ctx.beginPath()
	// рисуем ПОЛНУЮ окружность
	ctx.arc(x, y, radius, 0, Math.PI * 2, false)

	// Если fillCircle true, то заполняем
	// иначе просто рисуем контуром
	fillCircle ? ctx.fill() : ctx.stroke()
}

/**
 * Рисует пчёлку
 * @date 08.03.2023 - 00:43:58
 *
 * @param {Number} x Координаты по горизонтали
 * @param {Number} y Координаты по вертикали
 */
function drawBee(x, y) {
	// устанавливаем толщину линий
	ctx.lineWidth = 2
	// для строковых ставим черный цвет
	ctx.strokeStyle = "Black"
	// для заполненных жёлтый (золотой) цвет
	ctx.fillStyle = "Gold"

	// рисуем окружность заполненную желтым (туловище)
	drawCircle(x, y, 8, true)
	// рисуем черный контур окружности выше
	drawCircle(x, y, 8, false)
	// рисуем левое крыло
	drawCircle(x - 5, y - 11, 5, false)
	// рисуем правое крыло
	drawCircle(x + 5, y - 11, 5, false)
	// рисуем левый глаз
	drawCircle(x - 2, y - 1, 2, false)
	// рисуем правый глаз
	drawCircle(x + 2, y - 1, 2, false)
}

/**
 * Изменяет переданную координату от -2 до 2
 * @date 08.03.2023 - 01:04:58
 *
 * @param {Number} coordinate 
 * @returns {Number} возвращает новую координату от -2 до 2
 */
function update(coordinate) {
	var offset = Math.random() * 4 - 2
	coordinate += offset

	if (coordinate > width) {
		coordinate = width
	}
	if (coordinate > height) {
		coordinate = height
	}
	if (coordinate < 0) {
		coordinate = 0
	}

	return coordinate
}