import { BUTTONCLICK } from '../constants'

const buttonReducer = (state = 0, action) => {
    const { type, payload } = action
    if (type === BUTTONCLICK) {
        let num = payload.scope + 1
        return num
    } else {
        return state
    }
}

export default buttonReducer
