import { useProfilesOwnedBy } from "@lens-protocol/react";
import { useState, useEffect } from "react";

const Modal = () => {
  const [receiverAddress, setReceiverAddress] = useState(
    "0xc2564e41B7F5Cb66d2d99466450CfebcE9e8228f"
  );

  const { data: profiles, loading } = useProfilesOwnedBy({
    address: receiverAddress,
  });
  useEffect(() => {
    if (loading) {
      console.log("is loading");
    } else if (profiles && profiles[0]) {
      console.log("Profile:", profiles[0]); // if there's at least one profile, log it
    } else {
      console.log("No profile found");
    }
  }, [loading, profiles]);

  return (
    <>
      <div
        style={{
          border: "1px solid green",
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
          Send money to your Lens Friends
        </h3>

        <input
          className="input-field"
          type="text"
          placeholder="your recipient address here..."
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
        <button>Get Profiles</button>
        {/* <div>
          {userHasProfile
            ? "Yes, your friend has a profile"
            : "Sorry, recipient must have a Lens profile"}
        </div> */}
      </div>
    </>
  );
};

export default Modal;
