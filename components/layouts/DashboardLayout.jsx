import React from "react";
import FindLove from "../homepage/FindLove";
import DashboardHeader from "../users/dashboard/DashboadHeader";
import Styles from "./styles/dashboard.module.scss";
const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <div className={Styles.wrapper}>
        <div className={Styles.contentBox}>{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
