import DashboardLayout from '@/components/layouts/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Head, router } from '@inertiajs/react'
import React from 'react'

export default function Profile() {
  const handlesubmit = () => {
    router.visit('/dashboard', {
      method: "get",
      data: {
        tab: "settings"
      },

      onSuccess: () => {
        console.log("Anda berhasil kembali")
      },

      onError: () => {
        console.log("Maaf anda gagal kembali")
      }
    })
  }

  return (
    <>
        <Head title='profile'/>
        <DashboardLayout>
            <div className='ml-2 font-bold text-2xl'>Ini Adalah Halaman Profile</div>
            <Button onClick={handlesubmit} className='font-bold text-lg w-30 fixed bottom-4 mr-2 right-2'>Kembali</Button>
        </DashboardLayout>
    </>
  )
}
