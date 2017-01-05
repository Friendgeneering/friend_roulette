import { FIND_CHAT, FETCH_USER_ROOMS } from './chat.actions'

const INITIAL_STATE = { 
	userChats: [], 
	activeChat: {}, 
	success: false,
	query: { newRoom: null, chatResults: {} }, 
	error: '' 
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case FIND_CHAT: {
			const { data } = action.payload
			//Check if new or existing room - data.newRoom<Boolean>
			let temp = {}
			temp.query = { newRoom: data.newRoom, chatResults: data.room}
			temp.success = true
			return {...state, ...temp}
		}
		case FETCH_USER_ROOMS: {
			const { data } = action.payload
			let temp = {}
			temp.success = true
			temp.userChats = [...data.rooms]
			return {...state, ...temp}
		}

	}
	return state
}