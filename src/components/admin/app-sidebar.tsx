import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui"

  // Menu items.
const items = [
  {
    title: "分类管理",
    url: "/admin/categories",
    icon: "🏠",
  },
  {
    title: "博客管理",
    url: "/admin/posts",
    icon: "📨",
  }
]
   
  export function AppSidebar() {
    return (
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    )
  }