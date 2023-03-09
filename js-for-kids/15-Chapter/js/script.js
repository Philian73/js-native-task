// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")
// получаем ширину холста
var width = canvas.width
// получаем ширину холста
var height = canvas.height

// создаём мяч через конструктор
var ball = new Ball()

// создаём объект с добавлением описания нажатой клавише (её keyCode)
var keyActions = {
	32: "stop", //пробел
	37: "left", //влево
	38: "up", //вверх
	39: "right", //вправо
	40: "down" //вниз
}

// Вешаем обработчик нажатия клавиш
$("body").keydown(function (e) {
	// присваиваем в переменную ключ-значение с объекта keyAcrions
	// в зависимости от нажатой клавиши (e.keyCode)
	var direction = keyActions[e.keyCode]
	// Вызываем метод с прототипа, который в зависимости
	// от переданной директории, меняет направление мяча
	ball.setDirection(direction)
})

setInterval(function () {
	// очищаем весь холст
	ctx.clearRect(0, 0, width, height)
	// рисуем мяч
	ball.draw()
	// перемешаем мяч
	ball.move()
	// рисуем рамку для всего холста
	ctx.strokeRect(0, 0, width, height)
}, 30)

// Создаём конструтора "Мяча"
function Ball() {
	this.x = width / 2
	this.y = height / 2
	this.xSpeed = 5
	this.ySpeed = 0
}
// создаём метод отрисовки мяча
Ball.prototype.draw = function () {
	// рисуем мяч
	drawCircle(this.x, this.y, 10, true)
}
// создаём метод перемещения мяча
Ball.prototype.move = function () {
	// координаты перемещения по горизонтали равны скорости по горизонтали
	this.x += this.xSpeed
	// координаты перемещения по вертикали равны скорости по вертикали
	this.y += this.ySpeed

	// если координаты по горизонтали < 0
	if (this.x < 0) {
		// меняем координаты на максимальную ширину холста
		// то бишь перемещаем мяч в правую сторону холста
		this.x = width
		// если же координаты больше ширины холста
	} else if (this.x > width) {
		// меняем на 0, то бишь перемещаем мяч в левую сторону холста
		this.x = 0
	}

	// если координаты по вертикали < 0
	if (this.y < 0) {
		// меняем координаты на максимальную высоту холста
		this.y = height
		// если же координаты больше высоты холста
	} else if (this.y > height) {
		// меняем на 0, то бишь перемещаем мяч вверх холста
		this.y = 0
	}
}
// создаём метод установки директории
Ball.prototype.setDirection = function (direction) {
	// если передана директория "up"
	if (direction === "up") {
		// меняем скорость по горизонтали на 0
		this.xSpeed = 0
		// меняем скорость по вертикали на -5 (вверх)
		this.ySpeed = -5
		// если же передана директория "down"
	} else if (direction === "down") {
		// меняем скорость по горизонтали на 0
		this.xSpeed = 0
		// меняем скорость по вертикали на 5 (вниз)
		this.ySpeed = 5
		// если же передана директория "left"
	} else if (direction === "left") {
		// меняем скорость по горизонтали на -5 (влево)
		this.xSpeed = -5
		// меняем скорость по вертикали на 0
		this.ySpeed = 0
		// если же передана директория "right"
	} else if (direction === "right") {
		// меняем скорость по горизонтали на 5 (вправо)
		this.xSpeed = 5
		// меняем скорость по вертикали на 0
		this.ySpeed = 0
		// Если передана директория "stop"
	} else if (direction === "stop") {
		// меняем скорость по горизонтали на 0
		this.xSpeed = 0
		// меняем скорость по вертикали на 0
		this.ySpeed = 0
	}
}



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