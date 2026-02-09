import { Suspense } from "react";
import { getServerAuthSession } from "@/auth/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminWrapper>{children}</AdminWrapper>
    </Suspense>
  );
}

async function AdminWrapper({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  // Check if user is authenticated and has admin role
  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Admin Header */}
      <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link href="/admin" className="mr-6 flex items-center space-x-2">
              <span className="text-primary font-bold">Admin Panel</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/admin/questions"
                className="text-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Questions
              </Link>
              <Link
                href="/admin/settings"
                className="text-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-screen-2xl py-6">{children}</main>
    </div>
  );
}
