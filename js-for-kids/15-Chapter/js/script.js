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
	40: "down", //вниз
	67: "size down", //c
	86: "size up", //v
	88: "speed up", //x
	90: "speed down", //z
}
// создаём объект скоростей в зависимости от кода клавиши (1-9)
var speeds = {
	49: 1,
	50: 2,
	51: 3,
	52: 4,
	53: 5,
	54: 6,
	55: 7,
	56: 8,
	57: 9,
}

// создаём пустой объект, который будет запоминать нажатие клавиши
var keyStates = {}

// Вешаем обработчик нажатия клавиш
$("body").keydown(function (e) {
	// заносим в переменную значение ключа (совпадает с keyCode)
	var direction = keyActions[e.keyCode]
	// заносим в переменную значение ключа (совпадает с keyCode)
	var speed = speeds[e.keyCode]

	// задаем директорию мячу
	ball.doAction(direction)
	// задаем множитель скорости
	ball.setSpeed(speed)
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

// Создаём конструтор "Мяча"
function Ball() {
	this.x = width / 2
	this.y = height / 2
	this.speed = 1
	this.xSpeed = 5
	this.ySpeed = 0
	this.size = 10
}
// создаём метод отрисовки мяча
Ball.prototype.draw = function () {
	// рисуем мяч
	drawCircle(this.x, this.y, this.size, true)
}
// создаём метод перемещения мяча
Ball.prototype.move = function () {
	// координаты перемещения по горизонтали равны скорости по горизонтали
	this.x += this.xSpeed * this.speed
	// координаты перемещения по вертикали равны скорости по вертикали
	this.y += this.ySpeed * this.speed

	if (this.x < 0 || this.x > width) {
		this.xSpeed = -this.xSpeed
	} else if (this.y < 0 || this.y > height) {
		this.ySpeed = -this.ySpeed
	}
}
// создаём метод установки директории
Ball.prototype.doAction = function (direction) {
	switch (direction) {
		case "up":
			this.xSpeed = 0
			this.ySpeed = -5
			break
		case "down":
			this.xSpeed = 0
			this.ySpeed = 5
			break
		case "left":
			this.xSpeed = -5
			this.ySpeed = 0
			break
		case "right":
			this.xSpeed = 5
			this.ySpeed = 0
			break
		case "stop":
			this.xSpeed = 0
			this.ySpeed = 0
			break
		case "speed up":
			if (this.speed < 9) this.speed++
			break
		case "speed down":
			if (this.speed > 1) this.speed--
			break
		case "size up":
			if (this.size < 30) this.size++
			break
		case "size down":
			if (this.size > 10) this.size--
			break
	}
}
Ball.prototype.setSpeed = function (speed) {
	// если клавиша есть в объекте (не undefined)
	if (speed !== undefined) {
		// меняем множитель скорости
		this.speed = speed
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