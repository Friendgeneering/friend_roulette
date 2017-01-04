export const FIND_CHAT = 'FIND_CHAT'
import axios from 'axios'

let token = localStorage.getItem('user_token')

export const findChatRoom = (params) => {
	const { gender, location, minAge, maxAge } = params

	const request = axios.post(`api/rooms/find?token=${token}`, {
		location,
		gender,
		minAge,
		maxAge
	})

	return {
		type: FIND_CHAT,
		payload: request
	}

};