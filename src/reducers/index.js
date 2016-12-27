import { combineReducers } from 'redux'
import AuthReducer from '../containers/auth/auth.reducer'


const rootReducer = combineReducers({
	auth: AuthReducer
})

export default rootReducer