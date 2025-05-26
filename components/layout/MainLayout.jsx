"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { SidebarProvider } from "@/hooks/useSidebarToggle";

export function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <div className="relative">
          <Sidebar />
          <SidebarToggle />
        </div>
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}