package mk.finki.postcard.service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import mk.finki.postcard.model.OrderOnline;

public interface SessionService {

    Session createCheckoutSession(OrderOnline order) throws StripeException;
}
