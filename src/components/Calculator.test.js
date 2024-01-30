import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "./Calculator";

const onCartValueChangeMock = jest.fn();
const onDeliveryDistanceChangeMock = jest.fn();
const onNumberOfItemsChangeMock = jest.fn();
const onOrderTimeChangeMock = jest.fn();

test("Fields respond to user interaction", async () => {
  render(
    <Calculator
      onCartValueChange={onCartValueChangeMock}
      onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
      onNumberOfItemsChange={onNumberOfItemsChangeMock}
      onOrderTimeChange={onOrderTimeChangeMock}
    />
  );

  await userEvent.type(screen.getByTestId("cartValue"), "1");
  await userEvent.type(screen.getByTestId("deliveryDistance"), "2");
  await userEvent.type(screen.getByTestId("numberOfItems"), "3");
  await userEvent.type(screen.getByTestId("orderTime"), "2024-02-02T17:28");

  expect(onCartValueChangeMock).toHaveBeenCalledWith(1);
  expect(onDeliveryDistanceChangeMock).toHaveBeenCalledWith(2);
  expect(onNumberOfItemsChangeMock).toHaveBeenCalledWith(3);
  expect(onOrderTimeChangeMock).toHaveBeenCalledWith("2024-02-02T17:28");
});

const cartValueCases = [
  {
    cartValue: 8.2,
    deliveryPrice: /Delivery price:\s*3.8\s*€/,
  },
  {
    cartValue: 10,
    deliveryPrice: /Delivery price:\s*2\s*€/,
  },
];

test.each(cartValueCases)(
  "Cart value surcharge is calculated for less than 10 euros",
  (cartValueCase) => {
    render(
      <Calculator
        cartValue={cartValueCase.cartValue}
        deliveryDistance={0}
        numberOfItems={0}
        orderTime="2024-01-29T22:28"
        onCartValueChange={onCartValueChangeMock}
        onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
        onNumberOfItemsChange={onNumberOfItemsChangeMock}
        onOrderTimeChange={onOrderTimeChangeMock}
      />
    );

    fireEvent.click(screen.getByTestId("calculateButton"));
    const element = screen.getByTestId("fee");
    expect(element.textContent).toMatch(cartValueCase.deliveryPrice);
  }
);

const distanceCases = [
  {
    deliveryDistance: 999,
    deliveryPrice: /Delivery price:\s*2\s*€/,
  },
  {
    deliveryDistance: 1001,
    deliveryPrice: /Delivery price:\s*3\s*€/,
  },
];

test.each(distanceCases)("Delivery distance is calculated", (distanceCase) => {
  render(
    <Calculator
      cartValue={10}
      deliveryDistance={distanceCase.deliveryDistance}
      numberOfItems={0}
      orderTime="2024-01-29T22:28"
      onCartValueChange={onCartValueChangeMock}
      onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
      onNumberOfItemsChange={onNumberOfItemsChangeMock}
      onOrderTimeChange={onOrderTimeChangeMock}
    />
  );

  fireEvent.click(screen.getByTestId("calculateButton"));

  const element = screen.getByTestId("fee");
  expect(element.textContent).toMatch(distanceCase.deliveryPrice);
});

const numberOfItemsCases = [
  {
    numberOfItems: 4,
    deliveryPrice: /Delivery price:\s*2\s*€/,
  },
  {
    numberOfItems: 5,
    deliveryPrice: /Delivery price:\s*2.5\s*€/,
  },
  {
    numberOfItems: 13,
    deliveryPrice: /Delivery price:\s*7.7\s*€/,
  },
];

test.each(numberOfItemsCases)(
  "Item number fee is calculated",
  (numberOfItemsCase) => {
    render(
      <Calculator
        cartValue={10}
        deliveryDistance={0}
        numberOfItems={numberOfItemsCase.numberOfItems}
        orderTime="2024-01-29T22:28"
        onCartValueChange={onCartValueChangeMock}
        onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
        onNumberOfItemsChange={onNumberOfItemsChangeMock}
        onOrderTimeChange={onOrderTimeChangeMock}
      />
    );

    fireEvent.click(screen.getByTestId("calculateButton"));
    const element = screen.getByTestId("fee");
    expect(element.textContent).toMatch(numberOfItemsCase.deliveryPrice);
  }
);

test("Delivery is free when cart value is 200 and more", () => {
  render(
    <Calculator
      cartValue={200}
      deliveryDistance={3000}
      numberOfItems={50}
      orderTime="2024-01-29T22:28"
      onCartValueChange={onCartValueChangeMock}
      onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
      onNumberOfItemsChange={onNumberOfItemsChangeMock}
      onOrderTimeChange={onOrderTimeChangeMock}
    />
  );

  fireEvent.click(screen.getByTestId("calculateButton"));
  const deliveryPrice = /Delivery price:\s*0\s*€/;

  const element = screen.getByTestId("fee");
  expect(element.textContent).toMatch(deliveryPrice);
});

test("Rush hour is calculated", () => {
  render(
    <Calculator
      cartValue={10}
      deliveryDistance={0}
      numberOfItems={0}
      orderTime="2024-02-02T17:28"
      onCartValueChange={onCartValueChangeMock}
      onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
      onNumberOfItemsChange={onNumberOfItemsChangeMock}
      onOrderTimeChange={onOrderTimeChangeMock}
    />
  );

  fireEvent.click(screen.getByTestId("calculateButton"));
  const deliveryPrice = /Delivery price:\s*2.4\s*€/;

  const element = screen.getByTestId("fee");
  expect(element.textContent).toMatch(deliveryPrice);
});

test("Fee does not exceed 15 euros", () => {
  render(
    <Calculator
      cartValue={100}
      deliveryDistance={5000}
      numberOfItems={250}
      orderTime="2024-02-02T17:28"
      onCartValueChange={onCartValueChangeMock}
      onDeliveryDistanceChange={onDeliveryDistanceChangeMock}
      onNumberOfItemsChange={onNumberOfItemsChangeMock}
      onOrderTimeChange={onOrderTimeChangeMock}
    />
  );

  fireEvent.click(screen.getByTestId("calculateButton"));
  const deliveryPrice = /Delivery price:\s*15\s*€/;

  const element = screen.getByTestId("fee");
  expect(element.textContent).toMatch(deliveryPrice);
});
