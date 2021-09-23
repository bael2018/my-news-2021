import { 
    ACTIVE_TYPE
} from "../types";

const initialState = {
    active: false
}

export const sidebarReducer = (state = initialState , action) => {
    switch (action.type) {
        case ACTIVE_TYPE:
            return{
                ...state,
                active: !state.active
            }
        default:
            return state;
    }
}