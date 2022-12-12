import React from "react";
import Styles from "./styles/chatMessages.module.scss";
const OwnerChat = ({ children }) => {
  return (
    <div className={Styles.wrapper}>
      {/* <div className={Styles.ownerChat}>{children}</div> */}
    </div>
  );
};

export default OwnerChat;
