import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Bot, MessageCircle, Sparkles, Zap } from 'lucide-react'
import './App.css'

function App() {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'مرحباً بك في DRNX3AI! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // محاكاة الاستجابة من الذكاء الاصطناعي
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `شكراً لك على رسالتك: "${userMessage.content}". هذه استجابة تجريبية من DRNX3AI. في الإصدار الكامل، سيتم ربط هذا النظام بنماذج ذكاء اصطناعي حقيقية لتوفير إجابات أكثر تفصيلاً ودقة.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1500)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        {/* Navigation Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">DR</span>
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DRNX3AI
                  </h1>
                  <p className="text-xs text-gray-300">الذكاء الاصطناعي المتطور</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <button onClick={() => setShowChat(false)} className="text-gray-300 hover:text-white transition-colors">الرئيسية</button>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">المميزات</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">حول</a>
                <button onClick={() => setShowChat(true)} className="text-blue-400 font-semibold">ابدا الدردشة</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Chat Interface */}
        <div className="pt-16 min-h-screen">
          <div className="max-w-4xl mx-auto p-4">
            <div className="bg-black/20 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10 h-[calc(100vh-8rem)]">
              <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold text-white text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  دردشة DRNX3AI
                </h1>
                <p className="text-gray-300 text-center mt-2">
                  تحدث مع مساعدك الذكي واحصل على إجابات فورية
                </p>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(100%-200px)]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                        : 'bg-gradient-to-br from-green-500 to-blue-600'
                    }`}>
                      {message.type === 'user' ? (
                        <span className="text-white text-sm">أ</span>
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>

                    <div className={`max-w-[70%] ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`p-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 px-2">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      placeholder="اكتب رسالتك هنا..."
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      rows={2}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">DR</span>
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DRNX3AI
                </h1>
                <p className="text-xs text-gray-300">الذكاء الاصطناعي المتطور</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-blue-400 font-semibold">الرئيسية</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">المميزات</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">حول</a>
              <button onClick={() => setShowChat(true)} className="text-gray-300 hover:text-white transition-colors">ابدا الدردشة</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen pt-16 text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            DRNX3AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            مساعدك الذكي المتطور، مصمم لتبسيط مهامك اليومية وتوفير إجابات دقيقة وسريعة.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button className="px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            الرئيسية
          </Button>
          <Button className="px-6 py-3 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            المميزات
          </Button>
          <Button className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            حول
          </Button>
          <Button 
            onClick={() => setShowChat(true)}
            className="px-6 py-3 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            ابدا الدردشة
          </Button>
        </div>

        <div className="w-full max-w-4xl bg-black/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            مرحباً بك في DRNX3AI
          </h2>
          <p className="text-center text-gray-300 text-lg mb-6">
            اكتشف قوة الذكاء الاصطناعي المتطور مع واجهة عربية حديثة ومتجاوبة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Bot className="text-3xl mb-3 mx-auto text-blue-400" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-blue-300">ذكاء متطور</h3>
              <p className="text-gray-400">تقنيات ذكاء اصطناعي حديثة لفهم احتياجاتك</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <MessageCircle className="text-3xl mb-3 mx-auto text-green-400" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-green-300">دردشة تفاعلية</h3>
              <p className="text-gray-400">واجهة دردشة سهلة الاستخدام باللغة العربية</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
              <Zap className="text-3xl mb-3 mx-auto text-purple-400" size={48} />
              <h3 className="text-xl font-semibold mb-2 text-purple-300">استجابة سريعة</h3>
              <p className="text-gray-400">إجابات فورية ودقيقة لجميع استفساراتك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 DRNX3AI. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              تم التطوير بواسطة <a href="https://github.com/AZDriveai" className="text-blue-400 hover:text-blue-300">AZDriveai</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

