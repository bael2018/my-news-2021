export const arrayFunc = el => {
    return Object.entries(el).map(item => {
        const id = item[0];
        return {
            ...item[1],
            id
        }
    })
}

export const arrayFuncAlt = el => {
    return Object.entries(el).map(item => {
        const alt = item[0];
        return {
            ...item[1],
            alt
        }
    })
}

export const authRequest = (item , email , password) => {
    return fetch(item , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    })
    .then(res => res.json())
}