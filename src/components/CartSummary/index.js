import Popup from 'reactjs-popup'
import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentMethod = event => {
    setPaymentMethod(event.target.value)
  }

  const handleConfirmOrder = () => {
    setOrderPlaced(true)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total </span>
                Rs {total} /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              <Popup
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
                modal
                nested
                onClose={() => setOrderPlaced(false)}
              >
                <div className="popup-container">
                  <div className="cart-summary-container">
                    <h1 className="order-total-value">
                      <span className="order-total-label">Order Total </span>
                      Rs {total} /-
                    </h1>
                    <p className="total-items">
                      {cartList.length} Items in cart
                    </p>
                  </div>
                  <div className="payment-container">
                    <select
                      value={paymentMethod}
                      onChange={handlePaymentMethod}
                    >
                      <option value="">Select payment method</option>
                      <option value="Net Banking" disabled>
                        Net Banking
                      </option>
                      <option value="Card" disabled>
                        Card
                      </option>
                      <option value="UPI" disabled>
                        UPI
                      </option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={paymentMethod !== 'cod'}
                    className="checkout-button"
                  >
                    Confirm Order
                  </button>
                  {orderPlaced && (
                    <div>
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    </div>
                  )}
                </div>
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartSummary
