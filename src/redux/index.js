import { remoteAction, remoteCombineReducers } from './remote';

const foo = (state = { value: 0, }, action) => {
    switch (action.type) {
        case 'ADD':
            return { value: state.value + action.value };
        default:
            return state;
    }
};

const shared = (state = { messages: [] }, action) => {
    switch (action.type) {
        case 'SAY':
            return { messages: [...state.messages, action.message] };
        default:
            return state;
    }
};

export const reducer = remoteCombineReducers({ foo }, { shared });

export const say = (message) => remoteAction({
    type: 'SAY', message,
});

export const add = (value) => ({
    type: 'ADD', value,
});
