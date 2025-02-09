/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  BookMarked, 
  Target, 
  Database, 
  Clock, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserProfile from "./user-profile";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  id: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navItems: NavGroup[] = [
  {
    title: "学习",
    items: [
      {
        id: "new",
        icon: BookOpen,
        label: "新课程",
        href: "/dashboard/new",
        badge: "新",
      },
      {
        id: "mycourses",
        icon: BookMarked,
        label: "我的课程",
        href: "/dashboard/mycourses",
      },
      {
        id: "planning",
        icon: Target,
        label: "战略规划",
        href: "/dashboard/planning",
      },
    ],
  },
  {
    title: "资源",
    items: [
      {
        id: "database",
        icon: Database,
        label: "高校数据库",
        href: "/dashboard/database",
      },
      {
        id: "recent",
        icon: Clock,
        label: "最近阅读",
        href: "/dashboard/recent",
      },
    ],
  },
];

interface SidebarProps {
  className?: string;
  selectedItem?: string;
}

export default function Sidebar({ className, selectedItem }: SidebarProps) {
  const [state, setState] = React.useState({
    isCollapsed: false,
    isMobileOpen: false,
  });

  const toggleCollapsed = React.useCallback(() => {
    setState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  }, []);

  const toggleMobile = React.useCallback(() => {
    setState(prev => ({ ...prev, isMobileOpen: !prev.isMobileOpen }));
  }, []);

  const closeMobile = React.useCallback(() => {
    setState(prev => ({ ...prev, isMobileOpen: false }));
  }, []);

  const sidebarContent = React.useMemo(() => (
    <>
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-50 to-white rounded-xl flex items-center justify-center shadow-md hover:from-rose-100 transition-all duration-300">
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </div>
          {!state.isCollapsed && (
            <span className="text-lg font-semibold text-slate-900">ExamKiller</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-8">
          {navItems.map((group) => (
            <div key={group.title}>
              {!state.isCollapsed && (
                <div className="px-3 mb-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {group.title}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group",
                      selectedItem === item.id
                        ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5",
                      selectedItem === item.id
                        ? "text-blue-600"
                        : "text-zinc-400 group-hover:text-blue-600"
                    )} />
                    {!state.isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Profile Component */}
      <UserProfile isCollapsed={state.isCollapsed} />
    </>
  ), [state.isCollapsed, selectedItem]);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleMobile}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {state.isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-72 bg-white shadow-lg transition-all duration-300 lg:relative",
          state.isCollapsed && "w-20",
          state.isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {sidebarContent}

        {/* Collapse Button */}
        <div className="absolute -right-3 top-8 hidden lg:block">
          <Button
            variant="secondary"
            size="icon"
            className="h-6 w-6 rounded-full shadow-md bg-white"
            onClick={toggleCollapsed}
          >
            {state.isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}