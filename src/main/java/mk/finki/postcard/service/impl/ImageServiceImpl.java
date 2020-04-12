package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.Image;
import mk.finki.postcard.model.exceptions.InvalidImageNotFoundException;
import mk.finki.postcard.repository.ImageRepository;
import mk.finki.postcard.service.ImageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public List<Image> getAllImagesForPostcard(String postcardId) {
        return this.imageRepository.findAllByPostcardId(postcardId);
    }

    @Override
    public Image saveImage(String id, String postcardId, String image) {

        if (id == null || postcardId == null) {
            throw new IllegalArgumentException();
        }

        Image image1 = new Image(id, postcardId, image);
        return this.imageRepository.save(image1);
    }

    @Override
    public Image getImageById(String id) {
        return this.imageRepository.findById(id).orElseThrow(InvalidImageNotFoundException::new);
    }
}
