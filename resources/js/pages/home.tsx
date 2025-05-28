import DashboardLayout from '@/components/layouts/dashboard-layout'
import { router } from '@inertiajs/react'
import React from 'react'

export default function HomePage() {
  const handleLogout = () => {
    router.visit('/dashboard/logout', {
      method: "post"
    })
  }
  return (
    <DashboardLayout>
    <div>
      <h1>Halaman Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </DashboardLayout>
  )
}
