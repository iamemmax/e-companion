import React from "react";
import { useSelector } from "react-redux";
import Styles from "./styles/followerHeader.module.scss";

const FollowerHeader = () => {
  const { followerProfile } = useSelector((state) => state.auth);
  return (
    <div className={Styles.followerHeader}>
      <div className={Styles.profileImg}>
        <div className={Styles.profilePix}>
          <img
            src={followerProfile?.avater?.filename}
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <div className={Styles.profileInfo}>
        <div className="post">
          <h2>Posts</h2>
          {/* <p>30</p> */}
        </div>
        <div className="post">
          <h2>followers</h2>
          <p>{followerProfile?.followers?.length}</p>
        </div>
        <div className="post">
          <h2>following</h2>
          <p>{followerProfile?.following?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowerHeader;
