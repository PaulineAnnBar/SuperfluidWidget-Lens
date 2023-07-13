import "./App.css";
import { useEffect, useState } from "react";
// import SuperfluidWidget from "@superfluid-finance/widget";
// import superTokenList from "@superfluid-finance/tokenlist";
// import { data } from "./data.json";
import { LensClient, production } from "@lens-protocol/client";

export const Modal = () => {
  const [receiverAddress, setReceiverAddress] = useState(
    "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f"
  );

  // const [receiverAddress, setReceiverAddress] = useState("");
  // const [hasCheckedProfile, setHasCheckedProfile] = useState(null);

  // const { data: profiles, loading } = useProfilesOwnedBy({
  //   address: receiverAddress,
  // });

  // useEffect(() => {
  //   if (loading) {
  //     console.log("Loading...");
  //   } else if (!profiles) {
  //     setHasCheckedProfile(false);
  //   } else if (profiles[0]) {
  //     console.log("Profile:", profiles[0]);
  //     setHasCheckedProfile(true);
  //   } else {
  //     console.log("No profile found");
  //     setHasCheckedProfile(true);
  //   }
  // }, [loading, profiles]);

  const handleInputChange = (event) => {
    setReceiverAddress(event.target.value);
    console.log(event.target.value);
  };

  // const renderProfileMessage = () => {
  //   if (!hasCheckedProfile) {
  //     return "";
  //   } else if (profiles && profiles[0]) {
  //     return (
  //       <p style={{ margin: "10px", color: "green", borderColor: "green" }}>
  //         Profile found🌿
  //       </p>
  //     );
  //   } else {
  //     return <p>Sorry you need a Lens profile!</p>;
  //   }
  // };
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasCheckedProfile, setHasCheckedProfile] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const lensClient = new LensClient({
        environment: production,
      });

      const allOwnedProfiles = await lensClient.profile.fetchAll({
        ownedBy: [receiverAddress],
      });

      setProfiles(allOwnedProfiles.items);
      setHasCheckedProfile(allOwnedProfiles.items.count > 0);
      setLoading(false);
    };

    void fetchProfiles();
  }, [receiverAddress]);

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
          onChange={handleInputChange}
        />
        {/* {renderProfileMessage()} */}
      </div>
      {hasCheckedProfile === false ? (
        <p>Loading...</p>
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
        <p>Sorry you need a Lens profile!</p>
      )}
    </>
  );
};

export default Modal;
