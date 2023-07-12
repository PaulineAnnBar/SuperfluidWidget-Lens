import { LensProvider } from "@lens-protocol/react-web";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import App from "./App.jsx";
import "./index.css";
import { lensConfig } from "./lens-config";
import { chains, wagmiConfig } from "./wagmi.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <LensProvider config={lensConfig}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </LensProvider>
    </WagmiConfig>
  </React.StrictMode>
);
