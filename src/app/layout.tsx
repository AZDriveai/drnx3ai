import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'DRNX3AI - تطبيق الذكاء الاصطناعي المتطور',
  description: 'تطبيق ذكاء اصطناعي متطور مع واجهة عربية حديثة ومتجاوبة',
  keywords: 'ذكاء اصطناعي, AI, تطبيق ويب, DRNX3AI',
  authors: [{ name: 'AZDriveai', url: 'https://github.com/AZDriveai' }],
  creator: 'AZDriveai',
  publisher: 'AZDriveai',
  robots: 'index, follow',

  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/ic_vector_dr.x_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
          {/* Navigation Header */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <img 
                    src="/ic_vector_dr.x_logo.png" 
                    alt="DRNX3AI Logo" 
                    className="h-10 w-10 rounded-lg"
                    onError={(e) => {
                      // Fallback في حالة عدم وجود الصورة
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="text-white">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      DRNX3AI
                    </h1>
                    <p className="text-xs text-gray-300">الذكاء الاصطناعي المتطور</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">الرئيسية</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">المميزات</a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">حول</a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">
            {children}
          </main>

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
      </body>
    </html>
  )
}
