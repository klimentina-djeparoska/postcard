package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.PostcardType;
import mk.finki.postcard.repository.PostcardTypeRepository;
import mk.finki.postcard.service.PostcardTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostcardTypeServiceImpl implements PostcardTypeService {

    private final PostcardTypeRepository postcardTypeRepository;

    public PostcardTypeServiceImpl(PostcardTypeRepository postcardTypeRepository) {
        this.postcardTypeRepository = postcardTypeRepository;
    }

    @Override
    public Optional<List<PostcardType>> getAll() {
        return Optional.of(this.postcardTypeRepository.findAll());
    }

    @Override
    public PostcardType savePostcardType(String name, Integer width, Integer height, Integer numOfImages, String position) {
        PostcardType postcardType = new PostcardType(name, width, height, numOfImages, position);
        return this.postcardTypeRepository.save(postcardType);
    }

    @Override
    public List<PostcardType> getAllPostcardTypes() {
        return this.postcardTypeRepository.findAll();
    }

    @Override
    public Optional<PostcardType> getPostcardType(String name) {
        return this.postcardTypeRepository.findById(name);
    }

    @Override
    public void deleteByName(String name) {
        this.postcardTypeRepository.deleteById(name);
    }
}
