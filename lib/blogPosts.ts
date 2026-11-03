import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostFrontmatter {
    title: string;
    description: string;
    publishedAt: string; // ISO date, e.g. 2026-11-03
    updatedAt: string;
    faq: { question: string; answer: string }[];
}

export interface BlogPost extends BlogPostFrontmatter {
    slug: string;
    markdownBody: string;
}

export function getAllBlogPostSlugs(): string[] {
    return fs
        .readdirSync(BLOG_CONTENT_DIR)
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getBlogPostBySlug(slug: string): BlogPost {
    const markdownFilePath = path.join(BLOG_CONTENT_DIR, `${slug}.md`);
    const { data, content } = matter(fs.readFileSync(markdownFilePath, "utf8"));
    const frontmatter = data as BlogPostFrontmatter;
    return { slug, markdownBody: content, ...frontmatter };
}

export function getAllBlogPosts(): BlogPost[] {
    return getAllBlogPostSlugs()
        .map(getBlogPostBySlug)
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
