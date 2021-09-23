import { 
    LOADING_TYPE 
} from "../types";

export const loadingReducer = (state = { loading: false } , action) => {
    switch (action.type) {
        case LOADING_TYPE:
            return {
                ...state,
                loading: !state.loading
            }
        default:
            return state;
    }
}