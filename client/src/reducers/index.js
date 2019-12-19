import { combineReducers } from 'redux';

function questions(state = [], action) {
    switch (action.type) {
        case 'ADD_QUESTIONS': {
            return [...action.questions];
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
    questions, user, notifications
})
