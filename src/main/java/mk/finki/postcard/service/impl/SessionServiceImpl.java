package mk.finki.postcard.service.impl;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import mk.finki.postcard.model.OrderOnline;
import mk.finki.postcard.model.Postcard;
import mk.finki.postcard.service.PostcardService;
import mk.finki.postcard.service.SessionService;
import org.springframework.stereotype.Service;
import com.stripe.exception.StripeException;

@Service
public class SessionServiceImpl implements SessionService {

    private final PostcardService postcardService;
    public SessionServiceImpl(PostcardService postcardService) {
        this.postcardService = postcardService;
    }

    public Session createCheckoutSession(OrderOnline order) throws StripeException {
        // test key
        Stripe.apiKey = "sk_test_BvirLZ2Ji4SQPDMwOuUSFX5N00yMRrObAg";

        Postcard postcard = this.postcardService.getPostcard(order.getPostcardId());
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setName("Postcard")
                                        .setDescription("Size: " + postcard.getType())
                                        .setAmount((long)order.getPrice())
                                        .setCurrency("eur")
                                        .setQuantity((long)1)
                                        .build())
                        .setSuccessUrl("https://example.com/success?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl("https://example.com/cancel")
                        .build();

        Session session = Session.create(params);
        return session;
    }

}
