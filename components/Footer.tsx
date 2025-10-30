export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-6 py-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between">
        <div className="text-sm text-neutral-600">
          © {new Date().getFullYear()} Robert Bornemann — Munich, DE
        </div>
        <div className="text-sm">
          <a className="rounded-full border px-4 py-2 hover:bg-neutral-50" href="mailto:you@domain.com">
            you@domain.com
          </a>
        </div>
      </div>
    </footer>
  );
}
