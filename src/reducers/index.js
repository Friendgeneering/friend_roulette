import { combineReducers } from 'redux'
import AuthReducer from '../containers/auth/auth.reducer'
import ChatReducer from '../containers/chat/chat.reducer'


const rootReducer = combineReducers({
	auth: AuthReducer,
	chat: ChatReducer
})

export default rootReducer