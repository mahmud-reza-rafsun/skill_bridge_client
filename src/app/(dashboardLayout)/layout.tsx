import { Sidebar1 } from "@/components/modules/sidebar/sidebar1";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { userService } from "@/service/user.service";
import { Roles } from "@/constants/role";

export default async function DashboardLayout({
    admin,
    student,
}: {
    admin: React.ReactNode;
    student: React.ReactNode;
}) {

    const session = await userService.getSession();
    const userRole = session.data.user.role;


    return (
        <SidebarProvider>
            {/* 1. Sidebar */}
            <Sidebar1 userRole={userRole} />

            <SidebarInset>
                {/* 2. Header */}
                <header className="sticky top-0 z-10 bg-background flex h-16 items-center gap-2 px-4 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {userRole === Roles.student ? student : admin}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* 3. Main Content */}
                <main className="p-4 relative pt-6 min-h-[calc(100vh-4rem)] gradientBg">
                    {userRole === Roles.student ? student : admin}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}