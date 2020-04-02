import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'

import reducer from '../reducers'

const configureStore = () => {
    // use Redux DevTools
    /*eslint-disable */
    const composeSetup =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose
    /*eslint-enable */

    const store = createStore(
        reducer,
        composeSetup(applyMiddleware(thunk)) // allows redux devtools to watch sagas
    )

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(reducer))
    }

    return store
}

export default configureStore
