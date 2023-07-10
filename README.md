# Superfluid Subscription Widget
Superfluid Subscription Widget for Lens handle holders

this repo will demonstrate how to use the Superfluid subscription wallet with a Vite/ react app. You will be able to make a stream and I will show you how to restrict the payment option for .Lens handle holders only.

We will use Polygon Mumbai for this example.

We will use the following web3 dependencies and libraries:

- Wagmi
- Superfluid subscription widget
- Rainbow Kit
- Lens SDK

This is a good use case for content creators to get paid on socials.

### Step 1:  Set up your project

Create a new directory for your project and create a new React app. 

Please note that I use Vite.js but you can also create a React.js or React/typescript
See the [Vite documentation](https://vitejs.dev/guide/) for the #yarn or #pnpm commands

```jsx
mkdir my-dapp
cd my-dapp
npm create vite@latest my-dapp --template react
```
### Step 2: Configure the Superfluid subscription widget

Next, install the superfluid subscription widget as a dependency in your project using the command:

```jsx
#npm
npm install --save @superfluid-finance/widget wagmi @superfluid-finance/tokenlist

#yarn
yarn add @superfluid-finance/widget wagmi @superfluid-finance/tokenlist
```

### Step 3:  Add RainbowKit library for our Wallet

RainbowKit is a React library and out-of-the-box wallet management for your dapp. 
```jsx
npm install @rainbow-me/rainbowkit wagmi viem
```
It’s very easy to set up  👉 follow these steps : https://www.rainbowkit.com/docs/installation

### Step 4:  Generate your JSON file in the widget builder

Before you include the widget in your file, you'll need to generate JSON that you'll pass as a prop to the widget component. This JSON specifies most of your widget's properties, and you can use our hosted, no-code widget builder to visually see what your widget will look like. You can find the widget builder [here](https://superfluid-widget-builder.vercel.app/).

![superfluid-JSON.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0823a7e2-8662-4d6f-aca9-f85a5f4b83af/superfluid-JSON.gif)

### Step 6 : install LensClient SDK

1. For this, we will need to install the [LensClient SDK](https://docs.lens.xyz/docs/lensclient-sdk). 
```jsx
npm install @lens-protocol/client
```

