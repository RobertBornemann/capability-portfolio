import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-6 py-3">
        <Link href="/" className="font-semibold">ROBERT BORNEMANN</Link>
        <nav className="text-sm">
          <ul className="flex items-center gap-5 md:gap-7">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:underline" href="/experience">About Me</Link></li>
            <li><Link className="hover:underline" href="/ai-capability-studio">AI Capability Studio</Link></li>
            <li><Link className="hover:underline" href="/blog">Blog</Link></li>
            <li><Link className="hover:underline" href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
