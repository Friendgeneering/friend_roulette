import { USER_LOGIN, USER_SIGNUP } from './auth.actions'

const INITIAL_STATE = { user: {}, sucessfulLogin: false, error: '' }

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case USER_LOGIN: {
			console.log('action.payload')
			const { data, response} = action.payload
			let temp = {}
			if(response) {
				temp.error = response.data.err
				return {...state, ...temp}
			}
			temp.user.token = data.token
			temp.sucessfulLogin = true
			return {...state, ...temp}
		}

		case USER_SIGNUP: {
			const { data, response} = action.payload
			let temp = {}
			if(response) {
				temp.error = response.data.err
				return {...state, ...temp}
			}
			temp.user.token = data.token
			temp.sucessfulLogin = true
			return {...state, ...temp}
		}
	}
	return state
}