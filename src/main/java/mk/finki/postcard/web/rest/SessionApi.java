package mk.finki.postcard.web.rest;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import mk.finki.postcard.model.OrderOnline;
import mk.finki.postcard.service.SessionService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/sessions")
public class SessionApi {

    private final SessionService sessionService;

    public SessionApi(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public Session createCheckoutSession(@RequestBody OrderOnline orderOnline,
                                         HttpServletResponse response) throws StripeException {
        Session session = this.sessionService.createCheckoutSession(orderOnline);
        response.setHeader("Location", "/api/sessions/create");
        return session;
    }

}
