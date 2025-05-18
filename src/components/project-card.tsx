"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { useState, useEffect } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon?: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define the full interactive card content
  const InteractiveCardContent = () => (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border h-full relative",
        href ? "group-hover:shadow-xl" : "hover:shadow-xl",
        "transition-all duration-300 ease-out"
      )}
      // Add mouse handlers here if this is the hoverable element
      onMouseEnter={href ? () => setIsHovered(true) : undefined}
      onMouseLeave={href ? () => setIsHovered(false) : undefined}
    >
      {isMounted && isHovered && href && (
        <BorderBeam size={1000} duration={3} delay={0} />
      )}
      <div className="block">
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </div>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((linkItem, idx) => (
              <Link
                href={linkItem?.href}
                key={idx}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="relative z-10"
              >
                <Badge className="flex gap-2 px-2 py-1 text-[10px] hover:bg-secondary/80 dark:hover:bg-secondary/60">
                  {linkItem.icon}
                  {linkItem.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );

  // Define a placeholder for SSR when the card is linked
  // This MUST render the same top-level element type as InteractiveCardContent (i.e., a div from Card)
  // but with minimal internal differences.
  const PlaceholderCardContent = () => (
    <Card
        className={cn(
            "flex flex-col overflow-hidden border h-full relative", // Keep consistent base classes
            "transition-all duration-300 ease-out" // Keep transition consistent
        )}
    >
        {/* Minimal content for SSR placeholder, structure should match the top-level of InteractiveCardContent */}
        <div className="block h-40 w-full bg-muted/30"></div> {/* Placeholder for image/video area */}
        <CardHeader className="px-2">
            <div className="space-y-1">
                <CardTitle className="mt-1 text-base">{title}</CardTitle>
                <time className="font-sans text-xs">{dates}</time>
            </div>
        </CardHeader>
        <CardContent className="mt-auto flex flex-col px-2">
            {/* Minimal tags or empty div */}
        </CardContent>
        <CardFooter className="px-2 pb-2">
            {/* Minimal links or empty div */}
        </CardFooter>
    </Card>
);


  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("block h-full group", className)}
        // Move mouse handlers to the Card itself if that's the visual boundary for hover
        // OR keep them here if the Link's bounding box is what defines hover
        onMouseEnter={!isMounted ? undefined : () => setIsHovered(true)} // Defer hover logic until mounted
        onMouseLeave={!isMounted ? undefined : () => setIsHovered(false)}
      >
        {isMounted ? <InteractiveCardContent /> : <PlaceholderCardContent />}
      </Link>
    );
  }

  // For non-linked cards, hover effect can be simpler
  // Or apply similar isMounted logic if BorderBeam can appear on them too
  return (
    <div
      className={cn("h-full", className)}
      onMouseEnter={() => { if (isMounted) setIsHovered(true);}}
      onMouseLeave={() => { if (isMounted) setIsHovered(false);}}
    >
       {/* Render InteractiveCardContent directly or a simpler version if non-linked doesn't need all features */}
      <InteractiveCardContent />
    </div>
  );
}