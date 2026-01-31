import Courses from "@/components/section/Courses/Courses";
import FaqSection from "@/components/section/FaqSection/FaqSection";
import FeedBackSection from "@/components/section/FeedBackSection/StudentFeedBackSection";
import { HeroSection } from "@/components/section/HeroSectoon/HeroSectoon";
import OutTutor from "@/components/section/OurTutor/OurTutor";
import { authClient } from "@/lib/auth-client";


export default async function Home() {
  const session = await authClient.getSession();
  console.log(session);
  return (
    <main>
      <HeroSection />
      <Courses />
      <OutTutor />
      <FeedBackSection />
      <FaqSection />
    </main>
  );
}
