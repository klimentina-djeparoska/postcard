package mk.finki.postcard.service;

import mk.finki.postcard.model.OrderOnline;

import java.util.List;

public interface OrderOnlineService {
    OrderOnline saveOrder(String id, String user_id, String postcard, String street, String city, String country,
                    int postalCode, double price, String status);

    List<OrderOnline> getAllOrdersForUser(String user_id);

    List<OrderOnline> getAllOrdersForCountry(String country);

    List<OrderOnline> getAllOrdersForCity(String city);

    OrderOnline getOrder(String id);

    void deleteById(String id);

    void changeOrderStatus(String id, String status);

}
