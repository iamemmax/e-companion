import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ActivityBody from "../../components/users/post/activity/ActivityBody";

import ActivityHeader from "../../components/users/post/activity/ActivityHeader";

const activity = () => {
  return (
    <div>
      <DashboardLayout>
        <ActivityHeader />
        <ActivityBody />
      </DashboardLayout>
    </div>
  );
};

export default activity;
