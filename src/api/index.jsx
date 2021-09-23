import { API } from './api'

export const postRequest = (data , cat , subcategory , id) => {
    return API.post(JSON.stringify(data) , cat , subcategory , id)
}

export const getRequest = (category , subcategory , id) => {
    return API.get(category , subcategory , id)
}

export const deleteRequest = (news , cat , clothes , id) => {
    return API.delete(news , cat, clothes , id)
}

export const changeRequest = (data , cat , clothes , id) => {
    return API.patch(JSON.stringify(data) , cat , clothes , id)
}