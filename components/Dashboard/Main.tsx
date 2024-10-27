import { SignOutButton } from '@clerk/nextjs'
import React from 'react'
import DashboardUI from './DashboardUI'

export default function Main() {
  return (
    <div>
    <div className="flex flex-col gap-3 p-2 w-full min-h-screen">
       <DashboardUI/>
        <SignOutButton/>
    </div>
    </div>
  )
}
