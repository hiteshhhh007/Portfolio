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

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  authors: readonly string[];
  publication: string;
  tags: readonly string[];
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ResearchCard({
  title,
  href,
  description,
  dates,
  authors,
  publication,
  tags,
  image,
  links,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full",
        className
      )}
    >
      {image && href && (
        <Link
          href={href}
          className="block cursor-pointer"
        >
          <Image
            src={image}
            alt={title}
            width={500}
            height={150} // Adjusted height for research card
            className="h-32 w-full overflow-hidden object-cover object-top"
          />
        </Link>
      )}
      <CardHeader className="px-4 pt-4"> {/* Adjusted padding */}
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">
            <Link href={href || "#"} className="hover:underline">
              {title}
            </Link>
          </CardTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
          <p className="font-sans text-xs text-muted-foreground">
            Authors: {authors.join(", ")}
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Publication: {publication}
          </p>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert pt-1">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-4 pb-2"> {/* Adjusted padding */}
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
      <CardFooter className="px-4 pb-4"> {/* Adjusted padding */}
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-2">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank" rel="noopener noreferrer">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px] hover:bg-secondary/90">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}