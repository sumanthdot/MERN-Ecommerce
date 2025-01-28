const Stripes = require('stripe')

const Stripe = Stripes(process.env.STRIPE_SECRET_KEY)

module.exports = Stripe