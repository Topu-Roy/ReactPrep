import { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/question-bank/app-sidebar";
import { QuestionBankHeader } from "@/components/question-bank/question-bank-header";

export default function TopicsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-background relative h-svh w-full min-w-0 overflow-x-hidden overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionBankHeader />
        </Suspense>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 sm:gap-6">
          <div className="mx-auto w-full max-w-5xl py-4 sm:py-8">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
