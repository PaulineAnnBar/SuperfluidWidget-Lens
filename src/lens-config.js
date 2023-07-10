import { development } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
//import { LensClient } from "@lens-protocol/client";

export const lensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

// const lensClient = new LensClient({
//   environment: development,
// });
