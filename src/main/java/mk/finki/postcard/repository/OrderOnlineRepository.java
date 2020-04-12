package mk.finki.postcard.repository;

import mk.finki.postcard.model.OrderOnline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderOnlineRepository extends JpaRepository<OrderOnline, String> {

    List<OrderOnline> findAllByCountry(String country);

    List<OrderOnline> findAllByCity(String city);

    List<OrderOnline> findAllByUserId(String userId);


}
