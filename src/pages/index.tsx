import Calculator from "@/components/Calculator";
import { useState } from "react";

export default function Home() {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );

  return (
    <>
      <Calculator
        cartValue={cartValue}
        deliveryDistance={deliveryDistance}
        numberOfItems={numberOfItems}
        orderTime={orderTime}
        onCartValueChange={setCartValue}
        onDeliveryDistanceChange={setDeliveryDistance}
        onNumberOfItemsChange={setNumberOfItems}
        onOrderTimeChange={setOrderTime}
      />
    </>
  );
}
