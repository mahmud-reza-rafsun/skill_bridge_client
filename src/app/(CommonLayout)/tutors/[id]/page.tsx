import { tutorService } from "@/service/tutor.service";
import TutorDetails from "./TutorDetails";
import NotFound from "@/app/not-found";

// app/tutors/[id]/page.tsx
export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id)

    // ১. সব টিউটর নিয়ে আসুন (যেহেতু এটা আপনার কাজ করছে)
    const response = await tutorService.getAllTutors();
    const allTutors = response?.data?.data || response?.data || [];

    // ২. এবার ফ্রন্টএন্ডেই ফিল্টার বা ফাইন্ড করুন (পুরানো সিস্টেম)
    const tutorData = allTutors.find((t: any) => String(t.id) === String(id));

    console.log("Matched Tutor:", tutorData);

    if (!tutorData) {
        return NotFound();
    }

    return <TutorDetails tutor={tutorData} />;
}