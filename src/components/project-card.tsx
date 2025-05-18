"use client"; // Required for useState

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
import { useState } from "react"; // Import useState
import { BorderBeam } from "@/components/magicui/border-beam"; // Import BorderBeam

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

  const cardInnerContent = (
    // Add relative positioning here for BorderBeam to work correctly within the Card
    <Card
      className={cn(
        "flex flex-col overflow-hidden border h-full relative", // Added 'relative'
        href ? "group-hover:shadow-xl" : "hover:shadow-xl", // Enhanced shadow on hover
        "transition-all duration-300 ease-out"
      )}
    >
      {isHovered && href && ( // Conditionally render BorderBeam if hovered and card is linkable
        <BorderBeam
          size={1000} // Adjust size as needed
          duration={3}  // Adjust duration for desired speed
          delay={0}
          // You can customize colors or use the default rainbow
          // colors={["#FF0080", "#7928CA"]}
        />
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="relative z-10" // Ensure footer links are on top of BorderBeam
              >
                <Badge
                  className="flex gap-2 px-2 py-1 text-[10px] hover:bg-secondary/80 dark:hover:bg-secondary/60"
                >
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

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("block h-full group", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {cardInnerContent}
      </Link>
    );
  }

  return (
    <div
      className={cn("h-full", className)}
      onMouseEnter={() => setIsHovered(true)} // Also add for non-linked cards if desired
      onMouseLeave={() => setIsHovered(false)} // Also add for non-linked cards if desired
    >
      {cardInnerContent}
    </div>
  );
}