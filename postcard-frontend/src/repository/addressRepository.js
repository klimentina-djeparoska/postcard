import { v4 as uuidv4 } from "uuid";
const addressesUrl = 'http://localhost:8080/api/addresses';


export function getSavedAddressesForUser(userId) {

    const url = addressesUrl + '/all?userId=' + userId;
    return fetch(url).then(res => res.json()).then(result => {
        return result;
    }).catch(error => console.error(error.message));
}

export async function deleteAddress(address) {
    const url = addressesUrl + '/deleteById?id=' + address.id;
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

    const request = {
        method: "DELETE",
        headers: headers,
        mode: 'cors'
    };

    fetch(url, request);
}

export function saveAddressForUser(userId, address) {
    const url = addressesUrl + '/save';
    const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    const body = {
        id: uuidv4(),
        userId: userId,
        street: address.street,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode
    };

    const request = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    };

    return fetch(url, request).then(res => res.json()).then(result => {
        return result;
    });
}
