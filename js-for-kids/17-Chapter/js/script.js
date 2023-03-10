// находим элемент с id="canvas"
var canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
var ctx = canvas.getContext("2d")
// присваиваем ширину холста в переменную
var canvasWidth = canvas.width
// присваиваем высоту холста в переменную
var canvasHeight = canvas.height
// задаём размер одной ячейки
var blockSize = 10
var widthInBlocks = canvasWidth / blockSize
var heightInBlocks = canvasHeight / blockSize
// размер шрифта на холсте
var canvasFont = canvasHeight / 20
// Изначальный счёт игрока
var playerScore = 0

// Каждые 100 миллисекунд
var intervalId = setInterval(function () {
	// очищаем холст
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	// нарисовать счёт
	drawScore()
	// текущее направление змеи
	// shake.move()
	// нарисовать змею
	shake.draw()
	// нарисовать яблоко
	// apple.draw()
	// нарисовать границу холста
	drawBorder()
}, 100)

// траектории
var directions = {
	ArrowLeft: "left",
	KeyA: "left",
	ArrowUp: "up",
	KeyW: "up",
	ArrowRight: "right",
	KeyD: "right",
	ArrowDown: "down",
	KeyS: "down"
}
// нажатые клавиши (только те которые есть в directions)
var keyPressed = {}

// обработчик нажатия клавиш
document.addEventListener("keydown", function (e) {
	// проверяем что нажатая клавиша существует в объекте directions
	// и что у нажатой клавиши стоит флаг false
	if (directions.hasOwnProperty(e.code) && !keyPressed[e.code]) {
		// новая траектория
		var newDirection = directions[e.code]

		// устанавливаем флаг true нажатой клавише
		keyPressed[e.code] = true
		// устанавливаем змейке новую траекторию
		shake.setDirection(newDirection)
	}
})
document.addEventListener("keyup", function (e) {
	if (directions.hasOwnProperty(e.code) && keyPressed[e.code]) {
		// клавиша отпущена, ставим ей флаг false
		keyPressed[e.code] = false
	}
})


// Конструктор ячейки
function Block(col, row) {
	this.col = col
	this.row = row
}
Block.prototype.drawSquare = function (color) {
	// вычисляем координаты по горизонтали
	var x = this.col * blockSize
	// вычисляем координаты по вертикали
	var y = this.row * blockSize

	// задаём цвет заливки
	ctx.fillStyle = color
	// рисуем квадрат
	ctx.fillRect(x, y, blockSize, blockSize)
}
Block.prototype.drawCircle = function (color) {
	// координаты центра окружности по горизонтали
	var centerX = this.col * blockSize + blockSize / 2
	// координаты центра окружности по вертикали
	var centerY = this.row * blockSize + blockSize / 2

	// задаём цвет заливки
	ctx.fillStyle = color
	// рисуем окружность
	drawCircle(centerX, centerY, blockSize / 2, true)
}
Block.prototype.equal = function (otherBlock) {
	// возвращаем true или false в зависимости от того
	// совпадают ли координаты блока с другим блоком
	return this.col === otherBlock.col && this.row === otherBlock.row
}

