const validatePassword = (password, errorObject) => {

	let hasNumber = password.match(/\d/)
	let hasUpperCaseChar = password.match(/.*[A-Z]+.*/)
	let hasSymbols = password.match(/[^\w\-]/)
	
	if(password.length < 8) {
		errorObject['hasErrors'] = true
		errorObject['Password'].push('Password must be at least 8 characters')
	}

	if(!hasNumber) {
		errorObject['hasErrors'] = true
		errorObject['Password'].push('Password must contain a number')
	}

	if(!hasUpperCaseChar) {
		errorObject['hasErrors'] = true
		errorObject['Password'].push('Password must contain an uppercase letter')
	}

	if(hasSymbols) {
		errorObject['hasErrors'] = true
		errorObject['Password'].push('Password must contain only letters, numbers, or an underscore')
	}

	return errorObject
}

const validateUsername = (username, errorObject) => {

	let hasSymbols = username.match(/[^\w\-]/)

	if(username.length <= 3) {
		errorObject['hasErrors'] = true
		errorObject['Username'].push('Username must be longer than 3 characters')
	}

	if(hasSymbols) {
		errorObject['hasErrors'] = true
		errorObject['Username'].push('Username must contain only letters, numbers, or an underscore')
	}

	return errorObject
}


export const loginValidator = (user) => {
	let loginErrors = { 'hasErrors': false,
						'Username': [],
						'Password': []
	 				  }

	let updatedLoginErrors = validateUsername(user.username, loginErrors)
	let allerrors = validatePassword(user.password, updatedLoginErrors)

	return allerrors
}


export const signupValidator = (user) => {
	let signupErrors = { 'hasErrors': false,
						'Username': [],
						'Password': [],
						'Email': [],
						'Birthday': []
	 				  }

	let updatedSignupErrors = validateUsername(user.username, signupErrors)
	let allerrors = validatePassword(user.password, updatedSignupErrors)

	//Check passwords match
	if(user.password !== user.confirmPassword) {
		allerrors['hasErrors'] = true
		allerrors['Password'].push('Passwords do not match')
	}

	//Validate email
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	let validEmail = user.email.match(re)
	if(!validEmail) {
		allerrors['hasErrors'] = true
		allerrors['Email'].push('Please enter a valid email')
	}

	//Check that the user is over 18
	let date = new Date()
	let currYear = date.getFullYear()
	let userAge = currYear - user.birthday.year

	if(userAge < 18) {
		allerrors['hasErrors'] = true
		allerrors['Birthday'].push('You must be over 18 to sign up')
	}

	return allerrors
}