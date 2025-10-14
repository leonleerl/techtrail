import { Navbar } from "@/components/blogs";

export default function AboutLayout({ children }: { children: React.ReactNode }) {

    return (
        
        <div>
            <Navbar/>
            {children}
        </div>
    )
}