import React from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import FollowerProfileContainer from "../../../components/users/dashboard/followers/FollowerProfileContainer";

const followeProfile = () => {
  return (
    <DashboardLayout>
      <FollowerProfileContainer />
    </DashboardLayout>
  );
};

export default followeProfile;
