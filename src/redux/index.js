import { combineReducers } from 'redux';

const foo = (state = { value: 0, }, action) => {
    switch (action.type) {
        case 'ADD':
            return { value: state.value + action.value };
        default:
            return state;
    }
};

const bar = (state = { messages: [] }, action) => {
    switch (action.type) {
        case 'SAY':
            return { messages: [...state.messages, action.message] };
        default:
            return state;
    }
};

export const reducer = combineReducers({
    foo,
    bar,
});

export const say = (message) => ({
    type: 'SAY', message,
});

export const add = (value) => ({
    type: 'ADD', value,
});
