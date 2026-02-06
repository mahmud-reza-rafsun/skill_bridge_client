import { TutorCard } from '@/components/modules/tutorCard/TutorCard';
import { tutorService } from '@/service/tutor.service';

export default async function TutorPage() {

    const response = await tutorService.getAllTutors();
    console.log(response)

    const tutors = response?.data?.data || response?.data || [];
    console.log(tutors)

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {tutors && tutors.length > 0 ? (
                        tutors.map((tutor: any) => (

                            <TutorCard key={tutor.id || tutor._id} tutor={tutor} />
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