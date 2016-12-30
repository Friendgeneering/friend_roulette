export const FIND_CHAT = 'FIND_CHAT'
import axios from 'axios'


export const findChatRoom = (params) => {
	console.log('in chat', params)
	const { gender, location, minAge, maxAge } = params

	const request = axios.post('api/rooms/find', {
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