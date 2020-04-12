package mk.finki.postcard.service.impl;

import mk.finki.postcard.model.OrderOnline;
import mk.finki.postcard.model.exceptions.InvalidOrderNotFoundException;
import mk.finki.postcard.repository.OrderOnlineRepository;
import mk.finki.postcard.service.OrderOnlineService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderOnlineServiceImpl implements OrderOnlineService {

    private final OrderOnlineRepository orderOnlineRepository;

    public OrderOnlineServiceImpl(OrderOnlineRepository orderOnlineRepository) {
        this.orderOnlineRepository = orderOnlineRepository;
    }
    @Override
    public OrderOnline saveOrder(String id, String user_id,String postcard_id, String street, String city, String country, int country_code, double price, String status) {

        OrderOnline orderOnline = new OrderOnline(id, user_id, postcard_id, street, city, country, country_code, price, status);
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
