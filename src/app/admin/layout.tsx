'use client'

import { useEffect } from 'react'
import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui"
import { Toaster } from "@/components/ui/sonner"
import { useTheme } from 'next-themes'

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { setTheme } = useTheme()

    useEffect(() => {
      // 强制 admin 页面使用亮色模式
      setTheme('light')
    }, [setTheme])

    return (
        <div 
          className="light admin-layout-wrapper" 
          style={{ colorScheme: 'light' }}
          suppressHydrationWarning
        >
          <SidebarProvider>
              <AppSidebar/>
              <main>
                <SidebarTrigger/>
                  {children}
              </main>
              <Toaster />
          </SidebarProvider>
        </div>
    )
  }