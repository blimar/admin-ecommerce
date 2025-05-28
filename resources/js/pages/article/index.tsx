import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function ArticlePage() {
  return (
    <>
    <Head title='article'/>
    <DashboardLayout>
        <div>Article Page</div>

    </DashboardLayout>
    </>
  )
}
