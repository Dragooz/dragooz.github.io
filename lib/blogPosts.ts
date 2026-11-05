import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostTopic = "business" | "technical";

const BLOG_POST_TOPICS: readonly BlogPostTopic[] = ["business", "technical"];

export interface BlogPostFrontmatter {
    title: string;
    description: string;
    publishedAt: string; // ISO date, e.g. 2026-11-03
    updatedAt: string;
    faq: { question: string; answer: string }[];
    topic: BlogPostTopic;
    draft?: boolean; // true = no page, no list entry
    // Cover image under public/. Width and height are the file's pixel size, so next/image reserves the space.
    coverImage?: string;
    coverAlt?: string;
    coverWidth?: number;
    coverHeight?: number;
}

export interface BlogPostCover {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface BlogPost extends BlogPostFrontmatter {
    slug: string;
    markdownBody: string;
    cover: BlogPostCover | null; // null, not undefined: Next.js props cannot hold undefined
}

// All four cover fields or none; a half-set cover would render a broken or unsized image.
function readCover(slug: string, frontmatter: BlogPostFrontmatter): BlogPostCover | null {
    const { coverImage, coverAlt, coverWidth, coverHeight } = frontmatter;
    if (coverImage === undefined) return null;
    if (!coverAlt || typeof coverWidth !== "number" || typeof coverHeight !== "number") {
        throw new Error(
            `content/blog/${slug}.md: "coverImage" is set, so "coverAlt", "coverWidth" and "coverHeight" are required.`,
        );
    }
    return { src: coverImage, alt: coverAlt, width: coverWidth, height: coverHeight };
}

// Published posts only: drafts get no static page and no list entry.
export function getAllBlogPostSlugs(): string[] {
    return fs
        .readdirSync(BLOG_CONTENT_DIR)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""))
        .filter((slug: string): boolean => !getBlogPostBySlug(slug).draft);
}

export function getBlogPostBySlug(slug: string): BlogPost {
    const markdownFilePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
    const { data, content } = matter(fs.readFileSync(markdownFilePath, "utf8"));
    const frontmatter = data as BlogPostFrontmatter;
    if (!BLOG_POST_TOPICS.includes(frontmatter.topic)) {
        throw new Error(
            `content/blog/${slug}.md: frontmatter "topic" is ${JSON.stringify(frontmatter.topic)}; ` +
                `expected one of ${BLOG_POST_TOPICS.join(", ")}.`,
        );
    }
    return { slug, markdownBody: content, ...frontmatter, cover: readCover(slug, frontmatter) };
}

export function getAllBlogPosts(): BlogPost[] {
    return getAllBlogPostSlugs()
        .map(getBlogPostBySlug)
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
