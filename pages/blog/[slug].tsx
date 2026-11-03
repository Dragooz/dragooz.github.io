import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaWhatsapp } from "react-icons/fa";
import { getAllBlogPostSlugs, getBlogPostBySlug, type BlogPost } from "../../lib/blogPosts";
import { SITE_URL } from "../../lib/siteUrl";
import { WHATSAPP_CHAT_URL } from "../../components/whatsappLink";

interface BlogPostPageProps {
    post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: getAllBlogPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug: string }> = async ({ params }) => {
    if (!params) return { notFound: true };
    return { props: { post: getBlogPostBySlug(params.slug) } };
};

// Structured data for search and answer engines: Article + FAQPage + the author as a Person.
function buildStructuredData(post: BlogPost): object {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const author = {
        "@type": "Person",
        name: "Yi Chong",
        url: SITE_URL,
        jobTitle: "Engineer for business owners",
    };
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: post.title,
                description: post.description,
                datePublished: post.publishedAt,
                dateModified: post.updatedAt,
                author,
                mainEntityOfPage: postUrl,
                inLanguage: "en-MY",
            },
            {
                "@type": "FAQPage",
                mainEntity: post.faq.map((item) => ({
                    "@type": "Question",
                    name: item.question,
                    acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
            },
        ],
    };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    // "<" escaped so a "</script>" inside content can never close the tag early.
    const structuredDataJson = JSON.stringify(buildStructuredData(post)).replace(/</g, "\\u003c");

    return (
        <>
            <Head>
                <title>{`${post.title} | Yi Chong`}</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={postUrl} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={postUrl} />
                <script type="application/ld+json">{structuredDataJson}</script>
            </Head>
            <main className="blog-page">
                <Link href="/blog" className="blog-home-link">← Writing</Link>
                <article className="blog-article">
                    <h1 className="blog-article-title">{post.title}</h1>
                    <p className="blog-article-byline">
                        Yi Chong · Engineer for business owners · Updated {post.updatedAt}
                    </p>
                    <div className="blog-article-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdownBody}</ReactMarkdown>
                    </div>
                    <section className="blog-faq">
                        <h2>Questions owners ask</h2>
                        {post.faq.map((item) => (
                            <div key={item.question} className="blog-faq-item">
                                <h3>{item.question}</h3>
                                <p>{item.answer}</p>
                            </div>
                        ))}
                    </section>
                    <aside className="blog-cta">
                        <p className="blog-cta-text">
                            Got a problem like this? Free diagnosis. Pay only if it worked.
                        </p>
                        <a
                            className="whatsapp-cta"
                            href={WHATSAPP_CHAT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp aria-hidden="true" />
                            WhatsApp me
                        </a>
                        <Link href="/#founding-offer" className="blog-cta-secondary">
                            See the founding offer
                        </Link>
                    </aside>
                </article>
            </main>
        </>
    );
};

export default BlogPostPage;
