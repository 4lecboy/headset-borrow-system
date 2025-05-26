"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Headphones,
  Users,
  ClipboardList,
  BarChart3,
  Clock,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Devices",
    href: "/devices",
    icon: Headphones,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Loans",
    href: "/loans",
    icon: ClipboardList,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Logs",
    href: "/logs",
    icon: Clock,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ className }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarToggle();

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "5rem" },
  };

  const textVariants = {
    expanded: { opacity: 1, x: 0, display: "block" },
    collapsed: {
      opacity: 0,
      x: -10,
      transitionEnd: { display: "none" },
    },
  };

  const iconVariants = {
    expanded: { marginRight: "0.5rem" },
    collapsed: { marginRight: 0 },
  };

  return (
    <motion.div
      className={cn("flex h-full flex-col pb-12", className)}
      initial={isCollapsed ? "collapsed" : "expanded"}
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="py-4">
        <div className="px-4 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href || pathname.startsWith(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "transparent",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.title : null}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <motion.div
                  variants={iconVariants}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      variants={textVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="px-6 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Current user: 4lecboy</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}