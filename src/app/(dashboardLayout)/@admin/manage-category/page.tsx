import { adminService } from "@/service/admin.service";
import CategoryPostForm from "./CategoryPostForm";
import CategoryCard from "./CategoryCard";
import { cookies } from "next/headers";

export default async function ManageCategoryPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value || "";

    const response = await adminService.getAllCategories();
    const categories = response?.data || [];

    return (
        <div className="container mx-auto">

            <div className="mb-12">
                <CategoryPostForm token={token} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.length > 0 ? (
                    categories.map((category: any) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center py-10">
                        No categories found. Add one above!
                    </p>
                )}
            </div>
        </div>
    );
}