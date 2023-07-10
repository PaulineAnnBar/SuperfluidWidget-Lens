# Superfluid Subscription Widget with Lens handle

Superfluid Subscription Widget for Lens handle holders

This repo will teach you how to use the Superfluid subscription wallet with a Vite/React app. You will be able to make a stream and I will show you how to restrict the payment option for .Lens handle holders only.

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

Make sure you add Polygon Mumbai in the Wagmi chains  like this :

```jsx
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
```

Now your app should look like something that :

```jsx
const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <YourApp />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
```

### Step 4:  Generate your JSON file in the widget builder

Before you include the widget in your file, you'll need to generate JSON that you'll pass as a prop to the widget component. This JSON specifies most of your widget's properties, and you can use our hosted, no-code widget builder to visually see what your widget will look like. You can find the widget builder [here](https://superfluid-widget-builder.vercel.app/).

![superfluid-JSON.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0823a7e2-8662-4d6f-aca9-f85a5f4b83af/superfluid-JSON.gif)

### Step 5:  Add the component and pass the props

Here is what the code should look like, I will break it down below 👇

```jsx
import "./App.css";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WagmiConfig } from "wagmi";
import superTokenList from "@superfluid-finance/tokenlist";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./wagmi.js";
import { data } from "./data.json";

export default function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <>
            <ConnectButton.Custom>
              {({ openConnectModal, connectModalOpen }) => {
                const walletManager = {
                  open: async () => openConnectModal(),
                  isOpen: connectModalOpen,
                };
                return (
                  <>
                    <SuperfluidWidget
                      {...data}
                      tokenList={superTokenList}
                      type="dialog"
                      walletManager={walletManager}
                    >
                      {({ openModal }) => (
                        <button className="button" onClick={() => openModal()}>
                          Open Superfluid widget
                        </button>
                      )}
                    </SuperfluidWidget>
                  </>
                );
              }}
            </ConnectButton.Custom>
          </>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
```

1. On the `<SuperfluidWidget>` we passed the `{…data}` which is my JSON file that I generated in the widget builder. You will also need the following props: `tokenList, type` and `walletManager`. The last one is necessary to ensure that the widget works properly with wallet connection libraries such as RainbowKit, Web3Modal, & more
2. `<ConnectButton.Custom/>` Use the customed ConnectButton from RainbowKit so you can use a function.

### Step 6 : Create a function that only allows Lens Holder to receive the stream

1. For this, we will need to install the [LensClient SDK](https://docs.lens.xyz/docs/lensclient-sdk). 

```jsx
$ npm install @lens-protocol/client
```

1. Initialize the client

```jsx
import { LensClient, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development
});
```

1. First we check if we’re connected and use our address

```jsx
import { useAccount,address, connector } from 'wagmi'
 
function App() {
  const { address, isConnected } = useAccount()
 
  if (isConnected) return <div>{address}</div>
}
```

1. We call our function to fetch to if the address has a lens profile
# Superfluid Subscription Widget

June 2023 / Pauline Barnades

Superfluid Subscription Widget for Lens handle holders

Today tutorial will teach you to use the Superfluid subscription wallet with a Vite/ react app. You will be able to make a stream and I will show you how to restrict the payment option for .Lens handle holders only.

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

$ npm install @lens-protocol/client
