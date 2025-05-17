import BlurFade from "@/components/magicui/blur-fade";
// import { DotPattern } from "@/components/magicui/dot-pattern"; // REMOVE Import
import { getBlogPosts } from "@/data/blog";
// import { cn } from "@/lib/utils"; // REMOVE if only used for DotPattern className
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more, presented with a creative touch.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    // Removed relative, font-indie-flower is still applied if desired for the page
    <section className="font-indie-flower min-h-screen py-8"> 
      {/* REMOVED Main DotPattern instance */}
      
      {/* Content wrapper */}
      <div> 
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-5xl md:text-6xl mb-16 tracking-tight text-center text-primary dark:text-primary-foreground">
            My Thoughts & Musings
          </h1>
        </BlurFade>
        <div className="space-y-8 max-w-xl mx-auto"> 
          {posts
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post, id) => (
              <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
                {/* Removed relative, overflow-hidden from Link */}
                <Link
                  className="block p-6 rounded-xl hover:bg-card/70 dark:hover:bg-card/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-border group font-indie-flower"
                  href={`/blog/${post.slug}`}
                >
                  {/* REMOVED DotPattern instance from inside the card */}
                  
                  {/* Card content wrapper - z-10 might not be needed anymore */}
                  <div className="relative"> {/* Keep relative if other absolute elements are planned, otherwise can be simplified */}
                    <h2 className="text-3xl lg:text-4xl tracking-tight text-foreground dark:text-foreground group-hover:underline">
                      {post.metadata.title}
                    </h2>
                    <p className="mt-2 text-base lg:text-lg text-muted-foreground dark:text-muted-foreground/80">
                      {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                     <p className="mt-3 text-lg lg:text-xl text-foreground/80 dark:text-foreground/70 line-clamp-3">
                      {post.metadata.summary}
                    </p>
                  </div>
                </Link>
              </BlurFade>
            ))}
             {posts.length === 0 && (
                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                    <p className="text-center text-xl text-muted-foreground">No blog posts yet. Stay tuned!</p>
                </BlurFade>
            )}
        </div>
      </div>
    </section>
  );
}