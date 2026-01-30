import Courses from "@/components/section/Courses/Courses";
import { HeroSection } from "@/components/section/HeroSectoon/HeroSectoon";
import OutTutor from "@/components/section/OurTutor/OurTutor";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <Courses />
      <OutTutor />
    </main>
  );
}
