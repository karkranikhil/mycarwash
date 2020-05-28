export const URL = "http://carwash-2020.herokuapp.com/v1";
export const bearer = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlYzA0OTI5MC03MTRmLTQ5YWYtODcxYS1jMDllNTMxOTY1ZDQiLCJleHAiOjE1OTEzNzY3NDQsImlhdCI6MTU5MDQ4NzcxMX0.ePH_Myi4X3h7Oi6g_sqey91UutIFH4mSfT3UWmXgGhU";

export const fetchApi = (path, method, body, callback) => {
    let url = `${URL}/${path}`
    let obj = {
        method: method || 'GET',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    }
    if (body) {
        obj.body = JSON.stringify(obj)
    }
    fetch(url, obj).then(function (response) {
        return response.json();
    }).then(function (data) {
        callback({
            status: 'SUCCESS',
            data: data
        })
    }).catch(error => {
        callback({
            status: 'ERROR',
            data: error
        })
    }

    );
}