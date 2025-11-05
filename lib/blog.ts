import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
  readingTime: string;
};

export function getAllPostsMeta(): PostMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      excerpt: data.excerpt ?? '',
      cover: data.cover ?? '',
      tags: data.tags ?? [],
      readingTime: readingTime(content).text,
    } as PostMeta;
  });

  // Newest first
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export function getPostSource(slug: string) {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error(`Post not found: ${slug}`);
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}
