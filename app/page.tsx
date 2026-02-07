import { ArrowRight, Code2, Cpu, Layout, Zap } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/landing-mobile-nav";

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Header / Nav */}
      <header className="border-border/40 bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <MobileNav />
            <div className="bg-primary shadow-primary/20 flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-lg">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-foreground text-lg font-bold tracking-tight">ReactKitchen</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              href="/topics"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Question Bank
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/topics"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/topics"
              className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg transition-all"
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
          <div className="bg-primary pointer-events-none absolute top-0 right-0 left-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-[100px] dark:opacity-10"></div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="border-primary/20 bg-primary/10 text-primary mb-6 inline-flex transform cursor-default items-center rounded-full border py-1 pr-3 pl-1 text-sm font-medium backdrop-blur-sm transition-transform hover:scale-105">
                <span className="bg-primary mr-2 flex h-6 w-fit items-center rounded-full px-2 text-[10px] font-bold tracking-wider text-white uppercase sm:text-xs">
                  New
                </span>
                <span className="text-xs sm:text-sm">Updated for React 19</span>
              </div>

              <h1 className="text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Master React Interviews with{" "}
                <span className="from-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
                  Confidence
                </span>
              </h1>

              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base leading-7 sm:mb-12 sm:text-lg sm:leading-8">
                Stop memorizing answers. Start understanding patterns. Practice with interactive
                coding challenges designed by Senior Engineers from top tech companies.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
                <Link
                  href="/topics"
                  className="bg-primary shadow-primary/25 hover:bg-primary/90 w-full rounded-xl px-8 py-4 text-center text-base font-bold text-white shadow-xl transition-all active:scale-95 sm:w-auto"
                >
                  Start Practicing Free
                </Link>
                <Link
                  href="/topics"
                  className="text-foreground bg-background border-border hover:bg-accent group flex w-full items-center justify-center gap-2 rounded-xl border px-8 py-4 text-center text-base font-bold shadow-sm transition-all active:scale-95 sm:w-auto"
                >
                  Explore Topics{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Code Preview Mockup */}
            <div className="relative mt-16 sm:mt-24">
              <div className="from-primary to-accent absolute -inset-1 rounded-2xl bg-linear-to-r opacity-20 blur-lg sm:opacity-30"></div>
              <div className="bg-card border-border relative overflow-hidden rounded-xl border shadow-2xl sm:rounded-2xl">
                <div className="bg-muted/50 border-border/5 flex items-center gap-2 border-b px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="bg-background text-muted-foreground mx-auto flex items-center gap-2 rounded-md px-3 py-1 text-xs font-medium shadow-sm">
                    <Layout className="h-3 w-3" />
                    <span>use-effect-bug.tsx</span>
                  </div>
                </div>

                <div className="border-border/5 grid grid-cols-1 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                  <div className="overflow-x-auto p-4 sm:p-6 lg:p-8">
                    <div className="font-mono text-xs leading-relaxed sm:text-sm">
                      <div className="mb-4 flex items-center gap-2 text-xs font-bold text-red-500">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        RISKY IMPLEMENTATION
                      </div>
                      <div className="text-muted-foreground/60">{`// Infinite re-render loop`}</div>
                      <div className="text-foreground/80 mt-2">
                        <span className="text-primary italic">useEffect</span>
                        <span>
                          (() ={">"} {"{"}
                        </span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary">fetchData</span>
                        <span>();</span>
                      </div>
                      <div className="border-destructive bg-destructive/10 relative -mx-4 mt-2 border-l-2 px-4 py-1 sm:-mx-6 sm:px-6">
                        <span>{"}"}, [data]); </span>
                        <span className="text-destructive block text-[10px] font-bold sm:ml-2 sm:inline sm:text-xs">
                          Object ref unstable
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 overflow-x-auto p-4 sm:p-6 lg:p-8">
                    <div className="text-foreground font-mono text-xs leading-relaxed sm:text-sm">
                      <div className="text-primary mb-4 flex items-center gap-2 text-xs font-bold">
                        <span className="bg-primary flex h-1.5 w-1.5 rounded-full"></span>
                        OPTIMIZED SOLUTION
                      </div>
                      <div className="text-primary/80">{`// Stable dependency array`}</div>
                      <div className="mt-2">
                        <span className="text-primary italic">useEffect</span>
                        <span>
                          (() ={">"} {"{"}
                        </span>
                      </div>
                      <div className="pl-4">
                        <span className="text-primary">fetchData</span>
                        <span>();</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground italic">{`// Only runs on mount`}</span>
                      </div>
                      <div className="bg-primary/10 border-primary relative -mx-4 mt-2 border-l-2 px-4 py-1 sm:-mx-6 sm:px-6">
                        <span>{"}"}, []);</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-primary text-base leading-7 font-bold">Why ReactKitchen?</h2>
              <p className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to ace the technical round
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                <div className="bg-card border-border hover:bg-accent/5 flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
                  <dt className="text-foreground flex items-center gap-x-3 text-base leading-7 font-bold">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                      <Zap className="h-5 w-5" />
                    </div>
                    Interactive Challenges
                  </dt>
                  <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-sm leading-6">
                    <p className="flex-auto">
                      Fix broken code in a real editor environment. We simulate real-world
                      scenarios, not just algorithmic puzzles.
                    </p>
                  </dd>
                </div>
                <div className="bg-card border-border hover:bg-accent/5 flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
                  <dt className="text-foreground flex items-center gap-x-3 text-base leading-7 font-bold">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                      <Layout className="h-5 w-5" />
                    </div>
                    Pattern Recognition
                  </dt>
                  <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-sm leading-6">
                    <p className="flex-auto">
                      Learn 20+ essential React patterns including HOCs, Render Props, Compound
                      Components, and Custom Hooks.
                    </p>
                  </dd>
                </div>
                <div className="bg-card border-border hover:bg-accent/5 flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-md">
                  <dt className="text-foreground flex items-center gap-x-3 text-base leading-7 font-bold">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                      <Cpu className="h-5 w-5" />
                    </div>
                    Deep Dive Explanations
                  </dt>
                  <dd className="text-muted-foreground mt-4 flex flex-auto flex-col text-sm leading-6">
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
        <section className="bg-card border-border relative isolate overflow-hidden border-t px-6 py-16 text-center shadow-xl sm:px-16 sm:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to level up your career?
              <br />
              Start practicing today.
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-8">
              Join thousands of developers who have landed jobs at top tech companies using
              ReactKitchen.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/topics"
                className="bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90 w-full rounded-xl px-8 py-3 text-sm font-bold shadow-lg transition-all sm:w-auto"
              >
                Get started for free
              </Link>
              <Link
                href="/topics"
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm leading-6 font-semibold transition-colors"
              >
                View course catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-border border-t py-12">
        <div className="text-muted-foreground mx-auto max-w-7xl px-6 text-center text-sm">
          <p>© 2026 ReactKitchen Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
