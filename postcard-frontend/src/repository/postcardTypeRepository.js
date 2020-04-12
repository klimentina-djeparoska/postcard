
const postcardUrl = "http://localhost:8080/api/postcardTypes";

export function getPostcardTypes() {
    const url = postcardUrl;

    return fetch(url).then((res)=> res.json()).then(result => {
        console.log(result);
        return result;
    }).catch( error => {
        console.error(error.message);
    });

}
