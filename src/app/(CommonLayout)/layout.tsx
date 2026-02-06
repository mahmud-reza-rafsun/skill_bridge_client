import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/service/user.service";

export default async function CommonLayout({ children }: { children: React.ReactNode }) {
    const sessionResponse = await userService.getSession();
    const user = sessionResponse?.data?.user || null;
    console.log("Logged in User:", user);

    return (
        <div>
            <Navbar user={user} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}