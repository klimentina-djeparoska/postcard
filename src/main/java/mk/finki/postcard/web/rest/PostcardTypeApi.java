package mk.finki.postcard.web.rest;

import mk.finki.postcard.model.PostcardType;
import mk.finki.postcard.service.PostcardTypeService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/postcardTypes")
public class PostcardTypeApi {

    private final PostcardTypeService postcardTypeService;

    public PostcardTypeApi(PostcardTypeService postcardTypeService) {
        this.postcardTypeService = postcardTypeService;
    }

    @GetMapping
    public List<PostcardType> getAll () {
        return this.postcardTypeService.getAllPostcardTypes();
    }
}
