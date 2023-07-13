import { ConnectButton } from "@rainbow-me/rainbowkit";
import superTokenList from "@superfluid-finance/tokenlist";
import SuperfluidWidget from "@superfluid-finance/widget";
import "./App.css";
import { data } from "./data.json";
import Modal from "./Modal";

export default function App() {
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
