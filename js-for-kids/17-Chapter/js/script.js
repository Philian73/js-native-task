// Конструктор ячейки
class Block {
	constructor(col, row) {
		this.col = col
		this.row = row
	}
	drawSquare(color) {
		// вычисляем координаты по горизонтали
		const x = this.col * blockSize
		// вычисляем координаты по вертикали
		const y = this.row * blockSize

		// задаём цвет заливки
		ctx.fillStyle = color
		// рисуем квадрат
		ctx.fillRect(x, y, blockSize, blockSize)
	}
	drawCircle(color) {
		// координаты центра окружности по горизонтали
		const centerX = this.col * blockSize + blockSize / 2
		// координаты центра окружности по вертикали
		const centerY = this.row * blockSize + blockSize / 2

		// задаём цвет заливки
		ctx.fillStyle = color
		// рисуем окружность
		drawCircle(centerX, centerY, blockSize / 2, true)
	}
	equal(otherBlock) {
		// возвращаем true или false в зависимости от того
		// совпадают ли координаты блока с другим блоком
		return this.col === otherBlock.col && this.row === otherBlock.row
	}
}

// Конструктор змеи
class Shake {
	constructor() {
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
	draw() {
		this.segments.forEach((segment, i) => {
			// если это первый элемент (голова), рисуем ее красной
			if (i === 0) segment.drawSquare("red")
			// все остальные элементы (сегменты змейки) зелёным
			else segment.drawSquare("green")
		})
	}
	move() {
		// текущая голова змеи
		const head = this.segments[0]
		// новая голова змеи
		let newHead

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
			// проверка, чтобы скорость анимации не была супер-быстрой
			if (setAnimationTime > 30) {
				setAnimationTime -= 1
			}

			// увеличиваем счёт игрока
			playerScore++
			// перемещаем яблоко в случайное место, не занятое телом змейки
			apple.move(this.segments)
		} else {
			// иначе удаляем последнюю часть хвоста
			this.segments.pop()
		}
	}
	checkCollision(head) {
		// true если змейка столкнётся с левой стеной
		const leftCollision = (head.col === 0)
		// true если змейка столкнётся с верхней стеной
		const topCollision = (head.row === 0)
		// true если змейка столкнётся с правой стеной
		const rightCollision = (head.col === widthInBlocks - 1)
		// true если змейка столкнётся с нижней стеной
		const bottomCollision = (head.row === heightInBlocks - 1)

		// столкнулась ли змейка с какой-нибудь из СТЕНОК
		const wallCollision =
			leftCollision ||
			topCollision ||
			rightCollision ||
			bottomCollision

		// столкнулась ли змейка с собственным телом
		// изначально false
		let selfCollision = false

		// проверка на то, находится ли голова змеи
		// в каком-нибудь из сегментов змеи
		this.segments.forEach(segment => {
			if (head.equal(segment)) {
				// если да, меняем значение на true (СТОЛКНУЛАСЬ)
				selfCollision = true
			}
		})

		// метод возвращает в итоге true если какая-то проверка прошла
		// либо false если ни одна проверка не прошла
		return wallCollision || selfCollision
	}
	setDirection(newDirection) {
		// объект с допустимой сменой траектории
		const validDirections = {
			"left": ["up", "down"],
			"right": ["up", "down"],
			"up": ["left", "right"],
			"down": ["left", "right"],
		}

		// если в свойстве текущей траектории в значении-массиве есть новая траектория
		if (validDirections[this.direction].includes(newDirection)) {
			// устанавливаем следующую траекторию
			this.nextDirection = newDirection
		}
	}
}

// Конструктор яблока
class Apple {
	constructor() {
		this.position = new Block(10, 10)
	}
	draw() {
		this.position.drawCircle("LimeGreen")
	}
	move(occupiedBlocks) {
		// случайная колонка
		const randomCol = Math.floor(Math.random() * (widthInBlocks - 2) + 1)
		// случайный ряд
		const randomRow = Math.floor(Math.random() * (heightInBlocks - 2) + 1)

		this.position = new Block(randomCol, randomRow)

		// дополнительная проверка, если яблоко сгенерировалось
		// в теле змеи, то заново запускаем этот медот.
		occupiedBlocks.forEach(segment => {
			if (this.position.equal(segment)) {
				this.move(occupiedBlocks)
				return
			}
		})
	}
}

// находим элемент с id="canvas"
const canvas = document.querySelector("#canvas")
// задаем контекст 2д и присваиваем в переменную ctx
const ctx = canvas.getContext("2d")
// присваиваем ширину холста в переменную
const canvasWidth = canvas.width
// присваиваем высоту холста в переменную
const canvasHeight = canvas.height
// задаём размер одной ячейки
const blockSize = 20
const widthInBlocks = canvasWidth / blockSize
const heightInBlocks = canvasHeight / blockSize
// размер шрифта на холсте
const canvasFont = canvasHeight / 20

