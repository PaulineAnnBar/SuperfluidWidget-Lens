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
                          Dialog
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
