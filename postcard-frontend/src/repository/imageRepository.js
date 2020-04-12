import { v4 as uuidv4 } from "uuid";
import {getImageUrl} from "../components/sanity/sanityClientApi";

const url = 'http://localhost:8080/api/images';

export function getImage(postcardId) {

    const imageUrl = url + '/byPostcardId?postcardId=' + postcardId;

    const res = fetch(imageUrl).then(res => res.json()).then(result => {
        console.log(result);
        return result.image;
    }).catch(error => console.error(error));
    console.log(res);
    return res;
}


export async function saveImage([postcardId, image1]) {

    const imageUrl = await getImageUrl(image1);

    const image = {
        id: uuidv4(),
        postcardId: postcardId,
        image: imageUrl
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
