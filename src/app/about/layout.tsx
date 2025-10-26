import { Navbar } from "@/components";

export default function AboutLayout({ children }: { children: React.ReactNode }) {

    return (
        
        <div>
            <Navbar/>
            {children}
        </div>
    )
}