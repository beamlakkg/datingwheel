import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dating Spinner Game - Spin Your Way to Love',
  description: 'An interactive romantic truth or dare game for couples. Discover new things about each other with fun questions and dares.',
  keywords: 'dating game, couples game, truth or dare, romantic game, relationship game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="romantic-bg min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}