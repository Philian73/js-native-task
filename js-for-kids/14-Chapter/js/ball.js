// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")
// получаем ширину холста
var width = canvas.width
// получаем высоту холста
var height = canvas.height
// различные цвета
var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"]

var balls = []

for (var i = 0; i < 10; i++) {
	balls.push(new Ball())
}

setInterval(function () {
	// очищаем весь холст
	ctx.clearRect(0, 0, width, height)

	for (var i = 0; i < balls.length; i++) {
		// рисуем мяч
		balls[i].draw()
		// перемещаем
		balls[i].move()
		// проверяем координаты на > 0 < 200
		balls[i].checkCollision()
	}

	// рисуем чёрную рамку
	ctx.strokeRect(0, 0, width, height)
}, 30)

// Создаём конструктор
function Ball() {
	this.x = width / 2
	this.y = height / 2
	this.xSpeed = randomSpeed()
	this.ySpeed = randomSpeed()
	this.color = randomWord(colors)
}
// Создаём ему метод в прототип, который будет рисовать мяч
Ball.prototype.draw = function () {
	ctx.fillStyle = this.color
	drawCircle(this.x, this.y, 3, true)
}
// Создаём ему метод в прототип, который будет перемещать мяч
Ball.prototype.move = function () {
	// меняем положение по горизонтали на скорость по горизонтали
	this.x += this.xSpeed;
	// меняем положение по вертикали на скорость по вертикали
	this.y += this.ySpeed;
}
// Создаём ему метод, который проверяет X и Y координаты И:
Ball.prototype.checkCollision = function () {
	// Если горизонтальное положение мяча меньше 0 или больше width
	if (this.x < 0 || this.x > width) {
		//инвертируем (то бишь, умножаем на -1)
		//положительное делаем отрицательным и наоборот
		this.xSpeed = -this.xSpeed
	}
	// Если вертикальное положение мяча меньше 0 или больше height
	if (this.y < 0 || this.y > height) {
		//делаем то же самое, инвертируем
		this.ySpeed = -this.ySpeed
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

/**
 * случайная скорость от -5 до 5
 * @date 08.03.2023 - 18:02:48
 *
 * @returns {Number} Число от -5 до 5 (включительно)
 */
function randomSpeed() {
	return Math.floor(Math.random() * 11 - 5)
}

/**
 * Функция возвращает случайный элемент массива
 * @date 08.03.2023 - 20:58:07
 *
 * @param {["blue", "red"...]} arr
 * @returns {*}
 */
function randomWord(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}