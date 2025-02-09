// components/login/auth-tabs.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Tabs 
      defaultValue="login" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 h-11 rounded-lg p-1 bg-blue-50/50">
        <TabsTrigger 
          value="login"
          className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-600 transition-colors"
        >
          登录
        </TabsTrigger>
        <TabsTrigger 
          value="register"
          className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-blue-600 transition-colors"
        >
          注册
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </div>
    </Tabs>
  )
}