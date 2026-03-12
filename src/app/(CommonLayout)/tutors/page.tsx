import { TutorCard } from "@/components/modules/tutorCard/TutorCard";
import { tutorService } from "@/service/tutor.service";

export default async function TutorPage() {
    const { data: apiResponse, error } = await tutorService.getAllTutors();
    const tutors = apiResponse?.data || apiResponse || [];
    console.log(tutors)

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutors && Array.isArray(tutors) && tutors.length > 0 ? (
                        tutors.map((tutor: any) => (
                            <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-zinc-500">
                            No tutors found at the moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}