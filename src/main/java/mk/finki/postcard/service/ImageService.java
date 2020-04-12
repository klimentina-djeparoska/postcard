package mk.finki.postcard.service;

import mk.finki.postcard.model.Image;

import java.util.List;

public interface ImageService {

    List<Image> getAllImagesForPostcard(String postcardId);

    Image saveImage(String id, String user_uid, String image);
}
