import { ConnectButton } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget from "@superfluid-finance/widget";
import "./App.css";
import { data } from "./data.json";
import Modal from "./Modal";

export default function App() {
  //with the SDK if widget doesnt work
  // async function executeFlow(receiver) {
  //   try {
  //     const profileReceiver = await fetchProfiles(receiver);
  //     if (profileReceiver) {
  //       await flowOp.exec({ signer });
  //     }
  //   } catch (error) {
  //     console.error(`Error: ${error}`);
  //   }
  // }

  // // Call executeFlow function with receiver's address
  // executeFlow("0x42bb40bf79730451b11f6de1cba222f17b87afd7");

  return (
    <>
      <ConnectButton.Custom>
        {({ openConnectModal, connectModalOpen }) => {
          const walletManager = {
            open: async () => openConnectModal(),
            isOpen: connectModalOpen,
          };
          return (
            <>
              <div className="modal">
                <Modal></Modal>
              </div>
              <SuperfluidWidget
                {...data}
                tokenList={superTokenList}
                type="dialog"
                walletManager={walletManager}
              >
                {({ openModal }) => (
                  <button
                    className="button"
                    onClick={() => {
                      openModal();
                      //executeFlow();
                    }}
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
  );
}
