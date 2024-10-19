import { combineReducers, createStore } from 'redux'

const init = {
    note: null,
}

const noteReducer = (state = init, action) => {
    switch (action.type) {
        case 'SET_NOTE':
            return {
                note: action.payload,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    note: noteReducer,
}) 

const store = createStore(rootReducer)

export default store;