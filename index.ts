import express, { Express, Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Glame',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    ui_mode: 'custom',
    billing_address_collection: 'auto',
    customer_creation: 'always',
    customer_email: 'test@test.com',
    return_url: 'https://example.com/return?session_id={CHECKOUT_SESSION_ID}'
  });

  res.json({checkoutSessionClientSecret: session.client_secret});
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});