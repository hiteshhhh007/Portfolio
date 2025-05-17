import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate, cn } from "@/lib/utils"; // Keep cn for prose styling
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
// import { DotPattern } from "@/components/magicui/dot-pattern"; // REMOVE Import

export async function generateStaticParams() {
  const { getBlogPosts } = await import("@/data/blog");
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  if (!post) {
    return undefined;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    // Removed 'relative' unless needed for other absolute elements later
    <section id="blog-post-content" className="font-indie-flower py-8 min-h-screen"> 
      {/* REMOVED DotPattern instance */}

      {/* Wrapper for actual content - z-10 and relative might not be needed if DotPattern is gone */}
      <div> 
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${DATA.url}${post.metadata.image}`
                : `${DATA.url}/og?title=${post.metadata.title}`,
              url: `${DATA.url}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: DATA.name,
              },
            }),
          }}
        />
        <div className="max-w-2xl mx-auto"> 
          <h1 className="title font-medium text-4xl md:text-5xl tracking-tight mb-4 text-primary dark:text-primary-foreground">
            {post.metadata.title}
          </h1>
          <div className="flex justify-between items-center mt-2 mb-8 text-sm">
            <Suspense fallback={<p className="h-5" />}>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground/80">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </Suspense>
          </div>

          <article
            className={cn(
              "prose dark:prose-invert",
              "prose-h1:font-indie-flower prose-h1:text-4xl prose-h1:text-foreground",
              "prose-h2:font-indie-flower prose-h2:text-3xl prose-h2:text-foreground",
              "prose-p:font-indie-flower prose-p:text-xl prose-p:leading-relaxed prose-p:text-foreground/90 dark:prose-p:text-foreground/80",
              "prose-code:font-sans",
              "prose-a:font-indie-flower prose-a:text-primary hover:prose-a:underline",
              "prose-strong:font-indie-flower"
            )}
            dangerouslySetInnerHTML={{ __html: post.source }}
          >
          </article>
        </div>
      </div>
    </section>
  );
}