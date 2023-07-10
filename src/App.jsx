import "./App.css";
import SuperfluidWidget from "@superfluid-finance/widget";
import { WagmiConfig } from "wagmi";
import superTokenList from "@superfluid-finance/tokenlist";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./wagmi.js";
import { LensProvider } from "@lens-protocol/react-web";
import { data } from "./data.json";
import { lensConfig } from "./lens-config";

export default function App() {
  // const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     const profilesByHandle = await lensClient.profile.fetchAll({
  //       handles: ["pukkynext.test"],
  //     });

  //     // console.log(
  //     //   `Profiles fetched by handles: `,
  //     //   profilesByHandle.items.map((i) => ({ id, handle }))
  //     // );

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
  //   (option) => {
  //     if (option.receiverAddress !== profile.handles) {
  //       throw new Error("Invalid receiver address");
  //     }
  //     return {
  //       ...option,
  //       receiverAddress: profile.handles,
  //     };
  //   }
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
                  return (
                    <>
                      <SuperfluidWidget
                        {...data}
                        tokenList={superTokenList}
                        type="dialog"
                        walletManager={walletManager}
                        //={customPaymentDetails}
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
