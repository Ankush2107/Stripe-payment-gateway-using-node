const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Stripe = require('stripe');

dotenv.config();
const stripe = new Stripe(process.env.STRIPT_PUBLISHABLE_KEY);

const app = express();

const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hii Hello")
});

app.post("/payment", async (req, res) => {
    const product = await stripe.products.create({
        name: "T-shirt"
    });
    if(product) {
        const price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 100 * 100,
            currency: "inr",
        });

        if(price.id) {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: `${price.id}`,
                        quantity: 1
                    }
                ],
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
                customer_email: 'demo@gmail.com'
            })
    
            res.json(session);
        };
    };

    
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}...`);
})