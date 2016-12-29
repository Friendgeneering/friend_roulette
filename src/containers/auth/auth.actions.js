import axios from 'axios'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_SIGNUP = 'USER_SIGNUP'

export const login = ({username, password}) => {
	
	const request = axios.post('/api/auth/signIn', {
			username: username,
			password: password
	})

	return {
		type: USER_LOGIN,
		payload: request
	}
}

export const signup = ({username, password, email, age, location, gender}) => {
	age = parseInt(age, 10)
	const request = axios.post('/api/auth/signUp', {
			username,
			password,
			email,
			age,
			location,
			gender
	})

	return {
		type: USER_SIGNUP,
		payload: request
	}
}