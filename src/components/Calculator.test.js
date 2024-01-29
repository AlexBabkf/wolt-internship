import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";
import test from "node:test";

describe("Calculator Component", () => {
  test("calculates delivery fee correctly", () => {
    render(<Calculator />);

    const onCartValueChangeMock = jest.fn();
    const onDeliveryDistanceChangeMock = jest.fn();
    const onNumberOfItemsChangeMock = jest.fn();
    const onOrderTimeChangeMock = jest.fn();

    fireEvent.change(screen.getByLabelText("Cart Value:"), {
      target: { value: "150" },
    });
    fireEvent.change(screen.getByLabelText("Delivery Distance:"), {
      target: { value: "1200" },
    });
    fireEvent.change(screen.getByLabelText("Number of Items:"), {
      target: { value: "6" },
    });
    fireEvent.change(screen.getByLabelText("Order Time:"), {
      target: { value: "2022-01-01T16:00" },
    });

    render(
      <Calculator
        cartValue={150}
        deliveryDistance={1200}
        numberOfItems={6}
        orderTime="2022-01-01T16:00"
        onCartValueChange={onCartValueChangeMock}
        onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
        onNumberOfItemsChange={onNumberOfItemsChangeMock}
        onOrderTimeChange={onOrderTimeChangeMock}
      />
    );

    fireEvent.click(screen.getByText("Calculate delivery price"));
    expect(screen.getByText("Delivery price: 5.5 €")).toBeInTheDocument();
  });
});
