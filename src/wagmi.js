import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { supportedNetworks } from "@superfluid-finance/widget";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "694779f224954bad53ccef66a54e3806";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportedNetworks,
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "superfluid widget",
  chains,
  projectId: walletConnectProjectId,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
