
const sessionUrl = "http://localhost:8080/api/sessions";


export async function fetchCheckoutSession(order) {
    const url = sessionUrl + '/create';
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const request = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: headers,
        mode: 'cors'
    };

    return fetch(url, request).then(res => res.json()).then(result => {
        console.log(result);
        return result;
    });
}
