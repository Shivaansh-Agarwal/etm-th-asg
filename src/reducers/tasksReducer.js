export const ACTION_TYPES = {
    ADD_TODO: "ADD_TODO",
    REMOVE_TODO: "REMOVE_TODO",
    EDIT_TODO: "EDIT_TODO"
};

export function tasksReducer(state, action) {
    switch(action.type) {
        case ACTION_TYPES.ADD_TODO: {
            const {title, date} = action.payload;
            const newState = {
                ...state,
                [date]: title
            };
            localStorage.setItem('tasks', JSON.stringify(newState));
            return {
                ...state,
                [date]: title
            };
        }
        case ACTION_TYPES.REMOVE_TODO: {
            const { date } = action.payload;
            if (state.hasOwnProperty(date)) {
                const newState = {...state};
                delete newState[date];
                localStorage.setItem('tasks', JSON.stringify(newState));
                return newState;
            }
            return state;
        }
        case ACTION_TYPES.EDIT_TODO: {
            const {title, date} = action.payload;
            const newState = {
                ...state,
                [date]: title
            };
            localStorage.setItem('tasks', JSON.stringify(newState));
            return newState;
        }
        default: {
            return state;
        }
    }
}