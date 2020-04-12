package mk.finki.postcard.repository;

import mk.finki.postcard.model.PostcardType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostcardTypeRepository extends JpaRepository<PostcardType, String> {
}
