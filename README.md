# Wolt Summer 2024 Engineering Internship Challenge

This is a Delivery Fee Calculator that calculates the delivery fees according to the specific conditions:

- If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€.
- A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
- If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
- The delivery fee can never be more than 15€, including possible surcharges.
- The delivery is free (0€) when the cart value is equal or more than 200€.
- During the Friday rush, 3 - 7 PM, the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x.

App was initialised with `create-next-app` for convenience.\
Developed with `React` and `Typescript`.\
`Jest` used for testing.\

Calculator component is created in `src/components/Calculator.jsx`\
Rendered in `src/pages/index.tsx`\
Tests exist in `src/components/Calculator.test.jsx`

## Local development

### Install the dependencies:

```bash
npm i
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Create the production build

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Start the production build

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Run the tests in watch mode:

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```
