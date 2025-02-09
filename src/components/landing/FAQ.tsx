/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Tag, Clock, Award, Shield, Star } from 'lucide-react';

const categories = [
  { icon: Tag, label: '基础使用', color: 'text-blue-500' },
  { icon: Clock, label: '付费相关', color: 'text-purple-500' },
  { icon: Shield, label: '隐私安全', color: 'text-green-500' },
  { icon: Award, label: '功能特性', color: 'text-orange-500' },
];

const faqs = [
  {
    category: '基础使用',
    questions: [
      {
        question: '如何开始使用ExamKiller？',
        answer: '开始使用ExamKiller非常简单：\n1. 注册并登录你的账号\n2. 上传课程资料或选择考试科目\n3. AI会立即开始分析并生成个性化学习计划\n4. 根据计划开始练习，获得实时反馈',
      },
      {
        question: '支持哪些学科？',
        answer: '我们支持广泛的学科领域：\n• 理工科：数学、物理、化学、计算机等\n• 文科：历史、政治、文学、哲学等\n• 商科：经济、金融、管理、会计等\n• 医学：基础医学、临床医学等\n• 语言类：英语、日语、德语等',
      },
      {
        question: '如何提升练习效果？',
        answer: '要获得最佳练习效果，建议：\n1. 保持每日固定学习时间\n2. 及时复习错题和难点\n3. 利用AI助手解答疑惑\n4. 参与社区讨论分享经验',
      }
    ]
  },
  {
    category: '付费相关',
    questions: [
      {
        question: '可以免费试用吗？',
        answer: '是的，我们提供全面的免费试用：\n• 14天完整功能体验\n• 基础题库访问权限\n• AI辅导基础功能\n• 学习计划生成\n试用期结束后，可以选择适合的付费方案继续使用。',
      },
      {
        question: '支持哪些支付方式？',
        answer: '我们支持多种支付方式：\n• 支付宝\n• 微信支付\n• 银行卡支付\n• PayPal（国际用户）\n所有支付渠道都经过安全认证，确保交易安全。',
      }
    ]
  },
  {
    category: '隐私安全',
    questions: [
      {
        question: '如何保护我的学习数据？',
        answer: '我们采用多重措施保护您的数据：\n• 端到端加密\n• 定期数据备份\n• 严格的访问控制\n• 遵守隐私法规\n您可以随时导出或删除个人数据。',
      }
    ]
  },
  {
    category: '功能特性',
    questions: [
      {
        question: '如何保证练习题的质量？',
        answer: '我们通过多重保障确保题目质量：\n1. AI深度学习历年真题\n2. 专业教师团队审核\n3. 用户反馈优化系统\n4. 定期更新题库内容\n5. 智能难度调节算法',
      },
      {
        question: '是否支持自定义学习计划？',
        answer: '完全支持自定义：\n• 调整每日学习时长\n• 设置重点科目比重\n• 自定义复习周期\n• 灵活调整难度等级\n系统会根据你的进度自动优化计划。',
      }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('基础使用');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = faqs
    .find(cat => cat.category === activeCategory)?.questions
    .filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">
            常见问题
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            解答你的疑惑，帮助你更好地使用ExamKiller
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索你的问题..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-100 
                       transition-shadow duration-300"
            />
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {categories.map(({ icon: Icon, label, color }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(label)}
              className={`p-4 rounded-xl border transition-all duration-300
                ${activeCategory === label 
                  ? 'border-blue-100 bg-blue-50/50 shadow-sm' 
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className={`w-6 h-6 ${color}`} />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredQuestions.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`
                  border border-gray-100 rounded-2xl overflow-hidden
                  transition-all duration-300
                  ${openIndex === index ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}
                `}>
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between"
                  >
                    <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300
                        ${openIndex === index ? 'rotate-180' : 'group-hover:text-blue-500'}
                      `}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          {faq.answer.split('\n').map((line, i) => (
                            <p key={i} className="text-gray-600 mb-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}