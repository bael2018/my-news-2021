export const baseURL = 'https://my-news-c980c-default-rtdb.asia-southeast1.firebasedatabase.app/'

export const API = {
    get: (category , subcategory , id) => {
        return fetch(`${baseURL}/${category}${subcategory}${id}` , {
            method: 'GET'
        })
    },
    post: (data , cat , subcategory , id) => {
        return fetch(`${baseURL}/${cat}${subcategory}${id}` , {
            method: 'POST',
            body: data
        })
    },
    patch: (data , cat , clothes , id) => {
        return fetch(`${baseURL}${cat}${clothes}${id}` , {
            method: 'PATCH',
            body: data
        })
    },
    delete: (news , cat , clothes , id) => {
        return fetch(`${baseURL}${news}${cat}${clothes}${id}` , {
            method: 'DELETE'
        })
    }
}