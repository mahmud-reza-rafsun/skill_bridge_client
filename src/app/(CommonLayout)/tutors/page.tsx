import { TutorCard } from "@/components/modules/tutorCard/TutorCard";
import { tutorsService } from "@/service/tutor.service";

export default async function TutorPage() {
    const { data: tutors, error } = await tutorsService.getAllTutors();
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black uppercase tracking-tight">Available Tutors</h1>
                    <p className="text-zinc-500">Find the best mentors to upgrade your skills.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-center">
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
                            <p className="text-zinc-500 font-medium">No tutors found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}