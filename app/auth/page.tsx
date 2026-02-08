import { GalleryVerticalEnd } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { LoginForm } from "./login-form";

export default function AuthPage() {
  return (
    <div className="min-h-svh">
      <Navbar />

      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 pt-24">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ReactKitchen
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
