import { TutorCard } from "@/components/modules/tutorCard/TutorCard";
import { tutorsService } from "@/service/tutor.service";
import TutorFilterHeader from "./TutorFilterHeader";
import { categoryService } from "@/service/category.service";

export default async function TutorPage({
    searchParams,
}: {
    searchParams: Promise<{ searchTerm?: string; category?: string }>;
}) {
    const params = await searchParams;
    const searchTerm = params.searchTerm || "";
    const category = params.category || "";

    // 1. Fetch tutors with filters
    const { data: tutors, error } = await tutorsService.getAllTutors(searchTerm, category);

    // 2. Fetch categories from API
    const { data: categoryData } = await categoryService.getAllCategory();

    const categories: string[] = categoryData?.map((item: any) => item.name) || [];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">

                <TutorFilterHeader categories={categories} />

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutors && Array.isArray(tutors) && tutors.length > 0 ? (
                        tutors.map((tutor: any) => (
                            <TutorCard key={tutor.id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
                            <p className="text-zinc-500 font-medium">
                                No tutors found {searchTerm || category ? "matching your criteria" : "at the moment"}.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}