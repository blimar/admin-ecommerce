import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Head, router } from "@inertiajs/react";


export default function Page() {
  const handleOrder = () => {
    router.visit('/categories', {
      method: "get",
      data: {
        query: "Koding Akademi"
      },

      onSuccess: () => {
        console.log("Selamat order anda berhasil dibuat")
      },

      onError: () => {
        console.log("terjadi kesalahan")
      }
    });
  }

  return (
    <>
    <Head title="Dashboard" />
    <DashboardLayout>
      <Button onClick={handleOrder}>Order Now</Button>
    </DashboardLayout>
    </>
  )
}
