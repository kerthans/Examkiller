/* eslint-disable @typescript-eslint/no-unused-vars */
// OutlineSection.tsx
import { useState, useCallback } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Send } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface OutlineItem {
 id: number;
 title: string;
 page?: number;
 examCount?: number;
 highlight?: 'red' | 'orange' | 'purple' | 'blue' | 'green';
 children?: OutlineItem[];
}

const outlineData: OutlineItem[] = [
 {
   id: 1,
   title: "第一章 函数与极限",
   children: [
     { id: 11, title: "1.1 函数的概念与性质 【重要考点】", page: 1, examCount: 15, highlight: "red" },
     { id: 12, title: "1.2 数列的极限 【核心】", page: 2, examCount: 12, highlight: "orange" },
     { id: 13, title: "1.3 函数的极限 【难点】", page: 3, examCount: 18, highlight: "purple" },
     { id: 14, title: "1.4 无穷大与无穷小 【常考】", page: 4, examCount: 8, highlight: "blue" },
     { id: 15, title: "1.5 极限运算法则 【高频】", page: 5, examCount: 20, highlight: "green" },
   ]
 },
 {
   id: 2,
   title: "第二章 导数与微分",
   children: [
     { id: 21, title: "2.1 导数的概念 【重点】", page: 6, examCount: 25, highlight: "red" },
     { id: 22, title: "2.2 求导法则 【关键】", page: 7, examCount: 30, highlight: "orange" },
     { id: 23, title: "2.3 高阶导数 【要点】", page: 8, examCount: 10, highlight: "blue" },
     { id: 24, title: "2.4 隐函数的导数 【难点】", page: 9, examCount: 15, highlight: "purple" },
   ]
 },
];

const MOCK_RESPONSES: Record<string, string> = {
 "导数": `【重点考点】导数与微分
1. 导数定义与几何意义
- 瞬时变化率
- 切线斜率
- 函数图像的变化趋势

2. 常见求导规则
- 基本初等函数的导数
- 四则运算法则
- 复合函数求导

3. 典型应用
- 切线与法线
- 单调性与极值
- 拐点与凹凸性`,

 "极限": `【核心知识点】极限理论
1. 重要概念
- 数列极限的定义
- 函数极限的ε-δ语言
- 单侧极限与双侧极限

2. 关键公式
- 重要极限公式
- 等价无穷小替换
- 泰勒展开式

3. 解题技巧
- 有理化方法
- 洛必达法则
- 夹逼准则`,

 "default": `数学知识点解析：

1. 核心概念
- 定义与性质
- 重要定理
- 应用范围

2. 解题方法
- 基本思路
- 常用技巧
- 易错点分析

3. 练习建议
- 典型例题
- 课后习题
- 真题训练`
};

interface OutlineSectionProps {
 currentPage: number;
 onPageSelect: (page: number) => void;
}

export function OutlineSection({ currentPage, onPageSelect }: OutlineSectionProps) {
 const [searchTerm, setSearchTerm] = useState("");
 const [expandedItems, setExpandedItems] = useState<number[]>([1]);
 const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
 const [input, setInput] = useState("");
 const [loading, setLoading] = useState(false);

 const handleToggleExpand = useCallback((itemId: number) => {
   setExpandedItems(prev => 
     prev.includes(itemId) 
       ? prev.filter(id => id !== itemId)
       : [...prev, itemId]
   );
 }, []);

 const handleSend = useCallback(() => {
   if (!input.trim() || loading) return;
   
   setLoading(true);
   setMessages(prev => [...prev, {role: "user", content: input}]);
   setInput("");

   setTimeout(() => {
     const response = Object.entries(MOCK_RESPONSES).find(
       ([key]) => input.toLowerCase().includes(key.toLowerCase())
     )?.[1] || MOCK_RESPONSES.default;

     setMessages(prev => [...prev, {
       role: "assistant",
       content: response
     }]);
     setLoading(false);
   }, 800);
 }, [input, loading]);

 const filteredOutline = outlineData.map(chapter => ({
   ...chapter,
   children: chapter.children?.filter(section => 
     section.title.toLowerCase().includes(searchTerm.toLowerCase())
   )
 })).filter(chapter => 
   chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
   (chapter.children && chapter.children.length > 0)
 );

 return (
   <div className="w-96 border-r border-zinc-200 bg-white flex flex-col">
     <div className="p-4 border-b border-zinc-200">
       <div className="relative">
         <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
         <Input
           placeholder="搜索章节..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="pl-8"
         />
       </div>
     </div>
     
     <ScrollArea className="flex-1 p-4">
       {filteredOutline.map(chapter => (
         <div key={chapter.id} className="mb-2">
           <div 
             className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 p-2 rounded"
             onClick={() => handleToggleExpand(chapter.id)}
           >
             <ChevronDown 
               className={cn(
                 "h-4 w-4 transition-transform",
                 expandedItems.includes(chapter.id) ? "transform rotate-0" : "transform -rotate-90"
               )} 
             />
             <span className="font-medium">{chapter.title}</span>
           </div>
           {expandedItems.includes(chapter.id) && chapter.children && (
             <div className="ml-6 mt-1 space-y-1">
               {chapter.children.map(section => (
                 <div
                   key={section.id}
                   className="flex justify-between items-center group"
                 >
                   <div
                     className={cn(
                       "p-2 rounded cursor-pointer text-sm flex-1",
                       currentPage === section.page 
                         ? "bg-blue-50" 
                         : "hover:bg-zinc-50",
                       {
                         'text-red-600 font-medium': section.highlight === 'red',
                         'text-orange-600 font-medium': section.highlight === 'orange',
                         'text-purple-600 font-medium': section.highlight === 'purple',
                         'text-blue-600 font-medium': section.highlight === 'blue',
                         'text-green-600 font-medium': section.highlight === 'green'
                       }
                     )}
                     onClick={() => section.page && onPageSelect(section.page)}
                   >
                     {section.title}
                   </div>
                   <span className="text-red-500 text-sm ml-2 font-medium whitespace-nowrap">
                     考试{section.examCount}次
                   </span>
                 </div>
               ))}
             </div>
           )}
         </div>
       ))}
     </ScrollArea>

     <div className="p-4 border-t border-zinc-200">
       <ScrollArea className="h-[200px] mb-4 border rounded-lg p-2">
         {messages.map((msg, i) => (
           <div key={i} className={cn(
             "p-3 rounded-lg mb-2 text-sm whitespace-pre-wrap",
             msg.role === "assistant" 
               ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 border border-blue-200" 
               : "bg-gray-50 text-gray-900"
           )}>
             {msg.content}
           </div>
         ))}
       </ScrollArea>
       <Textarea
         value={input}
         onChange={(e) => setInput(e.target.value)}
         placeholder="输入数学问题，AI助手为你解答..."
         className="min-h-[80px] mb-2 resize-none"
         onKeyDown={(e) => {
           if (e.key === 'Enter' && !e.shiftKey) {
             e.preventDefault();
             handleSend();
           }
         }}
       />
       <Button 
         className="w-full gap-2" 
         onClick={handleSend}
         disabled={!input.trim() || loading}
       >
         <Send className="w-4 h-4" />
         {loading ? '思考中...' : '发送'}
       </Button>
     </div>
   </div>
 );
}