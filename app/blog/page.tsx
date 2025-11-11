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
    <main className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-lg text-neutral-600">
          Articles, essays, project notes, and case studies from my professional and personal experiences as a Product Leader.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-2xl border-2 border-neutral-200 hover:border-blue-400 bg-white overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-neutral-100">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    📝
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-neutral-500 mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {p.readingTime}
                </div>
                
                <h2 className="text-lg font-bold leading-snug group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h2>
                
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {p.excerpt}
                </p>

                {/* Spacer */}
                <div className="flex-1 min-h-[10px]" />

                {/* Tags */}
                {p.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map(t => (
                      <span 
                        key={t} 
                        className="px-2 py-1 text-xs rounded-md bg-neutral-100 text-neutral-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}