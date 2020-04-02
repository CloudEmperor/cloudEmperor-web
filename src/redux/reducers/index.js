import { combineReducers } from 'redux'

import button from './button'
import userInfo from './userInfo'

const rootReducer = combineReducers({
    button,
    userInfo
})

export default rootReducer
