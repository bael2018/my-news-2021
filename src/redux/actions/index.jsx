import { 
    ACTIVE_TYPE, 
    LOADING_TYPE, 
    SEARCH_DATA_TYPE,
    SEARCH_SAGA_TYPE
} from "../types"

export const sidebarAction = () => {
    return {
        type: ACTIVE_TYPE,
    }
}

export const loadingAction = () => {
    return {
        type: LOADING_TYPE
    }
}