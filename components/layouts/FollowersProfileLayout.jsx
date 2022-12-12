import React from "react";
import FollowerProfileInfo from "../users/dashboard/FollowerProfileInfo";
import FollowerHeader from "../users/dashboard/followers/FollowerHeader";
import Styles from "./styles/followerLayout.module.scss";
const FollowersProfileLayout = ({ children }) => {
  return (
    <div className={Styles.follower__wrapper}>
      <div className={Styles.follower__header}>
        <FollowerHeader />
      </div>

      <div className={Styles.content__wrapper}>
        <div className={Styles.follower__main}>{children}</div>
        {/* <div  className={Styles.follower__profileInfo}><FollowerProfileInfo/></div> */}
      </div>
    </div>
  );
};

export default FollowersProfileLayout;
