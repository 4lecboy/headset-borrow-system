"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";

export function SidebarToggle() {
  const { isCollapsed, toggleSidebar } = useSidebarToggle();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-0 top-3 translate-x-1/2 z-10 rounded-full bg-background border shadow-sm hover:bg-accent"
      onClick={toggleSidebar}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <motion.div
        animate={{ rotate: isCollapsed ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.div>
    </Button>
  );
}