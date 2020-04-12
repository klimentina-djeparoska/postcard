package mk.finki.postcard.web.rest;

import mk.finki.postcard.model.Image;
import mk.finki.postcard.service.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/images")
public class ImageApi {

    private final ImageService imageService;

    public ImageApi(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Image saveImage(@RequestBody Image image) {

        System.out.println("IMAGE");
        System.out.println(image.getId());
        System.out.println(image.getPostcardId());
        System.out.println(image.getImage());
        Image result = this.imageService.saveImage(image.getId(), image.getPostcardId(), image.getImage());
        return result;
    }

    @GetMapping(path = "/byPostcardId")
    public Image getImageByPostcardId(@RequestParam String postcardId) {
        return this.imageService.getAllImagesForPostcard(postcardId).get(0);
    }

}
