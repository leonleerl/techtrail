import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui"
import { Toaster } from "@/components/ui/sonner"
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main>
                <SidebarTrigger/>
                {children}
            </main>
            <Toaster />
        </SidebarProvider>
    )
  }