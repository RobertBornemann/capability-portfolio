import { notFound } from 'next/navigation';
import { getAllPostsMeta, getPostSource } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';

export async function generateStaticParams() {
  return getAllPostsMeta().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = getAllPostsMeta().find(p => p.slug === params.slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Robert Bornemann`,
    description: meta.excerpt ?? '',
    openGraph: {
      title: meta.title,
      description: meta.excerpt ?? '',
      images: meta.cover ? [{ url: meta.cover }] : [],
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const { data, content } = getPostSource(params.slug);
    const meta = getAllPostsMeta().find(p => p.slug === params.slug)!;

    return (
      <article className="mx-auto max-w-3xl px-5 md:px-6 py-12 prose prose-neutral">
        <h1 className="!mb-2">{meta.title}</h1>
        <p className="!mt-0 text-sm text-neutral-500">
          {new Date(meta.date).toLocaleDateString()} • {meta.readingTime}
        </p>

        {meta.cover ? (
          <div className="my-6 overflow-hidden rounded-2xl border">
            <Image
              src={meta.cover}
              alt={meta.title}
              width={1440}
              height={760}
              className="w-full h-auto"
              priority
            />
          </div>
        ) : null}

        {/* MDX content */}
        <MDXRemote source={content} />
      </article>
    );
  } catch {
    notFound();
  }
}
