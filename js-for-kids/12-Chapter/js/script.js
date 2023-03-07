function Car(x, y, name) {
	this.name = name
	this.x = x
	this.y = y
	this.draw()
}

Car.prototype.draw = function () {
	var carHTML = `<img src="img/car.webp" alt="${this.name}">`

	this.carEl = $(carHTML)
	this.carEl.css({
		position: "absolute",
		left: this.x,
		top: this.y,
	})

	$(".wrapper").append(this.carEl)
}

Car.prototype.moveRight = function (speed) {
	this.x += speed;
	this.carEl.css({
		left: this.x,
		top: this.y,
	})
}

Car.prototype.moveLeft = function (speed) {
	this.x -= speed;
	this.carEl.css({
		left: this.x,
		top: this.y,
	})
}

Car.prototype.moveUp = function (speed) {
	this.y -= speed;
	this.carEl.css({
		left: this.x,
		top: this.y,
	})
}

Car.prototype.moveDown = function (speed) {
	this.y += speed;
	this.carEl.css({
		left: this.x,
		top: this.y,
	})
}

var tesla = new Car(20, 20, "Тесла")
var nissan = new Car(20, 200, "Ниссан")

var test = setInterval(function () {
	tesla.moveRight(Math.floor(Math.random() * 6))
	nissan.moveRight(Math.floor(Math.random() * 6))
	if (tesla.x >= $(".wrapper")[0].clientWidth - 135) {
		clearInterval(test)
		alert(`Машина "${tesla.name}" победила!`)
	} else if (nissan.x >= $(".wrapper")[0].clientWidth - 135) {
		clearInterval(test)
		alert(`Машина "${nissan.name}" победила!`)
	}
}, 30);