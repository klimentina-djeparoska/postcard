import sanityClient from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";

export function saveImageSanity(file) {

    if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.svg')) {
        const client = sanityClient;
        return client.assets.upload('image', file).then( (imageAsset) => {
            console.log("image", imageAsset._id);
            return imageAsset;
        }).catch(err => {
            console.log(err);
        });
    }
}
export function getImageUrl(source) {
    const builder = imageUrlBuilder(sanityClient);
    return builder.image(source).width(300).height(200).url();
}

