import { Code2 } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "./landing-mobile-nav";

export function Navbar() {
  return (
    <header className="border-border/40 bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNav />
          <div className="bg-primary shadow-primary/20 flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-lg">
            <Code2 className="h-5 w-5" />
          </div>
          <Link href="/" className="text-foreground text-lg font-bold tracking-tight">
            ReactKitchen
          </Link>
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
            href="/auth"
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
  );
}
