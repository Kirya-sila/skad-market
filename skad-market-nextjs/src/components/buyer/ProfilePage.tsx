import React from 'react'

interface ProfilePageProps {
  profile: any
  isLoading: boolean
}

export const ProfilePage = ({ profile, isLoading }: ProfilePageProps) => (
  <div>
    <h1>Profile</h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>Profile info: {profile?.name}</div>
    )}
  </div>
)