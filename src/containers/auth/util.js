import _ from 'lodash'
//Helper object containing month and corresponding # of days

export const monthsAndDays = {
"January": 31,
"February": 29,
"March": 31,
"April": 30,
"May": 31,
"June": 30,
"July": 31,
"August": 31,
"September": 30,
"October": 31,
"November": 30,
"December": 31
}

//Function to change # of days depending on month
export const getNumOfDays = (num) => {
	let result = []
	for(let i = 1; i <= num; i++) {
		result.push(i)
	}
	return result
}

//Function to change # of days depending on month
export const birthYears = () => {
	let result = []
	for(let i = 1925; i <= 2013; i++) {
		result.push(i)
	}
	return result
}

export const hasValidInputs = (currState) => {
	let keys = Object.keys(currState)
	let isValid = _.every(keys, item => currState[item].length > 0)
	return isValid
}