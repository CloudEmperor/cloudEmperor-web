import { HEADERMENU, SIDERMENU, BREADCRUMB } from '../constants'

export const setHeaderMenu = payload => {
    const newPayload = payload
    return {
        type: HEADERMENU,
        payload: {
            menus: newPayload
        }
    }
}

export const setSiderMenu = payload => {
    const newPayload = payload
    return {
        type: SIDERMENU,
        payload: {
            menus: newPayload
        }
    }
}

export const setBreadcrumb= payload => {
    const newPayload = payload
    return {
        type: BREADCRUMB,
        payload: {
            crumb: newPayload
        }
    }
}