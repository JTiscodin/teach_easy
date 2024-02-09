import Sidebar from "@/components/Dashboard/Sidebar"

export default function DashboardLayout({children}){
    return (
        <div>
            <Sidebar />
            <div className="ml-[15vw]">

            {children}
            </div>
        </div>
    )
}