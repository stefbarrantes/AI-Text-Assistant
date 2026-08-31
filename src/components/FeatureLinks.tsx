import Link from "next/link";

const features = [
  {
    title: "LLM Playground",
    description:
      "Summarize, rewrite, analyze, and transform text using different AI operations.",
    href: "/generator",
    icon: "✦",
  },
  {
    title: "Customer Support Chat",
    description:
      "Interact with an AI assistant designed to help answer customer questions.",
    href: "/support",
    icon: "💬",
  },
];

export default function FeatureLinks() {
  return (
    <section className="w-full">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          AI Tools
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Choose a tool
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Explore our AI-powered tools and choose the experience you want to
          try.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600">
              {feature.icon}
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>

              <span className="mt-1 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
