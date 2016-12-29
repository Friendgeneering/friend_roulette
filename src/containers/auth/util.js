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
export const possibleAges = () => {
	let result = []
	for(let i = 18; i <= 90; i++) {
		result.push(i)
	}
	return result
}


export const validateSignUp = ({ username, password, confirmPassword, email, gender, location}) => {
	let values = [username, password, confirmPassword, email, gender, location]
	return _.every(values, item => item.length > 0)
}