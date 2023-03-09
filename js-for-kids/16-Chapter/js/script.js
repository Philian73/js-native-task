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
	// shake.draw()
	// нарисовать яблоко
	// apple.draw()
	// нарисовать границу холста
	drawBorder()
}, 100)



// Конструктор змеи
function Shake() {

}

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