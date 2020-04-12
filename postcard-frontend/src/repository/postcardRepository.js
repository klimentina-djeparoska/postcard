import { v4 as uuidv4 } from "uuid";

const postcardUrl = "http://localhost:8080/api/postcards";


export function getPostcard(id) {
    const url = postcardUrl + '/'+ id;

    fetch(url).then(res => res.json()).then(result => {
        console.log(result);
        return result;
    }, error => console.error(error.message));

}

export async function savePostcard(postcard, user_uid) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});

    const body = {
        id: uuidv4(),
        userId: user_uid,
    //    type: postcard.postcardSize,
        type: 'Small 4x6',
        message: postcard.text
    };

    console.log("BODY:", body);

    const requestOptions = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(body)
    };


    const res = await fetch(postcardUrl + "/save", requestOptions).then(res => res.json()).then(result => {
        console.log(result);
        return result;
    }).catch(error => console.error(error.message));

    return res;
}

export function getAllPostcardsForUser(user_id) {

    const url = postcardUrl + "?user_id=" + user_id;

    fetch(url).then(res => res.json()).then( result => {
        console.log(result);
        return result;
    }, error => console.error(error.message));
}
