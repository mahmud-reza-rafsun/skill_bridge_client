import { tutorService } from "@/service/tutor.service";
import TutorDetails from "./TutorDetails";
import NotFound from "@/app/not-found";

export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id)

    const response = await tutorService.getAllTutors();
    const allTutors = response?.data?.data || response?.data || [];

    const tutorData = allTutors.find((t: any) => String(t.id) === String(id));

    console.log("Matched Tutor:", tutorData);

    if (!tutorData) {
        return NotFound();
    }

    return <TutorDetails tutor={tutorData} />;
}