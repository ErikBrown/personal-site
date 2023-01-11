// Specifies an element to follow a cursor within a bounding element.
// Modifies the "top" and "left" CSS styles of the target element.
//
// Ex usecase: Pupils moving in an eyeballs or a joystick moving.
const elementFollowCursorWithinBounds = (bound, element) => {
	const callback = event => {
		const {x: boundX, y: boundY, radius: boundRadius} = getCenterCoordinatesForElement(bound)
		const {radius: elementRadius} = getCenterCoordinatesForElement(element)
		const {clientX, clientY} = event
		const width = clientX - boundX
		const height = clientY - boundY
		const angle = Math.atan2(width, height)
		const offsetSin = Math.sin(angle) + 1
		const offsetCos = Math.cos(angle) + 1
		let positionLeft = offsetSin * (boundRadius - elementRadius)
		let positionTop = offsetCos * (boundRadius - elementRadius)
		if (isInsideCircle(boundRadius - elementRadius, boundX, boundY, clientX, clientY)) {
			setPositions(
				element,
				width + boundRadius - elementRadius,
				height + boundRadius - elementRadius)
		} else {
			setPositions(element, positionLeft, positionTop)
		}
	}
	return callback
}

const getCenterCoordinatesForElement = element => {
	const {left, top, right, bottom, width, height} = element.getBoundingClientRect()
	return {
		left: left,
		top: top,
		right: right,
		bottom: bottom,
		width: width,
		height: height,
		offsetWidth: element.offsetWidth,
		offsetHeight: element.offsetHeight,
		x: left + width / 2,
		y: top + height / 2,
		radius: width / 2
	}
}

const isInsideCircle = (radius, centerX, centerY, pointX, pointY) => {
	const xLength = (pointX - centerX) * (pointX - centerX)
	const yLength = (pointY - centerY) * (pointY - centerY)
	const distanceFromCenter = Math.sqrt(xLength + yLength)
	return distanceFromCenter < radius
}

const setPositions = (element, left, top) => {
	element.style.top = `${top}px`
	element.style.left = `${left}px`
}

export {
	elementFollowCursorWithinBounds,
	getCenterCoordinatesForElement,
	isInsideCircle,
	setPositions
}
