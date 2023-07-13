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
                <div className="modal" style={{ marginBottom: "20px" }}>
                  <Modal />
                </div>
              </div>

              <SuperfluidWidget
                {...data}
                tokenList={superTokenList}
                type="dialog"
                walletManager={walletManager}
              >
                {({ openModal }) => (
                  <button
                    style={{ color: "green", background: "beige" }}
                    onClick={() => {
                      openModal();
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
