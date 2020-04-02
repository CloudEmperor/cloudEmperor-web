import { BUTTONCLICK } from '../constants'

export const setButton = scope => {
    return {
        type: BUTTONCLICK,
        payload: {
            scope
        }
    }
}
