import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {fetchCheckoutSession} from '../../../../repository/stripeSessionRepository';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_hfj0LGy4k2dJGJwQSmPZXvP100o2doCYTD');


// In order to use Checkout, you must set an account or business name (since i am a student not a company i can't use this library)
export const Stripe = (props) =>  {
    const handleClick = async (event) => {
        const { sessionId } = await fetchCheckoutSession(props.order);

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });
    };
    return (
        <button role="link" onClick={handleClick}>
            Checkout
        </button>
    );
};
