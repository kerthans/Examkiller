/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Settings, HelpCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  isCollapsed: boolean;
  user?: {
    name?: string;
    phone?: string;
    avatar?: string;
  };
}

export default function UserProfile({ 
  isCollapsed,
  user = {
    name: "我是过考锦鲤",
    phone: "189****6938"
  }
}: UserProfileProps) {
  return (
    <div className="p-4 border-t border-zinc-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium shadow-md overflow-hidden">
          {user.avatar ? (
            <Image 
              src={user.avatar}
              alt={user.name || "用户头像"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-medium text-zinc-900 truncate">{user.name}</p>
            <p className="text-sm text-zinc-500 truncate">{user.phone}</p>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-zinc-600",
            "hover:text-zinc-900 hover:bg-zinc-50 transition-colors group",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
        >
          <Settings className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
          {!isCollapsed && <span>设置</span>}
        </Link>
        <Link
          href="/help"
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-zinc-600",
            "hover:text-zinc-900 hover:bg-zinc-50 transition-colors group",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          )}
        >
          <HelpCircle className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
          {!isCollapsed && <span>帮助</span>}
        </Link>
      </div>
    </div>
  );
}