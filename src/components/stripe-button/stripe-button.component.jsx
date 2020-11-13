import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51Hn4ZuIDiiWP9tqXQGXfmWxh2EsO6cDqEEh8qUpAaeYS42dzDUAHwHd86C6CT7ggzj3U7fVMHPTUK30MkE48Ck6J00yT9dzkYW'
  const onToken = token => {
    console.log(token)
    window.alert('Payment Successful')
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='RIVEGAUCHE Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}

    />
  )
}

export default StripeCheckoutButton
