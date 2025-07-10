'use client'

import React from 'react'
import { ProfilePage } from '@/components/buyer/ProfilePage'
import { useBuyerProfile } from '@/lib/queries'

export default function BuyerProfilePage() {
  const { data: profile, isLoading } = useBuyerProfile()

  return <ProfilePage profile={profile} isLoading={isLoading} />
}