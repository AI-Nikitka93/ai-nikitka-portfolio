import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLdScript } from "@/components/json-ld-script";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { buildMetadata } from "@/lib/seo";
import { getPostBySlug, getPosts } from "@/lib/mdx";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd } from "@/lib/structured-data";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Заметка не найдена",
      description: "Запрошенная заметка недоступна.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${post.frontmatter.title || slug} | Блог | AI_Nikitka93`,
    description: post.frontmatter.description || post.excerpt,
    path: `/blog/${slug}`,
    imagePath: "/opengraph-image",
    absoluteTitle: true,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = buildBlogPostingJsonLd(post);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Главная", path: "/" },
    { name: "Блог", path: "/blog" },
    { name: post.frontmatter.title || slug, path: `/blog/${slug}` },
  ]);

  return (
    <>
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <PageShell
        eyebrow={post.frontmatter.category || "Заметка"}
        title={post.frontmatter.title || slug}
        description={post.frontmatter.description || post.excerpt}
      >
        <ScrollReveal>
          <article className="signal-frame rounded-shell p-6 md:p-8">
            <div className="mb-8 flex flex-wrap gap-3">
              {post.frontmatter.date ? (
                <time
                  dateTime={post.frontmatter.date}
                  className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-titanium"
                >
                  {new Date(post.frontmatter.date).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              ) : null}
              {post.frontmatter.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-panel border border-border-subtle px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-titanium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
