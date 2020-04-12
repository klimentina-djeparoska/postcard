package mk.finki.postcard.repository;

import mk.finki.postcard.model.Postcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostcardRepository extends JpaRepository<Postcard, String> {

    List<Postcard> findAllByUserId(String userId);
}
