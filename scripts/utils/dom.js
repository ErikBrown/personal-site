const createElementWithClassName = (className, commonClass = '', tag='div') => {
	const output = document.createElement(tag)
	output.setAttribute('class', `${className} ${commonClass}`)
	return output
}

const createElementsWithClassNames = (classList, commonClass = '', tag='div') => {
	return classList.map(className => {
		return createElementWithClassName(className, commonClass, tag)
	})
}

export {
	createElementWithClassName,
	createElementsWithClassNames
}
