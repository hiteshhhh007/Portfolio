import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Resume",
  description: `Download ${DATA.name}'s resume.`,
};

const BLUR_FADE_DELAY = 0.04;

export default function ResumePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100dvh-15rem)] py-8">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-3xl font-bold mb-6 text-center tracking-tighter">
          My Resume
        </h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Click the button below to download my latest resume in PDF format.
          It contains a comprehensive overview of my skills, experience, and education.
        </p>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Link href={DATA.contact.resumeUrl || "/resume.pdf"} target="_blank" download={`${DATA.name.replace(" ","_")}_Resume.pdf`}>
            <DownloadIcon className="mr-2 h-5 w-5" />
            Download Resume
          </Link>
        </Button>
      </BlurFade>
       <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <p className="text-xs text-muted-foreground mt-10 text-center">
          For any inquiries, feel free to reach out via <Link href={`mailto:${DATA.contact.email}`} className="underline hover:text-primary">{DATA.contact.email}</Link>.
        </p>
      </BlurFade>
    </section>
  );
}