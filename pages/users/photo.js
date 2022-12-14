import React from 'react'
import AdvertLayout from '../../components/layouts/AdvertLayout'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import PostHeader from '../../components/post/PostHeader'
import ActivityPhoto from '../../components/users/post/activity/ActivitiesPhoto'

const photo = () => {
  return (
    <div>
      <DashboardLayout>
        <AdvertLayout>
          {/* <ActivityHeader /> */}
          <PostHeader/>
        <ActivityPhoto />
     </AdvertLayout>
      </DashboardLayout>
    </div>
  )
}

export default photo
