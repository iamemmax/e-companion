import React from "react";
import AdvertLayout from "../../components/layouts/AdvertLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ActivityBody from "../../components/users/post/activity/ActivityBody";

import ActivityHeader from "../../components/users/post/activity/ActivityHeader";
import PostHeader from "../../components/post/PostHeader";

const activity = () => {
  return (
    <div>
      <DashboardLayout>
        <AdvertLayout>
          {/* <ActivityHeader /> */}
          <PostHeader/>
        <ActivityBody />
     </AdvertLayout>
      </DashboardLayout>
    </div>
  );
};

export default activity;
