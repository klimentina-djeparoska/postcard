package mk.finki.postcard.web.rest;

import mk.finki.postcard.model.OrderOnline;
import mk.finki.postcard.service.OrderOnlineService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/orders")
public class OrderApi {

    private final OrderOnlineService orderOnlineService;

    public OrderApi (OrderOnlineService orderOnlineService) {
        this.orderOnlineService = orderOnlineService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderOnline saveOrder (@RequestBody OrderOnline requestOrder,
                                  HttpServletResponse response) {

        OrderOnline order = this.orderOnlineService.saveOrder(requestOrder.getId(), requestOrder.getUserId(),
                requestOrder.getPostcardId(), requestOrder.getStreet(), requestOrder.getCity(), requestOrder.getCountry(),
                requestOrder.getCountry_code(), requestOrder.getPrice(), requestOrder.getStatus());

        response.setHeader("Location", "/api/orders");
        return order;
    }

    @GetMapping(path = "/user")
    public List<OrderOnline> getOrdersByUserId(@RequestParam String user_uid ) {
        return this.orderOnlineService.getAllOrdersForUser(user_uid);
    }

}
