import {getCenterCoordinatesForElement} from '../utils/spacial.js'
import {createElementWithClassName, createElementsWithClassNames} from '../utils/dom.js'

class Arm extends HTMLElement {
	constructor() {
		super()

		const shadowDOM = this.attachShadow({mode: 'open'})
		const arm = createElementWithClassName('arm')
		const upperArm = createElementWithClassName('upper-arm', 'arm-segment')
		const forearm = createElementWithClassName('forearm', 'arm-segment')
		const elbow = createElementWithClassName('elbow')

		const style = document.createElement('style')

		style.textContent = `
			* {
				box-sizing: border-box;
			}
			.arm {
				position: relative;
				width: 200px;
				height: 20px;
				transition-property: transform, width;
				transition-timing-function: ease-in-out;
				transition-duration: .5s;
			}
			.arm-segment {
			}
			.upper-arm {
				position: absolute;
				top: 0;
				left: 0;
				width: 50%;
				height: 20px;
				background-color: #fff;
			}
			.elbow {
				position: absolute;
				top: 0;
				left: 50%;
				width: 20px;
				padding-top: 20px;
				border-radius: 50%;
				background-color: red;
			}
			.forearm {
				position: absolute;
				left: calc(50% + 20px);
				width: calc(50% - 20px);
				height: 20px;
				background-color: #ccc;
				transition: transform .6s ease-in-out;
			}
			@keyframes rotate {
				from {transform: rotate(0deg);}
				to {transform: rotate(360deg);}
			}
			@keyframes rotate2 {
				from {transform: rotate(90deg);}
				to {transform: rotate(450deg);}
			}
		`
		arm.appendChild(upperArm)
		arm.appendChild(elbow)
		arm.appendChild(forearm)
		shadowDOM.append(arm)
		shadowDOM.appendChild(style)
		const anchor = document.querySelector(this.getAttribute('data-anchor'))
		window.addEventListener('click', moveArmToPoint(anchor, arm))
		window.addEventListener('click', calculateThings(anchor))
	}
}

const calculateThings = (anchor) => {
	const callback = async event => {
		const {clientX, clientY} = event
		const {
			offsetWidth: anchorWidth,
			x: anchorX,
			y: anchorY
		} = getCenterCoordinatesForElement(anchor)
		const width = Math.abs(clientX - anchorX)
		const height = Math.abs(clientY - anchorY)
		const distance = Math.sqrt(width**2 + height**2)
		const radian = Math.atan(height/width)
		const degAngle = radianToDegree(radian, 90)
		const normalizedDegAngle = mod(degAngle - 180, 360)
		const wideAngle = 100
		console.clear()
		console.log(`distance: ${distance}`)
		console.log(`set angle: ${wideAngle}`)
	}
	return callback
}

const moveArmToPoint = (anchor, arm) => {
	let prevAngle = 0
	const callback = async event => {
		const {clientX, clientY} = event
		const {
			offsetWidth: anchorWidth,
			x: anchorX,
			y: anchorY
		} = getCenterCoordinatesForElement(anchor)
		const width = clientX - anchorX
		const height = clientY - anchorY
		const radian = Math.atan2(width, height)
		const degAngle = radianToDegree(radian)

		// Get into range of (0, 360)
		const normalizedPrevAngle = mod(prevAngle, 360)

		const angleDelta = Math.abs(degAngle - normalizedPrevAngle)

		// Get into range of (-180, 180)
		const normalizedDelta = angleDelta > 180 ? angleDelta - 360 : angleDelta
		if (normalizedPrevAngle < degAngle) {
			prevAngle = prevAngle + normalizedDelta
		} else {
			prevAngle = prevAngle - normalizedDelta
		}

		arm.style.transformOrigin = `-${anchorWidth/2}px 10px`
		arm.style.transform = `rotate(0deg)`
		arm.style.transform = `rotate(${prevAngle}deg)`

		// TODO
		// Calculate elbow position
		// Apply rotation to forearm
		// Create arm rotation offsets around link
		// Add left arm support
	}
	return callback
}

// Rotated by 90 deg to center with css rotate() fn
const radianToDegree = (radian, offset = 0) => {
	return (450 + offset - (180 * radian) / Math.PI) % 360
}

function mod(n, m) {
	return ((n % m) + m) % m
}

export default Arm
