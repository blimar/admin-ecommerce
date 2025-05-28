import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function UserPage() {
  return (
    <>
    <Head title='user'/>
    <DashboardLayout>
        <div>User Page</div>

    </DashboardLayout>
    </>
  )
}
