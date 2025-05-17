import BlurFade from "@/components/magicui/blur-fade";
import { ResearchCard } from "@/components/research-card";
import { DATA } from "@/data/resume";

export const metadata = {
  title: "Research",
  description: "A collection of my research projects, papers, and academic contributions.",
};

const BLUR_FADE_DELAY = 0.04;

export default function ResearchPage() {
  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">
          Research & Publications
        </h1>
      </BlurFade>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-1"> {/* Using 1 column layout for research */}
        {DATA.research.map((item, id) => (
          <BlurFade
            key={item.title + id}
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
          >
            <ResearchCard
              title={item.title}
              href={item.href}
              dates={item.dates || ""}
              authors={item.authors || []}
              publication={item.publication || ""}
              description={item.description}
              tags={item.technologies || []}
              image={item.image}
              links={item.links}
            />
          </BlurFade>
        ))}
        {DATA.research.length === 0 && (
           <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <p className="text-muted-foreground">No research items to display yet. Check back soon!</p>
          </BlurFade>
        )}
      </div>
    </section>
  );
}