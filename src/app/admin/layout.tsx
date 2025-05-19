import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui"

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
        </SidebarProvider>
    )
  }