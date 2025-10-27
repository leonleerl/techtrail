import { Navbar } from "@/components";

export default function AboutLayout({ children }: { children: React.ReactNode }) {

    return (
        
        // <div className="min-h-screen bg-white dark:bg-red-900 text-gray-900 dark:text-white">
        <div>
            <Navbar/>
            {children}
        </div>
    )
}