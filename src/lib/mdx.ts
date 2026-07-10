import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { marked } from "marked";

type ContentDirectory = "blog" | "portfolio";

export type ContentFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
  order?: number;
  [key: string]: unknown;
};

export type ContentEntry<TFrontmatter extends ContentFrontmatter = ContentFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  content: string;
  contentHtml: string;
  excerpt: string;
  directory: ContentDirectory;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);
const matterOptions = {
  excerpt: true,
  engines: {
    yaml: (source: string) => yaml.load(source) ?? {},
  },
};

function isPublished(frontmatter: ContentFrontmatter | undefined) {
  return frontmatter?.published !== false;
}

function sortCollection<TFrontmatter extends ContentFrontmatter>(
  collection: Array<ContentEntry<TFrontmatter>>,
) {
  return [...collection].sort((a, b) => {
    const aOrder =
      typeof a.frontmatter.order === "number"
        ? a.frontmatter.order
        : Number.MAX_SAFE_INTEGER;
    const bOrder =
      typeof b.frontmatter.order === "number"
        ? b.frontmatter.order
        : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aDate = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const bDate = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;

    return bDate - aDate;
  });
}

async function getDirectoryEntries(directory: ContentDirectory) {
  const targetDirectory = path.join(CONTENT_ROOT, directory);

  try {
    const entries = await readdir(targetDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => SUPPORTED_EXTENSIONS.has(path.extname(name)));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function readContentFile<TFrontmatter extends ContentFrontmatter>(
  directory: ContentDirectory,
  slug: string,
): Promise<ContentEntry<TFrontmatter> | null> {
  const targetDirectory = path.join(CONTENT_ROOT, directory);

  for (const extension of SUPPORTED_EXTENSIONS) {
    const absolutePath = path.join(targetDirectory, `${slug}${extension}`);

    try {
      const fileContents = await readFile(absolutePath, "utf8");
      const { data, content, excerpt } = matter(fileContents, matterOptions);

      const contentHtml = await marked(content);

      return {
        slug,
        directory,
        frontmatter: data as TFrontmatter,
        content,
        contentHtml,
        excerpt:
          excerpt ||
          (typeof data.excerpt === "string" ? data.excerpt : "") ||
          content.slice(0, 180).trim(),
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        continue;
      }

      throw error;
    }
  }

  return null;
}

async function getCollection<TFrontmatter extends ContentFrontmatter>(
  directory: ContentDirectory,
): Promise<Array<ContentEntry<TFrontmatter>>> {
  const entries = await getDirectoryEntries(directory);

  const collection = await Promise.all(
    entries.map((fileName) => {
      const slug = fileName.replace(path.extname(fileName), "");
      return readContentFile<TFrontmatter>(directory, slug);
    }),
  );

  return sortCollection(
    collection.filter(
      (entry): entry is ContentEntry<TFrontmatter> =>
        entry !== null && isPublished(entry.frontmatter),
    ),
  );
}

export async function getPosts<TFrontmatter extends ContentFrontmatter = ContentFrontmatter>() {
  return getCollection<TFrontmatter>("blog");
}

export async function getPostBySlug<TFrontmatter extends ContentFrontmatter = ContentFrontmatter>(
  slug: string,
) {
  const post = await readContentFile<TFrontmatter>("blog", slug);
  return post && isPublished(post.frontmatter) ? post : null;
}

export async function getPortfolioEntries<
  TFrontmatter extends ContentFrontmatter = ContentFrontmatter,
>() {
  return getCollection<TFrontmatter>("portfolio");
}

export async function getPortfolioEntryBySlug<
  TFrontmatter extends ContentFrontmatter = ContentFrontmatter,
>(slug: string) {
  const entry = await readContentFile<TFrontmatter>("portfolio", slug);
  return entry && isPublished(entry.frontmatter) ? entry : null;
}
