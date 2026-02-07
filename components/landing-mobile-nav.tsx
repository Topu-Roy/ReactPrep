"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left font-bold">ReactKitchen</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-4">
            <Link
              href="/topics"
              className="text-foreground hover:text-primary text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              Question Bank
            </Link>
            <Link
              href="#"
              className="text-foreground hover:text-primary text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-foreground hover:text-primary text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              Pricing
            </Link>
          </div>
          <div className="border-border mr-6 flex flex-col gap-4 border-t pt-8">
            <Link
              href="/topics"
              className="text-foreground hover:text-primary text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/topics"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-center text-sm font-semibold transition-colors"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
