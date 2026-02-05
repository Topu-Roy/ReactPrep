import { ArrowRight, Code2, Cpu, Layout, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">ReactPrep</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="/topics"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Question Bank
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/topics"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/topics"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-20 pb-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-blue-600"></span>
                Now updated for React 19
              </div>
              <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl dark:text-white">
                Master React Interviews with{" "}
                <span className="text-blue-600 dark:text-blue-500">Confidence</span>
              </h1>
              <p className="mb-10 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Stop memorizing answers. Start understanding patterns. Practice with interactive
                coding challenges designed by Senior Engineers from top tech companies.
              </p>
              <div className="flex items-center justify-center gap-x-6">
                <Link
                  href="/topics"
                  className="rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-500 active:scale-95"
                >
                  Start Practicing Free
                </Link>
                <Link
                  href="/topics"
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                  Explore Topics <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Code Preview Mockup */}
            <div className="mt-20 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  use-effect-bug.tsx
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="border-r border-gray-200 p-6 font-mono text-sm leading-relaxed dark:border-gray-800">
                  <div className="text-gray-400">{`// Bad Code: Infinite Loop Risk`}</div>
                  <div className="mt-2">
                    <span className="text-purple-600 dark:text-purple-400">useEffect</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      (() ={">"} {"{"}
                    </span>
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-600 dark:text-blue-400">fetchData</span>
                    <span className="text-gray-600 dark:text-gray-300">();</span>
                  </div>
                  <div className="relative -mx-6 mt-1 border-l-2 border-red-500 bg-red-50/50 px-6 pl-4 dark:bg-red-900/10">
                    <span className="text-gray-600 dark:text-gray-300">{"}"}, [data]); </span>
                    <span className="ml-2 text-xs font-bold text-red-500">
                      ← Triggers re-render loop
                    </span>
                  </div>
                </div>
                <div className="bg-gray-950 p-6 font-mono text-sm leading-relaxed text-gray-300">
                  <div className="text-green-400">{`// Optimized Solution`}</div>
                  <div className="mt-2">
                    <span className="text-purple-400">useEffect</span>
                    <span>
                      (() ={">"} {"{"}
                    </span>
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">fetchData</span>
                    <span>();</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">{`// Only runs on mount`}</span>
                  </div>
                  <div className="-mx-6 mt-1 border-l-2 border-green-500 bg-green-900/20 px-6">
                    <span>{"}"}, []);</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-gray-50 py-24 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base leading-7 font-bold text-blue-600 dark:text-blue-400">
                Why ReactPrep?
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Everything you need to ace the technical round
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    Interactive Challenges
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Fix broken code in a real editor environment. We simulate real-world
                      scenarios, not just algorithmic puzzles.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Layout className="h-6 w-6" />
                    </div>
                    Pattern Recognition
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Learn 20+ essential React patterns including HOCs, Render Props, Compound
                      Components, and Custom Hooks.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Cpu className="h-6 w-6" />
                    </div>
                    Deep Dive Explanations
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Understand the &quot;why&quot; behind every solution with detailed breakdowns
                      of React internals and re-render cycles.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16 sm:py-32 dark:bg-black">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to level up your career?
            <br />
            Start practicing today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of developers who have landed jobs at top tech companies using ReactPrep.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/topics"
              className="rounded-md bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started for free
            </Link>
            <Link
              href="/topics"
              className="text-sm leading-6 font-semibold text-white hover:text-gray-300"
            >
              View course catalog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 ReactPrep Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
