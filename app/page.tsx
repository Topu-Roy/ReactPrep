import { ArrowRight, Code2, Cpu, Layout, Zap } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/landing-mobile-nav";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-black dark:text-gray-50">
      {/* Header / Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/40 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MobileNav />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              ReactPrep
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              href="/topics"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Question Bank
            </Link>
            <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Pricing
            </Link>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/topics"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/topics"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-900/20 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-white/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_14px] sm:bg-size-[24px_24px]"></div>
          <div className="pointer-events-none absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px] dark:opacity-10"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex transform cursor-default items-center rounded-full border border-blue-200 bg-blue-50/50 py-1 pr-3 pl-1 text-sm font-medium text-blue-800 backdrop-blur-sm transition-transform hover:scale-105 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300">
                <span className="mr-2 flex h-6 w-fit items-center rounded-full bg-blue-600 px-2 text-[10px] font-bold tracking-wider text-white uppercase sm:text-xs">
                  New
                </span>
                <span className="text-xs sm:text-sm">Updated for React 19</span>
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                Master React Interviews with{" "}
                <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Confidence
                </span>
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-gray-600 sm:mb-12 sm:text-lg sm:leading-8 dark:text-gray-400">
                Stop memorizing answers. Start understanding patterns. Practice with interactive
                coding challenges designed by Senior Engineers from top tech companies.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
                <Link
                  href="/topics"
                  className="w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-bold text-white shadow-xl shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 sm:w-auto"
                >
                  Start Practicing Free
                </Link>
                <Link
                  href="/topics"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-center text-base font-bold text-gray-900 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-95 sm:w-auto dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Explore Topics{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Code Preview Mockup */}
            <div className="relative mt-16 sm:mt-24">
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-600 opacity-20 blur-lg sm:opacity-30"></div>
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl sm:rounded-2xl dark:border-white/10 dark:bg-gray-950">
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50/50 px-4 py-3 dark:border-white/5 dark:bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm dark:bg-black/40 dark:text-gray-400">
                    <Layout className="h-3 w-3" />
                    <span>use-effect-bug.tsx</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0 dark:divide-white/5">
                  <div className="overflow-x-auto p-4 sm:p-6 lg:p-8">
                    <div className="font-mono text-xs leading-relaxed sm:text-sm">
                      <div className="mb-4 flex items-center gap-2 text-xs font-bold text-red-500">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        RISKY IMPLEMENTATION
                      </div>
                      <div className="text-gray-400">{`// Infinite re-render loop`}</div>
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
                      <div className="relative -mx-4 mt-2 border-l-2 border-red-500 bg-red-50/50 px-4 py-1 sm:-mx-6 sm:px-6 dark:bg-red-500/10">
                        <span className="text-gray-600 dark:text-gray-300">{"}"}, [data]); </span>
                        <span className="block text-[10px] font-bold text-red-500 sm:ml-2 sm:inline sm:text-xs">
                          Object ref unstable
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8 dark:bg-white/5">
                    <div className="font-mono text-xs leading-relaxed sm:text-sm">
                      <div className="mb-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        OPTIMIZED SOLUTION
                      </div>
                      <div className="text-emerald-600/80 dark:text-emerald-400/80">{`// Stable dependency array`}</div>
                      <div className="mt-2">
                        <span className="text-purple-600 dark:text-purple-400">useEffect</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          (() ={">"} {"{"}
                        </span>
                      </div>
                      <div className="pl-4">
                        <span className="text-blue-600 dark:text-blue-400">fetchData</span>
                        <span className="text-gray-900 dark:text-gray-100">();</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-400 italic">{`// Only runs on mount`}</span>
                      </div>
                      <div className="relative -mx-4 mt-2 border-l-2 border-emerald-500 bg-emerald-50/50 px-4 py-1 sm:-mx-6 sm:px-6 dark:bg-emerald-500/10">
                        <span className="text-gray-900 dark:text-gray-100">{"}"}, []);</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-gray-50 py-16 sm:py-24 dark:bg-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base leading-7 font-bold text-blue-600 dark:text-blue-400">
                Why ReactPrep?
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Everything you need to ace the technical round
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    Interactive Challenges
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Fix broken code in a real editor environment. We simulate real-world
                      scenarios, not just algorithmic puzzles.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                      <Layout className="h-5 w-5" />
                    </div>
                    Pattern Recognition
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Learn 20+ essential React patterns including HOCs, Render Props, Compound
                      Components, and Custom Hooks.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                  <dt className="flex items-center gap-x-3 text-base leading-7 font-bold text-gray-900 dark:text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
                      <Cpu className="h-5 w-5" />
                    </div>
                    Deep Dive Explanations
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-sm leading-6 text-gray-600 dark:text-gray-400">
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
        <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 text-center shadow-2xl sm:px-16 sm:py-32 dark:bg-black">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to level up your career?
              <br />
              Start practicing today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of developers who have landed jobs at top tech companies using
              ReactPrep.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/topics"
                className="w-full rounded-xl bg-white px-8 py-3 text-sm font-bold text-gray-900 shadow-lg transition-all hover:bg-gray-100 sm:w-auto"
              >
                Get started for free
              </Link>
              <Link
                href="/topics"
                className="flex items-center gap-2 text-sm leading-6 font-semibold text-white hover:text-gray-300"
              >
                View course catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 ReactPrep Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
