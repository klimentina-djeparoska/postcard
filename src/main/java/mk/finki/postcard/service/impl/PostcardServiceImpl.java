package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.Postcard;
import mk.finki.postcard.model.exceptions.InvalidPostcardNotFoundException;
import mk.finki.postcard.repository.PostcardRepository;
import mk.finki.postcard.service.PostcardService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostcardServiceImpl implements PostcardService {

    private final PostcardRepository postcardRepository;

    public PostcardServiceImpl(PostcardRepository postcardRepository) {
        this.postcardRepository = postcardRepository;
    }

    @Override
    public Postcard savePostcard(String id,String user_id, String type, String message) {
        Postcard postcard = new Postcard(id, user_id, type, message);
        return this.postcardRepository.save(postcard);
    }

    @Override
    public List<Postcard> getAllPostcards(String user_id) {
        return this.postcardRepository.findAllByUserId(user_id);
    }

    @Override
    public Postcard getPostcard(String id) {
        return this.postcardRepository.findById(id).orElseThrow(InvalidPostcardNotFoundException::new);
    }

    @Override
    public void deleteById(String id) {
        this.postcardRepository.deleteById(id);
    }
}
