import { HEADERMENU, SIDERMENU, BREADCRUMB } from '../constants'

const modules = JSON.parse(localStorage.getItem('modules')) || []
const activeRouteIndex = + localStorage.getItem('activeRouteIndex') || 0

const initState={
    headerMenus: modules,
    siderMenus: modules.length === 0 ? [] : modules[activeRouteIndex].children || [],
    crumb:[]
}

const userInfoReducer = (state = initState, action) =>{

    switch(action.type){

        case HEADERMENU:
            return {
                ...state,
                headerMenus: action.payload.menus
            }
        case SIDERMENU:
            return {
                ...state,
                siderMenus: action.payload.menus
            }
        case BREADCRUMB:
            const activeIndex = + localStorage.getItem('activeRouteIndex') || 0
            const parentName = state.headerMenus[activeIndex].name
            const newCrumb=[parentName, ...action.payload.crumb]

            return {
                ...state,
                crumb: newCrumb
            }
        default:
            return state
    }
}

export default userInfoReducer

