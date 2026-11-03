import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { getAllBlogPosts, type BlogPost } from "../../lib/blogPosts";

type BlogPostSummary = Pick<BlogPost, "slug" | "title" | "description" | "publishedAt">;

interface BlogIndexProps {
    posts: BlogPostSummary[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
    const posts = getAllBlogPosts().map(({ slug, title, description, publishedAt }) => ({
        slug,
        title,
        description,
        publishedAt,
    }));
    return { props: { posts } };
};

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    return (
        <>
            <Head>
                <title>Writing | Yi Chong</title>
                <meta
                    name="description"
                    content="Short notes on problems I fixed for business owners, with the numbers."
                />
            </Head>
            <main className="blog-page">
                <Link href="/" className="blog-home-link">← Yi Chong</Link>
                <h1 className="blog-page-title">Writing</h1>
                <p className="blog-page-intro">
                    Things I have fixed for business owners, in plain terms, with the numbers.
                </p>
                <ul className="blog-list">
                    {posts.map((post) => (
                        <li key={post.slug} className="blog-list-item card">
                            <Link href={`/blog/${post.slug}`} className="blog-list-title">
                                {post.title}
                            </Link>
                            <p className="blog-list-desc">{post.description}</p>
                            <span className="blog-list-date">{post.publishedAt}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
};

export default BlogIndex;
