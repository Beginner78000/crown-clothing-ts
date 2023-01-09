import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js';

import { BUTTON_TYPE_CLASSES } from "../Button";
import { selectCartTotal } from '../../selectors/cart.selector';
import { selectCurrentUser } from '../../selectors/user.selector';

import { PaymentButton, PaymentFormContainer, FormContainer } from './paymentForm.styles';

// Type guard
const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        setIsProcessingPayment(true);

        // Requête à l'API (AWS function with netlify)
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            // On convertie en cent car c'est ce que stripe attent comme valeur de retour
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        // On récupère le client_secret qui associe le client à la demande de payement
        const clientSecret = response.paymentIntent.client_secret;

        const cardDetails = elements.getElement(CardElement);

        // if(cardDetails === null) return;
        if(!ifValidCardElement(cardDetails)) return;

        // Avec le client_secret nous pouvons effectuer le payement en cours
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                // Stripe va obtenir tous les détails dont il a besoin
                // pour transmettre cette valeur de paiement qui est inséré en conséquence
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error);
        }else {
            if(paymentResult.paymentIntent.status === "succeeded") {
                alert('Payment Successful');
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton
                    isLoading={isProcessingPayment}
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    {' '}
                    Pay now{' '}
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;