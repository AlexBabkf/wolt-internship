import { useState } from "react";

interface CalculatorProps {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  orderTime: string;
  onCartValueChange: (value: number) => void;
  onDeliveryDistanceChange: (value: number) => void;
  onNumberOfItemsChange: (value: number) => void;
  onOrderTimeChange: (value: string) => void;
}

export default function Calculator({
  cartValue,
  deliveryDistance,
  numberOfItems,
  orderTime,
  onCartValueChange,
  onDeliveryDistanceChange,
  onNumberOfItemsChange,
  onOrderTimeChange,
}: CalculatorProps): JSX.Element {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  function calculateDeliveryFee() {
    const orderDatetime = new Date(orderTime);
    let calculatedFee: number = 0;
    if (cartValue < 200) {
      if (cartValue < 10) {
        calculatedFee += parseFloat((10 - cartValue).toFixed(2));
      }
      if (deliveryDistance < 1000) {
        calculatedFee += 2;
      } else {
        calculatedFee += Math.ceil((deliveryDistance - 1000) / 500) + 2;
      }
      if (numberOfItems >= 5) {
        calculatedFee += (numberOfItems - 4) * 0.5;
      }
      if (numberOfItems > 12) {
        calculatedFee += 1.2;
      }
      if (
        orderDatetime.getDay() === 5 &&
        orderDatetime.getHours() >= 15 &&
        orderDatetime.getHours() < 19
      ) {
        calculatedFee *= 1.2;
      }
      if (calculatedFee > 15) {
        calculatedFee = 15;
      }
    }
    setDeliveryFee(calculatedFee);
  }

  return (
    <div className="calculator-wrapper">
      <form aria-labelledby="title" onSubmit={(e) => e.preventDefault()}>
        <h2 id="title">Delivery Fee Calculator</h2>
        <div className="field-wrapper">
          <label id="cart-value-label" htmlFor="cart-value">
            Cart Value (in Euros):
          </label>
          <input
            data-testid="cartValue"
            aria-labelledby="cart-value-label"
            id="cart-value"
            type="number"
            min="0"
            placeholder="0"
            onChange={(e) => onCartValueChange(parseFloat(e.target.value))}
          />{" "}
        </div>
        <div className="field-wrapper">
          <label id="delivery-distance-label" htmlFor="delivery-distance">
            Delivery Distance (in meters):
          </label>
          <input
            data-testid="deliveryDistance"
            aria-labelledby="delivery-distance-label"
            id="delivery-distance"
            type="number"
            min="0"
            placeholder="0"
            onChange={(e) =>
              onDeliveryDistanceChange(parseInt(e.target.value, 10))
            }
          />{" "}
        </div>
        <div className="field-wrapper">
          <label id="number-of-items-label" htmlFor="number-of-items">
            Number of Items:
          </label>
          <input
            data-testid="numberOfItems"
            aria-labelledby="number-of-items-label"
            id="number-of-items"
            type="number"
            min="0"
            placeholder="0"
            onChange={(e) =>
              onNumberOfItemsChange(parseInt(e.target.value, 10))
            }
          />
        </div>
        <div className="field-wrapper">
          <label id="order-time-label" htmlFor="order-time">
            Order Time:
          </label>
          <input
            data-testid="orderTime"
            aria-labelledby="order-time-label"
            id="order-time"
            type="datetime-local"
            value={orderTime}
            onChange={(e) => onOrderTimeChange(e.target.value)}
          />
        </div>
        <div className="result-wrapper">
          <button
            data-testid="calculateButton"
            aria-live="polite"
            onClick={calculateDeliveryFee}
          >
            Calculate delivery price
          </button>
          <p data-testid="fee">Delivery price: {deliveryFee} &euro;</p>
        </div>
      </form>
    </div>
  );
}
