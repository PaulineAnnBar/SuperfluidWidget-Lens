import "./App.css";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WagmiConfig } from "wagmi";
import superTokenList from "@superfluid-finance/tokenlist";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./wagmi.js";
import { LensProvider } from "@lens-protocol/react-web";
import { data } from "./data.json";
import { lensConfig } from "./lens-config";
import { useAccount } from "wagmi";
import { useProfilesOwnedBy } from "@lens-protocol/react-web";

import "./App.css";
import { useEffect } from "react";

export default function App() {
  const { account } = useAccount();
  const { data: profiles } = useProfilesOwnedBy({
    address: account,
  });

  useEffect(() => {
    const checkProfile = async () => {
      try {
        if (profiles.length > 0) {
          // Wallet address has a Lens profile
          console.log("Lens profile found for this address.");
        } else {
          // Wallet address does not have a Lens profile
          console.log("No Lens profile found for this address.");
        }
      } catch (error) {
        console.error("Error checking Lens profile:", error);
      }
    };

    if (account) {
      checkProfile();
    }
  }, [account, profiles]);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <LensProvider config={lensConfig}>
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
                        // paymentDetails={{
                        //   paymentOptions: customPaymentDetails,
                        // }}
                      >
                        {({ openModal }) => (
                          <button
                            className="button"
                            onClick={() => openModal()}
                          >
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
        </LensProvider>
      </WagmiConfig>
    </>
  );
}
