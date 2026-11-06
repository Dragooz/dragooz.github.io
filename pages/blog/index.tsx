import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter, type NextRouter } from "next/router";
import type { GetStaticProps } from "next";
import { getAllBlogPosts, type BlogPost, type BlogPostTopic } from "../../lib/blogPosts";

type BlogPostSummary = Pick<BlogPost, "slug" | "title" | "description" | "publishedAt" | "topic" | "cover">;

type TopicFilter = "all" | BlogPostTopic;

// The filter bar. Posts stay newest first, as getAllBlogPosts returns them.
const TOPIC_FILTERS: { filter: TopicFilter; label: string }[] = [
    { filter: "business", label: "Business" },
    { filter: "technical", label: "Technical" },
    { filter: "all", label: "All" },
];

// Owners land on business posts; /blog?topic=technical and ?topic=all show the rest.
const DEFAULT_TOPIC_FILTER: TopicFilter = "business";

// The URL is the only place the filter lives, so /blog?topic=technical can be shared.
function readTopicFilter(topicQuery: string | string[] | undefined): TopicFilter {
    const matchingFilter = TOPIC_FILTERS.find(({ filter }) => filter === topicQuery);
    return matchingFilter ? matchingFilter.filter : DEFAULT_TOPIC_FILTER;
}

function showTopic(router: NextRouter, filter: TopicFilter): void {
    const query: Record<string, string> = filter === DEFAULT_TOPIC_FILTER ? {} : { topic: filter };
    void router.replace({ pathname: "/blog", query }, undefined, { shallow: true, scroll: false });
}

interface BlogIndexProps {
    posts: BlogPostSummary[];
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
    const posts = getAllBlogPosts().map(({ slug, title, description, publishedAt, topic, cover }) => ({
        slug,
        title,
        description,
        publishedAt,
        topic,
        cover,
    }));
    return { props: { posts } };
};

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
    const router: NextRouter = useRouter();
    const activeFilter: TopicFilter = readTopicFilter(router.query.topic);
    const visiblePosts: BlogPostSummary[] =
        activeFilter === "all" ? posts : posts.filter((post) => post.topic === activeFilter);

    return (
        <>
            <Head>
                <title>Writing | Yi Chong</title>
                <meta
                    name="description"
                    content="Notes on making tech work for a business, and how it works underneath."
                />
            </Head>
            <main className="blog-page">
                <Link href="/" className="blog-home-link">← Yi Chong</Link>
                <h1 className="blog-page-title">Writing</h1>
                <p className="blog-page-intro">
                    Notes on making tech work for a business, and how it works underneath.
                </p>
                <div className="blog-filter" role="group" aria-label="Filter posts by topic">
                    {TOPIC_FILTERS.map(({ filter, label }) => (
                        <button
                            key={filter}
                            type="button"
                            className="blog-filter-button"
                            aria-pressed={activeFilter === filter}
                            onClick={() => showTopic(router, filter)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <ul className="blog-list">
                    {visiblePosts.map((post) => (
                        <li key={post.slug} className="blog-list-item card">
                            <div className="blog-list-text">
                                <Link href={`/blog/${post.slug}`} className="blog-list-title">
                                    {post.title}
                                </Link>
                                <p className="blog-list-desc">{post.description}</p>
                                <span className="blog-list-date">{post.publishedAt}</span>
                            </div>
                            {post.cover && (
                                <Image
                                    src={post.cover.src}
                                    alt=""
                                    width={post.cover.width}
                                    height={post.cover.height}
                                    sizes="96px"
                                    className="blog-list-thumb"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
};

export default BlogIndex;
