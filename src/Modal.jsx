import "./App.css";
import { useEffect, useState } from "react";
// import SuperfluidWidget from "@superfluid-finance/widget";
// import superTokenList from "@superfluid-finance/tokenlist";
// import { data } from "./data.json";
import { LensClient, production } from "@lens-protocol/client";
import { ethers } from "ethers";

export const Modal = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasCheckedProfile, setHasCheckedProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const lensClient = new LensClient({
        environment: production,
      });

      if (receiverAddress) {
        const allOwnedProfiles = await lensClient.profile.fetchAll({
          ownedBy: [receiverAddress],
        });
        setProfiles(allOwnedProfiles.items);
        console.log(allOwnedProfiles.items);
        if (allOwnedProfiles.items.length > 0) {
          setHasCheckedProfile(true);
        } else {
          setHasCheckedProfile(false);
        }
      }
      setLoading(false);
    };

    void run();
  }, [receiverAddress]);

  const validateEthAddress = (address) => {
    if (!ethers.utils.isAddress(address)) {
      //setError('Invalid Ethereum address');
      console.log("Invalid Ethereum address");
      setReceiverAddress("");
      setHasCheckedProfile(false);
    } else {
      console.log("Valid Ethereum address");
      console.log(address);
      setReceiverAddress(address);
      //setError(null);
    }
  };

  const handleChange = (event) => {
    validateEthAddress(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div
        style={{
          border: "2px solid green",
          padding: "10px",
          width: "300px",
          height: "300px",
          background: "beige",
          borderRadius: "40px",
        }}
      >
        <h3
          style={{
            padding: "30px",
          }}
        >
          Send a stream to your Lens Friends 🌿
        </h3>

        <input
          className="input-field"
          type="text"
          placeholder="your recipient address here..."
          onChange={handleChange}
        />

        {hasCheckedProfile === null ? (
          ""
        ) : hasCheckedProfile ? (
          <p
            style={{
              margin: "10px",
              color: "green",
              borderColor: "green",
            }}
          >
            Profile found🌿
          </p>
        ) : (
          <p>You need a Lens profile!</p>
        )}
      </div>
    </>
  );
};
export default Modal;