// Переменая будет конструктором змеи после запуска игры
let shake
// Переменная будет конструктором яблока после запуска игры
let apple

// изначальный счёт игрока
let playerScore = 0
// рекорд игрока
let playerRecord = 0
// скорость анимации (в данном случае это скорость змейки)
const animationTime = 100
let setAnimationTime = animationTime

// траектории
const directions = {
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
const keyPressed = {}

// Стартуем игру
let gameStarted
startGame()

// обработчики событй
document.addEventListener("keydown", function (e) {
	// проверяем что нажатая клавиша существует в объекте directions
	// и что у нажатой клавиши стоит флаг false
	if (directions.hasOwnProperty(e.code) && !keyPressed[e.code]) {
		// новая траектория
		const newDirection = directions[e.code]

		// устанавливаем флаг true нажатой клавише
		keyPressed[e.code] = true
		// устанавливаем змейке новую траекторию
		shake.setDirection(newDirection)

		// если игра не запущена и нажимаем клавишу - запускаем игру
		if (!gameStarted) {
			startGame()
		}
	}
})
document.addEventListener("keyup", function (e) {
	if (directions.hasOwnProperty(e.code) && keyPressed[e.code]) {
		// клавиша отпущена, ставим ей флаг false
		keyPressed[e.code] = false
	}
})
document.addEventListener("click", function (e) {
	if (!gameStarted) {
		startGame()
	}
})



/**
 * Рисует границу вокруг холста, равную 1 ячейке
 * - по умолчанию 1 ячейка это [blockSize=20]
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
	// выравнивание текста по левой стороне
	ctx.textAlign = "left";
	// текст "Счёт:"
	ctx.fillText("Счёт:", blockSize, blockSize)
	ctx.fillText("Рекорд:", canvasHeight / 1.5, blockSize)
	// всё что идёт дальше, будет красного цвета
	ctx.fillStyle = "Red"
	// текст "число очков"
	ctx.fillText(playerScore, canvasHeight / 5, blockSize * 1.1)
	ctx.fillText(playerRecord, canvasHeight / 1.14, blockSize * 1.1)
}

/**
 * Анимация игры 
 * 1. Очищает холст
 * 2. Рисует счёт
 * 3. Передвигает змейку
 * 4. Рисует змейку
 * 5. Рисует яблоко
 * 5. Рисует границу
 * 6. Перезапускает саму себя каждые **setAnimationTime** миллесекунд
 * @date 11.03.2023 - 03:29:44
 */
function gameLoop() {
	// очищаем холст
	ctx.clearRect(0, 0, canvasWidth, canvasHeight)
	// нарисовать счёт
	drawScore()
	// текущее направление змеи
	shake.move()
	// нарисовать змею
	shake.draw()
	// нарисовать яблоко
	apple.draw()
	// нарисовать границу холста
	drawBorder()
	// функция перезапускается каждые setAnimationTime миллисекунд
	if (gameStarted) setTimeout(gameLoop, setAnimationTime)
}

/**
 * Конец игры. Останавливает "анимацию"
 * и выводит сообщение о конце игры.
 * @date 10.03.2023 - 00:02:52
 */
function gameOver() {
	// останавливаем игру
	gameStarted = false
	// текст будет поверх "игры"
	ctx.globalCompositeOperation = "destination-over"
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
	ctx.font = `${canvasFont}px Courier`
	ctx.fillText("Нажми чтобы продолжить", canvasWidth / 2, canvasHeight / 1.5)
}

/**
 * Функция начала новой игры, когда закончена старая.
 * 1. Создаёт новую змейку
 * 2. Создаёт новое яблоко
 * 3. Проверяет и обновляет рекорд
 * 4. Восстанавливает изначальную скорость анимации (змейки в данном случае)
 * 5. Обнуляет счёт
 * 6. Запускает анимацию
 * @date 11.03.2023 - 08:13:07
 */
function startGame() {
	// если текущий счёт игрока больше чем текущий рекорд
	if (playerScore > playerRecord) {
		// устанавливаем новый рекорд, равный счёту игрока
		playerRecord = playerScore
	}

	// Создаём новую змею
	shake = new Shake();
	// Создаём новое яблоко
	apple = new Apple()

	// восстанавливаем скорость
	setAnimationTime = animationTime
	// обнуляем счёт игрока
	playerScore = 0

	// игра начата
	gameStarted = true
	// запускаем анимацию
	gameLoop()
}