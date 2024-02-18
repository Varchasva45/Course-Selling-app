const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { course } = req.body;

        const lineItems = [{
            price_data: {
                currency: 'inr',
                product_data: {
                    name: course.title,
                    images: [course.imageLink],
                },
                unit_amount: Math.round(course.price) * 100,
            },
            quantity: 1, 
        }]

        console.log("lineItem:", lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-failure",
        });
        
        console.log("session", session);
        res.json({ id: session.id, session});
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

module.exports = router;
