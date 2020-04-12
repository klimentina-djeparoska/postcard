
const postcardUrl = "http://localhost:8080/api/postcardTypes";

// should make a admin panel for entering postcard types
// the following are inserted directly in the database
const staticResult = [
    {name: "Large 6x11", width: 1056, height: 576, numOfImages: 1, position: "landscape"},
    {name: "Medium 5x8", width: 768, height: 480, numOfImages: 1, position: "landscape"},
    {name: "Small 4x6", width: 576, height: 384, numOfImages: 1, position: "landscape"}
];

export function getPostcardTypes() {
    const url = postcardUrl;

    return staticResult;

   /* return fetch(url).then((res)=> res.json()).then(result => {
        console.log(result);
        return result;
    }).catch( error => {
        console.error(error.message);
    });*/
}
