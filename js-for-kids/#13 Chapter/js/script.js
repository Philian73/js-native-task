var canvas = document.querySelector('#canvas')
var ctx = canvas.getContext("2d")

var points = [[50, 50], [50, 100], [100, 100], [100, 50], [50, 50]]
var mysteryPoints = [[50, 50], [50, 100], [25, 120], [100, 50],
[70, 90], [100, 90], [70, 120]]

// drawSnowman(240, 180)
// drawPoints(points)
// drawPoints(mysteryPoints)
$("#canvas").mousedown(function () {
	$(this).mousemove(function (e) {
		circle(e.offsetX, e.offsetY, 3, true)
	})
	$(this).click(function (e) {
		circle(e.offsetX, e.offsetY, 3, true)
	})
}).mouseup(function () {
	$(this).off('mousemove')
})



/**
 * Рисует окружность
 * @date 3/6/2023 - 3:13:11 AM
 *
 * @param {Number} x Координаты по горизонтали
 * @param {Number} y Координаты по вертикали
 * @param {Number} radius Радиус от центра
 * @param {Boolean} fillCircle 
 * **True** - заполнить окружность
 * / **False** - Не заполнять
 */
function circle(x, y, radius, fillCircle) {
	// Начинаем путь
	ctx.beginPath()
	// Рисуем окружность (полную)
	ctx.arc(x, y, radius, 0, Math.PI * 2, false)
	// Если аргумент fillCircle TRUE, заполняем окружность цветом
	if (fillCircle) {
		ctx.fill()
	} else {
		// иначе не заполняем, а строковая функция
		ctx.stroke()
	}
}

/**
 * Рисует снеговика в нужных координатах
 * @date 3/6/2023 - 3:16:20 AM
 *
 * @param {Number} x Координаты по горизнотали
 * @param {Number} y Координаты по вертикали
 */
function drawSnowman(x, y) {
	// Задаем ширину линий в шесть пикселей
	ctx.lineWidth = 6
	// Рисуем голову
	circle(x, y + 5, 40)
	// Рисуем низ
	circle(x, y + 95, 50)
	// Рисуем левый глаз
	circle(x - 15, y - 5, 6, true)
	// Рисуем правый глаз
	circle(x + 15, y - 5, 6, true)
	// Рисуем верхнюю пуговицу
	circle(x, y + 70, 6, true)
	// Рисуем пуговицу посередине
	circle(x, y + 95, 6, true)
	// Рисуем нижнюю пуговицу
	circle(x, y + 120, 6, true)
	// Всё что пойдет дальше, будет иметь цвет заполнения Оранжевый
	ctx.fillStyle = "Orange"
	// Рисуем нос
	circle(x, y + 10, 6, true)
}

/**
 * Рисует по массиву с координатами точек
 * @date 3/6/2023 - 3:38:42 AM
 *
 * @param {[[x, y], [x, y]...]} arr 
 */
function drawPoints(arr) {
	// начинаем путь
	ctx.beginPath()
	// начальная точка
	ctx.moveTo(arr[0][0], arr[0][1])
	// проводим все точки после первой которые есть в массиве
	for (var i = 1; i < arr.length; i++) {
		ctx.lineTo(arr[i][0], arr[i][1])
	}
	// рисуем
	ctx.stroke()
}