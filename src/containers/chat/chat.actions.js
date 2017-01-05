export const FIND_CHAT = 'FIND_CHAT'
export const FETCH_USER_ROOMS = 'FETCH_USER_ROOMS'
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

}

export const fetchUserRooms = () => {

	const request = axios.get(`api/rooms/user?token=${token}`)

	return {
		type: FETCH_USER_ROOMS,
		payload: request
	}

}

