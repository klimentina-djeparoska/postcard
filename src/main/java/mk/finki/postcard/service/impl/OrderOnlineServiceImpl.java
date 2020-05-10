package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.OrderOnline;
import mk.finki.postcard.model.Postcard;
import mk.finki.postcard.model.exceptions.InvalidOrderNotFoundException;
import mk.finki.postcard.model.exceptions.InvalidPostcardNotFoundException;
import mk.finki.postcard.repository.OrderOnlineRepository;
import mk.finki.postcard.repository.PostcardRepository;
import mk.finki.postcard.service.OrderOnlineService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderOnlineServiceImpl implements OrderOnlineService {

    private final OrderOnlineRepository orderOnlineRepository;
    private final PostcardRepository postcardRepository;

    public OrderOnlineServiceImpl(OrderOnlineRepository orderOnlineRepository, PostcardRepository postcardRepository) {
        this.orderOnlineRepository = orderOnlineRepository;
        this.postcardRepository = postcardRepository;
    }
    @Override
    public OrderOnline saveOrder(String id, String user_id,String postcard_id, String street, String city, String country, int postalCode, double price, String status) {

        if (id == null || user_id == null || postcard_id == null) {
            throw new IllegalArgumentException();
        }

        //check if postcard exists
        Postcard postcard = this.postcardRepository.findById(postcard_id).orElseThrow(InvalidPostcardNotFoundException::new);

        OrderOnline orderOnline = new OrderOnline(id, user_id, postcard.getId(), street, city, country, postalCode, price, status);
        return this.orderOnlineRepository.save(orderOnline);
    }

    @Override
    public List<OrderOnline> getAllOrdersForUser(String user_id) {
        return this.orderOnlineRepository.findAllByUserId(user_id);
    }

    @Override
    public List<OrderOnline> getAllOrdersForCountry(String country) {
        return this.orderOnlineRepository.findAllByCountry(country);
    }

    @Override
    public List<OrderOnline> getAllOrdersForCity(String city) {
        return this.orderOnlineRepository.findAllByCity(city);
    }

    @Override
    public OrderOnline getOrder(String id) {
        return this.orderOnlineRepository.findById(id).orElseThrow(InvalidOrderNotFoundException::new);
    }

    @Override
    public void deleteById(String id) {
        this.orderOnlineRepository.deleteById(id);
    }

    @Override
    public void changeOrderStatus(String id, String status) {
        OrderOnline orderOnline = this.orderOnlineRepository.findById(id).orElseThrow(InvalidOrderNotFoundException::new);
        orderOnline.setStatus(status);
        this.orderOnlineRepository.save(orderOnline);
    }
}
