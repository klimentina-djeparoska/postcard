import {savePostcard} from "./postcardRepository";
import {saveImage} from "./imageRepository";

import { v4 as uuidv4 } from "uuid";

const orderUrl = "http://localhost:8080/api/orders";

export async function saveOrder(order) {

    //save postcard
    const postcard = await savePostcard(order.postcard, order.user_uid);

    // save image id
    saveImage([postcard.id, order.image]).then(res => console.log(res));

    const orderObject = {
        id: uuidv4(),
        userId: order.user_uid,
        postcardId: postcard.id,
        street: order.address.street,
        city: order.address.city,
        country: order.address.country,
        postalCode: order.address.postalCode,
        price: order.price,
        status: "ordered"
    };

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(orderObject)
    };
    return fetch(orderUrl, requestOptions)
        .then(response => response.json()).then((res)=>{
            return "success";
        })
        .catch(error => console.error(error.message));
}

export function getOrder(id) {

    const url = orderUrl + "?id=" + id;

    return fetch(url).then(res => res.json()).then( result => {
        console.log(result);
        return result;
    }, error => console.error(error));
}

export function getAllOrdersForUser(user_id) {

    console.log(user_id);
    const url = orderUrl + "/user?user_uid=" + user_id;

    return fetch(url).then(res => res.json()).then( result => {
        console.log(result);
        return result;
    }, error => console.error(error));
}

export function getAllOrdersForCity(city) {

    const url = orderUrl + "?city=" + city;

    return fetch(url).then(res => res.json()).then( result => {
        console.log(result);
        return result;
    }, error => console.error(error));
}

export function getAllOrdersForCountry(country) {

    const url = orderUrl + "?country=" + country;

    return fetch(url).then(res => res.json()).then( result => {
        console.log(result);
        return result;
    }, error => console.error(error));
}
