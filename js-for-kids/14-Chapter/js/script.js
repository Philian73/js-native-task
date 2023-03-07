// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")



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

function drawBee(x, y) {
	ctx.lineWidth = 2
	ctx.strokeStyle = "Black"
	ctx.fillStyle = "Gold"

	drawCircle(x, y, 8, true)
	drawCircle(x, y, 8, false)
}

drawBee(120, 120)