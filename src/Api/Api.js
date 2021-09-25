
import Base from './Base';
export function getApi(requireURL) {
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken
            },
            method: 'get'
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    });
}

export function postApi(requireURL, data = null) {
    return new Promise((reslove, reject) => {
        fetch(Base.baseUrl+requireURL, {
            headers: {
                'Content-Type': 'application/json',
                // "X-CSRF-Token": csrfToken
            },
            method: 'post',
            body: JSON.stringify(data)
            //  body: data
        }).then((res) => reslove(res.json())).catch((err) => reslove(err))
    })
}