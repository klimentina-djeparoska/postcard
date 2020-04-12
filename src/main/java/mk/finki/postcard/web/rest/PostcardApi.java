package mk.finki.postcard.web.rest;

import mk.finki.postcard.model.Postcard;
import mk.finki.postcard.service.PostcardService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/postcards")
public class PostcardApi {

    private final PostcardService postcardService;

    public PostcardApi(PostcardService postcardService) {
        this.postcardService = postcardService;
    }

    @GetMapping("/{id}")
    public Postcard getPostcard(@PathVariable String id) {
        return this.postcardService.getPostcard(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Postcard createPostcard(@RequestBody Postcard  postcard,
                                   HttpServletResponse response) {

        Postcard result = this.postcardService.savePostcard(postcard.getId(), postcard.getUserId(),
                postcard.getType(), postcard.getMessage(), postcard.getFont());
        response.setHeader("Location","/api/postcards/save");

        return result;
    }

}
