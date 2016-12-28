const validatePassword = (password, errorObject) => {

	let hasNumber = password.match(/\d/)
	let hasUpperCaseChar = password.match(/.*[A-Z]+.*/)
	let hasSymbols = password.match(/[^\w\-]/)
	
	if(password.length < 8) {
		errorObject['hasErrors'] = true
		errorObject['password'].push('Password must be at least 8 characters')
	}

	if(!hasNumber) {
		errorObject['hasErrors'] = true
		errorObject['password'].push('Password must contain a number')
	}

	if(!hasUpperCaseChar) {
		errorObject['hasErrors'] = true
		errorObject['password'].push('Password must contain an uppercase letter')
	}

	if(hasSymbols) {
		errorObject['hasErrors'] = true
		errorObject['password'].push('Password must contain only letters, numbers, or an underscore')
	}

	return errorObject
}

const validateUsername = (username, errorObject) => {

	let hasSymbols = username.match(/[^\w\-]/)

	if(username.length <= 3) {
		errorObject['hasErrors'] = true
		errorObject['username'].push('Username must be longer than 3 characters')
	}

	if(hasSymbols) {
		errorObject['hasErrors'] = true
		errorObject['username'].push('Username must contain only letters, numbers, or an underscore')
	}

	return errorObject
}


export const loginValidator = (user) => {
	let loginErrors = { 'hasErrors': false,
						'username': [],
						'password': []
	 				  }

	let updatedLoginErrors = validateUsername(user.username, loginErrors)
	let allerrors = validatePassword(user.password, updatedLoginErrors)

	return allerrors
}


export const signupValidator = (user) => {
	let signupErrors = { 'hasErrors': false,
						'username': [],
						'password': [],
						'email': [],
						'birthday': [],
						'location': []
	 				  }

	let updatedSignupErrors = validateUsername(user.username, signupErrors)
	let allerrors = validatePassword(user.password, updatedSignupErrors)

	return allerrors
}