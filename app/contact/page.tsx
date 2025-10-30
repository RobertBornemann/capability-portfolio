export const metadata = { title: "Contact — Robert Bornemann" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
      <p className="mt-2 text-neutral-600 max-w-2xl">
        Feel free to get in touch for collaborations or professional exchange.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <a href="mailto:bornemann.robert@yahoo.de" className="rounded-2xl border border-neutral-200 bg-white p-5 hover:bg-neutral-50">
          <div className="text-sm uppercase tracking-wide text-neutral-600">Email</div>
          <div className="text-lg font-semibold">bornemann.robert@yahoo.de</div>
        </a>

        <a href="https://www.linkedin.com/in/robert-bornemann-781713253/" target="_blank" className="rounded-2xl border border-neutral-200 bg-white p-5 hover:bg-neutral-50">
          <div className="text-sm uppercase tracking-wide text-neutral-600">LinkedIn</div>
          <div className="text-lg font-semibold">Linkedin.com/in/robert-bornemann-781713253/</div>
        </a>
      </div>

      {/* If you want a simple mailto form later, we can add one with a serverless endpoint. */}
    </main>
  );
}
