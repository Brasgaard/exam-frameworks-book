import { combineReducers } from 'redux';

function books(state = [], action) {
    switch (action.type) {
        case 'ADD_BOOKS': {
            return [...action.books];
        }
        default:
            return state
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case 'ADD_CATEGORIES': {
            return [...action.categories];
        }
        default:
            return state
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case 'ADD_USER_CRED': {
            return { username: action.username };
        }
        case 'REMOVE_USER_CRED': {
            return { username: "" };
        }
        default:
            return state
    }
}

function notifications(state = {}, action) {
    switch (action.type) {
        case 'SHOW_ALERT': {
            return {
                title: action.title,
                text: action.text,
                active: true,
                level: action.level
            }
        }
        case 'HIDE_ALERT': {
            return {
                active: false
            }
        }
        default:
            return state
    }
}


export default combineReducers({
    books, categories, user, notifications
})
