import { v4 as uuidv4 } from "uuid";

const url = 'http://localhost:8080/api/images';


export function saveImage([postcardId, image1]) {
    const image = {
        id: uuidv4(),
        postcardId: postcardId,
        image: image1
    };
    console.log(image);

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        mode: 'cors',
        body: JSON.stringify(image)
    };

    return fetch(url, requestOptions).then(res => res.json()).then(result => {
        console.log('image saved');
        return result;
    }).catch(err => console.error(err.message));
}