// Конструктор змеи
function Shake() {
	// массив сегментов змейки
	this.segments = [
		new Block(7, 5),
		new Block(6, 5),
		new Block(5, 5),
	]

	// текущее направление
	this.direction = "right"
	// следующее направление
	this.nextDirection = "right"
}
Shake.prototype.draw = function () {
	for (var segment of this.segments) {
		// рисую каждый сегмент змеи синим цветом
		segment.drawSquare("Blue")
	}
}
Shake.prototype.move = function () {
	// текущая голова змеи
	var head = this.segments[0]
	// новая голова змеи
	var newHead

	// текущее направление меняется на следующее направление
	this.direction = this.nextDirection

	switch (this.direction) {
		case "right":
			newHead = new Block(head.col + 1, head.row)
			break
		case "down":
			newHead = new Block(head.col, head.row + 1)
			break
		case "left":
			newHead = new Block(head.col - 1, head.row)
			break
		case "up":
			newHead = new Block(head.col, head.row - 1)
			break
	}

	// если змея врезалась в границу или свой хост
	if (this.checkCollision(newHead)) {
		gameOver()
		return
	}

	// добавляем новую голову в начало массива
	this.segments.unshift(newHead)

	// если новая голова соответсвует позиции яблока
	if (newHead.equal(apple.position)) {
		// увеличиваем счёт игрока
		playerScore++
		// перемещаем яблоко в случайное место
		apple.move()
	} else {
		// иначе удаляем последнюю часть хвоста
		this.segments.pop()
	}
}
Shake.prototype.checkCollision = function (head) {
	// true если змейка столкнётся с левой стеной
	var leftCollision = (head.col === 0)
	// true если змейка столкнётся с верхней стеной
	var topCollision = (head.row === 0)
	// true если змейка столкнётся с правой стеной
	var rightCollision = (head.col === widthInBlocks - 1)
	// true если змейка столкнётся с нижней стеной
	var bottomCollision = (head.row === heightInBlocks - 1)

	// столкнулась ли змейка с какой-нибудь из СТЕНОК
	var wallCollision =
		leftCollision ||
		topCollision ||
		rightCollision ||
		bottomCollision;

	// столкнулась ли змейка с собственным телом
	// изначально false
	var selfCollision = false

	// проверка на то, находится ли голова змеи
	// в каком-нибудь из сегментов змеи
	for (segment of this.segments) {
		if (head.equal(segment)) {
			// если да, меняем значение на true (СТОЛКНУЛАСЬ)
			selfCollision = true
		}
	}

	// метод возвращает в итоге true если какая-то проверка прошла
	// либо false если ни одна проверка не прошла
	return wallCollision || selfCollision
}
Shake.prototype.setDirection = function (newDirection) {
	var validDirections = {
		"left": ["up", "down"],
		"right": ["up", "down"],
		"up": ["left", "right"],
		"down": ["left", "right"],
	}

	if (validDirections[this.direction].includes(newDirection)) {
		this.nextDirection = newDirection
	}
}
var shake = new Shake()

// Конструктор яблока
function Apple() {

}



/**
 * Рисует границу вокруг холста, равную 1 ячейке
 * - по умолчанию [blockSize=10]
 * @date 09.03.2023 - 23:57:39
 */
function drawBorder() {
	// задаём цвет наполнения серый
	ctx.fillStyle = "Gray"
	// рисуем границу толщиной в 1 "ячейку"
	ctx.fillRect(0, 0, canvasWidth, blockSize)
	ctx.fillRect(0, canvasHeight - blockSize, canvasWidth, blockSize)
	ctx.fillRect(0, blockSize, blockSize, canvasHeight - blockSize)
	ctx.fillRect(canvasWidth - blockSize, blockSize, blockSize, canvasHeight - blockSize)
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
 * Показывает/обновляет счёт игрока
 * @date 10.03.2023 - 00:02:27
 */
function drawScore() {
	// задаём размер шрифта счёта
	ctx.font = `${canvasFont}px Courier`
	// задаём цвет
	ctx.fillStyle = "Black"
	// выравнивание относительно базовой линии
	ctx.textBaseline = "top"
	// текст "Счёт:"
	ctx.fillText("Счёт:", blockSize, blockSize)
	// всё что идёт дальше, будет красного цвета
	ctx.fillStyle = "Red"
	// текст "число очков"
	ctx.fillText(playerScore, canvasHeight / 5.5, blockSize * 1.12)
}

/**
 * Конец игры. Останавливает "анимацию" (сет-интервал)
 * и выводит надпись "Конец игры"
 * @date 10.03.2023 - 00:02:52
 */
function gameOver() {
	// останавливаем сет-интервал
	clearInterval(intervalId)
	// задаём размера шрифта *3 от базового (canvasFont)
	ctx.font = `${canvasFont * 3}px Courier`
	// задаём цвет "Чёрный"
	ctx.fillStyle = "Black"
	// выравнивание текста по центру
	ctx.textAlign = "center"
	// выравнивание относительно базовой линии
	ctx.textBaseline = "middle"
	// текст "Конец игры"
	ctx.fillText("Конец игры", canvasWidth / 2, canvasHeight / 2)
}