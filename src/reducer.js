//用户合并所有的reducer
import {combineReducers} from 'redux'
import {user} from './redux/user.redux'

export default combineReducers({user})