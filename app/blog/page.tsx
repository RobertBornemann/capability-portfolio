import Image from 'next/image';
import Link from 'next/link';
import { getAllPostsMeta } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Robert Bornemann',
  description: 'Essays, notes, and case studies about AI product management.',
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="mx-auto max-w-6xl px-5 md:px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-2 text-neutral-600">
        Articles, essays, project notes, and case studies from work my professional and personal experiences as a Product Leader.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-100" />
              )}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-3">{p.excerpt}</p>
              <div className="mt-3 text-xs text-neutral-500">
                {new Date(p.date).toLocaleDateString()} • {p.readingTime}
              </div>
              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.tags.slice(0, 3).map(t => (
                    <span key={t} className="rounded-full border px-2 py-0.5 text-xs text-neutral-600">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
