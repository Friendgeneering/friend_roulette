import { FIND_CHAT } from './chat.actions'

const INITIAL_STATE = { 
	chatList: [], 
	activeChat: {}, 
	success: false, 
	error: '' 
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FIND_CHAT: {
			console.log('action payload in chat', action.payload)
		}

	}
	return state
}