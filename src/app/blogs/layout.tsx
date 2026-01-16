import { NavbarBlogs } from "@/components/blogs";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {

    return (
        
        // <div className="min-h-screen bg-white dark:bg-red-900 text-gray-900 dark:text-white">
        <div>
            <NavbarBlogs/>
            {children}
        </div>
    )
}