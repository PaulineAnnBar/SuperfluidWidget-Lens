import "./App.css";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WagmiConfig } from "wagmi";
import superTokenList from "@superfluid-finance/tokenlist";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./wagmi.js";
import { LensProvider } from "@lens-protocol/react-web";
import { data } from "./data.json";
import { useState, useEffect } from "react";

import { lensConfig } from "./lens-config";
import { createClient, getDefaultProfile } from "./api";
import { refreshAuthToken } from "./utils";
import { ethers } from "ethers";

export default function App() {
  const [userProfile, setUserProfile] = useState();
  const [setConnected] = useState(true);
  const [setUserAddress] = useState();

  useEffect(() => {
    refreshAuthToken();
    async function checkConnection() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const addresses = await provider.listAccounts();
      if (addresses.length) {
        console.log("1");
        setConnected(true);
        setUserAddress(addresses[0]);
        getUserProfile(addresses[0]);
        console.log(userProfile);
      } else {
        console.log("2");
        setConnected(false);
      }
    }
    checkConnection();
  }, [userProfile]);

  async function getUserProfile(address) {
    try {
      const urqlClient = await createClient();
      const response = await urqlClient
        .query(getDefaultProfile, {
          address,
        })
        .toPromise();
      setUserProfile(response.data.defaultProfile);
    } catch (err) {
      console.log("error fetching user profile...: ", err);
    }
  }

  // // const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     const profilesByHandle = await lensClient.profile.fetchAll({
  //       handles: ["pukkynext.test"],
  //     });

  //     console.log(
  //       `Profiles fetched by handles: `,
  //       profilesByHandle.items.map((i) => ({ id, handle }))
  //     );

  //     if (profilesByHandle.length === 0) {
  //       throw new Error("You must have a Lens Handle");
  //     }
  //     setProfile(profilesByHandle[0]);
  //   };
  //   fetchProfiles();
  // }, []);

  // if (!profile) {
  //   return null;
  // }

  // const customPaymentDetails = data.paymentDetails.paymentOptions.filter(
  //   (receiverAddress) => {
  //     return {
  //       ...option,
  //       receiverAddress: profile.handles,
  //     };
  //   }
  // );

  // const customPaymentDetails = data.paymentDetails.paymentOptions.map(
  //   //(option) => {
  //   //   if (option.receiverAddress !== profile.handles) {
  //   //     throw new Error("Invalid receiver address");
  //   //   }
  //   //   return {
  //   //     ...option,
  //   //     receiverAddress: profile.handles,
  //   //   };
  //   // }
  // );

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
                  if (userProfile) {
                    return (
                      <>
                        <SuperfluidWidget
                          {...data}
                          tokenList={superTokenList}
                          type="dialog"
                          walletManager={walletManager}
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
                  } else {
                    return (
                      <div className="Lens-condition">
                        You need to have a Lens profile to use this Superfluid
                        widget
                      </div>
                    );
                  }
                }}
              </ConnectButton.Custom>
            </>
          </RainbowKitProvider>
        </LensProvider>
      </WagmiConfig>
    </>
  );
}
