import {elementFollowCursorWithinBounds} from '../utils/spacial.js'
import {createElementWithClassName, createElementsWithClassNames} from '../utils/dom.js'

class Face extends HTMLElement {
	constructor() {
		super()

		const shadowDOM = this.attachShadow({mode: 'open'})
		const face = createElementWithClassName('face')
		const [leftEye, rightEye] = createElementsWithClassNames(['eye-left', 'eye-right'], 'eye')
		const [leftPupil, rightPupil] = createElementsWithClassNames(['pupil-left', 'pupil-right'], 'pupil')

		const style = document.createElement('style')

		this.faceWidth = 120
		this.faceHeight = 120
		this.eyeWidth = 20
		this.pupilWidth = 8

		style.textContent = `
			* {
				box-sizing: border-box;
			}
			.face {
				position: relative;
				display: flex;
				justify-content: center;
				width: ${this.faceWidth}px;
				height: ${this.faceHeight}px;
				border: 5px solid #fff;
				border-radius: 50%;
				background-image: url('/img/face2.png');
				background-size: cover;
			}
			.eye {
				position: relative;
				width: ${this.eyeWidth}px;
				height: ${this.eyeWidth}px;
				margin-top: 25px;
				border-radius: 50%;
				background-color: #fff;
			}
			.eye-left {
				margin-right: ${this.eyeWidth / 3}px;
			}
			.eye-right {
				margin-left: ${this.eyeWidth / 3}px;
			}
			.pupil {
				position: absolute;
				left: calc(50% - ${this.pupilWidth / 2}px);
				top: calc(50% - ${this.pupilWidth / 2}px);
				width: ${this.pupilWidth}px;
				height: ${this.pupilWidth}px;
				border-radius: 50%;
				background-color: #000;
			}
		`
		leftEye.appendChild(leftPupil)
		rightEye.appendChild(rightPupil)
		face.appendChild(leftEye)
		face.appendChild(rightEye)
		shadowDOM.append(face)
		shadowDOM.appendChild(style)

		document.addEventListener('mousemove', elementFollowCursorWithinBounds(leftEye, leftPupil))
		document.addEventListener('mousemove', elementFollowCursorWithinBounds(rightEye, rightPupil))
	}
}

export default Face
