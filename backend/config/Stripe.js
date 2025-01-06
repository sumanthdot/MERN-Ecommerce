const Stripe = require('stripe')

const Stripe = Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = Stripe