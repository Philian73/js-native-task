//* TASK #1 ===============================================
$("html").click(function (e) {
	$("h1").offset({
		left: e.pageX,
		right: e.pageY,
		top: e.pageY,
		bottom: e.pageX
	})
})



//* TASK #2 ===============================================
var heading = $("h2")
var state = "topLeft"

function moveHeading() {
	var leftOffset = heading[0].offsetLeft
	var topOffset = heading[0].offsetTop

	if (state === "topLeft") {
		leftOffset++
	} else if (state === "topRight") {
		topOffset++
	} else if (state === "bottomRight") {
		leftOffset--
	} else if (state === "bottomLeft") {
		topOffset--
	}

	if (leftOffset === 200) {
		state = "topRight"
	}
	if (topOffset === 200) {
		state = "bottomRight"
	}
	if (topOffset === 200 && leftOffset === 0) {
		state = "bottomLeft"
	}
	if (topOffset === 0 && leftOffset === 0) {
		state = "topLeft"
	}

	heading.offset({
		left: leftOffset,
		top: topOffset,
	})
}

var speedInterval = 120
var intervalId = setInterval(moveHeading, speedInterval)

//* TASK #3 ===============================================
// heading.click(function() {
// 	clearInterval(intervalId)
// })



//* TASK #4 ===============================================
var clicks = 0

heading.click(function () {
	clearInterval(intervalId)
	speedInterval /= 2
	heading.text(`Кликнуто раз: ${clicks++}`)

	if (clicks > 10) {
		heading.text("Вы победили!")
	} else {
		intervalId = setInterval(moveHeading, speedInterval)
	}
})