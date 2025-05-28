import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Head, router } from '@inertiajs/react'
import React from 'react'

export default function HalamanDashboard() {
  const handleSubmit = () => {
    router.visit('/profile', {
      method: "get",
      data: {
        tab: "settings"
      },

      onSuccess: () => {
        console.log("Anda berhasil berpindah halaman")
      },

      onError: () => {
        console.log("Maaf anda gagal pindah halaman")
      }
    });
  }

  return (
    <>
    <Head title='dashboard1' />
    <DashboardLayout>
        <div className='font-bold text-2xl ml-2'>Ini Adalah Halaman Dashboard</div>
        <Button onClick={handleSubmit} className='w-34 font-bold text-lg fixed bottom-4 right-2 mr-2'>Menuju Profile</Button>
    </DashboardLayout>
    </>
  )
}
